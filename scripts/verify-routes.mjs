// 빌드 후 next start 로 띄운 서버에 대해 23페이지 + sitemap/robots/ads.txt 를 점검한다.
// 사용: node scripts/verify-routes.mjs [http://localhost:3000]
import fs from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const src = fs.readFileSync(new URL('../lib/site.ts', import.meta.url), 'utf8');
const pages = [...src.matchAll(/path: '([^']+)', parent[^\n]*\n[\s\S]*?title: '([^']+)'/g)].map((m) => ({ path: m[1], title: m[2] }));

const decode = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let fail = 0;
const row = (ok, msg) => { if (!ok) fail++; console.log(`${ok ? '✓' : '✗'} ${msg}`); };

for (const p of pages) {
  const url = BASE + p.path;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const html = await res.text();
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '').trim();
    const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
    const ld = (html.match(/application\/ld\+json/g) || []).length;
    const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || '';
    const noindex = /name="robots" content="[^"]*noindex/.test(html);
    const forms = (html.match(/동의하고 상담 신청하기|무료로 받기|견적 받기|상담|진단/g) || []).length;
    const bodyText = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
    const koChars = (bodyText.match(/[가-힣]/g) || []).length;
    const okStatus = res.status === 200;
    const okTitle = title === p.title;
    const okH1 = !!h1;
    const okLd = ld >= 2;
    const okCanon = canonical.endsWith(p.path);
    row(okStatus && okTitle && okH1 && okLd && okCanon && !noindex,
      `${p.path.padEnd(22)} ${res.status} ld=${ld} ko=${koChars} h1="${(h1 || '').slice(0, 28)}"${okTitle ? '' : ` TITLE MISMATCH: "${title}"`}${okCanon ? '' : ` CANON=${canonical}`}${noindex ? ' NOINDEX!' : ''}${forms ? '' : ' NO-CTA'}`);
  } catch (e) {
    row(false, `${p.path} fetch error: ${e.message}`);
  }
}

// 소개·문의(SUPPORT_PAGES)는 색인 대상이므로 noindex가 아닌지 확인한다.
for (const f of ['/about/', '/contact/']) {
  const res = await fetch(BASE + f);
  const html = await res.text();
  const noindex = /name="robots" content="[^"]*noindex/.test(html);
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '').trim();
  row(res.status === 200 && !noindex && !!h1, `${f.padEnd(22)} ${res.status} h1="${(h1 || '').slice(0, 24)}"${noindex ? ' NOINDEX!' : ''}`);
}

const SUPPORT_COUNT = 2;
for (const f of ['/sitemap.xml', '/robots.txt', '/ads.txt', '/privacy-policy/', '/terms-of-service/']) {
  try {
    const res = await fetch(BASE + f);
    const body = await res.text();
    let extra = '';
    if (f === '/sitemap.xml') {
      const locs = (body.match(/<loc>/g) || []).length;
      const expected = pages.length + SUPPORT_COUNT;
      extra = ` locs=${locs}`;
      row(locs === expected, `${f} ${res.status}${extra} (expected ${expected} = 콘텐츠 ${pages.length} + 소개·문의 ${SUPPORT_COUNT})`);
      continue;
    }
    if (f === '/robots.txt') extra = body.includes('Sitemap:') ? ' has-sitemap' : ' NO-SITEMAP';
    if (f.endsWith('-policy/') || f.endsWith('-service/')) extra = /noindex/.test(body) ? ' noindex ok' : ' MISSING NOINDEX';
    row(res.status === 200 && !extra.includes('NO') && !extra.includes('MISSING'), `${f} ${res.status}${extra}`);
  } catch (e) {
    row(false, `${f} fetch error: ${e.message}`);
  }
}

console.log(fail ? `\n${fail} 개 실패` : '\n전부 통과');
process.exit(fail ? 1 : 0);
