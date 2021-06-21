const blueutilities = require("..")
const chai = require("chai");
const { expect } = chai;

describe("blueutilities", () => {
    describe("safeEval", () => {
        describe("VM disabled", () => {
            it('Should return {error: false, output: "2"} when passed in "1+1"', (done) => {
                (async () => {
                    let res = await blueutilities.safeEval("1+1", { enabled: false });
                    expect(JSON.stringify(res)).to.equal(JSON.stringify({ error: false, output: "2" }));
                    done()
                })()
            })
            it('Should return {error: true, output: "Error: Test"} when passed in "throw new Error("Test")"', done => {
                (async () => {
                    let res = await blueutilities.safeEval('throw new Error("Test")', { enabled: false });
                    expect(JSON.stringify(res)).to.equal(JSON.stringify({ error: true, output: "Error: Test" }));
                    done()
                })()
            })
        });
        describe("VM enabled", () => {
            it('Should return {error: false, output: "2"} when passed in "1+1"', (done) => {
                (async () => {
                    let res = await blueutilities.safeEval("1+1", { enabled: true });
                    expect(JSON.stringify(res)).to.equal(JSON.stringify({ error: false, output: "2" }));
                    done()
                })()
            })
            it('Should return {error: true, output: "Error: Test"} when passed in "throw new Error("Test")"', done => {
                (async () => {
                    let res = await blueutilities.safeEval('throw new Error("Test")', { enabled: true });
                    expect(JSON.stringify(res)).to.equal(JSON.stringify({ error: true, output: "Error: Test" }));
                    done()
                })()
            })
        })
    })
    describe("replaceAll", () => {
        it("Shouldn't change when passing in text not including the text to change", done => {
            expect(blueutilities.replaceAll("abc", "d", "c")).to.equal("abc");
            done();
        });
        it("Should replace the string", done => {
            expect(blueutilities.replaceAll("abcdef", "e", "f")).to.equal("abcdff");
            done();
        });
        it("Should replace all instances", done => {
            expect(blueutilities.replaceAll("abcdeef", "e", "f")).to.equal("abcdfff");
            done();
        });
    })
    describe("setupReplaceAll", () => {
        beforeEach(() => {
            blueutilities.setupReplaceAll();
        })
        it("Should make a function called 'replaceAll' on type string", done => {
            // @ts-ignore
            expect(String.prototype.replaceAll).to.be.instanceOf(Function);
            done();
        });
        it("Shouldn't change when passing in text not including the text to change", done => {
            // @ts-ignore
            expect("abc".replaceAll("d", "c")).to.equal("abc")
            done();
        });
        it("Should replace the string", done => {
            // @ts-ignore
            expect("abcdef".replaceAll("e", "f")).to.equal("abcdff");
            done();
        });
        it("Should replace all instances", done => {
            // @ts-ignore
            expect("abcdeef".replaceAll("e", "f")).to.equal("abcdfff");
            done();
        });
    });
    describe("promiseSleep", () => {
        it("Should wait X milliseconds", done => {
            let before = Date.now();
            blueutilities.promiseSleep(500).then(() => {
                let passed = Date.now() - before;
                expect(passed < 550 && passed > 450).to.be.true;
                done();
            })
        });
        it("Should reject if it's not a number", done => {
            new Promise(async (res, _rej) => {
                try {
                    await blueutilities.promiseSleep(NaN)
                    done(new Error("Didn't throw error!"))
                } catch {
                    done()
                    res();
                }
            })
        })
    })
})