const blueutilities = require("..");
const tap = require("tap");

tap.test("replaceAll", async () => {
    let str = "Hello World";
    let result = blueutilities.replaceAll(str, "Hello", "hello");
    tap.equal(result, "hello World");
    let result2 = blueutilities.replaceAll(str, "test", "aaa");
    tap.equal(result2, str);
    let result3 = blueutilities.replaceAll("aaaaaaa", "a", "b");
    tap.equal(result3, "bbbbbbb");
})