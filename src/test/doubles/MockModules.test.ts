jest.mock('../../app/doubles/OtherUtils', () => ({
    ...jest.requireActual('../../app/doubles/OtherUtils'),
    calculateComplexity: ()=>{return 10}
}));

jest.mock('uuid', () => ({
    v4: ()=>'123'
}))
import * as OtherUtils from '../../app/doubles/OtherUtils';

describe('Module Test', () => {
    
    it('Calculate Complexity', () => {
        const result = OtherUtils.calculateComplexity({} as any);
        expect(result).toBe(10)
    })
    it('ToUpperCase test', () => {
        const result = OtherUtils.toUpperCaseWithId('abc');
        expect(result).toBe('ABC123')
    })
})