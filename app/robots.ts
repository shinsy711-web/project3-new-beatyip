import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * robots.txt
 *
 * Disallow를 쓰지 않는다. 이 사이트는 전부 정적 콘텐츠이고 막아야 할 경로가 없다.
 * 정책 페이지(/privacy-social-policy 류)는 페이지 자체에 noindex 메타를 두는 방식으로 처리한다 —
 * robots로 크롤을 막으면 크롤러가 noindex를 읽지 못해 오히려 URL만 검색결과에 남을 수 있다.
 *
 * AI 크롤러는 별도 그룹으로 명시해 허용한다.
 * (User-Agent 그룹이 따로 있으면 해당 봇은 '*' 그룹을 무시하고 자기 그룹만 따르므로,
 *  명시해두면 나중에 '*'에 Disallow가 추가돼도 AI 검색 노출이 끊기지 않는다.)
 */

const AI_CRAWLERS = [
  'GPTBot',              // OpenAI (ChatGPT 학습·검색)
  'OAI-SearchBot',       // OpenAI 검색 색인
  'ChatGPT-User',        // ChatGPT 사용자 요청 시 실시간 조회
  'ClaudeBot',           // Anthropic
  'Claude-Web',
  'Google-Extended',     // Gemini / AI 개요
  'PerplexityBot',
  'CCBot',               // Common Crawl
  'Bytespider',          // ByteDance
  'Applebot-Extended',   // Apple 인텔리전스
  'meta-externalagent',  // Meta AI
  'Amazonbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
