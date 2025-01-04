import { calculateComplexity, toUpperCaseWithCb } from "../../app/doubles/OtherUtils"

describe('OtherUtils test suit', () => {

    describe('Tracking callbacks with jest mocks', () => {

        const callBackMock = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
        })

        it('ToUpperCase with call back with Mocks Invalid', () => {
            const actual = toUpperCaseWithCb('', callBackMock)
            expect(actual).toBeUndefined()
            expect(callBackMock).toHaveBeenCalledWith('Invalid argument!')
            expect(callBackMock).toHaveBeenCalledTimes(1)
        })

        it('ToUpperCase with call back with Mocks valid', () => {
            const actual = toUpperCaseWithCb('any', callBackMock)
            expect(actual).toBe('ANY')
            expect(callBackMock).toHaveBeenCalledWith('Called function with any')
            expect(callBackMock).toHaveBeenCalledTimes(1)
        })
    })

    describe('Tracking callbacks', ()=> {

        let cbArgs: any[] = [];
        let timesCalled = 0;

        function callBackMock(arg:string){
            cbArgs.push(arg)
            timesCalled++
        }

        afterEach(() => {
            cbArgs = []
            timesCalled = 0
        })

        it('ToUpperCase with call back with Mocks Invalid', () => {
            const actual = toUpperCaseWithCb('', callBackMock)
            expect(actual).toBeUndefined()
            expect(cbArgs).toContain('Invalid argument!')
            expect(timesCalled).toBe(1)
        })

        it('ToUpperCase with call back with Mocks valid', () => {
            const actual = toUpperCaseWithCb('any', callBackMock)
            expect(actual).toBe('ANY')
            expect(cbArgs).toHaveLength(1)
            expect(timesCalled).toBe(1)
        })
        
    })

    it('Calculate Complexity with Stubs', () => {
        const someInfo = {
            lenght: 5,
            extraInfo: {
                field1: 'some',
                field2: 'any'
            }
        }
        const actual = calculateComplexity(someInfo as any);
        expect(actual).toBe(10)
    })

    it('ToUpperCase with call back with Fakes', () => {
        const actual = toUpperCaseWithCb('any', ()=>{})
        expect(actual).toBe('ANY')
    })

    it('ToUpperCase with call back with Fakes Invalid', () => {
        const actual = toUpperCaseWithCb('', ()=>{})
        expect(actual).toBeUndefined
    })
})