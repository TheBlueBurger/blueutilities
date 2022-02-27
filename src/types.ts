type vmOptionsType = {
    enabled: boolean;
    timeout?: number;
}
type initialMessageType = {
    vmOptions: vmOptionsType;
    evalCode: string;
}
type safeEvalReturnedType = {
    error: boolean;
    output: string;
}
type allowedRandomStringTypes = "alphanumeric" | "alphanumeric_upper" | "alphanumeric_lower" | "all";

export {vmOptionsType, initialMessageType, safeEvalReturnedType, allowedRandomStringTypes}