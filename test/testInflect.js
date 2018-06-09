/*
 * testInflect.js - nodeunit test for the Spanish verb inflection generator function.
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

if (!inflect) {
    var inflect = require("../lib/inflect.js");
    var conjugateVerb = require("../lib/conjugateVerb.js");
}

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
	
	// IE stem change 
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

module.exports = {
    testInflectRegular: function(test) {
    	Object.keys(tests).forEach(function(verb) {
    		var expected = tests[verb];

    		Object.keys(expected).forEach(function(mood) {
    			Object.keys(expected[mood]).forEach(function(tense) {
    				Object.keys(expected[mood][tense]).forEach(function(number) {
    					Object.keys(expected[mood][tense][number]).forEach(function(person) {
    						var options = {
								person: person,
								number: number,
								mood: mood
    						};

    						if (mood === "imperative") {
    							options.positivity = tense;
    						} else {
    							options.tense = tense;
    						}

    						test.equal(expected[mood][tense][number][person], inflect(verb, options), JSON.stringify(options));
    					});
    				});
    			});
    		});
    	});
        
        test.done();
    },
    
    testInflectIrregularPastParticples: function(test) {

    	Object.keys(irregularPastParticiples).forEach(function(verb) {
    		var expected = irregularPastParticiples[verb];

    		Object.keys(expected).forEach(function(mood) {
    			Object.keys(expected[mood]).forEach(function(tense) {
    				Object.keys(expected[mood][tense]).forEach(function(number) {
    					Object.keys(expected[mood][tense][number]).forEach(function(person) {
    						var options = {
								person: person,
								number: number,
								mood: mood
    						};

    						if (mood === "imperative") {
    							options.positivity = tense;
    						} else {
    							options.tense = tense;
    						}

    						test.equal(expected[mood][tense][number][person], inflect(verb, options), JSON.stringify(options));
    					});
    				});
    			});
    		});
    	});
        
        test.done();
    },
    
    testInflectIrregularVerbs: function(test) {

    	Object.keys(irregularVerbs).forEach(function(verb) {
    		var expected = irregularVerbs[verb];

    		Object.keys(expected).forEach(function(mood) {
    			Object.keys(expected[mood]).forEach(function(tense) {
    				Object.keys(expected[mood][tense]).forEach(function(number) {
    					Object.keys(expected[mood][tense][number]).forEach(function(person) {
    						var options = {
								person: person,
								number: number,
								mood: mood
    						};

    						if (mood === "imperative") {
    							options.positivity = tense;
    						} else {
    							options.tense = tense;
    						}

    						test.equal(expected[mood][tense][number][person], inflect(verb, options), JSON.stringify(options));
    					});
    				});
    			});
    		});
    	});
        
        test.done();
    },
    
    testConjugateRegularVerbs: function(test) {

        Object.keys(tests).forEach(function(verb) {
            var expected = tests[verb];

            var actual = conjugateVerb(verb, {verbOnly: true});
            test.ok(deepCompare(actual, expected));
            test.deepEqual(actual, expected);
        });
        
        test.done();
    },

    testConjugateIrregularVerbs: function(test) {

        Object.keys(irregularVerbs).forEach(function(verb) {
            var expected = irregularVerbs[verb];

            var actual = conjugateVerb(verb, {verbOnly: true});
            test.ok(deepCompare(actual, expected));
            test.deepEqual(actual, expected);
        });
        
        test.done();
    }

};
