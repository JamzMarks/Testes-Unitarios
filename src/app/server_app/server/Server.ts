import { createServer, IncomingMessage, Server as NodeServer, ServerResponse } from 'http'
import { Authorizer } from '../auth/Authorizer.ts';
import { ReservationsDataAccess } from '../data/ReservationsDataAccess.ts';
import { LoginHandler } from '../handlers/LoginHandler.ts';
import { RegisterHandler } from '../handlers/RegisterHandler.ts';
import { ReservationsHandler } from '../handlers/ReservationsHandler.ts';
import { HTTP_CODES } from '../model/ServerModel.ts';

export class Server {

    private server: NodeServer | undefined;
    private authorizer = new Authorizer();
    private reservationsDataAccess = new ReservationsDataAccess();

    public async startServer() {
        this.server = createServer(async (req, res) => {
            console.log(`Got request from ${req.headers['user-agent']}`);
            console.log(`Got request for ${req.url}`);
            await this.handleRequest(req, res);
            res.end();
        });
        this.server.listen(8080);
        console.log('server started')
    }

    private async handleRequest(request: IncomingMessage, response: ServerResponse) {
        try {
            const route = this.getRouteFromUrl(request);
            switch (route) {
                case 'register':
                    await new RegisterHandler(request, response, this.authorizer).handleRequest();
                    break;
                case 'login':
                    await new LoginHandler(request, response, this.authorizer).handleRequest();
                    break;
                case 'reservation':
                    const reservation = new ReservationsHandler(request, response, this.authorizer, this.reservationsDataAccess)
                    await reservation.handleRequest();
                    break;
                default:
                    break;
            }
        } catch (error: any) { //Corrigir aqui depois
            response.writeHead(HTTP_CODES.INTERNAL_SERVER_ERROR, JSON.stringify(`Internal server error: ${error.message}`))
            console.log(error);
        }
    }

    private getRouteFromUrl(request: IncomingMessage) {
        const fullRoute = request.url;
        if (fullRoute) {
            return fullRoute.split('/')[1];
        }
    }

    public async stopServer() {
        if (this.server) {
            console.log('closing server');
            return new Promise<void>((resolve, reject) => {
                this.server!.close((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('server closed');
                        resolve();
                    }
                });
            });
        }
    }
}