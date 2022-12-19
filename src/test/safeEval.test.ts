export {}
const blueutilities = require("../..");
let {default: ava} = require("ava");


ava("VM Enabled - Should work", async (t) => {
    let result = await blueutilities.safeEval("1+1", {
        enabled: true,
    });
    t.deepEqual(result, {
        output: "2",
        error: false
    });
});
ava("VM Enabled - Should not hang if infinite loop", async (t) => {
    let result = await blueutilities.safeEval("while(true) {}", {
        enabled: true,
    });
    t.deepEqual(result, {
        output: "Too slow response.",
        error: true
    });
});
ava("VM Enabled - Should return error if throw error", async (t) => {
    let result = await blueutilities.safeEval("throw new Error('error message')", {
        enabled: true,
        timeout: 4000
    });
    t.deepEqual(result, {
        output: "Error: error message",
        error: true
    });
});
ava("VM Enabled - Freeze worker", async (t) => {
    let result = await blueutilities.safeEval("1+1", {
        enabled: true,
        __debugFreeze: true
    });
    t.deepEqual(result, {
        output: "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.",
        error: true
    });
});
ava("VM Enabled - Freeze worker 2", async (t) => {
    let result = await blueutilities.safeEval("1+1", {
        enabled: true,
        __debugFreeze2: true
    });
    t.deepEqual(result, {
        output: "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.",
        error: true
    });
});
ava("VM Enabled - Test making worker throw error", async (t) => {
    let result = await blueutilities.safeEval("1+1", {
        enabled: true,
        __debugThrowErr: true
    });
    t.deepEqual(result, {
        output: "Worker error: Error: Debug throw error",
        error: true
    });
});
ava("VM Enabled - Should not crash if catastrophic issue", async (t) => {
    let result = await blueutilities.safeEval("1+1", {
        __debugThrowErrInIndex: true,
        enabled: true
    });
    t.deepEqual(result, {
        output: "An unknown error occurred while executing safeEval: Error: Debug throw error\nPlease submit a issue.",
        error: true
    });
})
ava("Should work", async (t) => {
    let result = await blueutilities.safeEval("1+1", {
        enabled: false,
    });
    t.deepEqual(result, {
        output: "2",
        error: false
    });
});
ava("Should not crash if throws error", async (t) => {
    let result = await blueutilities.safeEval("throw new Error('error message')", {
        enabled: false,
        timeout: 4000
    });
    t.true(result.error);
});
