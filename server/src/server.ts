import 'dotenv/config';
import App from './app';

import validateEnv from './utils/validateEnv';
import UrlsController from "./urls/urls.controller";

validateEnv();

const app = new App(
    [
        new UrlsController(),
    ],
);

app.listen();
