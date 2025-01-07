import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess"
import { DataBase } from "../../../app/server_app/data/DataBase"
import { Account } from "../../../app/server_app/model/AuthModel";


const insertMock = jest.fn();
const updateMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                update: updateMock,
                getBy: getByMock
            }
        })
    }
})

describe('SessionTokenDataAccess test suit', () => {
    let sut: SessionTokenDataAccess

    const someUser: Account = {
        id: '',
        userName: 'someUser',
        password: 'somePassword'
    }
    const someTokenId = '1234'
    beforeEach(() => {
        sut = new SessionTokenDataAccess();
    })
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Should return a valid token', async () => {
        insertMock.mockResolvedValueOnce(someTokenId);
        const actual = await sut.generateToken(someUser);

        expect(actual).toBe(someTokenId);
        expect(insertMock).toHaveBeenCalledTimes(1);
    })

    it('Should invalidate a valid token ', async () => {
        updateMock.mockResolvedValueOnce(someTokenId);
        const actual = await sut.invalidateToken(someTokenId);

        expect(updateMock).toHaveBeenCalledTimes(1);
        expect(updateMock).toHaveBeenCalledWith(
            someTokenId,
            'valid', 
            false
        )
    })

    it('should check avalid token', async () => {
        getByMock.mockResolvedValueOnce({valid: true})

        const actual = await sut.isValidToken({} as any);

        expect(getByMock).toHaveBeenCalledTimes(1);
        expect(actual).toBe(true);
    })

    it('should check invalid token', async () => {
        getByMock.mockResolvedValueOnce({ valid: false });

        const actual = await sut.isValidToken({} as any);

        expect(getByMock).toHaveBeenCalledTimes(1);
        expect(actual).toBe(false);
    })
    
    it('should check inexistent token', async () => {
        getByMock.mockResolvedValueOnce(undefined);
        const actual = await sut.isValidToken({} as any);
        expect(actual).toBe(false);
    })

    
})