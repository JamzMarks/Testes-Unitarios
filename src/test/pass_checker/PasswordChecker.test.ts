import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/PasswordChecker"

describe('PasswordChecker test suit', () => {
    let sut: PasswordChecker

    beforeEach(()=> {
        sut = new PasswordChecker
    })

    it('Password with less than 8 chars is invalid', () => {
        const actual = sut.checkPassword('123456')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.SHORT)
    })
    it('Password with less than 8 chars is ok', () => {
        const actual = sut.checkPassword('12345678Aa')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    })
    it('Password with no uppercase is invalid', () => {
        const actual = sut.checkPassword('abacaxi123')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE)
    })
    it('Password with uppercase is ok', () => {
        const actual = sut.checkPassword('Abacaxi123')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)
    })
    it('Password with no lowercase is invalid', () => {
        const actual = sut.checkPassword('ABACAXI123')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE)
    })
    it('Complex valid password', () => {
        const actual = sut.checkPassword('Abacaxi1234')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).toHaveLength(0)
    })
    
    it('Normal password with no number is invalid', () => {
        const actual = sut.checkPassword('Abacaxigrandao')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER)
    })
    it('Normal password with number is ok', () => {
        const actual = sut.checkPassword('Abacaxigrandao1')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER)
    })

    it('Admin password with no number is invalid', () => {
        const actual = sut.checkPassword('Abacaxigrandao')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER)
    })
    it('Admin password with number is ok', () => {
        const actual = sut.checkPassword('Abacaxigrandao123')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER)
    })
})