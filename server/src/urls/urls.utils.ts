import validUrl from "valid-url";

export const validateUrl = (url: string): boolean => {
    console.log('url is: ', url);
    console.log('validUrl.isUri(url) is: ', validUrl.isUri(url));
    return validUrl.isUri(url) ? true : false;
}

export const getUrlFromId = (id: string) => {
    return process.env.API_URL + 'urls/' + id
}

export const getIdFromUrl = (url: string) => {
    return url.replace(process.env.API_URL + 'urls/', '');
}