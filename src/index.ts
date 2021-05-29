interface safeEvalReturned {
    error: boolean;
    output: string;
}

function safeEval(evalcode: string): Promise<safeEvalReturned> {
	return new Promise(function(resolve, _reject) {
        let response: safeEvalReturned = {
            "error": false,
            "output": ""
        }
        try {
            response.output = `${eval(evalcode)}`
        } catch(err) {
            response.error = true;
            response.output = err.toString();
        }
        resolve(response);
      });
}

function replaceAll(text: string, textReplace: string, textReplace2: string): string {
    return text.split(textReplace).join(textReplace2).toString();
}
function setupReplaceAll(): void {
    // @ts-ignore
    String.prototype.replaceAll = function(textReplace, textReplace2) {
        return this.split(textReplace).join(textReplace2).toString();
    }
};
function promiseSleep(ms: number): Promise<void> {
    return new Promise(function(resolve, reject) {
        if(isNaN(ms)) reject("Incorrect usage! Correct usage: blueutilities.promiseSleep(Number)");
        setTimeout(resolve, ms);
    });
};
export {promiseSleep, setupReplaceAll, replaceAll, safeEval}