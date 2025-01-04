/* istanbul ignore next */
export function checkForNumber(password: string, reasons: any[]): any {
    const numberRegex = /\d/; // Mova para um local global se for reutilizado
    if (!numberRegex.test(password)) {
        reasons.push('nao tem numero')
    }
    console.log('Teste --- ')
}

/* istanbul ignore next */
export function checkAdminPassword(password: string): any{
    const basicCheck = {
        valid: true,
        reasons: []
    }
    checkForNumber(password, basicCheck.reasons)
    return {
        valid: basicCheck.reasons.length > 0 ? false : true,
        reasons: basicCheck.reasons
    }
}

export type ObjInfos = {
    number: Number,
    around: Object
}

export function nextNumber(arg: ObjInfos, callback: Function): string | void{
    if(!arg){
        callback('Invalid argument')
        return;
    }
    callback(`${arg.number}`)
    return(`${arg.number}`)
}