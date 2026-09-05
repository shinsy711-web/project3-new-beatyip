import type { Metadata } from 'next';
import { getPage, OG, OG_IMAGE, SITE_NAME } from './site';

/**
 * 레지스트리 기반 페이지 메타데이터.
 * 설계서 title을 그대로 쓰기 위해 absolute 사용(레이아웃 템플릿 미적용).
 */
export function pageMetadata(path: string, overrides: Metadata = {}): Metadata {
  const p = getPage(path);
  return {
    title: { absolute: p.title },
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: p.title,
      description: p.description,
      url: path,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: path === '/' ? 'website' : 'article',
      images: [{ url: OG_IMAGE, width: OG.width, height: OG.height, alt: p.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description,
      images: [OG_IMAGE],
    },
    ...overrides,
  };
}
