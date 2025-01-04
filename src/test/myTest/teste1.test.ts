import { nextNumber, ObjInfos } from "../../app/myTest/teste1"


describe('MyTest suit test', () => {

    fit('Should return valid Argument', () => {
        const actual = nextNumber({
            number: 5,
            around: {
                previous: 4,
                next: 6
            }
        }, (arg: string) => {
            return arg
        })
        expect(actual).toBe('5')
    })

    // fit('Should return Invalid Argument', () => {
    //     const actual = nextNumber(arg as ObjInfos, (arg: string) => {
    //         return arg
    //     })
    //     expect(actual).toBe('Invalid argument')
    // })
})