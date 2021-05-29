interface safeEvalReturned {
    error: boolean;
    output: string;
}
declare function safeEval(evalcode: string): Promise<safeEvalReturned>;
declare function replaceAll(text: string, textReplace: string, textReplace2: string): string;
declare function setupReplaceAll(): void;
declare function promiseSleep(ms: number): Promise<void>;
export { promiseSleep, setupReplaceAll, replaceAll, safeEval };
