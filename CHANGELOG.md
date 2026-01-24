# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-01-19

### Added

- **New irregular verbs**: Added comprehensive conjugation data for many common irregular verbs:
  - traer (and compounds: atraer, contraer, distraer, extraer, sustraer)
  - caer (and compounds: decaer, recaer)
  - oír (and compound: desoír)
  - conocer (and compounds: reconocer, desconocer)
  - conducir (and compounds: producir, reducir, traducir, introducir, deducir, inducir, seducir)
  - caber
  - valer (and compound: equivaler)
  - andar (and compound: desandar)
  - dormir
  - sentir (and compounds: consentir, presentir, resentir)
  - pedir, medir, repetir, servir, vestir
  - reír (and compounds: freír, sonreír)
  - huir (and compounds: concluir, construir, contribuir, destruir, distribuir, excluir, incluir, influir, instruir, sustituir)
- **Compound verb references**: Added references for compound forms of existing irregular verbs:
  - poner compounds: componer, disponer, exponer, imponer, oponer, proponer, reponer, suponer
  - hacer compounds: deshacer, rehacer, satisfacer
  - ver compound: prever
  - decir compounds: bendecir, maldecir, predecir

### Fixed

- **Accented infinitives**: Fixed conjugation of verbs with accented infinitives (oír, reír, etc.) which were previously not being conjugated
- **Pattern-matched compound verbs**: Fixed prefix application for verbs that share conjugation patterns but aren't true compounds (e.g., producir→conducir, construir→huir)

## [2.0.0] - 2025-12-19

### Breaking Changes

- **Minimum Node.js version is now 18.0.0** (previously 0.10)
- Package is now ESM-only. If you need CommonJS, use version 1.x
- Module exports have changed:
  - Use `import conjugateVerb from 'conjugator'` instead of `require('conjugator')`
  - Use `import inflect from 'conjugator/inflect'` for the inflect function

### Added

- **TypeScript support**: Source code rewritten in TypeScript
  - Full type definitions included (`.d.ts` files)
  - Exported types for `InflectOptions`, `ConjugateOptions`, `Conjugation`, etc.
- **ESM module support**: Package now uses native ES modules
- **Jest test framework**: Replaced nodeunit with Jest for unit testing
- **End-to-end test suite**: New `test-e2e` directory with CLI integration tests
  - Tests CLI argument parsing and output formats
  - Tests package exports work correctly when installed
  - Snapshot testing for regression prevention
- New npm scripts:
  - `npm run build` - Compile TypeScript to JavaScript
  - `npm run clean` - Remove compiled files
  - `npm run test:e2e` - Run end-to-end tests

### Changed

- Source code moved from `lib/` to `src/` (TypeScript sources)
- Compiled JavaScript output in `lib/` (generated from TypeScript)
- Updated all dependencies to modern versions
- Removed `log4js` usage from library code (was unused)
- Improved code organization with modern JavaScript patterns:
  - Arrow functions
  - `const`/`let` instead of `var`
  - Template literals
  - Destructuring

### Removed

- Dropped support for Node.js versions below 14.0.0
- Removed nodeunit test framework
- Removed CommonJS `require()` support (use ESM `import` instead)
- Removed unused `log4js` dependency

### Migration Guide

**For ESM projects:**
```javascript
// Before (v1.x)
const conjugateVerb = require('conjugator/lib/conjugateVerb.js');
const inflect = require('conjugator/lib/inflect.js');

// After (v2.x)
import conjugateVerb from 'conjugator';
import inflect from 'conjugator/inflect';
```

**For TypeScript projects:**
```typescript
import conjugateVerb, { ConjugateOptions, Conjugation } from 'conjugator';
import inflect, { InflectOptions } from 'conjugator/inflect';

const options: ConjugateOptions = {
    mood: 'indicative',
    tense: 'present'
};

const result: Conjugation = conjugateVerb('hablar', options);
```

## [1.1.0] - Previous Release

- Last version with CommonJS support
- Supports Node.js 0.10+

