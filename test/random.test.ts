import blueutilities from "..";
import {describe, it, expect, assert} from "vitest";
describe("random", () => {
    describe("numBetween", () => {
        it("should return a number between the two numbers", () => {
            for(let i = 0; i < 100; i++) {
                let num1 = Math.floor(Math.random() * 100);
                let num2 = Math.floor(Math.random() * 100) + num1;
                let num = blueutilities.random.numBetween(num1, num2);
                expect(num).toBeGreaterThanOrEqual(num1);
                expect(num).toBeLessThanOrEqual(num2);
            }
        });
        it("should throw an error if num1 is greater than num2", () => {
            expect(() => {
                blueutilities.random.numBetween(10, 1);
            }).toThrow();
        });
    });
    describe("choose", () => {
        it("should return a random element from the array", () => {
            for(let i = 0; i < 100; i++) {
                let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                let num = blueutilities.random.choose(arr);
                expect(arr).toContain(num);
            }
        });
        it("Should throw an error if the array is empty or is null", () => {
            expect(() => {
                blueutilities.random.choose([]);
            }).toThrow();
            expect(() => {
                // @ts-expect-error
                blueutilities.random.choose(null);
            }).toThrow();
        });
    });
    describe("randomString", () => {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?"
        it("'all' should return correctly", () => { // It's impossible for the other ones to fail if this one does
            for(let i = 0; i < 100; i++) {
                let result = blueutilities.random.randomString(100, "all");
                result.split("").forEach(char => {
                    expect(chars).toContain(char);
                })
            }
        });
        it("Should throw an error if length on invalid input", () => {
            expect(() => {
                // @ts-expect-error
                blueutilities.random.randomString(null, "all");
            }).toThrow();
            expect(() => {
                // @ts-expect-error
                blueutilities.random.randomString(10, null);
            }).toThrow();
        });
    });
});