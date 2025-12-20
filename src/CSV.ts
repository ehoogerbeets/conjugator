/*
 * CSV.ts - convert a CSV to json and back
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

const whiteSpaceChars = [' ', '\t', '\f', '\n', '\r', '\v'];

export interface CSVOptions {
    rowSeparatorRegex?: string;
    rowSeparator?: string;
    columnSeparator?: string;
}

export interface CSVRecord {
    [key: string]: string;
}

/**
 * Create a new CSV object with the given options. The
 * options may contain:
 *
 * <ul>
 * <li><i>rowSeparatoratorRegex</i> - a regex string used to
 * separate rows from each other
 * <li><i>rowSeparator</i> - a single character that is used
 * to separate rows from each other if the rowSeparatorRegex
 * is not given. Default: '\n'
 * <li><i>columnSeparator</i> - a single character that is used
 * to separate columns from each other. Default: ','
 * </ul>
 */
class CSV {
    private rowSeparatorRegex: RegExp;
    private rowSeparator: string;
    private columnSeparator: string;
    private columnSeparatorRegex: RegExp;

    constructor(options?: CSVOptions) {
        const opts = options || {};
        this.rowSeparatorRegex = new RegExp(opts.rowSeparatorRegex || opts.rowSeparator || '[\n\r\f]+');
        this.rowSeparator = opts.rowSeparator || '\n';
        this.columnSeparator = opts.columnSeparator || ',';

        const sep = whiteSpaceChars.indexOf(this.columnSeparator);
        const white = (sep > -1) ? '[' + whiteSpaceChars.map((ch) => {
            return ch !== this.columnSeparator ? ch : undefined;
        }).join('') + ']' : '\\s';

        this.columnSeparatorRegex = new RegExp(white + '*("(([^"]|\\\\"|"")*)"|([^' +
            this.columnSeparator + ']|\\\\' + this.columnSeparator + ')*)' +
            white + '*(' + this.columnSeparator + '|$)', "g");
    }

    /**
     * @private
     */
    private _splitIt(line: string): string[] {
        // take care of the escaped separators first
        const escaped = line.replace("\\" + this.columnSeparator, "%comma%");

        let result: RegExpExecArray | null;
        const results: string[] = [];

        this.columnSeparatorRegex.lastIndex = 0; // reset manually just to be safe

        while (this.columnSeparatorRegex.lastIndex < line.length && (result = this.columnSeparatorRegex.exec(escaped)) !== null) {
            let field = "";

            if (result[1]) {
                // result[2] is a quoted string -- unescape two double-quotes to only one
                field = result[2] ? result[2].replace(/""/g, '"') : result[1];
            }

            results.push(field.trim());
        }

        // put the escaped separators back again and unescape them
        return results.map((entry) => {
            return entry.replace("%comma%", this.columnSeparator);
        });
    }

    /**
     * Return an array of column names that exist in the given
     * array of records. The names are a superset of all the names
     * in all records.
     *
     * @param records the records to sift through
     * @returns an array of column names in those records
     */
    getColumnNames(records: CSVRecord[]): string[] {
        const names: string[] = [];
        const nameSet = new Set<string>();
        records.forEach((record) => {
            if (record && typeof record === 'object') {
                Object.keys(record).forEach((name) => {
                    if (!nameSet.has(name)) {
                        names.push(name);
                        nameSet.add(name);
                    }
                });
            }
        });

        return names;
    }

    /**
     * Parse the data string and convert the rows to javascript objects. The
     * first row is assumed to contain the column names, and properties in
     * each record will be named with them.
     *
     * @param data the string to parse
     * @returns an array of javascript objects that corresponds
     * to the records in the given CSV object
     */
    toJS(data: string): CSVRecord[] {
        if (!data) {
            return [];
        }

        const lines = data.split(this.rowSeparatorRegex);

        // assume the first record has the names of the columns in it
        const names = this._splitIt(lines[0]);
        const dataLines = lines.slice(1);

        const records = dataLines.map((line) => {
            if (line.trim().length > 0) {
                const fields = this._splitIt(line);
                const json: CSVRecord = {};
                names.forEach((name, i) => {
                    json[name] = i < fields.length ? fields[i] : "";
                });

                return json;
            } else {
                return undefined;
            }
        }).filter((record): record is CSVRecord => {
            return record !== undefined;
        });

        return records;
    }

    /**
     * Convert the given array of records into a CSV object.
     * The first line of the CSV will contain the column names.
     * The names are calculated as a superset of the property
     * names in all of the given records. If any object is
     * missing one of the columns, its entry in the line of
     * the CSV object will be empty.
     *
     * @param records an array of records to convert to a CSV object
     * @returns a CSV object corresponding to the array of records
     */
    toCSV(records: CSVRecord[]): string {
        const names = this.getColumnNames(records);

        return names.join(this.columnSeparator) + this.rowSeparator + records.map((record) => {
            return names.map((name) => {
                let text = record[name] || "";

                if (text.indexOf(this.columnSeparator) > -1 || text.trim() !== text || text.indexOf('\n') > -1 || text.indexOf('"') > -1) {
                    text = '"' + text.replace(/"/g, '""') + '"';
                }

                return text;
            }).join(this.columnSeparator);
        }).join(this.rowSeparator);
    }

    /**
     * Merge the contents of the other csv file into the current one.
     * The records in each file are matched by a key which should be
     * specified to the constructor of this instance. Records in the
     * other csv which have the same key as an existing record in
     * this csv file which overwrite the values in the current file.
     *
     * If the other csv file has a different schema than the current
     * one, then this method creates a superset record with merged
     * fields. For example, if the current csv has columns "a", "b",
     * and "c", and the other one has "a", "b", and "d" and the key
     * is given with column "a", then after the merge, records in
     * the current csv will have columns "a", "b", "c", and "d",
     * which may have empty values for some records.
     *
     * @param key the name of column that contains the unique key for each record
     * @param records an array of records to merge into
     * @param other an array of records to merge
     * @returns the merged array of records
     */
    merge(key: string, records: CSVRecord[], other: CSVRecord[]): CSVRecord[] {
        if (!other) return records;

        const otherNames = this.getColumnNames(other);

        const merged = records.slice(0); // clones the array quickly

        const keyHash: { [key: string]: CSVRecord } = {};
        records.forEach((record) => {
            if (record[key]) {
                keyHash[record[key]] = record;
            }
        });

        other.forEach((otherRecord) => {
            const value = otherRecord[key];
            if (keyHash[value]) {
                // merge them
                const thisRecord = keyHash[value];
                otherNames.forEach((name) => {
                    if (name !== key && otherRecord[name]) {
                        thisRecord[name] = otherRecord[name];
                    }
                });
            } else {
                // add a new one
                merged.push(otherRecord);
                keyHash[key] = otherRecord;
            }
        });

        return merged;
    }
}

export default CSV;
