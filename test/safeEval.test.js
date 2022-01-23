const blueutilities = require("..");
const tap = require("tap");

tap.test("safeEval", async () => {
    tap.test("VM enabled", async () => {
        tap.test("Should work", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
            });
            tap.ok(isObjectEqual(result, {
                output: "2",
                error: false
            }));
        });
        tap.test("Should not hang if infinite loop", async () => {
            let result = await blueutilities.safeEval("while(true) {}", {
                enabled: true,
            });
            tap.ok(isObjectEqual(result, {
                output: "Too slow response.",
                error: true
            }));
        });
        tap.test("Should return error if throw error", async () => {
            let result = await blueutilities.safeEval("throw new Error('error message')", {
                enabled: true,
                timeout: 4000
            });
            tap.ok(isObjectEqual(result, {
                output: "Error: error message",
                error: true
            }));
        });
        tap.test("Freeze worker", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
                __debugFreeze: true
            });
            tap.ok(isObjectEqual(result, {
                output: "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.",
                error: true
            }));
        });
        tap.test("Freeze worker 2", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
                __debugFreeze2: true
            });
            tap.ok(isObjectEqual(result, {
                output: "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.",
                error: true
            }));
        });
        tap.test("Test making worker throw error", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
                __debugThrowErr: true
            });
            tap.ok(isObjectEqual(result, {
                output: "Worker error: Error: Debug throw error",
                error: true
            }));
        });
        tap.test("Should not crash if catastrophic issue", async () => {
            let result = await blueutilities.safeEval("1+1", {
                __debugThrowErrInIndex: true
            });
            tap.ok(isObjectEqual(result, {
                output: "An unknown error occurred while executing safeEval: Error: Debug throw error\nPlease submit a issue.",
                error: true
            }));
        })
    });
    tap.test("VM Disabled", async () => {
        tap.test("Should work", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: false,
            });
            tap.ok(isObjectEqual(result, {
                output: "2",
                error: false
            }));
        });
        tap.test("Should not crash if throws error", async () => {
            let result = await blueutilities.safeEval("throw new Error('error message')", {
                enabled: false,
                timeout: 4000
            });
            tap.ok(isObjectEqual(result, {
                output: "Error: error message",
                error: true
            }));
        });
    })
});

function isObjectEqual(object1, object2) {
    let err = ""
    for (let key in object1) {
        if (object1[key] !== object2[key]) {
            err += `\n${key} is not equal. ${JSON.stringify(object1[key])} !== ${JSON.stringify(object2[key])}`;
        }
    }
    for (let key in object2) {
        if (object2[key] !== object2[key]) {
            err += `\n${key} is not equal. ${JSON.stringify(object1[key])} !== ${JSON.stringify(object2[key])}`;
        }
    }
    if (err !== "") {
        err = err.replace("\n", "");
        throw err;
    }
    return true;
}