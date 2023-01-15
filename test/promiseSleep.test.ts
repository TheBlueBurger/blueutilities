import blueutilities from "..";
import {describe, it, expect, assert} from "vitest";
describe("promiseSleep", async (t) => {
    it.concurrent("Should sleep", async () => {

        let startTime = Date.now();
        await blueutilities.promiseSleep(1000);
        let endTime = Date.now();
        // Pass if the difference is between 950 and 1050
        console.log(`${endTime - startTime}ms`);
        expect(endTime - startTime).toBeGreaterThanOrEqual(950);
        expect(endTime - startTime).toBeLessThanOrEqual(1050);
    });
    it.concurrent("Should throw error if time isn't a number", async() => {
            let hadError = false;
            try {
                // @ts-expect-error
                await blueutilities.promiseSleep("hello");
            } catch (err) {
                hadError = err.toString().includes("Incorrect usage! Correct usage: blueutilities.promiseSleep(Number);");
            }
            assert(hadError)
    })
});