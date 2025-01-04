import { toUpperCase, getStringInfo, StringUtils } from "../app/utils"

//Triple A = AAA
describe('Utils test suite', () => {
    describe('StringUtils Teste', () => {
        let sut: StringUtils

        beforeEach(() => {
            sut = new StringUtils();
        })
        afterEach(() => {
            //clearing mocks
            console.log('Teardown')
        })
        it('Should return corret upperCase', () => {
            const actual = sut.toUpperCase('abc')

            expect(actual).toBe('ABC')
        })
        it('Should throw error on invalid argument', () => {
            expect(() => {
                sut.toUpperCase('')
            }).toThrow();

        })
    })

    it('Should return uppercase of valid string', () => {
        // arrange:
        const sut = toUpperCase
        const expected = 'ABC'
        
        // act:
        const actual = toUpperCase('abc')

        // assert:
        expect(actual).toBe(expected)
    })

    it('Should return info for a valid string', () => {
        const actual = getStringInfo('My-String')

        expect(actual.lowerCase).toBe('my-string')
        expect(actual.extraInfo).toEqual({})
        expect(actual.characters).toHaveLength(9)
    })
})

