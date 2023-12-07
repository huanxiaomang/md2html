import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

import { resolve } from "node:path";
import { CONFIG_FILE, defaultConifg } from "./constants";
import { M2HConfig } from "./types/config";

async function getLocalConfig(): Promise<{} | M2HConfig> {
    const resolvePath = resolve(process.cwd(), CONFIG_FILE);
    if (existsSync(resolvePath)) {
        const localConfig = JSON.parse((await readFile(resolvePath)).toString());
        return localConfig;
    } else {
        return {};
    }

}

function transformArgs(options: Record<string, unknown>): M2HConfig | {} {
    if (Object.keys(options).length === 1) {
        return {};
    }
    const argsConfig = {};
    const { c: clean, s: port, o: output } = options;
    const overrideOptions = { clean, port, output };
    for (const key in overrideOptions) { 
        if (overrideOptions[key] !== undefined) { 
            argsConfig[key] = overrideOptions[key];
        }
    }
    
    return argsConfig;
}


export async function loadConfig(options:Record<string,unknown>): Promise<M2HConfig> {
    const argsConfig = transformArgs(options);
    const localConfig = await getLocalConfig();
    
    
    return {
        ...defaultConifg,
        ...localConfig,
        ...argsConfig
    }
}

