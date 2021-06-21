import * as worker from "worker_threads";
import * as vm from "vm";
import { safeEvalReturnedType, initialMessageType } from "./types";
worker.parentPort.once("message", (msg: initialMessageType) => {
    let { evalCode, vmOptions } = msg;
    let output: string;
    let error: boolean = false;
    try {
        output = vm.runInNewContext(evalCode, {}, {
            breakOnSigint: true,
            timeout: vmOptions.timeout ?? 500
        });
    } catch (err) {
        error = true;
        output = err.toString();
    }
    let toSend: safeEvalReturnedType = { error, output };
    worker.parentPort.postMessage(toSend)
})
