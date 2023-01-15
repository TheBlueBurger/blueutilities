# Examples

## safeEval
### Input:
```js
const blueutilities = require('blueutilities');
blueutilities.safeEval("1+1")
    .then(console.dir);
```
### Output:
```json
{
    error: false,
    output: 2
};
```
## replaceAll
### Input:
```js
const blueutilities = require('blueutilities');
console.log(blueutilities.replaceAll("Hello, World!", "World", "world"));
```
### Output:
```
Hello, world!
```
## promiseSleep
### Input
```js
const blueutilities = require('blueutilities');
console.log("Will wait 1 sec");
blueutilities.promiseSleep(1000).then(() => {
    console.log("1 sec passed!");
});
```
### Output
```
Will wait 1 sec
*One second passes*
1 sec passed!
```

<!-- TODO: Add random -->