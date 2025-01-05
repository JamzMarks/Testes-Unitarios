import { calculateComplexity, OtherStringUtils, toUpperCaseWithCb } from "../../app/doubles/OtherUtils"

describe.skip('OtherUtils test suit', () => {

    describe('OtherStringUtils test with spies', () => {
        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        })

        test('Use a spy to track call to UpperCase', () => {
            const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase")
            sut.toUpperCase('asa')
            expect(toUpperCaseSpy).toHaveBeenCalledWith('asa')
        })

        test('Use a spy to track call logString', () => {
            const consoleLogSpy = jest.spyOn(sut, "logString")
            sut.logString('asa');
            expect(consoleLogSpy).toHaveBeenCalledWith('asa');
        })
        it('Use a spy to call logString with a invalid data', () => {
            const consoleLogSpy = jest.spyOn(sut, "logString")
            sut.logString('data');
            expect(consoleLogSpy).toHaveBeenCalledWith('data')
        })

        fit('Use Spy to track a private method in a class', () => {
            jest.spyOn(sut as any, 'callingTestPrivate').mockImplementation(() => {
                console.log('Calling mock implementation!')
            })
        })
    
       
    })

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