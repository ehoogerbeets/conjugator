/**
 * End-to-end tests for the conjugator CLI
 * 
 * These tests verify:
 * - The CLI executable works correctly
 * - Various command-line argument combinations
 * - Output formats (JSON and list)
 * - Package installation and exports work correctly
 */

const { execSync } = require('child_process');
const path = require('path');

// Path to the CLI executable - use the installed version from node_modules
const CLI_PATH = path.join(__dirname, 'node_modules', '.bin', 'conjugator');

/**
 * Helper to run the CLI with given arguments
 * @param {string} args - Command line arguments
 * @returns {string} - stdout output
 */
function runCLI(args = '') {
    try {
        const result = execSync(`node "${CLI_PATH}" ${args}`, {
            encoding: 'utf-8',
            cwd: __dirname,
            timeout: 30000
        });
        return result;
    } catch (error) {
        // If the command fails, return the error output
        return error.stdout || error.stderr || error.message;
    }
}

/**
 * Helper to parse JSON output from CLI
 * @param {string} output - CLI output
 * @returns {object} - Parsed JSON
 */
function parseJSON(output) {
    return JSON.parse(output);
}

describe('CLI Basic Functionality', () => {
    describe('JSON output format', () => {
        test('conjugates a regular -ar verb (hablar)', () => {
            const output = runCLI('hablar');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('conjugates a regular -er verb (comer)', () => {
            const output = runCLI('comer');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('conjugates a regular -ir verb (vivir)', () => {
            const output = runCLI('vivir');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('conjugates an irregular verb (ir)', () => {
            const output = runCLI('ir');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('conjugates an irregular verb (ser)', () => {
            const output = runCLI('ser');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('conjugates an irregular verb (estar)', () => {
            const output = runCLI('estar');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('conjugates an irregular verb (tener)', () => {
            const output = runCLI('tener');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('list output format', () => {
        test('outputs list format for hablar', () => {
            const output = runCLI('hablar list');
            expect(output).toMatchSnapshot();
        });

        test('outputs list format for ir', () => {
            const output = runCLI('ir list');
            expect(output).toMatchSnapshot();
        });
    });

    describe('with pronouns', () => {
        test('outputs JSON with pronouns for hablar', () => {
            const output = runCLI('hablar pronouns');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('outputs list with pronouns for hablar', () => {
            const output = runCLI('hablar list pronouns');
            expect(output).toMatchSnapshot();
        });

        test('outputs list with pronouns for ir', () => {
            const output = runCLI('ir list pronouns');
            expect(output).toMatchSnapshot();
        });
    });
});

describe('CLI Filter Arguments', () => {
    describe('mood filters', () => {
        test('filters by indicative mood', () => {
            const output = runCLI('hablar indicative');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by subjunctive mood', () => {
            const output = runCLI('hablar subjunctive');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by conditional mood', () => {
            const output = runCLI('hablar conditional');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by imperative mood', () => {
            const output = runCLI('hablar imperative');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('tense filters', () => {
        test('filters by present tense', () => {
            const output = runCLI('hablar present');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by preterite tense', () => {
            const output = runCLI('hablar preterite');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by imperfect tense', () => {
            const output = runCLI('hablar imperfect');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by future tense', () => {
            const output = runCLI('hablar future');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by perfect tense', () => {
            const output = runCLI('hablar perfect');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('person filters', () => {
        test('filters by first person', () => {
            const output = runCLI('hablar first');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by second person', () => {
            const output = runCLI('hablar second');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by third person', () => {
            const output = runCLI('hablar third');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('number filters', () => {
        test('filters by singular', () => {
            const output = runCLI('hablar singular');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by plural', () => {
            const output = runCLI('hablar plural');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('positivity filters (imperative)', () => {
        test('filters by affirmative imperative', () => {
            const output = runCLI('hablar imperative affirmative');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by negative imperative', () => {
            const output = runCLI('hablar imperative negative');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('combined filters', () => {
        test('filters by indicative present first singular', () => {
            const output = runCLI('hablar indicative present first singular');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('filters by subjunctive present third plural', () => {
            const output = runCLI('hablar subjunctive present third plural');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('combined filters with pronouns and list', () => {
            const output = runCLI('comer indicative present list pronouns');
            expect(output).toMatchSnapshot();
        });

        test('combined filters for ser - indicative present', () => {
            const output = runCLI('ser indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });
});

describe('CLI Style Variations', () => {
    describe('Spanish regional styles', () => {
        test('castillano style (default)', () => {
            const output = runCLI('hablar indicative present pronouns castillano');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('rioplatense style', () => {
            const output = runCLI('hablar indicative present pronouns rioplatense');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('mexicano style', () => {
            const output = runCLI('hablar indicative present pronouns mexicano');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('caribeno style', () => {
            const output = runCLI('hablar indicative present pronouns caribeno');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('andino style', () => {
            const output = runCLI('hablar indicative present pronouns andino');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('chileano style', () => {
            const output = runCLI('hablar indicative present pronouns chileano');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('centroamericano style', () => {
            const output = runCLI('hablar indicative present pronouns centroamericano');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });
});

describe('CLI Formality Variations', () => {
    test('formal second person', () => {
        const output = runCLI('hablar indicative present second formal pronouns');
        expect(parseJSON(output)).toMatchSnapshot();
    });

    test('informal second person', () => {
        const output = runCLI('hablar indicative present second informal pronouns');
        expect(parseJSON(output)).toMatchSnapshot();
    });

    test('formal vs informal comparison - singular', () => {
        const formal = runCLI('hablar indicative present second singular formal');
        const informal = runCLI('hablar indicative present second singular informal');
        expect({ formal: parseJSON(formal), informal: parseJSON(informal) }).toMatchSnapshot();
    });

    test('formal vs informal comparison - plural', () => {
        const formal = runCLI('hablar indicative present second plural formal');
        const informal = runCLI('hablar indicative present second plural informal');
        expect({ formal: parseJSON(formal), informal: parseJSON(informal) }).toMatchSnapshot();
    });
});

describe('CLI Gender Variations', () => {
    test('masculine pronouns', () => {
        const output = runCLI('hablar indicative present third pronouns masculine');
        expect(parseJSON(output)).toMatchSnapshot();
    });

    test('feminine pronouns', () => {
        const output = runCLI('hablar indicative present third pronouns feminine');
        expect(parseJSON(output)).toMatchSnapshot();
    });

    test('inanimate pronouns', () => {
        const output = runCLI('hablar indicative present third pronouns inanimate');
        expect(parseJSON(output)).toMatchSnapshot();
    });
});

describe('CLI verbOnly option', () => {
    test('imperative with verbOnly', () => {
        const output = runCLI('hablar imperative verbOnly');
        expect(parseJSON(output)).toMatchSnapshot();
    });

    test('imperative without verbOnly (default)', () => {
        const output = runCLI('hablar imperative');
        expect(parseJSON(output)).toMatchSnapshot();
    });
});

describe('Package exports', () => {
    test('can require conjugateVerb from package', () => {
        const conjugateVerb = require('conjugator/lib/conjugateVerb.js');
        expect(typeof conjugateVerb).toBe('function');
        
        const result = conjugateVerb('hablar', { mood: 'indicative', tense: 'present' });
        expect(result).toMatchSnapshot();
    });

    test('can require inflect from package', () => {
        const inflect = require('conjugator/lib/inflect.js');
        expect(typeof inflect).toBe('function');
        
        const result = inflect('hablar', { 
            mood: 'indicative', 
            tense: 'present',
            person: 'first',
            number: 'singular'
        });
        expect(result).toBe('hablo');
    });

    test('can require CSV from package', () => {
        const CSV = require('conjugator/lib/CSV.js');
        expect(typeof CSV).toBe('function');
        
        const csv = new CSV({ columnSeparator: ',' });
        const result = csv.toJS('a,b,c\n1,2,3');
        expect(result).toEqual([{ a: '1', b: '2', c: '3' }]);
    });

    test('can require styles from package', () => {
        const getStyle = require('conjugator/lib/styles.js');
        expect(typeof getStyle).toBe('function');
        
        const castillano = getStyle('castillano');
        expect(castillano).toBeDefined();
        
        const rioplatense = getStyle('rioplatense');
        expect(rioplatense).toBeDefined();
        expect(rioplatense.voseo).toBe(true);
    });
});

describe('Various verb types', () => {
    describe('stem-changing verbs', () => {
        test('e->ie stem change (pensar)', () => {
            const output = runCLI('pensar indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('o->ue stem change (poder)', () => {
            const output = runCLI('poder indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('e->i stem change (pedir)', () => {
            const output = runCLI('pedir indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('verbs with spelling changes', () => {
        test('-car verb (buscar) - c->qu before e', () => {
            const output = runCLI('buscar');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('-gar verb (pagar) - g->gu before e', () => {
            const output = runCLI('pagar');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('-zar verb (empezar) - z->c before e', () => {
            const output = runCLI('empezar');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('highly irregular verbs', () => {
        test('haber (auxiliary verb)', () => {
            const output = runCLI('haber indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('hacer', () => {
            const output = runCLI('hacer indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('decir', () => {
            const output = runCLI('decir indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('venir', () => {
            const output = runCLI('venir indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });

    describe('compound verbs (prefix + irregular)', () => {
        test('contener (prefix of tener)', () => {
            const output = runCLI('contener indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });

        test('mantener (prefix of tener)', () => {
            const output = runCLI('mantener indicative present');
            expect(parseJSON(output)).toMatchSnapshot();
        });
    });
});

describe('Edge cases', () => {
    test('handles unknown verb gracefully', () => {
        const output = runCLI('xyzabc');
        // Should still produce output (applies regular rules)
        expect(output).toBeTruthy();
    });

    test('handles very short input', () => {
        const output = runCLI('ir');
        expect(parseJSON(output)).toMatchSnapshot();
    });
});

