function safeEval(evalcode) {
	return new Promise(function(resolve, reject) {
        resolve(eval(evalcode));
      }).then(output => {
       return {
           error: false,
           output: output
       };
      }).catch(err => {
        return {
            error: true,
            output: err
        };
      });
}

function replaceAll(text, textReplace, textReplace2) {
    return text.split(textReplace).join(textReplace2).toString();
}
function setupReplaceAll() {
    String.prototype.replaceAll = function(textReplace, textReplace2) {
        return this.split(textReplace).join(textReplace2).toString();
    }
}
module.exports.safeEval = safeEval;
module.exports.replaceAll = replaceAll;
module.exports.setupReplaceAll = setupReplaceAll;