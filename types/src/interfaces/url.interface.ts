// We don't want to use that because 
// import { URL } from 'url';
import IMongoSchema from './mongo.schema.interface';


export default interface IUrl {
    original_url: string;
    url_id: string;
}

export interface ISavedUrl extends IUrl, IMongoSchema { };