import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler"
import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer.ts";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel.ts";
import { Account } from "../../../app/server_app/model/AuthModel";

const getRequestBodyMock = jest.fn();

jest.mock('../../../app/server_app/utils/Utils', () => ({
    getRequestBody: () => getRequestBodyMock()
}));

describe('LoginHandler test suit', () => {
    
    let sut: LoginHandler;
     const request: {method: keyof typeof HTTP_METHODS} = {
            method: "GET"
        }
    
    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn()
    }

    const authorizerMock = {
        login: jest.fn()
    }
    const someAccount: Account = {
            id: '',
            password: 'somePassword',
            userName: 'someUserName'
        }

    const someToken = '1234';

    beforeEach(() => {
        sut = new LoginHandler(
            request as IncomingMessage,
            responseMock as any as ServerResponse,
            authorizerMock as any as Authorizer
        )
        })
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Should return token for valid accounts in requests', async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        authorizerMock.login.mockResolvedValueOnce(someToken)
        await sut.handleRequest()

        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.CREATED,
            {'Content-Type': 'application/json'}
        )
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify({
                token: someToken
            })
        )
    })
    it('should return not found for invalid accounts in requests', async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        authorizerMock.login.mockResolvedValueOnce(undefined)
        await sut.handleRequest()

        expect(authorizerMock.login).toHaveBeenLastCalledWith(
            someAccount.userName,
            someAccount.password
        )
        expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND)
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify('wrong username or password')
        )
    })

    it('should return bad request for invalid requests', async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce({});
        await sut.handleRequest()

        expect(authorizerMock.login).not.toHaveBeenCalled();
        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.BAD_REQUEST,
            {'Content-Type': 'application/json'}
        )
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify('userName and password required')
        );
    })

    it('should do nothing for not supported http methods', async () => {
        request.method = HTTP_METHODS.GET;
        await sut.handleRequest()

        expect(responseMock.writeHead).not.toHaveBeenCalled();
        expect(responseMock.write).not.toHaveBeenCalled();
        expect(getRequestBodyMock).not.toHaveBeenCalled();
    })
})