import { describe, expect, test } from "vitest";
import { loadConfig } from "../src/loadConfig";

describe('处理cli传入的参数', () => {
    test('不传递参数', async () => {
        const msg = { '--': [] };
        const finalConfig = await loadConfig(msg);
        expect(finalConfig).toStrictEqual({
            output: 'markdown/',
            clean: false,
            mode: 'import',
            html: null,
            style: null,
            port: 8080
        });

    });
    test('传递参数1', async () => {
        const msg1 = {
            '--': [],
            w: true,
            c: true,
            watch: [true],
            server: [undefined],
            output: [undefined]
        };

        const finalConfig1 = await loadConfig(msg1);


        expect(finalConfig1).toStrictEqual({
            output: 'markdown/',
            clean: true,
            mode: 'import',
            html: null,
            style: null,
            port: 8080
        });


    });


    test('传递参数2', async () => {
        const msg2 = {
            '--': [],
            c: true,
            watch: [ true ],
            server: [ 8089 ],
            output: [ 'md/' ],
            clean: [ true ],
            w: true,
            o: 'md/',
            s: 8089
        };
        const finalConfig2 = await loadConfig(msg2); 
        expect(finalConfig2).toStrictEqual({
            output: 'md/',
            clean: true,
            mode: 'import',
            html: null,
            style: null,
            port: 8089
        });
    });

})

