const blueutilities = require("..");
const tap = require("tap");

tap.test("promiseSleep", async () => {
    tap.test("Should sleep", async () => {
        let startTime = Date.now();
        await blueutilities.promiseSleep(1000);
        let endTime = Date.now();
        // Pass if the difference is between 950 and 1050
        tap.ok(endTime - startTime >= 950 && endTime - startTime <= 1050);
    });
    tap.test("Should throw if invalid usage", async () => {
        let hadError = false;
        try {
            await blueutilities.promiseSleep("hello");
        } catch (err) {
            hadError = err.toString().includes("Incorrect usage! Correct usage: blueutilities.promiseSleep(Number);");
        }
        tap.ok(hadError);
    })
});