/*
 * inflect.test.js - Jest tests for the Spanish verb inflection generator function.
 *
 * Copyright © 2017-2018, HealthTap, Inc.
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

import inflect from "../lib/inflect.js";
import conjugateVerb from "../lib/conjugateVerb.js";

var tests = {
	"amar": {
		"indicative": {
			"present": {
				"singular": {
					"first":	"amo",
					"second":	"amas",
					"third":	"ama"
				},
				"plural": {
					"first": 	"amamos",
					"second": 	"amáis",
					"third": 	"aman"
				}
			},
			"preterite": {
				"singular": {
					"first":	"amé",
					"second":	"amaste",
					"third":	"amó"
				},
				"plural": {
					"first": 	"amamos",
					"second": 	"amasteis",
					"third": 	"amaron"
				}
			},
			"imperfect": {
				"singular": {
					"first":	"amaba",
					"second":	"amabas",
					"third":	"amaba",
				},
				"plural": {
					"first": 	"amábamos",
					"second": 	"amabais",
					"third": 	"amaban"
				}
			},
			"future": {
				"singular": {
					"first":	"amaré",
					"second":	"amarás",
					"third":	"amará"
				},
				"plural": {
					"first": 	"amaremos",
					"second": 	"amaréis",
					"third": 	"amarán"
				}
			},
			"perfect": {
				"singular": {
					"first":	"he amado",
					"second":	"has amado",
					"third":	"ha amado"
				},
				"plural": {
					"first": 	"hemos amado",
					"second": 	"habéis amado",
					"third": 	"han amado"
				}
			},
			"pluperfect": {
				"singular": {
					"first":	"había amado",
					"second":	"habías amado",
					"third":	"había amado"
				},
				"plural": {
					"first": 	"habíamos amado",
					"second": 	"habíais amado",
					"third": 	"habían amado"
				}
			},
			"future perfect": {
				"singular": {
					"first":	"habré amado",
					"second":	"habrás amado",
					"third":	"habrá amado"
				},
				"plural": {
					"first": 	"habremos amado",
					"second": 	"habréis amado",
					"third": 	"habrán amado"
				}
			},
			"preterite perfect": {
				"singular": {
					"first":	"hube amado",
					"second":	"hubiste amado",
					"third":	"hubo amado"
				},
				"plural": {
					"first": 	"hubimos amado",
					"second": 	"hubisteis amado",
					"third": 	"hubieron amado"
				}
			}
		},
		"subjunctive": {
			"present": {
				"singular": {
					"first":	"ame",
					"second":	"ames",
					"third":	"ame"
				},
				"plural": {
					"first":	"amemos",
					"second":	"améis",
					"third":	"amen"
				}
			},
			"imperfect -ra": {
				"singular": {
					"first":	"amara",
					"second":	"amaras",
					"third":	"amara"
				},
				"plural": {
					"first":	"amáramos",
					"second":	"amarais",
					"third":	"amaran"
				}
			},
			"imperfect -se": {
				"singular": {
					"first":	"amase",
					"second":	"amases",
					"third":	"amase"
				},
				"plural": {
					"first":	"amásemos",
					"second":	"amaseis",
					"third":	"amasen"
				}
			},
			"future": {
				"singular": {
					"first":	"amare",
					"second":	"amares",
					"third":	"amare"
				},
				"plural": {
					"first":	"amáremos",
					"second":	"amareis",
					"third":	"amaren"
				}
			},
			"perfect": {
			    "singular": {
			        "first":    "haya amado",
			        "second":   "hayas amado",
			        "third":    "haya amado"
			    },
			    "plural": {
			        "first":    "hayamos amado",
			        "second":   "hayáis amado",
			        "third":    "hayan amado"
			    }
			},
            "pluperfect": {
                "singular": {
                    "first":    "hubiera amado",
                    "second":   "hubieras amado",
                    "third":    "hubiera amado"
                },
                "plural": {
                    "first":    "hubiéramos amado",
                    "second":   "hubierais amado",
                    "third":    "hubieran amado"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "hubiere amado",
                    "second":   "hubieres amado",
                    "third":    "hubiere amado"
                },
                "plural": {
                    "first":    "hubiéremos amado",
                    "second":   "hubiereis amado",
                    "third":    "hubieren amado"
                }
            }
		},
		"imperative": {
			"affirmative": {
				"singular": {
					"second": "ama",
					"third": "ame"
				},
				"plural": {
					"first": "amemos",
					"second": "amad",
					"third": "amen"
				}
			},
			"negative": {
				"singular": {
					"second": "ames",
					"third": "ame"
				},
				"plural": {
					"first": "amemos",
					"second": "améis",
					"third": "amen"
				}
			}
		},
		"conditional": {
			"present": {
				"singular": {
					"first": "amaría",
					"second": "amarías",
					"third": "amaría"
				},
				"plural": {
					"first": "amaríamos",
					"second": "amaríais",
					"third": "amarían"
				}
			},
			"future": {
				"singular": {
					"first": "amaría",
					"second": "amarías",
					"third": "amaría"
				},
				"plural": {
					"first": "amaríamos",
					"second": "amaríais",
					"third": "amarían"
				}
			},
			"perfect": {
				"singular": {
					"first": "habría amado",
					"second": "habrías amado",
					"third": "habría amado"
				},
				"plural": {
					"first": "habríamos amado",
					"second": "habríais amado",
					"third": "habrían amado"
				}
			}
		}
	},

	"partir": {
		"indicative": {
			"present": {
				"singular": {
					"first":	"parto",
					"second":	"partes",
					"third":	"parte"
				},
				"plural": {
					"first": 	"partimos",
					"second": 	"partís",
					"third": 	"parten"
				}
			},
			"preterite": {
				"singular": {
					"first":	"partí",
					"second":	"partiste",
					"third":	"partió"
				},
				"plural": {
					"first": 	"partimos",
					"second": 	"partisteis",
					"third": 	"partieron"
				}
			},
			"imperfect": {
				"singular": {
					"first":	"partía",
					"second":	"partías",
					"third":	"partía",
				},
				"plural": {
					"first": 	"partíamos",
					"second": 	"partíais",
					"third": 	"partían"
				}
			},
			"future": {
				"singular": {
					"first":	"partiré",
					"second":	"partirás",
					"third":	"partirá"
				},
				"plural": {
					"first": 	"partiremos",
					"second": 	"partiréis",
					"third": 	"partirán"
				}
			},
            "perfect": {
                "singular": {
                    "first":    "he partido",
                    "second":   "has partido",
                    "third":    "ha partido"
                },
                "plural": {
                    "first":    "hemos partido",
                    "second":   "habéis partido",
                    "third":    "han partido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "había partido",
                    "second":   "habías partido",
                    "third":    "había partido"
                },
                "plural": {
                    "first":    "habíamos partido",
                    "second":   "habíais partido",
                    "third":    "habían partido"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "habré partido",
                    "second":   "habrás partido",
                    "third":    "habrá partido"
                },
                "plural": {
                    "first":    "habremos partido",
                    "second":   "habréis partido",
                    "third":    "habrán partido"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first":    "hube partido",
                    "second":   "hubiste partido",
                    "third":    "hubo partido"
                },
                "plural": {
                    "first":    "hubimos partido",
                    "second":   "hubisteis partido",
                    "third":    "hubieron partido"
                }
            }
		},
		"subjunctive": {
			"present": {
				"singular": {
					"first":	"parta",
					"second":	"partas",
					"third":	"parta"
				},
				"plural": {
					"first":	"partamos",
					"second":	"partáis",
					"third":	"partan"
				}
			},
			"imperfect -ra": {
				"singular": {
					"first":	"partiera",
					"second":	"partieras",
					"third":	"partiera"
				},
				"plural": {
					"first":	"partiéramos",
					"second":	"partierais",
					"third":	"partieran"
				}
			},
			"imperfect -se": {
				"singular": {
					"first":	"partiese",
					"second":	"partieses",
					"third":	"partiese"
				},
				"plural": {
					"first":	"partiésemos",
					"second":	"partieseis",
					"third":	"partiesen"
				}
			},
			"future": {
				"singular": {
					"first":	"partiere",
					"second":	"partieres",
					"third":	"partiere"
				},
				"plural": {
					"first":	"partiéremos",
					"second":	"partiereis",
					"third":	"partieren"
				}
			},
            "perfect": {
                "singular": {
                    "first":    "haya partido",
                    "second":   "hayas partido",
                    "third":    "haya partido"
                },
                "plural": {
                    "first":    "hayamos partido",
                    "second":   "hayáis partido",
                    "third":    "hayan partido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "hubiera partido",
                    "second":   "hubieras partido",
                    "third":    "hubiera partido"
                },
                "plural": {
                    "first":    "hubiéramos partido",
                    "second":   "hubierais partido",
                    "third":    "hubieran partido"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "hubiere partido",
                    "second":   "hubieres partido",
                    "third":    "hubiere partido"
                },
                "plural": {
                    "first":    "hubiéremos partido",
                    "second":   "hubiereis partido",
                    "third":    "hubieren partido"
                }
            }
		},
		"imperative": {
			"affirmative": {
				"singular": {
					"second": "parte",
					"third": "parta"
				},
				"plural": {
					"first": "partamos",
					"second": "partid",
					"third": "partan"
				}
			},
			"negative": {
				"singular": {
					"second": "partas",
					"third": "parta"
				},
				"plural": {
					"first": "partamos",
					"second": "partáis",
					"third": "partan"
				}
			}
		},
		"conditional": {
			"present": {
				"singular": {
					"first": "partiría",
					"second": "partirías",
					"third": "partiría"
				},
				"plural": {
					"first": "partiríamos",
					"second": "partiríais",
					"third": "partirían"
				}
			},
			"future": {
				"singular": {
					"first": "partiría",
					"second": "partirías",
					"third": "partiría"
				},
				"plural": {
					"first": "partiríamos",
					"second": "partiríais",
					"third": "partirían"
				}
			},
            "perfect": {
                "singular": {
                    "first": "habría partido",
                    "second": "habrías partido",
                    "third": "habría partido"
                },
                "plural": {
                    "first": "habríamos partido",
                    "second": "habríais partido",
                    "third": "habrían partido"
                }
            }
		}
	},

	"comer": {
		"indicative": {
			"present": {
				"singular": {
					"first":	"como",
					"second":	"comes",
					"third":	"come"
				},
				"plural": {
					"first": 	"comemos",
					"second": 	"coméis",
					"third": 	"comen"
				}
			},
			"preterite": {
				"singular": {
					"first":	"comí",
					"second":	"comiste",
					"third":	"comió"
				},
				"plural": {
					"first": 	"comimos",
					"second": 	"comisteis",
					"third": 	"comieron"
				}
			},
			"imperfect": {
				"singular": {
					"first":	"comía",
					"second":	"comías",
					"third":	"comía",
				},
				"plural": {
					"first": 	"comíamos",
					"second": 	"comíais",
					"third": 	"comían"
				}
			},
			"future": {
				"singular": {
					"first":	"comeré",
					"second":	"comerás",
					"third":	"comerá"
				},
				"plural": {
					"first": 	"comeremos",
					"second": 	"comeréis",
					"third": 	"comerán"
				}
			},
            "perfect": {
                "singular": {
                    "first":    "he comido",
                    "second":   "has comido",
                    "third":    "ha comido"
                },
                "plural": {
                    "first":    "hemos comido",
                    "second":   "habéis comido",
                    "third":    "han comido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "había comido",
                    "second":   "habías comido",
                    "third":    "había comido"
                },
                "plural": {
                    "first":    "habíamos comido",
                    "second":   "habíais comido",
                    "third":    "habían comido"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "habré comido",
                    "second":   "habrás comido",
                    "third":    "habrá comido"
                },
                "plural": {
                    "first":    "habremos comido",
                    "second":   "habréis comido",
                    "third":    "habrán comido"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first":    "hube comido",
                    "second":   "hubiste comido",
                    "third":    "hubo comido"
                },
                "plural": {
                    "first":    "hubimos comido",
                    "second":   "hubisteis comido",
                    "third":    "hubieron comido"
                }
            }
		},
		"subjunctive": {
			"present": {
				"singular": {
					"first":	"coma",
					"second":	"comas",
					"third":	"coma"
				},
				"plural": {
					"first":	"comamos",
					"second":	"comáis",
					"third":	"coman"
				}
			},
			"imperfect -ra": {
				"singular": {
					"first":	"comiera",
					"second":	"comieras",
					"third":	"comiera"
				},
				"plural": {
					"first":	"comiéramos",
					"second":	"comierais",
					"third":	"comieran"
				}
			},
			"imperfect -se": {
				"singular": {
					"first":	"comiese",
					"second":	"comieses",
					"third":	"comiese"
				},
				"plural": {
					"first":	"comiésemos",
					"second":	"comieseis",
					"third":	"comiesen"
				}
			},
			"future": {
				"singular": {
					"first":	"comiere",
					"second":	"comieres",
					"third":	"comiere"
				},
				"plural": {
					"first":	"comiéremos",
					"second":	"comiereis",
					"third":	"comieren"
				}
			},
			"perfect": {
                "singular": {
                    "first":    "haya comido",
                    "second":   "hayas comido",
                    "third":    "haya comido"
                },
                "plural": {
                    "first":    "hayamos comido",
                    "second":   "hayáis comido",
                    "third":    "hayan comido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "hubiera comido",
                    "second":   "hubieras comido",
                    "third":    "hubiera comido"
                },
                "plural": {
                    "first":    "hubiéramos comido",
                    "second":   "hubierais comido",
                    "third":    "hubieran comido"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "hubiere comido",
                    "second":   "hubieres comido",
                    "third":    "hubiere comido"
                },
                "plural": {
                    "first":    "hubiéremos comido",
                    "second":   "hubiereis comido",
                    "third":    "hubieren comido"
                }
            }
		},
		"imperative": {
			"affirmative": {
				"singular": {
					"second": "come",
					"third": "coma"
				},
				"plural": {
					"first": "comamos",
					"second": "comed",
					"third": "coman"
				}
			},
			"negative": {
				"singular": {
					"second": "comas",
					"third": "coma"
				},
				"plural": {
					"first": "comamos",
					"second": "comáis",
					"third": "coman"
				}
			}
		},
		"conditional": {
			"present": {
				"singular": {
					"first": "comería",
					"second": "comerías",
					"third": "comería"
				},
				"plural": {
					"first": "comeríamos",
					"second": "comeríais",
					"third": "comerían"
				}
			},
			"future": {
				"singular": {
					"first": "comería",
					"second": "comerías",
					"third": "comería"
				},
				"plural": {
					"first": "comeríamos",
					"second": "comeríais",
					"third": "comerían"
				}
			},
            "perfect": {
                "singular": {
                    "first": "habría comido",
                    "second": "habrías comido",
                    "third": "habría comido"
                },
                "plural": {
                    "first": "habríamos comido",
                    "second": "habríais comido",
                    "third": "habrían comido"
                }
            }
		}
	},


    // regular verbs ending in -dar should not follow "dar" irregular conjugation
    "agrandar": {
        "indicative": {
            "present": {
                "singular": {
                    "first":    "agrando",
                    "second":   "agrandas",
                    "third":    "agranda"
                },
                "plural": {
                    "first":    "agrandamos",
                    "second":   "agrandáis",
                    "third":    "agrandan"
                }
            },
            "preterite": {
                "singular": {
                    "first":    "agrandé",
                    "second":   "agrandaste",
                    "third":    "agrandó"
                },
                "plural": {
                    "first":    "agrandamos",
                    "second":   "agrandasteis",
                    "third":    "agrandaron"
                }
            },
            "imperfect": {
                "singular": {
                    "first":    "agrandaba",
                    "second":   "agrandabas",
                    "third":    "agrandaba",
                },
                "plural": {
                    "first":    "agrandábamos",
                    "second":   "agrandabais",
                    "third":    "agrandaban"
                }
            },
            "future": {
                "singular": {
                    "first":    "agrandaré",
                    "second":   "agrandarás",
                    "third":    "agrandará"
                },
                "plural": {
                    "first":    "agrandaremos",
                    "second":   "agrandaréis",
                    "third":    "agrandarán"
                }
            },
            "perfect": {
                "singular": {
                    "first":    "he agrandado",
                    "second":   "has agrandado",
                    "third":    "ha agrandado"
                },
                "plural": {
                    "first":    "hemos agrandado",
                    "second":   "habéis agrandado",
                    "third":    "han agrandado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "había agrandado",
                    "second":   "habías agrandado",
                    "third":    "había agrandado"
                },
                "plural": {
                    "first":    "habíamos agrandado",
                    "second":   "habíais agrandado",
                    "third":    "habían agrandado"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "habré agrandado",
                    "second":   "habrás agrandado",
                    "third":    "habrá agrandado"
                },
                "plural": {
                    "first":    "habremos agrandado",
                    "second":   "habréis agrandado",
                    "third":    "habrán agrandado"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first":    "hube agrandado",
                    "second":   "hubiste agrandado",
                    "third":    "hubo agrandado"
                },
                "plural": {
                    "first":    "hubimos agrandado",
                    "second":   "hubisteis agrandado",
                    "third":    "hubieron agrandado"
                }
            }
        },
        "subjunctive": {
            "present": {
                "singular": {
                    "first":    "agrande",
                    "second":   "agrandes",
                    "third":    "agrande"
                },
                "plural": {
                    "first":    "agrandemos",
                    "second":   "agrandéis",
                    "third":    "agranden"
                }
            },
            "imperfect -ra": {
                "singular": {
                    "first":    "agrandara",
                    "second":   "agrandaras",
                    "third":    "agrandara"
                },
                "plural": {
                    "first":    "agrandáramos",
                    "second":   "agrandarais",
                    "third":    "agrandaran"
                }
            },
            "imperfect -se": {
                "singular": {
                    "first":    "agrandase",
                    "second":   "agrandases",
                    "third":    "agrandase"
                },
                "plural": {
                    "first":    "agrandásemos",
                    "second":   "agrandaseis",
                    "third":    "agrandasen"
                }
            },
            "future": {
                "singular": {
                    "first":    "agrandare",
                    "second":   "agrandares",
                    "third":    "agrandare"
                },
                "plural": {
                    "first":    "agrandáremos",
                    "second":   "agrandareis",
                    "third":    "agrandaren"
                }
            },
            "perfect": {
                "singular": {
                    "first":    "haya agrandado",
                    "second":   "hayas agrandado",
                    "third":    "haya agrandado"
                },
                "plural": {
                    "first":    "hayamos agrandado",
                    "second":   "hayáis agrandado",
                    "third":    "hayan agrandado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "hubiera agrandado",
                    "second":   "hubieras agrandado",
                    "third":    "hubiera agrandado"
                },
                "plural": {
                    "first":    "hubiéramos agrandado",
                    "second":   "hubierais agrandado",
                    "third":    "hubieran agrandado"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "hubiere agrandado",
                    "second":   "hubieres agrandado",
                    "third":    "hubiere agrandado"
                },
                "plural": {
                    "first":    "hubiéremos agrandado",
                    "second":   "hubiereis agrandado",
                    "third":    "hubieren agrandado"
                }
            }
        },
        "imperative": {
            "affirmative": {
                "singular": {
                    "second": "agranda",
                    "third": "agrande"
                },
                "plural": {
                    "first": "agrandemos",
                    "second": "agrandad",
                    "third": "agranden"
                }
            },
            "negative": {
                "singular": {
                    "second": "agrandes",
                    "third": "agrande"
                },
                "plural": {
                    "first": "agrandemos",
                    "second": "agrandéis",
                    "third": "agranden"
                }
            }
        },
        "conditional": {
            "present": {
                "singular": {
                    "first": "agrandaría",
                    "second": "agrandarías",
                    "third": "agrandaría"
                },
                "plural": {
                    "first": "agrandaríamos",
                    "second": "agrandaríais",
                    "third": "agrandarían"
                }
            },
            "future": {
                "singular": {
                    "first": "agrandaría",
                    "second": "agrandarías",
                    "third": "agrandaría"
                },
                "plural": {
                    "first": "agrandaríamos",
                    "second": "agrandaríais",
                    "third": "agrandarían"
                }
            },
            "perfect": {
                "singular": {
                    "first": "habría agrandado",
                    "second": "habrías agrandado",
                    "third": "habría agrandado"
                },
                "plural": {
                    "first": "habríamos agrandado",
                    "second": "habríais agrandado",
                    "third": "habrían agrandado"
                }
            }
        }
    },

    // regular verbs like apestar should not follow irregular ones like estar
    "apestar": {
        "indicative": {
            "present": {
                "singular": {
                    "first":    "apesto",
                    "second":   "apestas",
                    "third":    "apesta"
                },
                "plural": {
                    "first":    "apestamos",
                    "second":   "apestáis",
                    "third":    "apestan"
                }
            },
            "preterite": {
                "singular": {
                    "first":    "apesté",
                    "second":   "apestaste",
                    "third":    "apestó"
                },
                "plural": {
                    "first":    "apestamos",
                    "second":   "apestasteis",
                    "third":    "apestaron"
                }
            },
            "imperfect": {
                "singular": {
                    "first":    "apestaba",
                    "second":   "apestabas",
                    "third":    "apestaba",
                },
                "plural": {
                    "first":    "apestábamos",
                    "second":   "apestabais",
                    "third":    "apestaban"
                }
            },
            "future": {
                "singular": {
                    "first":    "apestaré",
                    "second":   "apestarás",
                    "third":    "apestará"
                },
                "plural": {
                    "first":    "apestaremos",
                    "second":   "apestaréis",
                    "third":    "apestarán"
                }
            },
            "perfect": {
                "singular": {
                    "first":    "he apestado",
                    "second":   "has apestado",
                    "third":    "ha apestado"
                },
                "plural": {
                    "first":    "hemos apestado",
                    "second":   "habéis apestado",
                    "third":    "han apestado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "había apestado",
                    "second":   "habías apestado",
                    "third":    "había apestado"
                },
                "plural": {
                    "first":    "habíamos apestado",
                    "second":   "habíais apestado",
                    "third":    "habían apestado"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "habré apestado",
                    "second":   "habrás apestado",
                    "third":    "habrá apestado"
                },
                "plural": {
                    "first":    "habremos apestado",
                    "second":   "habréis apestado",
                    "third":    "habrán apestado"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first":    "hube apestado",
                    "second":   "hubiste apestado",
                    "third":    "hubo apestado"
                },
                "plural": {
                    "first":    "hubimos apestado",
                    "second":   "hubisteis apestado",
                    "third":    "hubieron apestado"
                }
            }
        },
        "subjunctive": {
            "present": {
                "singular": {
                    "first":    "apeste",
                    "second":   "apestes",
                    "third":    "apeste"
                },
                "plural": {
                    "first":    "apestemos",
                    "second":   "apestéis",
                    "third":    "apesten"
                }
            },
            "imperfect -ra": {
                "singular": {
                    "first":    "apestara",
                    "second":   "apestaras",
                    "third":    "apestara"
                },
                "plural": {
                    "first":    "apestáramos",
                    "second":   "apestarais",
                    "third":    "apestaran"
                }
            },
            "imperfect -se": {
                "singular": {
                    "first":    "apestase",
                    "second":   "apestases",
                    "third":    "apestase"
                },
                "plural": {
                    "first":    "apestásemos",
                    "second":   "apestaseis",
                    "third":    "apestasen"
                }
            },
            "future": {
                "singular": {
                    "first":    "apestare",
                    "second":   "apestares",
                    "third":    "apestare"
                },
                "plural": {
                    "first":    "apestáremos",
                    "second":   "apestareis",
                    "third":    "apestaren"
                }
            },
            "perfect": {
                "singular": {
                    "first":    "haya apestado",
                    "second":   "hayas apestado",
                    "third":    "haya apestado"
                },
                "plural": {
                    "first":    "hayamos apestado",
                    "second":   "hayáis apestado",
                    "third":    "hayan apestado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "hubiera apestado",
                    "second":   "hubieras apestado",
                    "third":    "hubiera apestado"
                },
                "plural": {
                    "first":    "hubiéramos apestado",
                    "second":   "hubierais apestado",
                    "third":    "hubieran apestado"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "hubiere apestado",
                    "second":   "hubieres apestado",
                    "third":    "hubiere apestado"
                },
                "plural": {
                    "first":    "hubiéremos apestado",
                    "second":   "hubiereis apestado",
                    "third":    "hubieren apestado"
                }
            }
        },
        "imperative": {
            "affirmative": {
                "singular": {
                    "second": "apesta",
                    "third": "apeste"
                },
                "plural": {
                    "first": "apestemos",
                    "second": "apestad",
                    "third": "apesten"
                }
            },
            "negative": {
                "singular": {
                    "second": "apestes",
                    "third": "apeste"
                },
                "plural": {
                    "first": "apestemos",
                    "second": "apestéis",
                    "third": "apesten"
                }
            }
        },
        "conditional": {
            "present": {
                "singular": {
                    "first": "apestaría",
                    "second": "apestarías",
                    "third": "apestaría"
                },
                "plural": {
                    "first": "apestaríamos",
                    "second": "apestaríais",
                    "third": "apestarían"
                }
            },
            "future": {
                "singular": {
                    "first": "apestaría",
                    "second": "apestarías",
                    "third": "apestaría"
                },
                "plural": {
                    "first": "apestaríamos",
                    "second": "apestaríais",
                    "third": "apestarían"
                }
            },
            "perfect": {
                "singular": {
                    "first": "habría apestado",
                    "second": "habrías apestado",
                    "third": "habría apestado"
                },
                "plural": {
                    "first": "habríamos apestado",
                    "second": "habríais apestado",
                    "third": "habrían apestado"
                }
            }
        }
    }
};

var irregularPastParticiples = {
	"abrir": {
		"indicative": {
			"perfect": {
				"singular": {
					"first":	"he abierto"
				}
			},
			"pluperfect": {
				"singular": {
					"first":	"había abierto"
				}
			},
			"future perfect": {
				"singular": {
					"first":	"habré abierto",
				}
			},
			"preterite perfect": {
				"singular": {
					"first":	"hube abierto"
				},
				"plural": {
					"first": 	"hubimos abierto"
				}
			}
		},
		"conditional": {
			"perfect": {
				"singular": {
					"first": "habría abierto"
				},
				"plural": {
					"first": "habríamos abierto"
				}
			}
		}
	},

	"decir": {
		"indicative": {
			"perfect": {
				"singular": {
					"first":	"he dicho"
				}
			}
		}
	},

	"escribir": {
		"indicative": {
			"perfect": {
				"singular": {
					"first":	"he escrito"
				}
			}
		}
	},

	"hacer": {
		"indicative": {
			"perfect": {
				"singular": {
					"first":	"he hecho"
				}
			}
		}
	}
};

var irregularVerbs = {
	"estar": {
		"indicative": {
			"present": {
				"singular": {
					"first":	"estoy",
					"second":	"estás",
					"third":	"está"
				},
				"plural": {
					"first": 	"estamos",
					"second": 	"estáis",
					"third": 	"están"
				}
			},
			"preterite": {
				"singular": {
					"first":	"estuve",
					"second":	"estuviste",
					"third":	"estuvo"
				},
				"plural": {
					"first": 	"estuvimos",
					"second": 	"estuvisteis",
					"third": 	"estuvieron"
				}
			},
			"imperfect": {
				"singular": {
					"first":	"estaba",
					"second":	"estabas",
					"third":	"estaba",
				},
				"plural": {
					"first": 	"estábamos",
					"second": 	"estabais",
					"third": 	"estaban"
				}
			},
			"future": {
				"singular": {
					"first":	"estaré",
					"second":	"estarás",
					"third":	"estará"
				},
				"plural": {
					"first": 	"estaremos",
					"second": 	"estaréis",
					"third": 	"estarán"
				}
			},
			"perfect": {
				"singular": {
					"first":	"he estado",
					"second":	"has estado",
					"third":	"ha estado"
				},
				"plural": {
					"first": 	"hemos estado",
					"second": 	"habéis estado",
					"third": 	"han estado"
				}
			},
			"pluperfect": {
				"singular": {
					"first":	"había estado",
					"second":	"habías estado",
					"third":	"había estado"
				},
				"plural": {
					"first": 	"habíamos estado",
					"second": 	"habíais estado",
					"third": 	"habían estado"
				}
			},
			"future perfect": {
				"singular": {
					"first":	"habré estado",
					"second":	"habrás estado",
					"third":	"habrá estado"
				},
				"plural": {
					"first": 	"habremos estado",
					"second": 	"habréis estado",
					"third": 	"habrán estado"
				}
			},
			"preterite perfect": {
				"singular": {
					"first":	"hube estado",
					"second":	"hubiste estado",
					"third":	"hubo estado"
				},
				"plural": {
					"first": 	"hubimos estado",
					"second": 	"hubisteis estado",
					"third": 	"hubieron estado"
				}
			}
		},
		"subjunctive": {
			"present": {
				"singular": {
					"first":	"esté",
					"second":	"estés",
					"third":	"esté"
				},
				"plural": {
					"first":	"estemos",
					"second":	"estéis",
					"third":	"estén"
				}
			},
			"imperfect -ra": {
				"singular": {
					"first":	"estuviera",
					"second":	"estuvieras",
					"third":	"estuviera"
				},
				"plural": {
					"first":	"estuviéramos",
					"second":	"estuvierais",
					"third":	"estuvieran"
				}
			},
			"imperfect -se": {
				"singular": {
					"first":	"estuviese",
					"second":	"estuvieses",
					"third":	"estuviese"
				},
				"plural": {
					"first":	"estuviésemos",
					"second":	"estuvieseis",
					"third":	"estuviesen"
				}
			},
			"future": {
				"singular": {
					"first":	"estuviere",
					"second":	"estuvieres",
					"third":	"estuviere"
				},
				"plural": {
					"first":	"estuviéremos",
					"second":	"estuviereis",
					"third":	"estuvieren"
				}
			},
            "perfect": {
                "singular": {
                    "first":    "haya estado",
                    "second":   "hayas estado",
                    "third":    "haya estado"
                },
                "plural": {
                    "first":    "hayamos estado",
                    "second":   "hayáis estado",
                    "third":    "hayan estado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "hubiera estado",
                    "second":   "hubieras estado",
                    "third":    "hubiera estado"
                },
                "plural": {
                    "first":    "hubiéramos estado",
                    "second":   "hubierais estado",
                    "third":    "hubieran estado"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "hubiere estado",
                    "second":   "hubieres estado",
                    "third":    "hubiere estado"
                },
                "plural": {
                    "first":    "hubiéremos estado",
                    "second":   "hubiereis estado",
                    "third":    "hubieren estado"
                }
            }
		},
		"imperative": {
			"affirmative": {
				"singular": {
					"second": "está",
					"third": "esté"
				},
				"plural": {
					"first": "estemos",
					"second": "estad",
					"third": "estén"
				}
			},
			"negative": {
				"singular": {
					"second": "estés",
					"third": "esté"
				},
				"plural": {
					"first": "estemos",
					"second": "estéis",
					"third": "estén"
				}
			}
		},
		"conditional": {
			"present": {
				"singular": {
					"first": "estaría",
					"second": "estarías",
					"third": "estaría"
				},
				"plural": {
					"first": "estaríamos",
					"second": "estaríais",
					"third": "estarían"
				}
			},
			"future": {
				"singular": {
					"first": "estaría",
					"second": "estarías",
					"third": "estaría"
				},
				"plural": {
					"first": "estaríamos",
					"second": "estaríais",
					"third": "estarían"
				}
			},
			"perfect": {
				"singular": {
					"first": "habría estado",
					"second": "habrías estado",
					"third": "habría estado"
				},
				"plural": {
					"first": "habríamos estado",
					"second": "habríais estado",
					"third": "habrían estado"
				}
			}
		}
	},

	// IE stem change verb regular
	"acertar": {
	    "indicative": {
	        "present": {
	            "singular": {
	                "first": "acierto",
	                "second": "aciertas",
	                "third": "acierta"
	            },
	            "plural": {
	                "first": "acertamos",
	                "second": "acertáis",
	                "third": "aciertan"
	            }
	        },
	        "imperfect": {
	            "singular": {
	                "first": "acertaba",
	                "second": "acertabas",
	                "third": "acertaba"
	            },
	            "plural": {
	                "first": "acertábamos",
	                "second": "acertabais",
	                "third": "acertaban"
	            }
	        },
	        "preterite": {
	            "singular": {
	                "first": "acerté",
	                "second": "acertaste",
	                "third": "acertó"
	            },
	            "plural": {
	                "first": "acertamos",
	                "second": "acertasteis",
	                "third": "acertaron"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "acertaré",
	                "second": "acertarás",
	                "third": "acertará"
	            },
	            "plural": {
	                "first": "acertaremos",
	                "second": "acertaréis",
	                "third": "acertarán"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "he acertado",
	                "second": "has acertado",
	                "third": "ha acertado"
	            },
	            "plural": {
	                "first": "hemos acertado",
	                "second": "habéis acertado",
	                "third": "han acertado"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "había acertado",
	                "second": "habías acertado",
	                "third": "había acertado"
	            },
	            "plural": {
	                "first": "habíamos acertado",
	                "second": "habíais acertado",
	                "third": "habían acertado"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "habré acertado",
	                "second": "habrás acertado",
	                "third": "habrá acertado"
	            },
	            "plural": {
	                "first": "habremos acertado",
	                "second": "habréis acertado",
	                "third": "habrán acertado"
	            }
	        },
	        "preterite perfect": {
	            "singular": {
	                "first": "hube acertado",
	                "second": "hubiste acertado",
	                "third": "hubo acertado"
	            },
	            "plural": {
	                "first": "hubimos acertado",
	                "second": "hubisteis acertado",
	                "third": "hubieron acertado"
	            }
	        }
	    },
	    "subjunctive": {
	        "present": {
	            "singular": {
	                "first": "acierte",
	                "second": "aciertes",
	                "third": "acierte"
	            },
	            "plural": {
	                "first": "acertemos",
	                "second": "acertéis",
	                "third": "acierten"
	            }
	        },
	        "imperfect -ra": {
	            "singular": {
	                "first": "acertara",
	                "second": "acertaras",
	                "third": "acertara"
	            },
	            "plural": {
	                "first": "acertáramos",
	                "second": "acertarais",
	                "third": "acertaran"
	            }
	        },
	        "imperfect -se": {
	            "singular": {
	                "first": "acertase",
	                "second": "acertases",
	                "third": "acertase"
	            },
	            "plural": {
	                "first": "acertásemos",
	                "second": "acertaseis",
	                "third": "acertasen"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "acertare",
	                "second": "acertares",
	                "third": "acertare"
	            },
	            "plural": {
	                "first": "acertáremos",
	                "second": "acertareis",
	                "third": "acertaren"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "haya acertado",
	                "second": "hayas acertado",
	                "third": "haya acertado"
	            },
	            "plural": {
	                "first": "hayamos acertado",
	                "second": "hayáis acertado",
	                "third": "hayan acertado"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "hubiera acertado",
	                "second": "hubieras acertado",
	                "third": "hubiera acertado"
	            },
	            "plural": {
	                "first": "hubiéramos acertado",
	                "second": "hubierais acertado",
	                "third": "hubieran acertado"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "hubiere acertado",
	                "second": "hubieres acertado",
	                "third": "hubiere acertado"
	            },
	            "plural": {
	                "first": "hubiéremos acertado",
	                "second": "hubiereis acertado",
	                "third": "hubieren acertado"
	            }
	        }
	    },
	    "conditional": {
	        "present": {
	            "singular": {
	                "first": "acertaría",
	                "second": "acertarías",
	                "third": "acertaría"
	            },
	            "plural": {
	                "first": "acertaríamos",
	                "second": "acertaríais",
	                "third": "acertarían"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "habría acertado",
	                "second": "habrías acertado",
	                "third": "habría acertado"
	            },
	            "plural": {
	                "first": "habríamos acertado",
	                "second": "habríais acertado",
	                "third": "habrían acertado"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "acertaría",
	                "second": "acertarías",
	                "third": "acertaría"
	            },
	            "plural": {
	                "first": "acertaríamos",
	                "second": "acertaríais",
	                "third": "acertarían"
	            }
	        }
	    },
	    "imperative": {
	        "affirmative": {
	            "singular": {
	                "second": "acierta",
	                "third": "acierte"
	            },
	            "plural": {
	                "first": "acertemos",
	                "second": "acertad",
	                "third": "acierten"
	            }
	        },
	        "negative": {
	            "singular": {
	                "second": "aciertes",
	                "third": "acierte"
	            },
	            "plural": {
	                "first": "acertemos",
	                "second": "acertéis",
	                "third": "acierten"
	            }
	        }
	    }
	},

	// IE stem change -ir
	"conferir": {
	    "indicative": {
	        "present": {
	            "singular": {
	                "first": "confiero",
	                "second": "confieres",
	                "third": "confiere"
	            },
	            "plural": {
	                "first": "conferimos",
	                "second": "conferís",
	                "third": "confieren"
	            }
	        },
	        "imperfect": {
	            "singular": {
	                "first": "confería",
	                "second": "conferías",
	                "third": "confería"
	            },
	            "plural": {
	                "first": "conferíamos",
	                "second": "conferíais",
	                "third": "conferían"
	            }
	        },
	        "preterite": {
	            "singular": {
	                "first": "conferí",
	                "second": "conferiste",
	                "third": "confirió"
	            },
	            "plural": {
	                "first": "conferimos",
	                "second": "conferisteis",
	                "third": "confirieron"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "conferiré",
	                "second": "conferirás",
	                "third": "conferirá"
	            },
	            "plural": {
	                "first": "conferiremos",
	                "second": "conferiréis",
	                "third": "conferirán"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "he conferido",
	                "second": "has conferido",
	                "third": "ha conferido"
	            },
	            "plural": {
	                "first": "hemos conferido",
	                "second": "habéis conferido",
	                "third": "han conferido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "había conferido",
	                "second": "habías conferido",
	                "third": "había conferido"
	            },
	            "plural": {
	                "first": "habíamos conferido",
	                "second": "habíais conferido",
	                "third": "habían conferido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "habré conferido",
	                "second": "habrás conferido",
	                "third": "habrá conferido"
	            },
	            "plural": {
	                "first": "habremos conferido",
	                "second": "habréis conferido",
	                "third": "habrán conferido"
	            }
	        },
	        "preterite perfect": {
	            "singular": {
	                "first": "hube conferido",
	                "second": "hubiste conferido",
	                "third": "hubo conferido"
	            },
	            "plural": {
	                "first": "hubimos conferido",
	                "second": "hubisteis conferido",
	                "third": "hubieron conferido"
	            }
	        }
	    },
	    "subjunctive": {
	        "present": {
	            "singular": {
	                "first": "confiera",
	                "second": "confieras",
	                "third": "confiera"
	            },
	            "plural": {
	                "first": "confiramos",
	                "second": "confiráis",
	                "third": "confieran"
	            }
	        },
	        "imperfect -ra": {
	            "singular": {
	                "first": "confiriera",
	                "second": "confirieras",
	                "third": "confiriera"
	            },
	            "plural": {
	                "first": "confiriéramos",
	                "second": "confirierais",
	                "third": "confirieran"
	            }
	        },
	        "imperfect -se": {
	            "singular": {
	                "first": "confiriese",
	                "second": "confirieses",
	                "third": "confiriese"
	            },
	            "plural": {
	                "first": "confiriésemos",
	                "second": "confirieseis",
	                "third": "confiriesen"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "confiriere",
	                "second": "confirieres",
	                "third": "confiriere"
	            },
	            "plural": {
	                "first": "confiriéremos",
	                "second": "confiriereis",
	                "third": "confirieren"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "haya conferido",
	                "second": "hayas conferido",
	                "third": "haya conferido"
	            },
	            "plural": {
	                "first": "hayamos conferido",
	                "second": "hayáis conferido",
	                "third": "hayan conferido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "hubiera conferido",
	                "second": "hubieras conferido",
	                "third": "hubiera conferido"
	            },
	            "plural": {
	                "first": "hubiéramos conferido",
	                "second": "hubierais conferido",
	                "third": "hubieran conferido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "hubiere conferido",
	                "second": "hubieres conferido",
	                "third": "hubiere conferido"
	            },
	            "plural": {
	                "first": "hubiéremos conferido",
	                "second": "hubiereis conferido",
	                "third": "hubieren conferido"
	            }
	        }
	    },
	    "conditional": {
	        "present": {
	            "singular": {
	                "first": "conferiría",
	                "second": "conferirías",
	                "third": "conferiría"
	            },
	            "plural": {
	                "first": "conferiríamos",
	                "second": "conferiríais",
	                "third": "conferirían"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "habría conferido",
	                "second": "habrías conferido",
	                "third": "habría conferido"
	            },
	            "plural": {
	                "first": "habríamos conferido",
	                "second": "habríais conferido",
	                "third": "habrían conferido"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "conferiría",
	                "second": "conferirías",
	                "third": "conferiría"
	            },
	            "plural": {
	                "first": "conferiríamos",
	                "second": "conferiríais",
	                "third": "conferirían"
	            }
	        }
	    },
	    "imperative": {
	        "affirmative": {
	            "singular": {
	                "second": "confiere",
	                "third": "confiera"
	            },
	            "plural": {
	                "first": "confiramos",
	                "second": "conferid",
	                "third": "confieran"
	            }
	        },
	        "negative": {
	            "singular": {
	                "second": "confieras",
	                "third": "confiera"
	            },
	            "plural": {
	                "first": "confiramos",
	                "second": "confiráis",
	                "third": "confieran"
	            }
	        }
	    }
	},

	// IE stem change -ar
    "confesar": {
        "indicative": {
            "present": {
                "singular": {
                    "first": "confieso",
                    "second": "confiesas",
                    "third": "confiesa"
                },
                "plural": {
                    "first": "confesamos",
                    "second": "confesáis",
                    "third": "confiesan"
                }
            },
            "imperfect": {
                "singular": {
                    "first": "confesaba",
                    "second": "confesabas",
                    "third": "confesaba"
                },
                "plural": {
                    "first": "confesábamos",
                    "second": "confesabais",
                    "third": "confesaban"
                }
            },
            "preterite": {
                "singular": {
                    "first": "confesé",
                    "second": "confesaste",
                    "third": "confesó"
                },
                "plural": {
                    "first": "confesamos",
                    "second": "confesasteis",
                    "third": "confesaron"
                }
            },
            "future": {
                "singular": {
                    "first": "confesaré",
                    "second": "confesarás",
                    "third": "confesará"
                },
                "plural": {
                    "first": "confesaremos",
                    "second": "confesaréis",
                    "third": "confesarán"
                }
            },
            "perfect": {
                "singular": {
                    "first": "he confesado",
                    "second": "has confesado",
                    "third": "ha confesado"
                },
                "plural": {
                    "first": "hemos confesado",
                    "second": "habéis confesado",
                    "third": "han confesado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first": "había confesado",
                    "second": "habías confesado",
                    "third": "había confesado"
                },
                "plural": {
                    "first": "habíamos confesado",
                    "second": "habíais confesado",
                    "third": "habían confesado"
                }
            },
            "future perfect": {
                "singular": {
                    "first": "habré confesado",
                    "second": "habrás confesado",
                    "third": "habrá confesado"
                },
                "plural": {
                    "first": "habremos confesado",
                    "second": "habréis confesado",
                    "third": "habrán confesado"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first": "hube confesado",
                    "second": "hubiste confesado",
                    "third": "hubo confesado"
                },
                "plural": {
                    "first": "hubimos confesado",
                    "second": "hubisteis confesado",
                    "third": "hubieron confesado"
                }
            }
        },
        "subjunctive": {
            "present": {
                "singular": {
                    "first": "confiese",
                    "second": "confieses",
                    "third": "confiese"
                },
                "plural": {
                    "first": "confesemos",
                    "second": "confeséis",
                    "third": "confiesen"
                }
            },
            "imperfect -ra": {
                "singular": {
                    "first": "confesara",
                    "second": "confesaras",
                    "third": "confesara"
                },
                "plural": {
                    "first": "confesáramos",
                    "second": "confesarais",
                    "third": "confesaran"
                }
            },
            "imperfect -se": {
                "singular": {
                    "first": "confesase",
                    "second": "confesases",
                    "third": "confesase"
                },
                "plural": {
                    "first": "confesásemos",
                    "second": "confesaseis",
                    "third": "confesasen"
                }
            },
            "future": {
                "singular": {
                    "first": "confesare",
                    "second": "confesares",
                    "third": "confesare"
                },
                "plural": {
                    "first": "confesáremos",
                    "second": "confesareis",
                    "third": "confesaren"
                }
            },
            "perfect": {
                "singular": {
                    "first": "haya confesado",
                    "second": "hayas confesado",
                    "third": "haya confesado"
                },
                "plural": {
                    "first": "hayamos confesado",
                    "second": "hayáis confesado",
                    "third": "hayan confesado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first": "hubiera confesado",
                    "second": "hubieras confesado",
                    "third": "hubiera confesado"
                },
                "plural": {
                    "first": "hubiéramos confesado",
                    "second": "hubierais confesado",
                    "third": "hubieran confesado"
                }
            },
            "future perfect": {
                "singular": {
                    "first": "hubiere confesado",
                    "second": "hubieres confesado",
                    "third": "hubiere confesado"
                },
                "plural": {
                    "first": "hubiéremos confesado",
                    "second": "hubiereis confesado",
                    "third": "hubieren confesado"
                }
            }
        },
        "conditional": {
            "present": {
                "singular": {
                    "first": "confesaría",
                    "second": "confesarías",
                    "third": "confesaría"
                },
                "plural": {
                    "first": "confesaríamos",
                    "second": "confesaríais",
                    "third": "confesarían"
                }
            },
            "perfect": {
                "singular": {
                    "first": "habría confesado",
                    "second": "habrías confesado",
                    "third": "habría confesado"
                },
                "plural": {
                    "first": "habríamos confesado",
                    "second": "habríais confesado",
                    "third": "habrían confesado"
                }
            },
            "future": {
                "singular": {
                    "first": "confesaría",
                    "second": "confesarías",
                    "third": "confesaría"
                },
                "plural": {
                    "first": "confesaríamos",
                    "second": "confesaríais",
                    "third": "confesarían"
                }
            }
        },
        "imperative": {
            "affirmative": {
                "singular": {
                    "second": "confiesa",
                    "third": "confiese"
                },
                "plural": {
                    "first": "confesemos",
                    "second": "confesad",
                    "third": "confiesen"
                }
            },
            "negative": {
                "singular": {
                    "second": "confieses",
                    "third": "confiese"
                },
                "plural": {
                    "first": "confesemos",
                    "second": "confeséis",
                    "third": "confiesen"
                }
            }
        }
    },

    // IE stem change -er
    "encender": {
        "indicative": {
            "present": {
                "singular": {
                    "first": "enciendo",
                    "second": "enciendes",
                    "third": "enciende"
                },
                "plural": {
                    "first": "encendemos",
                    "second": "encendéis",
                    "third": "encienden"
                }
            },
            "imperfect": {
                "singular": {
                    "first": "encendía",
                    "second": "encendías",
                    "third": "encendía"
                },
                "plural": {
                    "first": "encendíamos",
                    "second": "encendíais",
                    "third": "encendían"
                }
            },
            "preterite": {
                "singular": {
                    "first": "encendí",
                    "second": "encendiste",
                    "third": "encendió"
                },
                "plural": {
                    "first": "encendimos",
                    "second": "encendisteis",
                    "third": "encendieron"
                }
            },
            "future": {
                "singular": {
                    "first": "encenderé",
                    "second": "encenderás",
                    "third": "encenderá"
                },
                "plural": {
                    "first": "encenderemos",
                    "second": "encenderéis",
                    "third": "encenderán"
                }
            },
            "perfect": {
                "singular": {
                    "first": "he encendido",
                    "second": "has encendido",
                    "third": "ha encendido"
                },
                "plural": {
                    "first": "hemos encendido",
                    "second": "habéis encendido",
                    "third": "han encendido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first": "había encendido",
                    "second": "habías encendido",
                    "third": "había encendido"
                },
                "plural": {
                    "first": "habíamos encendido",
                    "second": "habíais encendido",
                    "third": "habían encendido"
                }
            },
            "future perfect": {
                "singular": {
                    "first": "habré encendido",
                    "second": "habrás encendido",
                    "third": "habrá encendido"
                },
                "plural": {
                    "first": "habremos encendido",
                    "second": "habréis encendido",
                    "third": "habrán encendido"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first": "hube encendido",
                    "second": "hubiste encendido",
                    "third": "hubo encendido"
                },
                "plural": {
                    "first": "hubimos encendido",
                    "second": "hubisteis encendido",
                    "third": "hubieron encendido"
                }
            }
        },
        "subjunctive": {
            "present": {
                "singular": {
                    "first": "encienda",
                    "second": "enciendas",
                    "third": "encienda"
                },
                "plural": {
                    "first": "encendamos",
                    "second": "encendáis",
                    "third": "enciendan"
                }
            },
            "imperfect -ra": {
                "singular": {
                    "first": "encendiera",
                    "second": "encendieras",
                    "third": "encendiera"
                },
                "plural": {
                    "first": "encendiéramos",
                    "second": "encendierais",
                    "third": "encendieran"
                }
            },
            "imperfect -se": {
                "singular": {
                    "first": "encendiese",
                    "second": "encendieses",
                    "third": "encendiese"
                },
                "plural": {
                    "first": "encendiésemos",
                    "second": "encendieseis",
                    "third": "encendiesen"
                }
            },
            "future": {
                "singular": {
                    "first": "encendiere",
                    "second": "encendieres",
                    "third": "encendiere"
                },
                "plural": {
                    "first": "encendiéremos",
                    "second": "encendiereis",
                    "third": "encendieren"
                }
            },
            "perfect": {
                "singular": {
                    "first": "haya encendido",
                    "second": "hayas encendido",
                    "third": "haya encendido"
                },
                "plural": {
                    "first": "hayamos encendido",
                    "second": "hayáis encendido",
                    "third": "hayan encendido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first": "hubiera encendido",
                    "second": "hubieras encendido",
                    "third": "hubiera encendido"
                },
                "plural": {
                    "first": "hubiéramos encendido",
                    "second": "hubierais encendido",
                    "third": "hubieran encendido"
                }
            },
            "future perfect": {
                "singular": {
                    "first": "hubiere encendido",
                    "second": "hubieres encendido",
                    "third": "hubiere encendido"
                },
                "plural": {
                    "first": "hubiéremos encendido",
                    "second": "hubiereis encendido",
                    "third": "hubieren encendido"
                }
            }
        },
        "conditional": {
            "present": {
                "singular": {
                    "first": "encendería",
                    "second": "encenderías",
                    "third": "encendería"
                },
                "plural": {
                    "first": "encenderíamos",
                    "second": "encenderíais",
                    "third": "encenderían"
                }
            },
            "perfect": {
                "singular": {
                    "first": "habría encendido",
                    "second": "habrías encendido",
                    "third": "habría encendido"
                },
                "plural": {
                    "first": "habríamos encendido",
                    "second": "habríais encendido",
                    "third": "habrían encendido"
                }
            },
            "future": {
                "singular": {
                    "first": "encendería",
                    "second": "encenderías",
                    "third": "encendería"
                },
                "plural": {
                    "first": "encenderíamos",
                    "second": "encenderíais",
                    "third": "encenderían"
                }
            }
        },
        "imperative": {
            "affirmative": {
                "singular": {
                    "second": "enciende",
                    "third": "encienda"
                },
                "plural": {
                    "first": "encendamos",
                    "second": "encended",
                    "third": "enciendan"
                }
            },
            "negative": {
                "singular": {
                    "second": "enciendas",
                    "third": "encienda"
                },
                "plural": {
                    "first": "encendamos",
                    "second": "encendáis",
                    "third": "enciendan"
                }
            }
        }
    },

    // IE stem change -ir
    "venir": {
        "indicative": {
            "present": {
                "singular": {
                    "first":    "vengo",
                    "second":   "vienes",
                    "third":    "viene"
                },
                "plural": {
                    "first":    "venimos",
                    "second":   "venís",
                    "third":    "vienen"
                }
            },
            "preterite": {
                "singular": {
                    "first":    "vine",
                    "second":   "viniste",
                    "third":    "vino"
                },
                "plural": {
                    "first":    "vinimos",
                    "second":   "vinisteis",
                    "third":    "vinieron"
                }
            },
            "imperfect": {
                "singular": {
                    "first":    "venía",
                    "second":   "venías",
                    "third":    "venía",
                },
                "plural": {
                    "first":    "veníamos",
                    "second":   "veníais",
                    "third":    "venían"
                }
            },
            "future": {
                "singular": {
                    "first":    "vendré",
                    "second":   "vendrás",
                    "third":    "vendrá"
                },
                "plural": {
                    "first":    "vendremos",
                    "second":   "vendréis",
                    "third":    "vendrán"
                }
            },
            "perfect": {
                "singular": {
                    "first":    "he venido",
                    "second":   "has venido",
                    "third":    "ha venido"
                },
                "plural": {
                    "first":    "hemos venido",
                    "second":   "habéis venido",
                    "third":    "han venido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "había venido",
                    "second":   "habías venido",
                    "third":    "había venido"
                },
                "plural": {
                    "first":    "habíamos venido",
                    "second":   "habíais venido",
                    "third":    "habían venido"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "habré venido",
                    "second":   "habrás venido",
                    "third":    "habrá venido"
                },
                "plural": {
                    "first":    "habremos venido",
                    "second":   "habréis venido",
                    "third":    "habrán venido"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first":    "hube venido",
                    "second":   "hubiste venido",
                    "third":    "hubo venido"
                },
                "plural": {
                    "first":    "hubimos venido",
                    "second":   "hubisteis venido",
                    "third":    "hubieron venido"
                }
            }
        },
        "subjunctive": {
            "present": {
                "singular": {
                    "first":    "venga",
                    "second":   "vengas",
                    "third":    "venga"
                },
                "plural": {
                    "first":    "vengamos",
                    "second":   "vengáis",
                    "third":    "vengan"
                }
            },
            "imperfect -ra": {
                "singular": {
                    "first":    "viniera",
                    "second":   "vinieras",
                    "third":    "viniera"
                },
                "plural": {
                    "first":    "viniéramos",
                    "second":   "vinierais",
                    "third":    "vinieran"
                }
            },
            "imperfect -se": {
                "singular": {
                    "first":    "viniese",
                    "second":   "vinieses",
                    "third":    "viniese"
                },
                "plural": {
                    "first":    "viniésemos",
                    "second":   "vinieseis",
                    "third":    "viniesen"
                }
            },
            "future": {
                "singular": {
                    "first":    "viniere",
                    "second":   "vinieres",
                    "third":    "viniere"
                },
                "plural": {
                    "first":    "viniéremos",
                    "second":   "viniereis",
                    "third":    "vinieren"
                }
            },
            "perfect": {
                "singular": {
                    "first":    "haya venido",
                    "second":   "hayas venido",
                    "third":    "haya venido"
                },
                "plural": {
                    "first":    "hayamos venido",
                    "second":   "hayáis venido",
                    "third":    "hayan venido"
                }
            },
            "pluperfect": {
                "singular": {
                    "first":    "hubiera venido",
                    "second":   "hubieras venido",
                    "third":    "hubiera venido"
                },
                "plural": {
                    "first":    "hubiéramos venido",
                    "second":   "hubierais venido",
                    "third":    "hubieran venido"
                }
            },
            "future perfect": {
                "singular": {
                    "first":    "hubiere venido",
                    "second":   "hubieres venido",
                    "third":    "hubiere venido"
                },
                "plural": {
                    "first":    "hubiéremos venido",
                    "second":   "hubiereis venido",
                    "third":    "hubieren venido"
                }
            }
        },
        "imperative": {
            "affirmative": {
                "singular": {
                    "second": "ven",
                    "third": "venga"
                },
                "plural": {
                    "first": "vengamos",
                    "second": "venid",
                    "third": "vengan"
                }
            },
            "negative": {
                "singular": {
                    "second": "vengas",
                    "third": "venga"
                },
                "plural": {
                    "first": "vengamos",
                    "second": "vengáis",
                    "third": "vengan"
                }
            }
        },
        "conditional": {
            "present": {
                "singular": {
                    "first": "vendría",
                    "second": "vendrías",
                    "third": "vendría"
                },
                "plural": {
                    "first": "vendríamos",
                    "second": "vendríais",
                    "third": "vendrían"
                }
            },
            "future": {
                "singular": {
                    "first": "vendriría",
                    "second": "vendrirías",
                    "third": "vendriría"
                },
                "plural": {
                    "first": "vendriríamos",
                    "second": "vendriríais",
                    "third": "vendrirían"
                }
            },
            "perfect": {
                "singular": {
                    "first": "habría venido",
                    "second": "habrías venido",
                    "third": "habría venido"
                },
                "plural": {
                    "first": "habríamos venido",
                    "second": "habríais venido",
                    "third": "habrían venido"
                }
            }
        }
    },


    // IAR stem change i-í
    "chirriar": {
        "indicative": {
            "present": {
                "singular": {
                    "first": "chirrío",
                    "second": "chirrías",
                    "third": "chirría"
                },
                "plural": {
                    "first": "chirriamos",
                    "second": "chirriáis",
                    "third": "chirrían"
                }
            },
            "imperfect": {
                "singular": {
                    "first": "chirriaba",
                    "second": "chirriabas",
                    "third": "chirriaba"
                },
                "plural": {
                    "first": "chirriábamos",
                    "second": "chirriabais",
                    "third": "chirriaban"
                }
            },
            "preterite": {
                "singular": {
                    "first": "chirrié",
                    "second": "chirriaste",
                    "third": "chirrió"
                },
                "plural": {
                    "first": "chirriamos",
                    "second": "chirriasteis",
                    "third": "chirriaron"
                }
            },
            "future": {
                "singular": {
                    "first": "chirriaré",
                    "second": "chirriarás",
                    "third": "chirriará"
                },
                "plural": {
                    "first": "chirriaremos",
                    "second": "chirriaréis",
                    "third": "chirriarán"
                }
            },
            "perfect": {
                "singular": {
                    "first": "he chirriado",
                    "second": "has chirriado",
                    "third": "ha chirriado"
                },
                "plural": {
                    "first": "hemos chirriado",
                    "second": "habéis chirriado",
                    "third": "han chirriado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first": "había chirriado",
                    "second": "habías chirriado",
                    "third": "había chirriado"
                },
                "plural": {
                    "first": "habíamos chirriado",
                    "second": "habíais chirriado",
                    "third": "habían chirriado"
                }
            },
            "future perfect": {
                "singular": {
                    "first": "habré chirriado",
                    "second": "habrás chirriado",
                    "third": "habrá chirriado"
                },
                "plural": {
                    "first": "habremos chirriado",
                    "second": "habréis chirriado",
                    "third": "habrán chirriado"
                }
            },
            "preterite perfect": {
                "singular": {
                    "first": "hube chirriado",
                    "second": "hubiste chirriado",
                    "third": "hubo chirriado"
                },
                "plural": {
                    "first": "hubimos chirriado",
                    "second": "hubisteis chirriado",
                    "third": "hubieron chirriado"
                }
            }
        },
        "subjunctive": {
            "present": {
                "singular": {
                    "first": "chirríe",
                    "second": "chirríes",
                    "third": "chirríe"
                },
                "plural": {
                    "first": "chirriemos",
                    "second": "chirriéis",
                    "third": "chirríen"
                }
            },
            "imperfect -ra": {
                "singular": {
                    "first": "chirriara",
                    "second": "chirriaras",
                    "third": "chirriara"
                },
                "plural": {
                    "first": "chirriáramos",
                    "second": "chirriarais",
                    "third": "chirriaran"
                }
            },
            "imperfect -se": {
                "singular": {
                    "first": "chirriase",
                    "second": "chirriases",
                    "third": "chirriase"
                },
                "plural": {
                    "first": "chirriásemos",
                    "second": "chirriaseis",
                    "third": "chirriasen"
                }
            },
            "future": {
                "singular": {
                    "first": "chirriare",
                    "second": "chirriares",
                    "third": "chirriare"
                },
                "plural": {
                    "first": "chirriáremos",
                    "second": "chirriareis",
                    "third": "chirriaren"
                }
            },
            "perfect": {
                "singular": {
                    "first": "haya chirriado",
                    "second": "hayas chirriado",
                    "third": "haya chirriado"
                },
                "plural": {
                    "first": "hayamos chirriado",
                    "second": "hayáis chirriado",
                    "third": "hayan chirriado"
                }
            },
            "pluperfect": {
                "singular": {
                    "first": "hubiera chirriado",
                    "second": "hubieras chirriado",
                    "third": "hubiera chirriado"
                },
                "plural": {
                    "first": "hubiéramos chirriado",
                    "second": "hubierais chirriado",
                    "third": "hubieran chirriado"
                }
            },
            "future perfect": {
                "singular": {
                    "first": "hubiere chirriado",
                    "second": "hubieres chirriado",
                    "third": "hubiere chirriado"
                },
                "plural": {
                    "first": "hubiéremos chirriado",
                    "second": "hubiereis chirriado",
                    "third": "hubieren chirriado"
                }
            }
        },
        "conditional": {
            "present": {
                "singular": {
                    "first": "chirriaría",
                    "second": "chirriarías",
                    "third": "chirriaría"
                },
                "plural": {
                    "first": "chirriaríamos",
                    "second": "chirriaríais",
                    "third": "chirriarían"
                }
            },
            "perfect": {
                "singular": {
                    "first": "habría chirriado",
                    "second": "habrías chirriado",
                    "third": "habría chirriado"
                },
                "plural": {
                    "first": "habríamos chirriado",
                    "second": "habríais chirriado",
                    "third": "habrían chirriado"
                }
            },
            "future": {
                "singular": {
                    "first": "chirriaría",
                    "second": "chirriarías",
                    "third": "chirriaría"
                },
                "plural": {
                    "first": "chirriaríamos",
                    "second": "chirriaríais",
                    "third": "chirriarían"
                }
            }
        },
        "imperative": {
            "affirmative": {
                "singular": {
                    "second": "chirría",
                    "third": "chirríe"
                },
                "plural": {
                    "first": "chirriemos",
                    "second": "chirriad",
                    "third": "chirríen"
                }
            },
            "negative": {
                "singular": {
                    "second": "chirríes",
                    "third": "chirríe"
                },
                "plural": {
                    "first": "chirriemos",
                    "second": "chirriéis",
                    "third": "chirríen"
                }
            }
        }
    },

	// IE verb with -go
	"contener": {
	    "indicative": {
	        "present": {
	            "singular": {
	                "first": "contengo",
	                "second": "contienes",
	                "third": "contiene"
	            },
	            "plural": {
	                "first": "contenemos",
	                "second": "contenéis",
	                "third": "contienen"
	            }
	        },
	        "imperfect": {
	            "singular": {
	                "first": "contenía",
	                "second": "contenías",
	                "third": "contenía"
	            },
	            "plural": {
	                "first": "conteníamos",
	                "second": "conteníais",
	                "third": "contenían"
	            }
	        },
	        "preterite": {
	            "singular": {
	                "first": "contuve",
	                "second": "contuviste",
	                "third": "contuvo"
	            },
	            "plural": {
	                "first": "contuvimos",
	                "second": "contuvisteis",
	                "third": "contuvieron"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "contendré",
	                "second": "contendrás",
	                "third": "contendrá"
	            },
	            "plural": {
	                "first": "contendremos",
	                "second": "contendréis",
	                "third": "contendrán"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "he contenido",
	                "second": "has contenido",
	                "third": "ha contenido"
	            },
	            "plural": {
	                "first": "hemos contenido",
	                "second": "habéis contenido",
	                "third": "han contenido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "había contenido",
	                "second": "habías contenido",
	                "third": "había contenido"
	            },
	            "plural": {
	                "first": "habíamos contenido",
	                "second": "habíais contenido",
	                "third": "habían contenido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "habré contenido",
	                "second": "habrás contenido",
	                "third": "habrá contenido"
	            },
	            "plural": {
	                "first": "habremos contenido",
	                "second": "habréis contenido",
	                "third": "habrán contenido"
	            }
	        },
	        "preterite perfect": {
	            "singular": {
	                "first": "hube contenido",
	                "second": "hubiste contenido",
	                "third": "hubo contenido"
	            },
	            "plural": {
	                "first": "hubimos contenido",
	                "second": "hubisteis contenido",
	                "third": "hubieron contenido"
	            }
	        }
	    },
	    "subjunctive": {
	        "present": {
	            "singular": {
	                "first": "contenga",
	                "second": "contengas",
	                "third": "contenga"
	            },
	            "plural": {
	                "first": "contengamos",
	                "second": "contengáis",
	                "third": "contengan"
	            }
	        },
	        "imperfect -ra": {
	            "singular": {
	                "first": "contuviera",
	                "second": "contuvieras",
	                "third": "contuviera"
	            },
	            "plural": {
	                "first": "contuviéramos",
	                "second": "contuvierais",
	                "third": "contuvieran"
	            }
	        },
	        "imperfect -se": {
	            "singular": {
	                "first": "contuviese",
	                "second": "contuvieses",
	                "third": "contuviese"
	            },
	            "plural": {
	                "first": "contuviésemos",
	                "second": "contuvieseis",
	                "third": "contuviesen"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "contuviere",
	                "second": "contuvieres",
	                "third": "contuviere"
	            },
	            "plural": {
	                "first": "contuviéremos",
	                "second": "contuviereis",
	                "third": "contuvieren"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "haya contenido",
	                "second": "hayas contenido",
	                "third": "haya contenido"
	            },
	            "plural": {
	                "first": "hayamos contenido",
	                "second": "hayáis contenido",
	                "third": "hayan contenido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "hubiera contenido",
	                "second": "hubieras contenido",
	                "third": "hubiera contenido"
	            },
	            "plural": {
	                "first": "hubiéramos contenido",
	                "second": "hubierais contenido",
	                "third": "hubieran contenido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "hubiere contenido",
	                "second": "hubieres contenido",
	                "third": "hubiere contenido"
	            },
	            "plural": {
	                "first": "hubiéremos contenido",
	                "second": "hubiereis contenido",
	                "third": "hubieren contenido"
	            }
	        }
	    },
	    "conditional": {
	        "present": {
	            "singular": {
	                "first": "contendría",
	                "second": "contendrías",
	                "third": "contendría"
	            },
	            "plural": {
	                "first": "contendríamos",
	                "second": "contendríais",
	                "third": "contendrían"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "habría contenido",
	                "second": "habrías contenido",
	                "third": "habría contenido"
	            },
	            "plural": {
	                "first": "habríamos contenido",
	                "second": "habríais contenido",
	                "third": "habrían contenido"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "contendría",
	                "second": "contendrías",
	                "third": "contendría"
	            },
	            "plural": {
	                "first": "contendríamos",
	                "second": "contendríais",
	                "third": "contendrían"
	            }
	        }
	    },
	    "imperative": {
	        "affirmative": {
	            "singular": {
	                "second": "contén",
	                "third": "contenga"
	            },
	            "plural": {
	                "first": "contengamos",
	                "second": "contened",
	                "third": "contengan"
	            }
	        },
	        "negative": {
	            "singular": {
	                "second": "contengas",
	                "third": "contenga"
	            },
	            "plural": {
	                "first": "contengamos",
	                "second": "contengáis",
	                "third": "contengan"
	            }
	        }
	    }
	},

	// EIE verb with -jo
	"corregir": {
	    "indicative": {
	        "present": {
	            "singular": {
	                "first": "corrijo",
	                "second": "corriges",
	                "third": "corrige"
	            },
	            "plural": {
	                "first": "corregimos",
	                "second": "corregís",
	                "third": "corrigen"
	            }
	        },
	        "imperfect": {
	            "singular": {
	                "first": "corregía",
	                "second": "corregías",
	                "third": "corregía"
	            },
	            "plural": {
	                "first": "corregíamos",
	                "second": "corregíais",
	                "third": "corregían"
	            }
	        },
	        "preterite": {
	            "singular": {
	                "first": "corregí",
	                "second": "corregiste",
	                "third": "corrigió"
	            },
	            "plural": {
	                "first": "corregimos",
	                "second": "corregisteis",
	                "third": "corrigieron"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "corregiré",
	                "second": "corregirás",
	                "third": "corregirá"
	            },
	            "plural": {
	                "first": "corregiremos",
	                "second": "corregiréis",
	                "third": "corregirán"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "he corregido",
	                "second": "has corregido",
	                "third": "ha corregido"
	            },
	            "plural": {
	                "first": "hemos corregido",
	                "second": "habéis corregido",
	                "third": "han corregido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "había corregido",
	                "second": "habías corregido",
	                "third": "había corregido"
	            },
	            "plural": {
	                "first": "habíamos corregido",
	                "second": "habíais corregido",
	                "third": "habían corregido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "habré corregido",
	                "second": "habrás corregido",
	                "third": "habrá corregido"
	            },
	            "plural": {
	                "first": "habremos corregido",
	                "second": "habréis corregido",
	                "third": "habrán corregido"
	            }
	        },
	        "preterite perfect": {
	            "singular": {
	                "first": "hube corregido",
	                "second": "hubiste corregido",
	                "third": "hubo corregido"
	            },
	            "plural": {
	                "first": "hubimos corregido",
	                "second": "hubisteis corregido",
	                "third": "hubieron corregido"
	            }
	        }
	    },
	    "subjunctive": {
	        "present": {
	            "singular": {
	                "first": "corrija",
	                "second": "corrijas",
	                "third": "corrija"
	            },
	            "plural": {
	                "first": "corrijamos",
	                "second": "corrijáis",
	                "third": "corrijan"
	            }
	        },
	        "imperfect -ra": {
	            "singular": {
	                "first": "corrigiera",
	                "second": "corrigieras",
	                "third": "corrigiera"
	            },
	            "plural": {
	                "first": "corrigiéramos",
	                "second": "corrigierais",
	                "third": "corrigieran"
	            }
	        },
	        "imperfect -se": {
	            "singular": {
	                "first": "corrigiese",
	                "second": "corrigieses",
	                "third": "corrigiese"
	            },
	            "plural": {
	                "first": "corrigiésemos",
	                "second": "corrigieseis",
	                "third": "corrigiesen"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "corrigiere",
	                "second": "corrigieres",
	                "third": "corrigiere"
	            },
	            "plural": {
	                "first": "corrigiéremos",
	                "second": "corrigiereis",
	                "third": "corrigieren"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "haya corregido",
	                "second": "hayas corregido",
	                "third": "haya corregido"
	            },
	            "plural": {
	                "first": "hayamos corregido",
	                "second": "hayáis corregido",
	                "third": "hayan corregido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "hubiera corregido",
	                "second": "hubieras corregido",
	                "third": "hubiera corregido"
	            },
	            "plural": {
	                "first": "hubiéramos corregido",
	                "second": "hubierais corregido",
	                "third": "hubieran corregido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "hubiere corregido",
	                "second": "hubieres corregido",
	                "third": "hubiere corregido"
	            },
	            "plural": {
	                "first": "hubiéremos corregido",
	                "second": "hubiereis corregido",
	                "third": "hubieren corregido"
	            }
	        }
	    },
	    "conditional": {
	        "present": {
	            "singular": {
	                "first": "corregiría",
	                "second": "corregirías",
	                "third": "corregiría"
	            },
	            "plural": {
	                "first": "corregiríamos",
	                "second": "corregiríais",
	                "third": "corregirían"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "habría corregido",
	                "second": "habrías corregido",
	                "third": "habría corregido"
	            },
	            "plural": {
	                "first": "habríamos corregido",
	                "second": "habríais corregido",
	                "third": "habrían corregido"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "corregiría",
	                "second": "corregirías",
	                "third": "corregiría"
	            },
	            "plural": {
	                "first": "corregiríamos",
	                "second": "corregiríais",
	                "third": "corregirían"
	            }
	        }
	    },
	    "imperative": {
	        "affirmative": {
	            "singular": {
	                "second": "corrige",
	                "third": "corrija"
	            },
	            "plural": {
	                "first": "corrijamos",
	                "second": "corregid",
	                "third": "corrijan"
	            }
	        },
	        "negative": {
	            "singular": {
	                "second": "corrijas",
	                "third": "corrija"
	            },
	            "plural": {
	                "first": "corrijamos",
	                "second": "corrijáis",
	                "third": "corrijan"
	            }
	        }
	    }
	},

	// O-UE verb
	"oler": {
	    "indicative": {
	        "present": {
	            "singular": {
	                "first": "huelo",
	                "second": "hueles",
	                "third": "huele"
	            },
	            "plural": {
	                "first": "olemos",
	                "second": "oléis",
	                "third": "huelen"
	            }
	        },
	        "imperfect": {
	            "singular": {
	                "first": "olía",
	                "second": "olías",
	                "third": "olía"
	            },
	            "plural": {
	                "first": "olíamos",
	                "second": "olíais",
	                "third": "olían"
	            }
	        },
	        "preterite": {
	            "singular": {
	                "first": "olí",
	                "second": "oliste",
	                "third": "olió"
	            },
	            "plural": {
	                "first": "olimos",
	                "second": "olisteis",
	                "third": "olieron"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "oleré",
	                "second": "olerás",
	                "third": "olerá"
	            },
	            "plural": {
	                "first": "oleremos",
	                "second": "oleréis",
	                "third": "olerán"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "he olido",
	                "second": "has olido",
	                "third": "ha olido"
	            },
	            "plural": {
	                "first": "hemos olido",
	                "second": "habéis olido",
	                "third": "han olido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "había olido",
	                "second": "habías olido",
	                "third": "había olido"
	            },
	            "plural": {
	                "first": "habíamos olido",
	                "second": "habíais olido",
	                "third": "habían olido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "habré olido",
	                "second": "habrás olido",
	                "third": "habrá olido"
	            },
	            "plural": {
	                "first": "habremos olido",
	                "second": "habréis olido",
	                "third": "habrán olido"
	            }
	        },
	        "preterite perfect": {
	            "singular": {
	                "first": "hube olido",
	                "second": "hubiste olido",
	                "third": "hubo olido"
	            },
	            "plural": {
	                "first": "hubimos olido",
	                "second": "hubisteis olido",
	                "third": "hubieron olido"
	            }
	        }
	    },
	    "subjunctive": {
	        "present": {
	            "singular": {
	                "first": "huela",
	                "second": "huelas",
	                "third": "huela"
	            },
	            "plural": {
	                "first": "olamos",
	                "second": "oláis",
	                "third": "huelan"
	            }
	        },
	        "imperfect -ra": {
	            "singular": {
	                "first": "oliera",
	                "second": "olieras",
	                "third": "oliera"
	            },
	            "plural": {
	                "first": "oliéramos",
	                "second": "olierais",
	                "third": "olieran"
	            }
	        },
	        "imperfect -se": {
	            "singular": {
	                "first": "oliese",
	                "second": "olieses",
	                "third": "oliese"
	            },
	            "plural": {
	                "first": "oliésemos",
	                "second": "olieseis",
	                "third": "oliesen"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "oliere",
	                "second": "olieres",
	                "third": "oliere"
	            },
	            "plural": {
	                "first": "oliéremos",
	                "second": "oliereis",
	                "third": "olieren"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "haya olido",
	                "second": "hayas olido",
	                "third": "haya olido"
	            },
	            "plural": {
	                "first": "hayamos olido",
	                "second": "hayáis olido",
	                "third": "hayan olido"
	            }
	        },
	        "pluperfect": {
	            "singular": {
	                "first": "hubiera olido",
	                "second": "hubieras olido",
	                "third": "hubiera olido"
	            },
	            "plural": {
	                "first": "hubiéramos olido",
	                "second": "hubierais olido",
	                "third": "hubieran olido"
	            }
	        },
	        "future perfect": {
	            "singular": {
	                "first": "hubiere olido",
	                "second": "hubieres olido",
	                "third": "hubiere olido"
	            },
	            "plural": {
	                "first": "hubiéremos olido",
	                "second": "hubiereis olido",
	                "third": "hubieren olido"
	            }
	        }
	    },
	    "conditional": {
	        "present": {
	            "singular": {
	                "first": "huelería",
	                "second": "huelerías",
	                "third": "huelería"
	            },
	            "plural": {
	                "first": "oleríamos",
	                "second": "oleríais",
	                "third": "huelerían"
	            }
	        },
	        "perfect": {
	            "singular": {
	                "first": "habría olido",
	                "second": "habrías olido",
	                "third": "habría olido"
	            },
	            "plural": {
	                "first": "habríamos olido",
	                "second": "habríais olido",
	                "third": "habrían olido"
	            }
	        },
	        "future": {
	            "singular": {
	                "first": "olería",
	                "second": "olerías",
	                "third": "olería"
	            },
	            "plural": {
	                "first": "oleríamos",
	                "second": "oleríais",
	                "third": "olerían"
	            }
	        }
	    },
	    "imperative": {
	        "affirmative": {
	            "singular": {
	                "second": "huele",
	                "third": "huela"
	            },
	            "plural": {
	                "first": "olamos",
	                "second": "oled",
	                "third": "huelan"
	            }
	        },
	        "negative": {
	            "singular": {
	                "second": "huelas",
	                "third": "huela"
	            },
	            "plural": {
	                "first": "olamos",
	                "second": "oláis",
	                "third": "huelan"
	            }
	        }
	    }
	}
};

function deepCompare(left, right) {
    if (!left || !right) {
        if (!left && !right) {
            return true;
        }

        console.log("left is " + JSON.stringify(left) + " and right is " + JSON.stringify(right));
        return false;
    }


    for (var p in left) {
        if (left.hasOwnProperty(p)) {
            if (typeof(left[p]) === "object") {
                if (!deepCompare(left[p], right[p])) {
                    console.log("property " + p);
                    return false;
                }
            } else {
                if (left[p] !== right[p]) {
                    console.log("property " + p + " left is " + left[p] + " and right is " + right[p]);
                    return false;
                }
            }
        }
    }

    for (var p in right) {
        if (right.hasOwnProperty(p)) {
            if (typeof(right[p]) === "object") {
                if (!deepCompare(left[p], right[p])) {
                    console.log("property " + p);
                    return false;
                }
            } else {
                if (left[p] !== right[p]) {
                    console.log("property " + p + " left is " + left[p] + " and right is " + right[p]);
                    return false;
                }
            }
        }
    }

    return true;
}

describe('inflect', () => {
    describe('regular verbs', () => {
        Object.keys(tests).forEach((verb) => {
            const expected = tests[verb];

            Object.keys(expected).forEach((mood) => {
                Object.keys(expected[mood]).forEach((tense) => {
                    Object.keys(expected[mood][tense]).forEach((number) => {
                        Object.keys(expected[mood][tense][number]).forEach((person) => {
                            const options = {
                                person: person,
                                number: number,
                                mood: mood
                            };

                            if (mood === "imperative") {
                                options.positivity = tense;
                            } else {
                                options.tense = tense;
                            }

                            test(`${verb} ${mood} ${tense} ${number} ${person}`, () => {
                                expect(inflect(verb, options)).toBe(expected[mood][tense][number][person]);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('irregular past participles', () => {
        Object.keys(irregularPastParticiples).forEach((verb) => {
            const expected = irregularPastParticiples[verb];

            Object.keys(expected).forEach((mood) => {
                Object.keys(expected[mood]).forEach((tense) => {
                    Object.keys(expected[mood][tense]).forEach((number) => {
                        Object.keys(expected[mood][tense][number]).forEach((person) => {
                            const options = {
                                person: person,
                                number: number,
                                mood: mood
                            };

                            if (mood === "imperative") {
                                options.positivity = tense;
                            } else {
                                options.tense = tense;
                            }

                            test(`${verb} ${mood} ${tense} ${number} ${person}`, () => {
                                expect(inflect(verb, options)).toBe(expected[mood][tense][number][person]);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('irregular verbs', () => {
        Object.keys(irregularVerbs).forEach((verb) => {
            const expected = irregularVerbs[verb];

            Object.keys(expected).forEach((mood) => {
                Object.keys(expected[mood]).forEach((tense) => {
                    Object.keys(expected[mood][tense]).forEach((number) => {
                        Object.keys(expected[mood][tense][number]).forEach((person) => {
                            const options = {
                                person: person,
                                number: number,
                                mood: mood
                            };

                            if (mood === "imperative") {
                                options.positivity = tense;
                            } else {
                                options.tense = tense;
                            }

                            test(`${verb} ${mood} ${tense} ${number} ${person}`, () => {
                                expect(inflect(verb, options)).toBe(expected[mood][tense][number][person]);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('subjunctive imperative yo irregulars', () => {
        test('decir subjunctive present first plural', () => {
            expect(inflect("decir", {mood: "subjunctive", tense: "present", person: "first", number: "plural"})).toBe("digamos");
        });

        test('decir subjunctive present second plural', () => {
            expect(inflect("decir", {mood: "subjunctive", tense: "present", person: "second", number: "plural"})).toBe("digáis");
        });

        test('decir imperative affirmative third singular', () => {
            expect(inflect("decir", {mood: "imperative", positivity: "affirmative", person: "third", number: "singular"})).toBe("diga");
        });

        test('decir imperative negative second singular', () => {
            expect(inflect("decir", {mood: "imperative", positivity: "negative", person: "second", number: "singular"})).toBe("digas");
        });

        test('corregir subjunctive present first plural', () => {
            expect(inflect("corregir", {mood: "subjunctive", tense: "present", person: "first", number: "plural"})).toBe("corrijamos");
        });

        test('corregir subjunctive present second plural', () => {
            expect(inflect("corregir", {mood: "subjunctive", tense: "present", person: "second", number: "plural"})).toBe("corrijáis");
        });

        test('corregir imperative affirmative third singular', () => {
            expect(inflect("corregir", {mood: "imperative", positivity: "affirmative", person: "third", number: "singular"})).toBe("corrija");
        });

        test('corregir imperative negative second singular', () => {
            expect(inflect("corregir", {mood: "imperative", positivity: "negative", person: "second", number: "singular"})).toBe("corrijas");
        });
    });

    describe('formality affects endings', () => {
        test('hablar formal second singular castillano', () => {
            expect(inflect("hablar", {
                person: "second",
                number: "singular",
                mood: "indicative",
                tense: "present",
                formality: "formal",
                style: "castillano"
            })).toBe("habla");
        });

        test('hablar formal second plural castillano', () => {
            expect(inflect("hablar", {
                person: "second",
                number: "plural",
                mood: "indicative",
                tense: "present",
                formality: "formal",
                style: "castillano"
            })).toBe("hablan");
        });

        test('hablar informal second singular castillano', () => {
            expect(inflect("hablar", {
                person: "second",
                number: "singular",
                mood: "indicative",
                tense: "present",
                formality: "informal",
                style: "castillano"
            })).toBe("hablas");
        });

        test('hablar informal second plural castillano', () => {
            expect(inflect("hablar", {
                person: "second",
                number: "plural",
                mood: "indicative",
                tense: "present",
                formality: "informal",
                style: "castillano"
            })).toBe("habláis");
        });

        test('hablar formal second singular caribeno', () => {
            expect(inflect("hablar", {
                person: "second",
                number: "singular",
                mood: "indicative",
                tense: "present",
                formality: "formal",
                style: "caribeno"
            })).toBe("hablas");
        });
    });
});

describe('conjugateVerb', () => {
    describe('regular verbs', () => {
        Object.keys(tests).forEach((verb) => {
            test(`conjugates ${verb} correctly`, () => {
                const expected = tests[verb];
                const actual = conjugateVerb(verb, {verbOnly: true});
                expect(deepCompare(actual, expected)).toBeTruthy();
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('irregular verbs', () => {
        Object.keys(irregularVerbs).forEach((verb) => {
            test(`conjugates ${verb} correctly`, () => {
                const expected = irregularVerbs[verb];
                const actual = conjugateVerb(verb, {verbOnly: true});
                expect(deepCompare(actual, expected)).toBeTruthy();
                expect(actual).toEqual(expected);
            });
        });
    });
});
