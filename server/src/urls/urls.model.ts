import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISavedUrl, IPostUrlResponse, IGetUrlResponse } from "cyberproof-types";
import timeStamps from '../services/timestamps';
import { validateUrl, getIdFromUrl, getUrlFromId } from './urls.utils';
import { nanoid } from 'nanoid'



export type IUrlWithMethods = ISavedUrl & Document


export interface IUrlModel extends Model<IUrlWithMethods> {
    createUrl(url: string): Promise<IPostUrlResponse>;
    getOriginalUrl(url: string):Promise<IGetUrlResponse>;
}



const UrlsSchema = new Schema({
    original_url: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    },
    url_id: {
        type: String,
        unique: true
    },
}, timeStamps);

UrlsSchema.path('original_url').validate((val: string) => {
    return validateUrl(val);
}, 'Invalid URL.');



UrlsSchema.statics.createUrl = async function (url: string): Promise<IPostUrlResponse> {
    const validated = validateUrl(url);
    console.log('validated is: ', validated);
    if (!validated) {
        return {
            success: false,
            message: 'Invalid URL.'
        }
    }
    const shortenedId = nanoid();
    const Url: IUrlModel = this.model('urls');
    try {

        await Url.create({
            original_url: url,
            url_id: shortenedId
        });

        return {
            success: true,
            shortened_url: getUrlFromId(shortenedId),
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}


UrlsSchema.statics.getOriginalUrl = async function (url: string):Promise<IGetUrlResponse> {
    const urlId = getIdFromUrl(url);
    const Url: IUrlModel = this.model('urls');
    const foundUrl = await Url.findOne({ url_id: urlId });
    if (!foundUrl) {
        return {
            success:false,
            message:`Url ${url} was not found`
        }
    }
    return {
        success:true,
        original_url:foundUrl.original_url
    }

}


export default mongoose.model<IUrlWithMethods, IUrlModel>('urls', UrlsSchema);

