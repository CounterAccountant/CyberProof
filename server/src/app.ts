
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { IController } from 'cyberproof-types';
import * as http from "http";

const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Set-Cookie",
        "Authorization",
        "cookies",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Credentials",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: [
        'http://localhost:9091/',
        'https://web-prod',
    ],
    preflightContinue: true
};

class App {
    public app: express.Application;
    public httpServer: http.Server;
    
    constructor(controllers: IController[]) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeSocketIo();
    }

    public listen() {
        this.httpServer = this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`App listening on the port ${process.env.SERVER_PORT}`);
        });
    }

    public getServer() {
        return this.app;
    }
    
    public getHttpServer() {
        return this.httpServer;
    }

    private initializeMiddlewares() {
        this.app.use(morgan('tiny'));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }


    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use(
                '/',
                controller.router
            );
        });
    }

    private async connectToTheDatabase() {
        try {
            const connection = await mongoose.connect(`${process.env.MONGO_PATH}/cyberproof`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        } catch (error) {
            console.log('error when trying to connect to mongose is: ', error);
        }
    }

    private initializeSocketIo() {

    }
}

export default App;
