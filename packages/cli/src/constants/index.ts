import { M2HConfig } from "../types/config";

export const CONFIG_FILE = '.mthrc';


export const defaultConifg: M2HConfig = {
    output: 'markdown/',
    clean: false,
    html: null,
    port: 8080
};
