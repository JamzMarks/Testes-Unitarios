import { HTTP_CODES } from "../../../app/server_app/model/ServerModel";


export class ResponseTestWrapper {
    
    public statusCode: HTTP_CODES = HTTP_CODES.OK
    public headers = new Array<object>();
    public body: object = {}

    public writeHead(statusCode: HTTP_CODES, header: object){
        this.statusCode = statusCode;
        this.headers.push(header)
    }

    public write(stringfiedBody: string, ){
        this.body = JSON.parse(stringfiedBody)
    }

    public end(){

    }
    public clearFields(){
        this.statusCode =  HTTP_CODES.OK;
        this.headers.length = 0;
        this.body = {}
    }
}