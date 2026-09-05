import type { MetadataRoute } from 'next';
import { PAGES, SUPPORT_PAGES, SITE_URL } from '@/lib/site';

/** 콘텐츠 23페이지 + 소개·문의 (정책 페이지는 noindex라 제외) */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: (p.path === '/' || p.grade === 'S' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: p.priority,
    })),
    ...SUPPORT_PAGES.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: p.priority,
    })),
  ];
}
