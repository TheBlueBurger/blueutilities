import * as threads from "worker_threads";
import * as path from "path";
import { safeEvalReturnedType, vmOptionsType, initialMessageType } from "./types";

function safeEval(evalCode: string, vmOptions: vmOptionsType = { enabled: true }): Promise<safeEvalReturnedType> {
    return new Promise(function (resolve, _reject) {
        let response: safeEvalReturnedType = {
            "error": false,
            "output": ""
        }
        try {
            // @ts-expect-error
            if(vmOptions.__debugThrowErrInIndex) throw new Error("Debug throw error");
            vmOptions.enabled = vmOptions.enabled ?? true;
            vmOptions.timeout = vmOptions.timeout ?? 2000;
            if (vmOptions.enabled) {
                const worker = new threads.Worker(path.join(__dirname, "/safeEvalWorker.js"));
                let timeoutTimeout = setTimeout(() => {
                    let awaitWorkerTerminateTimeout = setTimeout(() => {
                        response.error = true;
                        response.output = "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.";
                        worker.terminate();
                        resolve(response);
                    }, "__debugFreeze" in vmOptions ? 0 : 2000);
                    if (!("__debugFreeze" in vmOptions)) {
                        worker.terminate().then(() => {
                            clearTimeout(awaitWorkerTerminateTimeout);
                            response.error = true;
                            response.output = "Too slow response.";
                            resolve(response);
                        });
                    }
                }, "__debugFreeze" in vmOptions ? 0 : vmOptions.timeout)
                worker.once("online", () => {
                    let messageToSend: initialMessageType = { evalCode, vmOptions };
                    worker.postMessage(messageToSend);
                });
                worker.once("message", (msg: safeEvalReturnedType) => {
                    if (!msg || !msg.error || !msg.output) {
                        msg = msg ?? {
                            error: true,
                            output: "Worker did not send a valid message."
                        }
                    }
                    response.error = msg.error ?? response.error;
                    response.output = `${msg.output}`;
                    let awaitWorkerTerminateTimeout = setTimeout(() => {
                        response.error = true;
                        response.output = "Catastrophic error: Worker took longer then 2 seconds to terminate. Please report this.";
                        worker.terminate();
                        resolve(response);
                    }, "__debugFreeze2" in vmOptions ? 0 : 2000)
                    clearTimeout(timeoutTimeout);
                    if (!("__debugFreeze2" in vmOptions)) {
                        worker.terminate().then(() => {
                            clearTimeout(awaitWorkerTerminateTimeout);
                            resolve(response);
                        })
                    }
                });
                worker.once("error", err => {
                    response.error = true;
                    response.output = `Worker error: ${err}`;
                    resolve(response);
                })
            } else {
                try {
                    response.output = `${eval(evalCode)}`;
                    resolve(response);
                } catch (err) {
                    response.error = true;
                    response.output = err.toString();
                    resolve(response);
                }
            }
        } catch (err) {
            response.error = true;
            response.output = "An unknown error occurred while executing safeEval: " + err + "\nPlease submit a issue.";
            resolve(response);
        }
    });
}

function replaceAll(text: string, textReplace: string, textReplace2: string): string {
    return text.split(textReplace).join(textReplace2).toString();
}
/**
 * @deprecated
 */
function setupReplaceAll(): void {
    String.prototype["replaceAll"] = function (textReplace, textReplace2) {
        return replaceAll(this, textReplace, textReplace2);
    }
}
function promiseSleep(ms: number): Promise<void> {
    return new Promise(function (resolve, reject) {
        if (isNaN(ms)) reject("Incorrect usage! Correct usage: blueutilities.promiseSleep(Number);");
        setTimeout(resolve, ms);
    });
}


export { promiseSleep, setupReplaceAll, replaceAll, safeEval }
export default { promiseSleep, setupReplaceAll, replaceAll, safeEval }