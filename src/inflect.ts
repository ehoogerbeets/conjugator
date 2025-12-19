/*
 * inflect.ts - inflect a Spanish verb for the given parameters
 *
 * Copyright © 2017, HealthTap, Inc.
 * Copyright © 2025, Edwin Hoogerbeets
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as fs from "fs";
import * as path from "path";
import CSV = require("./CSV");

type Person = "first" | "second" | "third";
type NumberType = "singular" | "plural";
type Mood = "indicative" | "subjunctive" | "conditional" | "imperative";
type Tense = "present" | "imperfect" | "preterite" | "future" | "perfect" |
    "pluperfect" | "future perfect" | "preterite perfect" |
    "imperfect -ra" | "imperfect -se";
type Gender = "masculine" | "feminine";
type Positivity = "affirmative" | "negative";
type Formality = "formal" | "informal";
type StyleName = "castillano" | "rioplatense" | "chileano" | "centroamericano" |
    "mexicano" | "caribeno" | "andino";

interface InflectOptions {
    person?: Person;
    number?: NumberType;
    mood?: Mood;
    tense?: Tense;
    gender?: Gender;
    positivity?: Positivity;
    formality?: Formality;
    style?: StyleName;
    reflection?: boolean;
    verbOnly?: boolean;
}

interface Style {
    tuteo?: boolean;
    voseo?: boolean;
    ustedes?: boolean;
}

interface StylesMap {
    [key: string]: Style;
}

interface ExceptionRule {
    infinitive: string;
    "stem change"?: string;
    yo?: string;
    "subj stem"?: string;
    future?: string;
    preterite?: string;
    [key: string]: string | undefined;
}

interface ExceptionRulesMap {
    [key: string]: ExceptionRule;
}

interface VerbException {
    [mood: string]: {
        [tense: string]: {
            [number: string]: {
                [person: string]: string | { tu: string; vos: string };
            };
        };
    } | string;
}

interface ExceptionsMap {
    [verb: string]: VerbException | string;
}

interface EndingVariant {
    tu?: string;
    vos?: string;
}

interface EndingsStructure {
    [key: string]: unknown;
    auxilliaries: {
        [person: string]: {
            [number: string]: {
                [mood: string]: {
                    [tense: string]: string;
                };
            };
        };
    };
}

// Load data files
const endingsJson = fs.readFileSync(path.join(__dirname, "../data/endings.json"), "utf-8");
const endings: EndingsStructure = JSON.parse(endingsJson);

const stylesJson = fs.readFileSync(path.join(__dirname, "../data/styles-es.json"), "utf-8");
const styles: StylesMap = JSON.parse(stylesJson);

const csv = new CSV({
    columnSeparator: '\t'
});

const exceptionRules: ExceptionRulesMap = {};

const verbsIARCSV = fs.readFileSync(path.join(__dirname, "../data/regularVerbsIAR.tsv"), "utf-8");
csv.toJS(verbsIARCSV).forEach((row) => {
    exceptionRules[row.infinitive] = row as unknown as ExceptionRule;
});

const verbsOUECSV = fs.readFileSync(path.join(__dirname, "../data/verbsOUE.tsv"), "utf-8");
const verbsOUE = csv.toJS(verbsOUECSV).map((info) => {
    return info.infinitive;
});

const verbsIECSV = fs.readFileSync(path.join(__dirname, "../data/verbsIE.tsv"), "utf-8");
csv.toJS(verbsIECSV).forEach((row) => {
    exceptionRules[row.infinitive] = row as unknown as ExceptionRule;
});

const verbsEIECSV = fs.readFileSync(path.join(__dirname, "../data/verbsEIE.tsv"), "utf-8");
csv.toJS(verbsEIECSV).forEach((row) => {
    exceptionRules[row.infinitive] = row as unknown as ExceptionRule;
});

const exceptionContents = fs.readFileSync(path.join(__dirname, "../data/exceptions.json"), "utf-8");
const exceptions: ExceptionsMap = JSON.parse(exceptionContents);

function reverse(str: string): string {
    return str.split("").reverse().join("");
}

function replaceLast(str: string, oldChar: string, newChar: string): string {
    for (let i = str.length - 1; i > -1; i--) {
        if (str[i] === oldChar) {
            return str.substring(0, i) + newChar + str.substring(i + 1);
        }
    }
    return str;
}

function fixStem(stem: string, ending: string, suffix: string, options: InflectOptions): string {
    const whole = stem + ending;
    const mood = options.mood || "indicative";
    const tense = options.tense || "present";
    const positivity = options.positivity || "affirmative";
    const useSubjunctive = (mood === "subjunctive") ||
        (mood === "imperative" &&
            (positivity === "negative" || options.person === "third" ||
                (options.person === "first" && options.number === "plural")));

    if (exceptionRules[whole]) {
        const type = exceptionRules[whole]["stem change"];
        if (useSubjunctive) {
            const subjStemAll = exceptionRules[whole].yo && exceptionRules[whole].yo !== "-ío";
            if (tense === "present" &&
                (options.person === "third" || options.number === "singular" || subjStemAll)) {
                if (exceptionRules[whole]["subj stem"]) {
                    stem = exceptionRules[whole]["subj stem"]!;
                } else if (exceptionRules[whole].yo) {
                    switch (exceptionRules[whole].yo) {
                        case "-go":
                            stem += "g";
                            break;
                        case "-ío":
                            stem = replaceLast(stem, "i", "í"); // only replace the last one
                            break;
                        case "-jo":
                            stem = replaceLast(stem, "e", "i"); // only replace the last one
                            stem = stem.substring(0, stem.length - 1) + "j";
                            break;
                    }
                }
            } else if (tense === "future" && exceptionRules[whole]["future"]) {
                stem = exceptionRules[whole]["future"]!;
            } else if (ending === "ir") {
                stem = replaceLast(stem, "e", "i"); // only replace the last one
            }
        } else if (tense === "future" && exceptionRules[whole]["future"]) {
            stem = exceptionRules[whole]["future"]!;
        } else if (exceptionRules[whole]["yo"] &&
            (mood === "indicative" && tense === "present") &&
            options.number === "singular" && options.person === "first") {
            switch (exceptionRules[whole].yo) {
                case "-go":
                    stem += "g";
                    break;
                case "-ío":
                    stem = replaceLast(stem, "i", "í"); // only replace the last one
                    break;
                case "-jo":
                    stem = replaceLast(stem, "e", "i"); // only replace the last one
                    stem = stem.substring(0, stem.length - 1) + "j";
                    break;
            }
        } else if (type && (mood === "imperative" ||
            (mood === "indicative" && tense === "present")) &&
            (options.person === "third" || options.number === "singular")) {
            switch (type) {
                case "e-ie":
                    stem = replaceLast(stem, "e", "ie"); // only replace the last one
                    break;
                case "e-i":
                    stem = stem.replace("e", "i"); // only replace the first one
                    break;
                case "i-í":
                    stem = replaceLast(stem, "i", "í"); // only replace the last one
                    break;
            }
        } else if (mood === "imperative" && ending === "ir" &&
            (options.person === "first" || positivity === "negative")) {
            stem = replaceLast(stem, "e", "i"); // only replace the last one
        } else if (tense === "preterite" && exceptionRules[whole]["preterite"]) {
            if (exceptionRules[whole]["preterite"] === "3rd e-i") {
                if (options.person === "third") {
                    stem = replaceLast(stem, "e", "i"); // only replace the last one
                }
            } else {
                stem = exceptionRules[whole]["preterite"]!;
            }
        }
    }

    if ((mood === "imperative" || tense === "present") && verbsOUE.indexOf(whole) > -1 &&
        (options.person === "third" || options.number === "singular")) {
        stem = stem.replace("o", "ue"); // only replace the first one
    }

    if (ending === "ar") {
        if (stem.substr(-1) === "c" && (suffix[0] === "e" || suffix[0] === "é")) {
            stem = stem.substring(0, stem.length - 1) + "qu";
        } else if (stem.substr(-1) === "g" && (suffix[0] === "e" || suffix[0] === "é")) {
            stem = stem.substring(0, stem.length - 1) + "gu";
        } else if (stem.substr(-1) === "z" && (suffix[0] === "e" || suffix[0] === 'é')) {
            stem = stem.substring(0, stem.length - 1) + "c";
        }
    }

    if (ending === "er") {
        const stemEnd = stem.substr(-2);
        if ((stemEnd === "oc" || stemEnd === "ec") && (suffix[0] === "a" || suffix[0] === 'á' || suffix[0] === 'o')) {
            stem = stem.substring(0, stem.length - 1) + "zc";
        }
    } else if (ending === "ir" && !exceptionRules[whole]) {
        if (suffix[0] === "a" || suffix[0] === 'á' || suffix[0] === 'o') {
            if (stem.substr(-2) === "uc") {
                stem = stem.substring(0, stem.length - 1) + "zc";
            } else if (stem.substr(-1) === "g") {
                stem = stem.substring(0, stem.length - 1) + "j";
            }
        }
    }

    if (stem[0] === "u") {
        stem = "h" + stem;
    }

    return stem;
}

/**
 * Inflect the given verb according to the given parameters.
 * The parameters are given as an object that contains
 * any of the following properties:
 *
 * - person: "first", "second", "third" (default: "first")
 * - number: "singular", "plural" (default: "singular")
 * - mood: "indicative", "subjunctive", "conditional", "imperative" (default: "indicative")
 * - tense: depends on mood (default: "present")
 * - gender: "masculine", "feminine" (default: "masculine")
 * - positivity: "affirmative", "negative" (default: "affirmative")
 * - formality: "formal", "informal"
 * - style: "castillano", "rioplatense", "chileano", etc. (default: "castillano")
 * - reflection: boolean
 * - verbOnly: boolean
 *
 * @param verb the infinitive form of the verb to inflect
 * @param options optional parameters as per above
 * @returns the inflected verb
 */
const inflect = function(verb: string, options?: InflectOptions): string {
    if (!verb || verb.length < 2) {
        return "";
    }

    let ret: string | undefined;
    let original = "";
    const ending = verb.substr(-2);

    if (!(ending in endings)) {
        // not a verb -- can't inflect it!
        return verb;
    }

    let stem = verb.substring(0, verb.length - 2);

    // see if we can use other exception verbs because prefixes hardly
    // ever change the base irregular verb. Example: contener, detener,
    // mantener, etc., all act like tener
    reverse(verb);
    let prefix = "";
    let base: string;
    if (typeof exceptions[verb] === "string") {
        original = verb;
        base = exceptions[verb] as string;
        prefix = verb.substring(0, verb.length - base.length);
        verb = base;
        stem = base.substring(0, base.length - 2);
    }

    const person: Person = (options && options.person) || "first";
    let personValue: string = person;
    const number: NumberType = (options && options.number) || "singular";
    const mood: Mood = (options && options.mood) || "indicative";
    const tense: Tense = (options && options.tense) || "present";
    const positivity: Positivity = (options && options.positivity) || "affirmative";
    let formality: Formality = (options && options.formality) || "formal";
    const hasFormality = options && (options.formality === "formal" || options.formality === "informal");
    const styling: Style = (options && options.style && styles[options.style]) || styles["castillano"];

    if (styling.tuteo && person === "second" && number === "singular" && formality === "formal") {
        // in tuteo regions, you always use tu instead of usted
        formality = "informal";
    }

    if (styling.ustedes && person === "second" && number === "plural") {
        // in ustedes regions, the plural of tu is not vosotros, but ustedes instead,
        // which is the same as the third person plural
        personValue = "third";
    }

    if (hasFormality && person === "second" && formality === "formal") {
        // formal second person (usted/ustedes) uses third person verb endings
        personValue = "third";
    }

    if (tense === "perfect" || tense === "pluperfect" || tense === "future perfect" || tense === "preterite perfect") {
        const personObj = endings.auxilliaries[personValue];
        if (personObj) {
            const pluralityObj = personObj[number];
            if (pluralityObj) {
                const moodObj = pluralityObj[mood];
                if (moodObj) {
                    const aux = moodObj[tense];
                    const endingObj = endings[ending] as Record<string, unknown>;
                    const pastParticiple = endingObj["past participle"] as Record<string, Record<string, string>>;
                    const suffix = pastParticiple.singular.masculine;
                    const verbExc = exceptions[verb];
                    let pastPart: string;
                    if (typeof verbExc === "object" && verbExc["past participle"]) {
                        pastPart = verbExc["past participle"] as unknown as string;
                    } else {
                        pastPart = stem + suffix;
                    }
                    ret = aux + " " + prefix + pastPart;
                }
            }
        }
    } else {
        if (exceptions[original] && typeof exceptions[original] === "object") {
            // see if the requested options cause an exceptional inflection, else generate the regular inflection below
            const excOriginal = exceptions[original] as VerbException;
            if (excOriginal[mood]) {
                const moodObj = excOriginal[mood] as Record<string, Record<string, Record<string, string | { tu: string; vos: string }>>>;
                const property = (mood === "imperative") ? positivity : tense;
                const tenseObj = moodObj[property];
                if (tenseObj && tenseObj[number] && tenseObj[number][personValue]) {
                    const exc = tenseObj[number][personValue];
                    if (typeof exc === "string") {
                        ret = exc;
                    } else {
                        ret = exc[styling.voseo ? "vos" : "tu"];
                    }
                }
            }
        }

        if (!ret && exceptions[verb] && typeof exceptions[verb] === "object") {
            // see if the requested options cause an exceptional inflection, else generate the regular inflection below
            const excVerb = exceptions[verb] as VerbException;
            if (excVerb[mood]) {
                const moodObj = excVerb[mood] as Record<string, Record<string, Record<string, string | { tu: string; vos: string }>>>;
                const property = (mood === "imperative") ? positivity : tense;
                const tenseObj = moodObj[property];
                if (tenseObj && tenseObj[number] && tenseObj[number][personValue]) {
                    const exc = tenseObj[number][personValue];
                    if (typeof exc === "string") {
                        ret = prefix + exc;
                    } else {
                        ret = prefix + exc[styling.voseo ? "vos" : "tu"];
                    }
                }
                if (mood === "imperative" && ending === "er" && prefix &&
                    personValue === "second" && positivity === "affirmative" && number === "singular") {
                    ret = replaceLast(ret!, "e", "é"); // only replace the last one
                }
            }
        }

        if (!ret) {
            const endingObj = endings[ending] as Record<string, unknown>;
            const personObj = endingObj[personValue] as Record<string, unknown> | undefined;
            if (personObj) {
                const pluralityObj = personObj[number] as Record<string, unknown> | undefined;
                if (pluralityObj) {
                    const moodObj = pluralityObj[mood] as string | Record<string, unknown> | undefined;
                    if (moodObj) {
                        if (typeof moodObj === "string") {
                            stem = fixStem(stem, ending, moodObj, { ...options, person: personValue as Person });
                            ret = prefix + stem + moodObj;
                        } else {
                            const property = (mood === "imperative") ? positivity : tense;
                            const tenseObj = moodObj[property] as string | EndingVariant | undefined;
                            if (tenseObj) {
                                if (typeof tenseObj === "string") {
                                    stem = fixStem(stem, ending, tenseObj, { ...options, person: personValue as Person });
                                    ret = prefix + stem + tenseObj;
                                } else {
                                    const suffix = tenseObj[styling.voseo ? "vos" : "tu"]!;
                                    stem = fixStem(stem, ending, suffix, { ...options, person: personValue as Person });
                                    ret = prefix + stem + suffix;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    ret = ret || verb;

    return ret;
};

// CommonJS export for backwards compatibility
export = inflect;

