/*
 * inflect.js - inflect a Spanish verb for the given parameters
 * 
 * Copyright © 2017, HealthTap, Inc.
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
var fs = require("fs");
var path = require("path");
var log4js = require("log4js");

var CSV = require("./CSV.js");

var logger = log4js.getLogger("loctool.lib.JavaFile");

// endings as per https://en.wiktionary.org/wiki/Appendix:Spanish_verbs and
// https://en.wikipedia.org/wiki/Spanish_conjugation
var endingsJson = fs.readFileSync(path.join(path.dirname(module.filename), "../data/endings.json"), "utf-8");
var endings = JSON.parse(endingsJson);

var stylesJson = fs.readFileSync(path.join(path.dirname(module.filename), "../data/styles-es.json"), "utf-8");
var styles = JSON.parse(stylesJson);

var csv = new CSV({
	columnSeparator: '\t'
});

var verbsIARCSV = fs.readFileSync(path.join(path.dirname(module.filename), "../data/regularVerbsIAR.tsv"), "utf-8");
var verbsIAR = csv.toJS(verbsIARCSV);

var verbsOUECSV = fs.readFileSync(path.join(path.dirname(module.filename), "../data/verbsOUE.tsv"), "utf-8");
var verbsOUE = csv.toJS(verbsOUECSV).map(function(info) {
	return info.infinitive;
});

var exceptionContents = fs.readFileSync(path.join(path.dirname(module.filename), "../data/exceptions.json"), "utf-8");
var exceptions = JSON.parse(exceptionContents);

function fixStem(stem, ending, suffix, options) {
	var whole = stem + ending;
	if ((options.mood === "imperative" || options.tense === "present") && verbsOUE.indexOf(whole) > -1 &&
			(options.person === "third" || options.number === "singular")) {
		stem = stem.replace("o", "ue");
	}

	if (ending === "ar") {
		if (stem.substr(-1) === "c" && (suffix[0] === "e" || suffix[0] === "é")) {
			stem = stem.substring(0, stem.length-1) + "qu";
		} else if (stem.substr(-1) === "g" && (suffix[0] === "e" || suffix[0] === "é")) {
			stem = stem.substring(0, stem.length-1) + "gu";
		} else if (stem.substr(-1) === "z" && (suffix[0] === "e" || suffix[0] === 'é')) {
			stem = stem.substring(0, stem.length-1) + "c";
		}
	}
	
	if (ending === "er") {
		var stemEnd = stem.substr(-2);
		if ((stemEnd === "oc" || stemEnd === "ec") && (suffix[0] === "a" || suffix[0] === 'á' || suffix[0] === 'o')) {
			stem = stem.substring(0, stem.length-1) + "zc";
		}
	} else if (ending === "ir") {
		if (stem.substr(-2) === "uc" && (suffix[0] === "a" || suffix[0] === 'á' || suffix[0] === 'o')) {
			stem = stem.substring(0, stem.length-1) + "zc";
		}
	}
	
	
	return stem;
}

/**
 * Inflect the given verb according to the given parameters.
 * The parameters are given as an object that contains
 * any of the following properties:
 * 
 * <ul>
 * <li>person
 * <li>number
 * <li>mood
 * <li>tense
 * <li>gender
 * <li>positivity
 * <li>formality
 * <li>style
 * <li>reflection
 * </ul>
 * <p>
 * The person is given as one of the following strings:
 * 
 * <ul>
 * <li>first - "I" and "we"
 * <li>second - "you" (singular) and "you" (plural)
 * <li>third - "he/she/it" and "they" (plural)
 * </ul>
 * 
 * Default: first
 * <p>
 * 
 * The number is given as any one of the following strings:
 * 
 * <ul>
 * <li>singular - one person
 * <li>plural - multiple people
 * </ul>
 * 
 * Default: singular
 * <p>
 * 
 * The mood is given as any one of the following strings:
 * 
 * <ul>
 * <li>indicative
 * <li>subjunctive
 * <li>conditional
 * <li>imperative
 * </ul>
 * 
 * Default: indicative
 * <p>
 * 
 * The tense is given as any one of the following strings depending
 * on the mood:
 * 
 * <ul>
 * <li>indicative
 *   <ul>
 *   <li>present
 *   <li>imperfect
 *   <li>preterite
 *   <li>future
 *   <li>perfect
 *   <li>pluperfect
 *   <li>future perfect
 *   <li>preterite perfect
 *   </ul>
 * <li>subjunctive
 *   <ul>
 *   <li>present
 *   <li>imperfect -ra
 *   <li>imperfect -se
 *   <li>future
 *   <li>perfect
 *   <li>pluperfect
 *   <li>future perfect
 *   </ul>
 * <li>conditional
 *   <ul>
 *   <li>present
 *   <li>perfect
 *   </ul>
 * </ul>
 * 
 * Default: present
 * <p>
 * 
 * The gender is only necessary when the mood is "perfect" or "perfect subjunctive"
 * and indicates the gender of the person being spoken of:
 * 
 * <ul>
 * <li>masculine
 * <li>feminine
 * </ul>
 * 
 * Default: masculine
 * <p>
 * 
 * The positivity is only necessary when the mood is imperative and is specified
 * with one of the following strings:
 * 
 * <ul>
 * <li>affirmative - a command to do something
 * <li>negative - a command not to do something
 * </ul>
 * 
 * Default: affirmative
 * <p>
 * The style parameter specifies which style of Spanish to use. This controls how
 * a verb is conjugated, especially for the second person forms. Valid values are:
 * 
 * <ul>
 * <li>castillano - Spanish as spoken in Spain
 * <li>rioplatense - Spanish as spoken around the Rio de la Plata in South America. This
 * includes Argentina, Uruguay, Eastern Bolivia, and Paraguay
 * <li>chileano - Spanish as spoken in Chile
 * <li>centroamericano - Spanish as spoken in Central America
 * <li>mexicano - Spanish as spoken in Mexico
 * <li>caribeno - Spanish as spoken in Caribbean nations such as Cuba and Puerto Rico
 * <li>andino - Spanish as spoken in various Pacific Andean nations such as Peru and Ecuador
 * </ul>
 * 
 * Default: castillano
 * 
 * @param {String} verb the infinitive form of the verb to inflect
 * @param {Object} options optional parameters as per above
 * @returns {String} the inflected verb
 */
var inflect = function(verb, options) {
	if (!verb || verb.length < 2) {
		return "";
	}
	
	var ret;
	var ending = verb.substr(-2);
	
	if (!(ending in endings)) {
		// not a verb -- can't inflect it!
		return verb;
	}
	
	var stem = verb.substring(0, verb.length-2);
	
	person = options && options.person || "first";
	number = options && options.number || "singular";
	mood = options && options.mood || "indicative";
	tense = options && options.tense || "present";
	gender = options && options.gender || "masculine";
	positivity = options && options.positivity || "affirmative";
	reflection = options && !!options.reflection;
	var styling = options && (options.style && styles[options.style]) || styles["castillano"];
	
	if (styling.tuteo && person === "second" && number === "singular" && formality === "formal") {
		// in tuteo regions, you always use tu instead of usted
		formality = "informal";
	}
	
	if (styling.ustedes && person === "second" && number === "plural") {
		// in ustedes regions, the plural of tu is not vosotros, but ustedes instead, 
		// which is the same as the third person plural
		person = "third";
	}
	
	if (tense === "perfect" || tense === "pluperfect" || tense === "future perfect" || tense === "preterite perfect") {
		var personObj = endings.auxilliaries[person];
		if (personObj) {
			var pluralityObj = personObj[number];
			if (pluralityObj) {
				var moodObj = pluralityObj[mood];
				if (moodObj) {
					var aux = moodObj[tense];
					var suffix = endings[ending]["past participle"].singular.masculine;
					var pastParticiple = (exceptions[verb] && exceptions[verb]["past participle"]) || (stem + suffix);
					ret = aux + " " + pastParticiple;
				}
			}
		}
	} else {
		if (exceptions[verb]) {
			// see if the requested options cause an exceptional inflection, else generate the regular inflection below
			if (exceptions[verb][mood] && exceptions[verb][mood]) {
				var moodObj = exceptions[verb][mood];
				var property = (mood === "imperative") ? positivity : tense;
				var tenseObj = moodObj[property];
				if (tenseObj && tenseObj[number] && tenseObj[number][person]) {
					var exc = tenseObj[number][person];
					if (typeof(exc) === "string") {
						ret = exc;
					} else {
						ret = exc[styling.voseo ? "vos" : "tu"];
					}
				}
			}
		}

		if (!ret) {
			var personObj = endings[ending][person];
			if (personObj) {
				var pluralityObj = personObj[number];
				if (pluralityObj) {
					var moodObj = pluralityObj[mood];
					if (moodObj) {
						if (typeof(moodObj) === "string") {
							stem = fixStem(stem, ending, moodObj, options);
							ret = stem + moodObj;
						} else {
							var property = (mood === "imperative") ? positivity : tense;
							var tenseObj = moodObj[property];
							if (tenseObj) {
								if (typeof(tenseObj) === "string") {
									stem = fixStem(stem, ending, tenseObj, options);
									ret = stem + tenseObj;
								} else {
									var suffix = tenseObj[styling.voseo ? "vos" : "tu"];
									stem = fixStem(stem, ending, suffix, options);
									ret = stem + suffix;
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

module.exports = inflect;
