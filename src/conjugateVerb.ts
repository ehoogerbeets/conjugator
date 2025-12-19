/*
 * conjugateVerb.ts - read the list of Spanish verbs and conjugate them to produce all verb forms
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

import inflect from "./inflect.js";
import type { Person, NumberType, Mood, Tense, Positivity, Gender, Formality, StyleName, InflectOptions } from "./inflect.js";
import getStyle from "./styles.js";

export interface ConjugateOptions {
    person?: Person;
    number?: NumberType;
    mood?: Mood;
    tense?: Tense;
    positivity?: Positivity;
    gender?: Gender;
    formality?: Formality;
    style?: StyleName;
    reflection?: boolean;
    usePronouns?: boolean;
    verbOnly?: boolean;
}

interface ConjugationParams {
    person?: Person;
    number?: NumberType;
    mood?: Mood;
    tense?: Tense;
    positivity?: Positivity;
    gender?: Gender;
    formality?: Formality;
    style?: StyleName;
    reflection?: boolean;
}

export interface Conjugation {
    [mood: string]: {
        [tense: string]: {
            [number: string]: {
                [person: string]: string;
            };
        };
    };
}

interface PronounStructure {
    [key: string]: string | PronounStructure;
}

const moodTenses: { [mood: string]: string[] } = {
    "indicative": [
        "present",
        "imperfect",
        "preterite",
        "future",
        "perfect",
        "pluperfect",
        "future perfect",
        "preterite perfect"
    ],
    "subjunctive": [
        "present",
        "imperfect -ra",
        "imperfect -se",
        "future",
        "perfect",
        "pluperfect",
        "future perfect"
    ],
    "conditional": [
        "present",
        "perfect",
        "future"
    ],
    "imperative": [
        "affirmative",
        "negative"
    ]
};

const persons: Person[] = ["first", "second", "third"];
const numbers: NumberType[] = ["singular", "plural"];

const pronouns: { [person: string]: PronounStructure } = {
    first: {
        singular: "yo",
        plural: {
            tu: {
                informal: {
                    masculine: "nosotros",
                    feminine: "nosotras",
                    inanimate: "nosotros"
                }
            }
        }
    },
    second: {
        singular: {
            tu: {
                informal: "tú",
                formal: "usted"
            },
            vos: {
                informal: "vos",
                formal: "usted"
            }
        },
        plural: {
            tu: {
                informal: "vosotros",
                formal: "ustedes"
            },
            vos: "ustedes"
        }
    },
    third: {
        singular: {
            tu: {
                informal: {
                    masculine: "él",
                    feminine: "ella",
                    inanimate: "ello"
                }
            }
        },
        plural: {
            tu: {
                informal: {
                    masculine: "ellos",
                    feminine: "ellas",
                    inanimate: "ellos"
                }
            }
        }
    }
};

function getPronoun(options: ConjugateOptions): string {
    const person = options.person || "first";
    let tuvos: "tu" | "vos" = "tu";
    const gender = options.gender || "masculine";
    const number = options.number || "singular";
    let formality: Formality = (person === "second" && options.formality) ? options.formality : "informal";

    if (options.style && options.style !== "castillano") {
        const styling = getStyle(options.style);

        if (styling.tuteo && person === "second" && number === "singular" && formality === "formal") {
            // in tuteo regions, you always use tu instead of usted
            formality = "informal";
        }

        if (styling.ustedes && person === "second" && number === "plural") {
            // in ustedes regions, the plural of tu is not vosotros, but ustedes instead,
            // which is the same as the third person plural
            formality = "formal";
        }

        if (styling.voseo && person !== "first") {
            tuvos = "vos";
        }

        if (person === "third") {
            // no tu/vos in the third person
            tuvos = "tu";
        }
    }

    let obj: string | PronounStructure = pronouns[person][number];

    if (typeof obj !== "string") {
        obj = obj[tuvos] as string | PronounStructure;
        if (typeof obj !== "string") {
            obj = obj[formality] as string | PronounStructure;
            if (typeof obj !== "string") {
                obj = obj[gender] as string;
            }
        }
    }

    return obj as string;
}

function conjugatePerson(
    infinitive: string,
    params: ConjugationParams,
    options: ConjugateOptions,
    conjugation: Conjugation
): string {
    const pronoun = options.usePronouns ? getPronoun({ ...options, ...params }) + " " : "";
    let ret: string;

    if (params.mood === "imperative") {
        if (params.person === "first" && params.number === "singular") {
            // there is no first person singular imperative in Spanish
            return "";
        }
        if (options.verbOnly) {
            ret = inflect(infinitive, params as InflectOptions);
        } else {
            ret = pronoun + ((params.positivity === "negative") ? "no " : "") + inflect(infinitive, params as InflectOptions);
            ret = ret[0].toUpperCase() + ret.substring(1);
            ret = "¡" + ret + "!";
        }
    } else {
        ret = pronoun ? pronoun[0].toUpperCase() + pronoun.substring(1) : "";
        ret = pronoun + inflect(infinitive, params as InflectOptions);
    }

    if (!conjugation[params.mood!]) {
        conjugation[params.mood!] = {};
    }
    const tense = params.mood === "imperative" ? params.positivity! : params.tense!;
    if (!conjugation[params.mood!][tense]) {
        conjugation[params.mood!][tense] = {};
    }
    if (!conjugation[params.mood!][tense][params.number!]) {
        conjugation[params.mood!][tense][params.number!] = {};
    }
    conjugation[params.mood!][tense][params.number!][params.person!] = ret;
    return ret;
}

function conjugateNumber(
    infinitive: string,
    params: ConjugationParams,
    options: ConjugateOptions,
    conjugation: Conjugation
): Conjugation {
    if (options && options.person) {
        params.person = options.person;
        conjugatePerson(infinitive, params, options, conjugation);
    } else {
        persons.forEach((person) => {
            params.person = person;
            conjugatePerson(infinitive, params, options, conjugation);
        });
    }

    return conjugation;
}

function conjugateTense(
    infinitive: string,
    params: ConjugationParams,
    options: ConjugateOptions,
    conjugation: Conjugation
): Conjugation {
    if (options && options.number) {
        params.number = options.number;
        conjugateNumber(infinitive, params, options, conjugation);
    } else {
        numbers.forEach((number) => {
            params.number = number;
            conjugateNumber(infinitive, params, options, conjugation);
        });
    }

    return conjugation;
}

function conjugateMood(
    infinitive: string,
    params: ConjugationParams,
    options: ConjugateOptions,
    conjugation: Conjugation
): Conjugation {
    if (options && (options.tense || (params.mood === "imperative" && options.positivity))) {
        if (params.mood === "imperative") {
            params.positivity = options.positivity;
            params.tense = undefined;
        } else {
            params.tense = options.tense;
            params.positivity = undefined;
        }
        conjugateTense(infinitive, params, options, conjugation);
    } else {
        const tenses = moodTenses[params.mood!];
        tenses.forEach((tense) => {
            if (params.mood === "imperative") {
                params.positivity = tense as Positivity;
                params.tense = undefined;
            } else {
                params.tense = tense as Tense;
                params.positivity = undefined;
            }
            conjugateTense(infinitive, params, options, conjugation);
        });
    }

    return conjugation;
}

/**
 * Conjugate a particular verb into the requested inflection. The
 * options are the same as for the inflect function (q.v.) as
 * these are passed to that function. This function also
 * uses one more parameter "usePronouns" which is a boolean
 * that specifies whether to add the personal pronoun to
 * the inflected forms. By default, the pronoun is left off.
 *
 * If any of the inflection options are left out, this function will
 * iterate through all of the valid values for that option. For example,
 * if the person option is left out, it will conjugate the inflections
 * for the first, second, and third persons. When the option
 * is given, only the inflections for that option are given.
 *
 * The return value is an object that contains all of the
 * requested inflections. They are organized (in order) by
 * person within number within tense within mood.
 *
 * @param infinitive the infinitive of the verb to conjugate
 * @param options options controlling the conjugation
 * @returns an object containing all of the requested inflections of the given verb
 */
const conjugateVerb = function(infinitive: string, options?: ConjugateOptions): Conjugation {
    const conjugation: Conjugation = {};
    const opts = options || {};

    const params: ConjugationParams = {
        style: opts.style,
        gender: opts.gender,
        formality: opts.formality,
        reflection: opts.reflection
    };

    if (opts && opts.mood) {
        params.mood = opts.mood;
        conjugateMood(infinitive, params, opts, conjugation);
    } else {
        Object.keys(moodTenses).forEach((mood) => {
            params.mood = mood as Mood;
            conjugateMood(infinitive, params, opts, conjugation);
        });
    }

    return conjugation;
};

export default conjugateVerb;
