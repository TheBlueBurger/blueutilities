import * as worker from "worker_threads";
import * as vm from "vm";
import { safeEvalReturnedInterface } from "./types";
interface vmOptionsInterface {
    enabled: boolean;
    timeout?: number;
}
interface initialMessageInterface {
    vmOptions: vmOptionsInterface;
    evalCode: string;
}
worker.parentPort.once("message", (msg: initialMessageInterface) => {
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
    let toSend: safeEvalReturnedInterface = { error, output };
    worker.parentPort.postMessage({ error, output })
})
