import { IController } from "cyberproof-types";
import express, { NextFunction, Response, Request } from "express";
import urlsModel from "./urls.model";
import { validateUrl } from './urls.utils';
import urlMiddleware from './urls.middleware';
import { RequestWithUrl } from './urls.interface';

export default class MessageController implements IController {
    public path = '/urls';
    public router = express.Router();
    private UrlsModel = urlsModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}/:nano_id`,
            urlMiddleware,
            this.redirectUrl
        );
        this.router.get(
            `${this.path}/get_url/:url`,
            this.getUrl
        );
        this.router.post(
            `${this.path}`,
            this.postUrl
        );
    }

    private redirectUrl = async (req: RequestWithUrl, res: Response, next: NextFunction) => {
        res.redirect(req.url);
    }

    private getUrl = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.url) {
            return res.send({ success: false, message: 'Url not provided' });
        }
        if (!validateUrl(req.params.url)) {
            return res.send({ success: false, message: 'Url invalid' });
        }
        const originalUrl = await this.UrlsModel.getOriginalUrl(req.params.url);
        res.json(originalUrl);
    }

    private postUrl = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.long_url) {
            return res.send({ success: false, message: 'Url not provided' });
        }
        if (!validateUrl(req.body.long_url)) {
            return res.send({ success: false, message: 'Url invalid' });
        }
        const fromCreateUrl = await this.UrlsModel.createUrl(req.body.long_url);
        res.json(fromCreateUrl);
    }

}