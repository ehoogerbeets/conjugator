/*
 * conjugate.js - read the list of Spanish verbs and conjugate them to produce all of the 2nd person plural verb forms
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

var log4js = require("log4js");

var inflect = require("./inflect.js");
var getStyle = require("./styles.js");

var logger = log4js.getLogger("loctool.lib.JavaFile");

var moodTenses = {
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
		"perfect"
	 ],
	 "imperative": [
		 "affirmative",
		 "negative"
	 ]
};

var persons = ["first", "second", "third"];
var numbers = ["singular", "plural"];

var reflectionParticles = {
	first: {
		singular: "me",
		plural: "nos"
	},
	second: {
		singular: "te",
		plural: "os"
	},
	third: "se"
};

var pronouns = {
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

function getPronoun(options) {
	var person = options.person;
	var tuvos = "tu";
	var gender = options.gender || "masculine";
	var number = options.number || "singular";
	var formality = (person === "second" && options.formality) ? options.formality : "informal";
	
	if (options.style && options.style !== "castillano") {
		var styling = getStyle(options.style);
		
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

	var obj = pronouns[person][number];

	if (typeof(obj) !== "string") {
		var obj = obj[tuvos];
		if (typeof(obj) !== "string") {
			obj = obj[formality];
			if (typeof(obj) !== "string") {
				obj = obj[gender];
			}
		}
	}
	
	return obj;
}

var conjugatePerson = function conjugatePerson(infinitive, params, options, conjugation) {
	var pronoun = options.usePronouns ? getPronoun(params) + " " : "";
	var ret;
	
	if (params.mood === "imperative") {
		if (params.person === "first" && params.number === "singular") {
			// there is no first person singular imperative in Spanish
			return "";
		}
		
		ret = pronoun + ((params.positivity === "negative") ? "no " : "") + inflect(infinitive, params);
		ret = ret[0].toUpperCase() + ret.substring(1);
		ret = "¡" + ret + "!";
	} else {
		ret = pronoun ? pronoun[0].toUpperCase() + pronoun.substring(1) : ret;
		ret = pronoun + inflect(infinitive, params);
	}
	if (!conjugation[params.mood]) {
		conjugation[params.mood] = {};
	}
	var tense = params.mood === "imperative" ? params.positivity : params.tense;
	if (!conjugation[params.mood][tense]) {
		conjugation[params.mood][tense] = {};
	}
	if (!conjugation[params.mood][tense][params.number]) {
		conjugation[params.mood][tense][params.number] = {};
	}
	conjugation[params.mood][tense][params.number][params.person] = ret;
	return ret;
};

var conjugateNumber = function conjugateNumber(infinitive, params, options, conjugation) {
	if (options && options.person) {
		params.person = options.person;
		conjugatePerson(infinitive, params, options, conjugation);
	} else {
		persons.forEach(function(person) {
			params.person = person;
			conjugatePerson(infinitive, params, options, conjugation);
		});
	}

	return conjugation;
};

var conjugateTense = function conjugateTense(infinitive, params, options, conjugation) {
	if (options && options.number) {
		params.number = options.number;
		conjugateNumber(infinitive, params, options, conjugation);
	} else {
		numbers.forEach(function(number) {
			params.number = number;
			conjugateNumber(infinitive, params, options, conjugation);
		});
	}

	return conjugation;
};

var conjugateMood = function conjugateMood(infinitive, params, options, conjugation) {
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
		var tenses = moodTenses[params.mood];
		tenses.forEach(function(tense) {
			if (params.mood === "imperative") {
				params.positivity = tense;
				params.tense = undefined;
			} else {
				params.tense = tense;
				params.positivity = undefined;
			}
			conjugateTense(infinitive, params, options, conjugation);
		});
	}

	return conjugation;
};

/**
 * Conjugate a particular verb into the requested inflection. The
 * options are the same as for the inflect function (q.v.) as
 * these are passed to that function. This function also 
 * uses one more parameter "usePronouns" which is a boolean
 * that specifies whether to add the personal pronoun to 
 * the inflected forms. By default, the pronoun is left off.<p>
 * 
 * If any of the inflection
 * options are left out, this function will iterate through all
 * of the valid values for that option. For example, if the 
 * person option is left out, it will conjugate the inflections 
 * for the first, second, and third persons. When the option
 * is given, only the inflections for that option are given.<p>
 * 
 * The return value is an object that contains all of the
 * requested inflections. They are organized (in order) by
 * person within number within tense within mood.
 * 
 * @param {String} infinitive the infinitive of the verb to
 * conjugate
 * @param {Object} options options controlling the conjugation
 * @param {Object} an object containing all of the requested
 * inflections of the given verb
 */
var conjugateVerb = function conjugateVerb(infinitive, options) {
	var conjugation = {};
	options = options || {};
	
	var params = {
		style: options.style,
		gender: options.gender,
		formality: options.formality,
		reflection: options.reflection
	};
	
	if (options && options.mood) {
		params.mood = options.mood;
		conjugateMood(infinitive, params, options, conjugation);
	} else {
		Object.keys(moodTenses).forEach(function(mood) {
			params.mood = mood;
			conjugateMood(infinitive, params, options, conjugation);
		});
	}

	return conjugation;
};

module.exports = conjugateVerb;
