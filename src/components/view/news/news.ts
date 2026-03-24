import './news.css';
import { NewsArticle } from '../../../types/newsApi';

class News {
    public draw(data: NewsArticle[]): void {
        const news: NewsArticle[] =
            data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            const itemElement = newsClone.querySelector<HTMLElement>('.news__item');
            if (itemElement && idx % 2 === 1) {
                itemElement.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const titleEl = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (titleEl) {
                titleEl.textContent = item.title;
            }

            const sourceEl = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (sourceEl) {
                sourceEl.textContent = item.source.name;
            }

            const contentEl = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (contentEl) {
                contentEl.textContent = item.description;
            }

            const linkEl = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (linkEl) {
                linkEl.href = item.url;
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');
        if (!newsContainer) {
            return;
        }

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;

