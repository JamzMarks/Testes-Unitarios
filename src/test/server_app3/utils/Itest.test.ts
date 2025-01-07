import { Account } from "../../../app/server_app/model/AuthModel";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";
import { Server } from "../../../app/server_app/server/Server"

describe('Server app integration tests', () => {
    let server: Server

    beforeEach(() => {
        server = new Server();
        server.startServer();
    })

    afterEach(() => {
        server.stopServer();
    })

    const someUser: Account = {
        id: '',
        userName: 'someName',
        password: 'somePassword'
    }

    it('should register new User', async () => {
        const result = await fetch('http://localhost:8080/register', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someUser)         
        });
        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.userId).toBeDefined();
    })

})

