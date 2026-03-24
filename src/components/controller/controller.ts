import AppLoader from './appLoader';
import {
    NewsApiSourcesResponse,
    NewsApiEverythingResponse,
} from '../../types/newsApi';

type NewsCallback = (data: NewsApiEverythingResponse) => void;
type SourcesCallback = (data: NewsApiSourcesResponse) => void;

class AppController extends AppLoader {
    public getSources(callback: SourcesCallback): void {
        super.getResp<NewsApiSourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: NewsCallback): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== null && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                const currentSourceId: string | null = newsContainer.getAttribute('data-source');

                if (sourceId !== null && currentSourceId !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<NewsApiEverythingResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;

