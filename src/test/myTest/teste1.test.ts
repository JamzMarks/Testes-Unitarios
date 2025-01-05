import { nextNumber, ObjInfos } from "../../app/myTest/teste1"


describe('MyTest suit test', () => {

    it('Should return valid Argument', () => {
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

    
    it('Should return Invalid Argument', () => {
        const input = null;
        const actual = nextNumber(input as unknown as ObjInfos, () => {})
        expect(actual).toBeUndefined
    })

    describe('MyTest with mock test suit', () => {

        const callBackMock = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
        })

        it('Should return Invalid Argument', () => {
            const input = null;
            const actual = nextNumber(input as unknown as ObjInfos, callBackMock)
            expect(actual).toBeUndefined()
            expect(callBackMock).toHaveBeenCalledTimes(1)
            expect(callBackMock).toHaveBeenCalledWith('Invalid argument')
        })
    })
})