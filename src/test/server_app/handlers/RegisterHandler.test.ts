import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler"
import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer.ts";
import { HTTP_METHODS, HTTP_CODES } from "../../../app/server_app/model/ServerModel";
import { Account } from "../../../app/server_app/model/AuthModel";


const getRequestBodyMock = jest.fn();

jest.mock('../../../app/server_app/utils/Utils.ts', () => ({
    getRequestBody: () => getRequestBodyMock()
}))

describe('RegisterHandler test suit ', () => {
    let sut: RegisterHandler

    const request: {method: keyof typeof HTTP_METHODS} = {
        method: "GET"
    }

    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn()
    }

    const authorizerMock = {
        registerUser: jest.fn()
    }

    const someAccount: Account = {
        id: '',
        password: 'somePassword',
        userName: 'someUserName'
    }
    const someId = '1234';

    beforeEach(() => {
        sut = new RegisterHandler(
            request as IncomingMessage, 
            responseMock as any as ServerResponse, 
            authorizerMock as any as Authorizer
        )
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Should register valid accounts in request', async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        authorizerMock.registerUser.mockResolvedValueOnce(someId)
        
        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.CREATED,
            {'Content-Type': 'application/json' }
        )
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify({
                userId: someId
            })
        )

    })
    it('should return bad request for invalid requests', async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce({});
        await sut.handleRequest()

        expect(authorizerMock.registerUser).not.toHaveBeenCalled();
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