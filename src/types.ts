interface vmOptionsInterface {
    enabled: boolean;
    timeout?: number;
    ramLimit?: number;
}
interface initialMessageInterface {
    vmOptions: vmOptionsInterface;
    evalCode: string;
}
interface safeEvalReturnedInterface {
    error: boolean;
    output: string;
}

export {vmOptionsInterface, initialMessageInterface, safeEvalReturnedInterface}