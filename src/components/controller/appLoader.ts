import Loader, { LoaderOptions } from './loader';

interface EnvVariables {
    API_URL: string;
    API_KEY: string;
}

declare const process: {
    env: EnvVariables;
};

class AppLoader extends Loader {
    constructor() {
        const baseLink: string = process.env.API_URL;
        const options: LoaderOptions = {
            apiKey: process.env.API_KEY,
        };

        super(baseLink, options);
    }
}

export default AppLoader;

