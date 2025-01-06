import { v4 } from "uuid";

export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    lenght: number,
    extraInfo: Object
}


type LoggerServiceCallback = (arg: string) => void;

export function toUpperCaseWithId(arg: string){
    return arg.toUpperCase() + v4();
}
export function toLowerCaseWithId(arg: string){
    return arg.toLowerCase() + v4();
}

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

export class OtherStringUtils {

    private callingTestPrivate(arg: string){
        console.log(arg)
    }

    public toUpperCase(arg: string){
        return arg.toUpperCase()
    }
    
    public logString(arg: string){
        if(arg.length < 5){
            return('Data too short')
        }else{
            console.log(arg)
        }
    }
}