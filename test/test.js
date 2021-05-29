var blueutilities = require("../dist/index.js")
var assert = require("assert");
describe("blueutilities", () => {
    describe("safeEval", () => {
        describe("VM disabled", () => {
            it('Should return {error: false, output: "2"} when passed in "1+1"', (done) => {
                (async() => {
                    let res = await blueutilities.safeEval("1+1", {enabled: false});
                    assert.strictEqual(JSON.stringify(res), JSON.stringify({error: false, output: "2"}));
                    done()
                })()
            })
            it('Should return {error: true, output: "Error: Test"} when passed in "throw new Error("Test")"', done => {
                (async() => {
                    let res = await blueutilities.safeEval('throw new Error("Test")', {enabled: false});
                    assert.strictEqual(JSON.stringify(res), JSON.stringify({error: true, output: "Error: Test"}));
                    done()
                })()
            })
        });
        describe("VM enabled", () => {
            it('Should return {error: false, output: "2"} when passed in "1+1"', (done) => {
                (async() => {
                    let res = await blueutilities.safeEval("1+1", {enabled: true});
                    console.log(JSON.stringify(res))
                    assert.strictEqual(JSON.stringify(res), JSON.stringify({error: false, output: "2"}));
                    done()
                })()
            })
            it('Should return {error: true, output: "Error: Test"} when passed in "throw new Error("Test")"', done => {
                (async() => {
                    let res = await blueutilities.safeEval('throw new Error("Test")', {enabled: true});
                    assert.strictEqual(JSON.stringify(res), JSON.stringify({error: true, output: "Error: Test"}));
                    done()
                })()
            })
        })
    })
    describe("replaceAll", () => {
        it("Shouldn't change when passing in text not including the text to change", done => {
            assert.strictEqual(blueutilities.replaceAll("abc", "d", "c"), "abc");
            done();
        });
        it("Should replace the string", done => {
            assert.strictEqual(blueutilities.replaceAll("abcdef", "e", "f"), "abcdff");
            done();
        });
        it("Should replace all instances", done => {
            assert.strictEqual(blueutilities.replaceAll("abcdeef", "e", "f"), "abcdfff");
            done();
        });
    })
    describe("setupReplaceAll", () => {
        it("Should make a function called 'replaceAll' on type string", done => {
            blueutilities.setupReplaceAll();
            assert.ok(String.prototype.replaceAll instanceof Function);
            done();
        });
        it("Shouldn't change when passing in text not including the text to change", done => {
            blueutilities.setupReplaceAll();
            assert.strictEqual("abc".replaceAll("d", "c"), "abc");
            done();
        });
        it("Should replace the string", done => {
            blueutilities.setupReplaceAll();
            assert.strictEqual("abcdef".replaceAll("e", "f"), "abcdff");
            done();
        });
        it("Should replace all instances", done => {
            blueutilities.setupReplaceAll();
            assert.strictEqual("abcdeef".replaceAll("e", "f"), "abcdfff");
            done();
        });
    });
    describe("promiseSleep", () => {
        it("Should wait X milliseconds", done => {
            let before = Date.now();
            blueutilities.promiseSleep(500).then(() => {
                let passed = Date.now() - before;
                assert.ok(passed < 550 && passed > 450);
                done();
            })
        })
    })
})