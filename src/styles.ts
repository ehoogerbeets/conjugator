/*
 * styles.ts - return information about a style of Spanish
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

import * as fs from "fs";
import * as path from "path";

interface Style {
    tuteo?: boolean;
    voseo?: boolean;
    ustedes?: boolean;
}

interface StylesMap {
    [styleName: string]: Style;
}

const stylesJson = fs.readFileSync(path.join(__dirname, "../data/styles-es.json"), "utf-8");
const styles: StylesMap = JSON.parse(stylesJson);

const getStyle = function(styleName?: string): Style {
    const style = styleName || "castillano";
    return styles[style];
};

// CommonJS export for backwards compatibility
export = getStyle;

