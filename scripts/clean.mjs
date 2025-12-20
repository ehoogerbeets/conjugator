import { existsSync, readdirSync, unlinkSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const libDir = join(__dirname, "..", "lib");

if (existsSync(libDir)) {
    for (const file of readdirSync(libDir)) {
        if (file.endsWith(".js") || file.endsWith(".d.ts") || file.endsWith(".map")) {
            unlinkSync(join(libDir, file));
        }
    }
}
