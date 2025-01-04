export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    lenght: number,
    extraInfo: Object
}

type LoggerServiceCallback = (arg: string) => void
export function calculateComplexity(stringInfo: StringInfo){
    return Object.keys(stringInfo.extraInfo).length * stringInfo.lenght

}

export function toUpperCaseWithCb(arg: string, callBack: LoggerServiceCallback){
    if(!arg){
        callBack('Invalid argument!')
        return;
    }
    callBack(`Called function with ${arg}`);

    return arg.toUpperCase();
}