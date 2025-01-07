import { HTTP_METHODS } from "../../../app/server_app/model/ServerModel"


export class RequestTestWrapper {

    public body: object = {};
    public method: HTTP_METHODS = HTTP_METHODS.GET;
    public url: string = '';
    public headers = {}

    public on(event: any, cb: Function){
        if(event === 'data'){
            cb(JSON.stringify(this.body))
        }else{
            cb()
        }
    }

    public clearFields(){
        this.body = {};
        this.method = HTTP_METHODS.GET;
        this.url = '';
        this.headers = {};
    }
}