import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from 'http';
import * as cors from 'cors';
import * as mongoose from "mongoose";
import { Routes } from './routes';
import { MONGO_URL, SERVER_PORT } from "./config";

export default class App {
    private static _instance: App;
    public app: express.Application;
    public port: number;       
    private httpServer: http.Server;
    public routes: Routes = new Routes();

    private constructor() {
        this.app = express();
        this.port= SERVER_PORT;
        this.config();     
        this.httpServer = new http.Server( this.app );
        this.routes.routes(this.app);
        this.mongoSetup(); 
    }

    private config(): void {                   
        this.app.use(bodyParser.json({limit: '8192mb'}))
        this.app.use(bodyParser.urlencoded({limit: '8192mb', extended: true}))
        this.app.use(function (req, res, next) {
            // Set CORS headers                        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });           
        this.app.use( cors({ origin: '*', credentials: false  }) );        
        this.app.get('/', (req, res) => {
            res.status(200).json(
                {
                    ok: true,                   
                    port: SERVER_PORT,                                     
                    date: new Date()
                }
            );
        });             
    }

    private mongoSetup(): void {
        mongoose
            .connect(MONGO_URL, {
                serverSelectionTimeoutMS: 30000, // 30 seconds to connect to the server
                socketTimeoutMS: 300000,        // 5 minutes
            })
            .then(() => {
                console.log('Database ONLINE');
            })
            .catch((error) => {
                console.error('Error connecting to database:', error);
            });
    }    

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }   

    start( callback: any ) {
        this.httpServer.listen( this.port, callback );
    } 
}