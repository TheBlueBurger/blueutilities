function safeEval(evalcode) {
    try {
        let output1 = eval(evalcode);
        let failedEval = false;
    } catch(e) {
        let failedEval = true;
    }
    let returnData = {
        error: failedEval,
        output: output1
    }
    return returnData;
}

function replaceAll(text, textReplace, textReplace2) {
    let outputTextReplace = text;
    while(text.includes(textReplace)) {
        outputTextReplace = outputTextReplace.replace(textReplace, textReplace2)
    }
    return outputTextReplace;
}
module.exports.safeEval = safeEval;
module.exports.replaceAll = replaceAll;