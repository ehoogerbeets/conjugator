/*
 * styles.js - return information about a style of Spanish
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

var logger = log4js.getLogger("loctool.esES.styles");

var stylesJson = fs.readFileSync(path.join(path.dirname(module.filename), "../data/styles-es.json"), "utf-8");
var styles = JSON.parse(stylesJson);

var getStyle = function(styleName) {
	var style = styleName || "castillano";
	return styles[style];
};

module.exports = getStyle;
