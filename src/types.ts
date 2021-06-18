type vmOptionsType = {
    enabled: boolean;
    timeout?: number;
    ramLimit?: number;
}
type initialMessageType = {
    vmOptions: vmOptionsType;
    evalCode: string;
}
type safeEvalReturnedType = {
    error: boolean;
    output: string;
}

export {vmOptionsType, initialMessageType, safeEvalReturnedType}