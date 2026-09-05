import { getPage, absUrl, OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';
import JsonLd from './JsonLd';

type Props = {
  path: string;
  datePublished?: string; // ISO (기본 2026-09-03)
  dateModified?: string;
};

/** 콘텐츠 페이지용 Article 스키마 (제목·설명·키워드는 레지스트리에서) */
export default function ArticleJsonLd({ path, datePublished = '2026-09-03', dateModified }: Props) {
  const p = getPage(path);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absUrl(path)}#article`,
    headline: p.h1,
    alternativeHeadline: p.title,
    description: p.description,
    keywords: p.keywords.join(', '),
    inLanguage: 'ko-KR',
    image: OG_IMAGE,
    mainEntityOfPage: absUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: p.keywords,
  };
  return <JsonLd data={data} />;
}
