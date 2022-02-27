export {}
const blueutilities = require("..");
let {default: ava} = require("ava");
ava("Should sleep", async (t) => {
    let startTime = Date.now();
    await blueutilities.promiseSleep(1000);
    let endTime = Date.now();
    // Pass if the difference is between 950 and 1050
    t.assert(endTime - startTime >= 950 && endTime - startTime <= 1050);
});
ava("Should throw if invalid usage", async (t) => {
    let hadError = false;
    try {
        await blueutilities.promiseSleep("hello");
    } catch (err) {
        hadError = err.toString().includes("Incorrect usage! Correct usage: blueutilities.promiseSleep(Number);");
    }
    t.assert(hadError)
})