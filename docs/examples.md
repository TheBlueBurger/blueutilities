# Examples

## safeEval
### Input:
```js
const blueutilities = require('blueutilities');
blueutilities.safeEval("1+1")
    .then(console.dir);
```
### Output:
```
{
    error: false,
    output: 2
};
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
