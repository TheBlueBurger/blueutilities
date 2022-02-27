export {}
const blueutilities = require("../..");
let {default: ava} = require("ava");

ava("setupReplaceAll", async (t) => {
    blueutilities.setupReplaceAll();
    let str = "Hello World";
    let result = str.replaceAll("Hello", "hello");
    t.deepEqual(result, "hello World");
});