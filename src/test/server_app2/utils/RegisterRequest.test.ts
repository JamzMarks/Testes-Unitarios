import { ResponseTestWrapper } from './ResponseTestWrapper';
import { DataBase } from "../../../app/server_app/data/DataBase"
import { RequestTestWrapper } from "./RequestTestWrapper"
import { Server } from '../../../app/server_app/server/Server';
import { HTTP_CODES, HTTP_METHODS } from '../../../app/server_app/model/ServerModel';

// jest.mock('../../../app/server_app/data/DataBase')

const requestWrapper = new RequestTestWrapper();
const responseWrapper = new ResponseTestWrapper();

const fakeServer = {
    close: () => {},
    listen: () => {}
}

jest.mock('http', () => ({
    createServer: (cb: Function) => {
        cb(requestWrapper, responseWrapper)
        return fakeServer
    }
}))

describe('Register Request test suit', () => {
    afterEach(() => {
        requestWrapper.clearFields();
        responseWrapper.clearFields();
    })

    it('should register new user', async () => {
        requestWrapper.method = HTTP_METHODS.POST;
        requestWrapper.body = {
            userName: 'someUser',
            password: 'somePassword'
        };
        requestWrapper.url = 'localhost:8080/register'
        jest.spyOn(DataBase.prototype, 'insert').mockResolvedValueOnce('1234')
        await new Server().startServer()
        await new Promise(process.nextTick)

        expect(responseWrapper.body).toEqual(expect.objectContaining({
            userId: expect.any(String)
        }))
        expect(responseWrapper.statusCode).toBe(HTTP_CODES.CREATED)
    })

    it('should reject request with no userName and password', async () => {
        requestWrapper.method = HTTP_METHODS.POST;
        requestWrapper.body = {};
        requestWrapper.url = 'localhost:8080/register'
        await new Server().startServer()
        await new Promise(process.nextTick)

        expect(responseWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(responseWrapper.body).toBe('userName and password required')
    })

    it('should do nothing with wrong method', async () => {
        requestWrapper.method = HTTP_METHODS.DELETE;
        requestWrapper.body = {};
        requestWrapper.url = 'localhost:8080/register'
        await new Server().startServer()
        await new Promise(process.nextTick)

        expect(responseWrapper.statusCode).toBe(HTTP_CODES.OK);
        expect(responseWrapper.body).toEqual({})
        // expect(responseWrapper.body).toBe('userName and password required')
    })
})