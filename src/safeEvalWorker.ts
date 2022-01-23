import * as worker from "worker_threads";
import * as vm from "vm";
import { safeEvalReturnedType, initialMessageType } from "./types";
worker.parentPort.once("message", (msg: initialMessageType) => {
    let { evalCode, vmOptions } = msg;
    // @ts-expect-error
    if(vmOptions.__debugThrowErr) throw new Error("Debug throw error");
    let output: string;
    let error: boolean = false;
    try {
        output = vm.runInNewContext(evalCode, {}, {
            breakOnSigint: true,
            timeout: vmOptions.timeout ?? 2000
        });
    } catch (err) {
        error = true;
        output = err.toString();
    }
    let toSend: safeEvalReturnedType = { error, output };
    worker.parentPort.postMessage(toSend)
})
