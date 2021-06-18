import * as threads from "worker_threads";
import * as path from "path";
import {safeEvalReturnedInterface, vmOptionsInterface, initialMessageInterface} from "./types";

function safeEval(evalCode: string, vmOptions: vmOptionsInterface = { enabled: true }): Promise<safeEvalReturnedInterface> {
    return new Promise(function (resolve, _reject) {
        let response: safeEvalReturnedInterface = {
            "error": false,
            "output": ""
        }
        try {
            vmOptions.enabled = vmOptions.enabled ?? true;
            vmOptions.timeout = vmOptions.timeout ?? 500;
            vmOptions.ramLimit = vmOptions.ramLimit ?? 16;
            if (vmOptions.enabled) {
                const worker = new threads.Worker(path.join(__dirname, "/safeEvalWorker.js"), {
                    resourceLimits: {
                        maxOldGenerationSizeMb: vmOptions.ramLimit
                    }
                });
                let timeoutTimeout = setTimeout(() => {
                    worker.terminate();
                    response.error = true;
                    response.output = "Too slow response.";
                    resolve(response);
                }, vmOptions.timeout)
                worker.once("online", () => {
                    let messageToSend: initialMessageInterface = { evalCode, vmOptions };
                    worker.postMessage(messageToSend);
                });
                worker.once("message", msg => {
                    if (msg instanceof Error) response.error = true;
                    response.error = msg.error ?? response.error;
                    response.output = `${msg.output}`;
                    worker.terminate();
                    clearTimeout(timeoutTimeout);
                    resolve(response);
                });
                worker.once("error", err => {
                    if(err.name == "ERR_WORKER_OUT_OF_MEMORY") {
                        worker.terminate();
                        clearTimeout(timeoutTimeout);
                        response.error = true;
                        response.output = "Ran out of memory";
                        resolve(response);
                    }
                })
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
        if (isNaN(ms)) reject("Incorrect usage! Correct usage: blueutilities.promiseSleep(Number);");
        setTimeout(resolve, ms);
    });
};


export {promiseSleep, setupReplaceAll, replaceAll, safeEval}
export default {promiseSleep, setupReplaceAll, replaceAll, safeEval}