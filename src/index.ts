import * as vm from "vm";
import * as threads from "worker_threads";
import * as path from "path";

interface safeEvalReturnedInterface {
    error: boolean;
    output: string;
}
interface vmOptionsInterface {
    enabled: boolean;
    timeout?: number;
}
function safeEval(evalCode: string, vmOptions: vmOptionsInterface = { enabled: true }): Promise<safeEvalReturnedInterface> {
    return new Promise(function (resolve, _reject) {
        let response: safeEvalReturnedInterface = {
            "error": false,
            "output": ""
        }
        try {
            if (vmOptions.enabled) {
                const worker = new threads.Worker(path.join(__dirname, "/safeEvalWorker.js"));
                worker.once("online", () => {
                    worker.postMessage({ evalCode, vmOptions })
                });
                worker.once("message", msg => {
                    if (msg instanceof Error) response.error = true;
                    response.error = msg.error ?? response.error;
                    response.output = `${msg.output}`;
                    worker.terminate();
                    resolve(response);
                });
                setTimeout(() => {
                    worker.terminate();
                    response.error = true;
                    response.output = "Too slow response.";
                    resolve(response);
                }, vmOptions.timeout ?? 500)
            } else {
                response.output = `${eval(evalCode)}`;
                resolve(response);
            }
        } catch (err) {
            response.error = true;
            response.output = err.toString();
            resolve(response);
        }
    });
}

function replaceAll(text: string, textReplace: string, textReplace2: string): string {
    return text.split(textReplace).join(textReplace2).toString();
}
function setupReplaceAll(): void {
    String.prototype["replaceAll"] = function (textReplace, textReplace2) {
        return this.split(textReplace).join(textReplace2).toString();
    }
};
function promiseSleep(ms: number): Promise<void> {
    return new Promise(function (resolve, reject) {
        if (isNaN(ms)) reject("Incorrect usage! Correct usage: blueutilities.promiseSleep(Number)");
        setTimeout(resolve, ms);
    });
};
export default{ promiseSleep, setupReplaceAll, replaceAll, safeEval }