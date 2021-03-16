import { NextFunction, Response, Request } from "express";
import urlsModel from "./urls.model";
import { getUrlFromId, validateUrl } from './urls.utils';



const urlMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.nano_id) {
        return res.send('No url provided');
    }
    
    // req['url'] = getUrlFromId(req.params.nano_id);
    req['url'] = (await urlsModel.getOriginalUrl(req.params.nano_id)).original_url;
    next();
}


export default urlMiddleware;