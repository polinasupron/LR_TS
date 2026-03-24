type HttpMethod = 'GET';

export type LoaderOptions = Record<string, string>;

interface GetRespParams {
    endpoint: string;
    options?: LoaderOptions;
}

type GetRespCallback<TResponse> = (data: TResponse) => void;

class Loader {
    protected baseLink: string;
    protected options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<TResponse>(
        { endpoint, options = {} }: GetRespParams,
        callback: GetRespCallback<TResponse> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<TResponse>('GET', endpoint, callback, options);
    }

    protected errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    protected makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions: LoaderOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    protected load<TResponse>(
        method: HttpMethod,
        endpoint: string,
        callback: GetRespCallback<TResponse>,
        options: LoaderOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<TResponse>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;

