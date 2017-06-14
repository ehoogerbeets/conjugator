/*
 * CSV.js - convert a CSV to json and back
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

var logger = log4js.getLogger("loctool.lib.CSV");

var whiteSpaceChars = [' ', '\t', '\f', '\n', '\r', '\v'];

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
 * 
 * @param {Object} options The options to control the 
 * instantiation of the the object.
 */
var CSV = function(options) {
	if (!options) options = {};
	this.rowSeparatorRegex = new RegExp(options.rowSeparatorRegex || options.rowSeparator || '[\n\r\f]+');
	this.rowSeparator = options.rowSeparator || '\n';
	this.columnSeparator = options.columnSeparator || ',';
	
	var white, sep = whiteSpaceChars.indexOf(this.columnSeparator);
	white = (sep > -1) ? '[' + whiteSpaceChars.map(function(ch) {
		return ch !== this.columnSeparator ? ch : undefined;
	}.bind(this)).join('') + ']' : '\\s';
	
	this.columnSeparatorRegex = new RegExp(white + '*("(([^"]|\\\\"|"")*)"|([^' + 
			this.columnSeparator + ']|\\\\' + this.columnSeparator + ')*)' + 
			white + '*(' + this.columnSeparator + '|$)', "g");
};

/**
 * @private
 */
CSV.prototype._splitIt = function (line) {
	// take care of the escaped separators first
	var escaped = line.replace("\\" + this.columnSeparator, "%comma%");
	
	var result, results = [];
	
	this.columnSeparatorRegex.lastIndex = 0; // reset manually just to be safe
	
	while (this.columnSeparatorRegex.lastIndex < line.length && (result = this.columnSeparatorRegex.exec(escaped)) !== null) {
		var field = "";

		if (result[1]) {
			// result[2] is a quoted string -- unescape two double-quotes to only one
			field = result[2] ? result[2].replace(/""/g, '"') : result[1];
		}
		
		results.push(field.trim());
	}

	// put the escaped separators back again and unescape them
	return results.map(function(entry) { 
		return entry.replace("%comma%", this.columnSeparator); 
	}.bind(this));
}

/**
 * Return an array of column names that exist in the given
 * array of records. The names are a superset of all the names
 * in all records.
 * 
 * @param {Array.<Object>} records the records to sift through
 * @returns {Array.<String>} an array of column names in those
 * records
 */
CSV.prototype.getColumnNames = function(records) {
	var names = [];
	var nameSet = new Set();
	records.forEach(function(record) {
		if (record && typeof(record) === 'object') {
			Object.keys(record).forEach(function(name) {
				if (!nameSet.has(name)) {
					names.push(name);
					nameSet.add(name);
				}
			});
		}
	});
	
	return names;
};

/**
 * Parse the data string and convert the rows to javascript objects. The
 * first row is assumed to contain the column names, and properties in
 * each record will be named with them.
 * 
 * @param {String} data the string to parse
 * @returns {Array.<Object>} an array of javascript objects that corresponds 
 * to the records in the given CSV object
 */
CSV.prototype.toJS = function(data) {
	if (!data) {
		this.records = [];
		return;
	}
	
	var lines = data.split(this.rowSeparatorRegex);
	
	// assume the first record has the names of the columns in it
	var names = this._splitIt(lines[0]);
	lines = lines.slice(1);
	
	var records = lines.map(function(line) {
		if (line.trim().length > 0) {
			var fields = this._splitIt(line);
			var json = {};
			names.forEach(function(name, i) {
				json[name] = i < fields.length ? fields[i] : "";
			});
		
			return json;
		} else {
			return undefined;
		}
	}.bind(this)).filter(function(record) {
		return record;
	});
	
	return records;
};

/**
 * Convert the given array of records into a CSV object.
 * The first line of the CSV will contain the column names.
 * The names are calculated as a superset of the property
 * names in all of the given records. If any object is 
 * missing one of the columns, its entry in the line of
 * the CSV object will be empty.
 * 
 * @params {Array.<Object>} an array of records to convert
 * to a CSV object
 * @returns {String} a CSV object corresponding to the 
 * array of records
 */
CSV.prototype.toCSV = function(records) {
	var names = this.getColumnNames(records);
	
	return names.join(this.columnSeparator) + this.rowSeparator + records.map(function(record) {
		return names.map(function(name) {
			var text = record[name] || "";
			
			if (text.indexOf(this.columnSeparator) > -1 || text.trim() !== text || text.indexOf('\n') > -1 || text.indexOf('"') > -1) {
				text = '"' + text.replace(/"/g, '""') + '"';
			}
			
			return text;
		}.bind(this)).join(this.columnSeparator);
	}.bind(this)).join(this.rowSeparator);
};

/**
 * Merge the contents of the other csv file into the current one.
 * The records in each file are matched by a key which should be
 * specified to the constructor of this instance. Records in the
 * other csv which have the same key as an existing record in 
 * this csv file which overwrite the values in the current file.
 * <p>
 * If the other csv file has a different schema than the current
 * one, then this method creates a superset record with merged 
 * fields. For example, if the current csv has columns "a", "b",
 * and "c", and the other one has "a", "b", and "d" and the key
 * is given with column "a", then after the merge, records in
 * the current csv will have columns "a", "b", "c", and "d",
 * which may have empty values for some records.
 * <p>
 * @param {String} key the name of column that contains the unique
 * key for each record
 * @param {Array.<Object>} records an array of records to merge
 * into
 * @param {Array.<Object>} other an array of records to merge
 * @returns {Array.<Object>} the merged array of records
 */
CSV.prototype.merge = function(key, records, other) {
	if (!other) return records;

	var recordNames = this.getColumnNames(records);
	var otherNames = this.getColumnNames(other);
	
	var nameSet = new Set();
	nameSet.add(recordNames);
	nameSet.add(otherNames);
	
	var names = [];
	nameSet.forEach(function(name) {
		names.push(name);
	});
	
	var merged = records.slice(0); // clones the array quickly
	
	var keyHash = {};
	records.forEach(function(record) {
		if (record[key]) {
			keyHash[record[key]] = record;
		}
	});
	
	other.forEach(function(otherRecord) {
		var value = otherRecord[key];
		if (keyHash[value]) {
			// merge them
			var thisRecord = keyHash[value];
			otherNames.forEach(function(name) {
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
};

module.exports = CSV;
