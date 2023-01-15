import blueutilities from "..";
import {describe, it, expect, assert} from "vitest";


describe("safeEval", () => {
    describe.concurrent("VM Enabled", () => {
        it.concurrent("Should work and return correctly", async() => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
            });
            assert.deepEqual(result, {
                output: "2",
                error: false
            });
        });
        it.concurrent("Should not hang", async () => {
            let result = await blueutilities.safeEval("while(true) {}", {
                enabled: true,
            });
            assert.deepEqual(result, {
                output: "Too slow response.",
                error: true
            });
        });
        it.concurrent("Should return error if throw error", async () => {
            let result = await blueutilities.safeEval("throw new Error('error message')", {
                enabled: true,
                timeout: 4000
            });
            assert.deepEqual(result, {
                output: "Error: error message",
                error: true
            });
        });
        it.concurrent("Freeze worker", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
                // @ts-expect-error
                __debugFreeze: true
            });
            assert.deepEqual(result, {
                output: "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.",
                error: true
            });
        });
        it.concurrent("Freeze worker 2", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
                // @ts-expect-error
                __debugFreeze2: true
            });
            assert.deepEqual(result, {
                output: "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.",
                error: true
            });
        });
        it.concurrent("Test making worker throw error", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: true,
                // @ts-expect-error
                __debugThrowErr: true
            });
            assert.deepEqual(result, {
                output: "Worker error: Error: Debug throw error",
                error: true
            });
        });
        it.concurrent("Should not crash if catastrophic issue", async () => {
            let result = await blueutilities.safeEval("1+1", {
                // @ts-expect-error
                __debugThrowErrInIndex: true,
                enabled: true
            });
            assert.deepEqual(result, {
                output: "An unknown error occurred while executing safeEval: Error: Debug throw error\nPlease submit a issue.",
                error: true
            });
        });
    });
    describe.concurrent("VM Disabled", () => {
        it.concurrent("Should work", async () => {
            let result = await blueutilities.safeEval("1+1", {
                enabled: false,
            });
            assert.deepEqual(result, {
                output: "2",
                error: false
            });
        });
        it.concurrent("Should not crash if throws error", async () => {
            let result = await blueutilities.safeEval("throw new Error('error message')", {
                enabled: false
            });
            assert.deepEqual(result, {
                output: "Error: error message",
                error: true
            });
        });
    });
});
