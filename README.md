# Conjugator

<meta charset="UTF-8">

Conjugator is a tool/library that allows you to inflect and conjugate Spanish verbs. There are plans for the future to
expand to other languages as well, but for now, it is only Spanish.

Installation
------

To install, simply get it from npm:

~~~~~
npm install conjugator
~~~~~

You can also use the -b

How to Use Conjugator From the Command-line
-------

Without parameters, the conjugator will conjugate all verbs it knows about to all moods, tenses, 
numbers, and persons. That's probably not what you want, though.

The basic operation is to give the infinitive form of the verb on the command-line and it will conjugate
that particular verb to all its moods, tenses, numbers, and persons:

~~~~~
> conjugator ir
{

    "indicative": {
        "present": {
            "singular": {
                "first": "voy",
                "second": "vas",
                "third": "va"
            },
            "plural": {
                "first": "vamos",
                "second": "vais",
                "third": "van"
            }
        },
    [...]
    "imperative": {
        "affirmative": {
            "singular": {
                "second": "¡Ve!",
                "third": "¡Vaya!"
            },
            "plural": {
                "first": "¡Vayamos!",
                "second": "¡Id!",
                "third": "¡Vayan!"
            }
        },
        "negative": {
            "singular": {
                "second": "¡No vayas!",
                "third": "¡No vaya!"
            },
            "plural": {
                "first": "¡No vayamos!",
                "second": "¡No vayáis!",
                "third": "¡No vayan!"
            }
        }
    }
}
>
~~~~~

The output is pretty-printed json. You can also get a cleaner line-by-line form by giving the "list" argument as well:

~~~~~
> conjugator ir list
  voy
  vas
  va
  vamos
  vais
  van
  iba
  ibas
  iba
  íbamos
[...]
~~~~~

To see the personal pronouns that go along with the verb forms, give the "pronouns" argument:

~~~~~
> conjugator ir list
  yo voy
  tú vas
  él va
  nosotros vamos
  vosotros vais
  ellos van
  yo iba
  tú ibas
  él iba
  nosotros íbamos
[...]
~~~~~

Filters

To filter the list of inflections, just give the name of the moods, tenses, numbers, or persons you want to filter by. You may
specify the arguments in any order. Only the first parameter (the infinitive verb form) has to be first, and the rest of 
the arguments are free form. For example, to see only the present, first person forms, with pronouns:

~~~~~
> conjugator comer first pronouns present
{
    "indicative": {
        "present": {
            "singular": {
                "first": "yo como"
            },
            "plural": {
                "first": "nosotros comemos"
            }
        }
    },
    "subjunctive": {
        "present": {
            "singular": {
                "first": "yo coma"
            },
            "plural": {
                "first": "nosotros comamos"
            }
        }
    },
    "conditional": {
        "present": {
            "singular": {
                "first": "yo comería"
            },
            "plural": {
                "first": "nosotros comeríamos"
            }
        }
    },
    "imperative": {
        "affirmative": {
            "plural": {
                "first": "¡Nosotros comamos!"
            }
        }
    }
}
[...]
~~~~~


Filter Arguments

Here are the list of moods that conjugator supports:

* indicative
* subjunctive
* conditional
* imperative

Here are the tenses supported:

* present
* imperfect
* preterite
* future
* perfect
* pluperfect
* future perfect
* preterite perfect
* imperfect -ra
* imperfect -se

Here are the numbers supported:

* singular - "I", "he", "she", "you" (singular)
* plural - "we", "you" (plural), "they"

Here are the persons supported:

* first - "I" and "we"
* second - "you"
* third - "he", "she", and "they"

Here are the positivities supported (only applicable to the imperative mood)

* affirmative
* negative


Note that not all combinations are valid. For example, there is no "imperative" mood with the "future perfect" tense. 
If you filter by that, you will get nothing in return.

Pronoun Styles

There are a number of parameters that affect the style of pronouns supported. For example, in some styles of Spanish, 
like that spoken in Argentina near the Rio Plata, the second person singular informal form is "vos" (you). In other 
forms of Spanish, the second person singular informal form is "tú" (you).

Similarly, some styles of Spanish recognize formality and some do not. For example, in Spain where they do recognize
formality, the second person plural formal form is "ustedes", and the informal form is "vosotros".

Here are the possible styles of Spanish that are supported:

* castillano (default) - Spanish as spoken in Spain
* rioplatense - spoken near the Rio Plata (Argentina and Uruguay)
* chileano - spoken in Chile
* centroamericano - spoken in Central America (Costa Rica, El Salvador, Nicaragua, Guatamala, etc.)
* mexicano - spoken in Mexico
* caribeno - spoken in the Caribbean (Puerto Rico, Cuba, Dominican Republic, etc.)
* andino - spoken in the Andes of northern South America (Peru, Ecuador, etc.)

Here are the formalities supported:

* formal - In Spain Spanish, use "usted" for the second person singular and "ustedes" for the second person plural
* informal - In Spain Spanish, use "tú" for the second person singular and "vosotros" for the second person plural

If you do not specify a formality, it will use the formality style that is appropriate for the style of Spanish.

The default is to use masculine forms for the pronouns. If you would like other forms, you can specify the gender
on the command-line. Here are the genders supported:

* masculine - use "he" and "they" (masculine)
* feminine - use "she" and "they" (feminine)
* inanimate - use "it" and "they" (inanimate -- same as masculine)

Using Conjugator From Code
-------

You can use conjugator in your own code and retrieve the same json object that is pretty-printed on the screen
when you use the command-line interface. Example:

~~~~
var conjugateVerb = require("conjugator/lib/conjugateVerb.js");

var comerConjugation = conjugateVerb("comer");

console.log("The first person plural future subjunctive is: " + 
  comerConjugation.subjunctive.future.plural.first);
~~~~

You can filter the results by passing a second command-line argument:

~~~~
var conjugateVerb = require("conjugator/lib/conjugateVerb.js");

var comerConjugation = conjugateVerb("comer", {
	mood: "indicative",
	tense: "present"
});

console.log("The first person plural present indicative is: " + 
  comerConjugation.indicative.present.plural.first);
~~~~

If you would like to get only a particular inflection of a verb, you
can use the "inflect" function. The conjugateVerb function above
calls inflect multiple times to get each of the forms, but you can
call inflect directly:

~~~~
var inflect = require("conjugator/lib/inflect.js");

var comerForm = inflect("comer", {
	mood: "indicative",
	tense: "present",
	number: "plural",
	person: "first"
});

console.log("The first person plural present indicative is: " + comerForm);
~~~~



Development
-----------

New PRs are welcome! 

Code

If you would like to update the code to fix bugs or, even better, add support for another language, 
please go right ahead!

Data

If you found some regular verbs or verb exceptions we didn't cover, please update the data/exceptions.json file and
submit it. Note that any verb that is not listed in the regular or exception files will have the normal -ar, -ir,
or -er rules applied to it as appropriate.

Also note that the property hierarchy of the exceptions json is similar to the output from the 
code itself and new submissions must follow the same pattern. Only the exceptional cases are needed.
Cases not listed will be generated according to the regular rules. The hierarchy is:

~~~~~
{
	"infinitive form of the verb": {
		"moods": {
			"tenses": {
				"numbers": {
					"persons": "value"
				}
			}
		}
	}
}
~~~~~

Example entry in the data/exceptions.json:

~~~~~
{
        "ver": {
                "past participle": "visto",
                "indicative": {
                        "present": {
                                "singular": {
                                        "first": "veo"
                                },
                                "plural": {
                                        "second": "veis"
                                }
                        },
                        "preterite": {
                                "singular": {
                                        "first": "vi",
                                        "third": "vio"
                                }
                        }
                },
                "subjunctive": {
                        "present": {
                                "singular": {
                                        "first": "vea",
                                        "second": "veas",
                                        "third": "vea"
                                },
                                "plural": {
                                        "first": "veamos",
                                        "second": "veáis",
                                        "third": "vean"
                                }
                        }
                },
                "imperative": {
                        "affirmative": {
                                "singular": {
                                        "third": "vea"
                                },
                                "plural": {
                                        "first": "veamos"
                                }
                        },
                        "negative": {
                                "singular": {
                                        "second": "veas",
                                        "third": "vea"
                                },
                                "plural": {
                                        "first": "veamos",
                                        "second": "veáis",
                                        "third": "vean"
                                }
                        }
                }
        }
}
~~~~~

All other cases listed above are generated per the regular rules.

Note that at any level, if all of the values underneath there are the same thing, then the level does not
need to contain a subobject. It can just have a string value. For example, if a particular singular imperative 
form of a verb is the same for all of the first, second, and third persons, then you can just put:

~~~~~
[...]
"imperative": {
    "singular": "verb form"
},
[...]
~~~~~

Instead of spelling it all out like this:

~~~~~
[...]
"imperative": {
    "singular": {
        "first": "verb form",
        "second": "verb form",
        "third": "verb form"
    }
},
[...]
~~~~~


Copyright and License
-------

Copyright &copy; 2017, HealthTap, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.



