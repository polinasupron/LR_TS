import News from './news/news';
import Sources from './sources/sources';
import {
    NewsApiEverythingResponse,
    NewsApiSourcesResponse,
    NewsArticle,
    NewsSource,
} from '../../types/newsApi';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsApiEverythingResponse): void {
        const values: NewsArticle[] = data?.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: NewsApiSourcesResponse): void {
        const values: NewsSource[] = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;

