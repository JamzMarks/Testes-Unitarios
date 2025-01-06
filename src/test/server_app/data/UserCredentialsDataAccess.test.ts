import { DataBase } from "../../../app/server_app/data/DataBase"
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess"
import { Account } from "../../../app/server_app/model/AuthModel"

const insertMock = jest.fn()
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
        DataBase : jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                getBy: getByMock
            }
        })
    }
})

describe('UserCredentialsDataAccess test suit', () => {

    let sut: UserCredentialsDataAccess
    const fakeId = '1234'
    
    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1)
    })
    afterEach(() => {
        jest.clearAllMocks();
    })

    const someUser: Account = {
        id: '',
        userName: 'james',
        password: '12345678'
        
    }

    it('Should add user and return account id', async () => {
        insertMock.mockResolvedValueOnce(fakeId)
        const actualId = await sut.addUser(someUser)

        expect(actualId).toEqual(fakeId);
        expect(insertMock).toHaveBeenCalledWith(someUser)
    })

    it('Should return user by id', async () => {
        getByMock.mockResolvedValueOnce(someUser)

        const actualUser = await sut.getUserById(fakeId)

        expect(actualUser).toEqual(someUser)
        expect(getByMock).toHaveBeenCalledWith('id', fakeId)
    })

    it('Should return user by name', async () => {
        getByMock.mockResolvedValueOnce(someUser)

        const actualUser = await sut.getUserByUserName(someUser.userName)

        expect(actualUser).toEqual(someUser)
        expect(getByMock).toHaveBeenCalledWith('userName', someUser.userName)
    })
})