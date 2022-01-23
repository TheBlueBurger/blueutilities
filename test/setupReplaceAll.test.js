const blueutilities = require("..");
const tap = require("tap");

tap.test("setupReplaceAll", async () => {
    blueutilities.setupReplaceAll();
    let str = "Hello World";
    let result = str.replaceAll("Hello", "hello");
    tap.equal(result, "hello World");
});