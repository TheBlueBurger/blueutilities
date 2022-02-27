export {}
const blueutilities = require("../..");
let {default: ava} = require("ava");

ava("replaceAll", async (t) => {
    let str = "Hello World";
    let result = blueutilities.replaceAll(str, "Hello", "hello");
    t.deepEqual(result, "hello World");
    let result2 = blueutilities.replaceAll(str, "test", "aaa");
    t.deepEqual(result2, str);
    let result3 = blueutilities.replaceAll("aaaaaaa", "a", "b");
    t.deepEqual(result3, "bbbbbbb");
})