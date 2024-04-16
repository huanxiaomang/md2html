import { describe, expect, it } from "vitest";
import { parser } from "../parser";

describe("Parser", () => {
    describe('h1~h6', () => {
        it.skip('h1', () => {
            const result = parser('h1');
            expect(result).toBe(2);
        });
    })
})