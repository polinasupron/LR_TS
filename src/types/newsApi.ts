export interface ApiSource {
    id: string | null;
    name: string;
}

export interface ApiArticle {
    source: ApiSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface NewsApiSourcesResponse {
    status: string;
    sources: {
        id: string;
        name: string;
    }[];
}

export interface NewsApiEverythingResponse {
    status: string;
    totalResults: number;
    articles: ApiArticle[];
}

export type ArrayElement<T extends readonly unknown[]> = T[number];

export type NewsSource = ArrayElement<NewsApiSourcesResponse['sources']>;
export type NewsArticle = ArrayElement<NewsApiEverythingResponse['articles']>;

