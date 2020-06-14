# Examples

## setupReplaceAll
### Input:
```js
const blueutilities = require('blueutilities');
blueutilities.setupReplaceAll();
console.log("Hello, World!".replaceAll("World", "world"));
```
### Output:
```
Hello, world
```

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