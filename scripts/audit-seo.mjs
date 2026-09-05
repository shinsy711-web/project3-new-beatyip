// SEO/메타/구조 정밀 점검. 사용: node scripts/audit-seo.mjs [http://localhost:3129]
import fs from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:3129').replace(/\/$/, '');
const src = fs.readFileSync(new URL('../lib/site.ts', import.meta.url), 'utf8');
const PAGES = [...src.matchAll(/path: '([^']+)', parent: (null|'[^']*'), section: '([^']*)'[\s\S]*?title: '([^']+)'[\s\S]*?keywords: \[([^\]]*)\]/g)]
  .map((m) => ({ path: m[1], parent: m[2] === 'null' ? null : m[2].replace(/'/g, ''), section: m[3], title: m[4], keywords: [...m[5].matchAll(/'([^']+)'/g)].map((k) => k[1]) }));

const dec = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const issues = [];
const warn = (sev, path, msg) => issues.push({ sev, path, msg });
const koLen = (s) => (s.match(/[가-힣]/g) || []).length;

const docs = {};
for (const p of PAGES) {
  const res = await fetch(BASE + p.path);
  docs[p.path] = await res.text();
}

console.log('=== 1. 제목/설명 길이 (검색결과 잘림 기준: 제목 한글 ~30자, 설명 ~80자) ===');
for (const p of PAGES) {
  const html = docs[p.path];
  const title = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const tLen = title.replace(/\s/g, '').length;
  const dLen = desc.replace(/\s/g, '').length;
  const flag = [];
  if (tLen > 35) flag.push(`제목 ${tLen}자(잘림)`);
  if (dLen > 90) flag.push(`설명 ${dLen}자(잘림)`);
  if (dLen < 50) flag.push(`설명 ${dLen}자(짧음)`);
  if (flag.length) warn('중', p.path, flag.join(' · '));
  console.log(`${p.path.padEnd(22)} 제목 ${String(tLen).padStart(3)}자  설명 ${String(dLen).padStart(3)}자`);
}

console.log('\n=== 2. 필수 메타 태그 ===');
const need = [
  ['canonical', /<link rel="canonical" href="([^"]+)"/],
  ['og:title', /<meta property="og:title"/],
  ['og:description', /<meta property="og:description"/],
  ['og:image', /<meta property="og:image" content="([^"]+)"/],
  ['og:url', /<meta property="og:url" content="([^"]+)"/],
  ['og:type', /<meta property="og:type"/],
  ['og:locale', /<meta property="og:locale"/],
  ['twitter:card', /<meta name="twitter:card"/],
  ['keywords', /<meta name="keywords"/],
  ['viewport', /<meta name="viewport"/],
  ['lang=ko', /<html lang="ko"/],
];
for (const p of PAGES) {
  const html = docs[p.path];
  const miss = need.filter(([, re]) => !re.test(html)).map(([n]) => n);
  if (miss.length) warn('상', p.path, `메타 누락: ${miss.join(', ')}`);
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || '';
  const ogUrl = (html.match(/<meta property="og:url" content="([^"]+)"/) || [])[1] || '';
  const ogImg = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1] || '';
  if (canon && !canon.endsWith(p.path)) warn('상', p.path, `canonical 불일치: ${canon}`);
  if (ogUrl && !ogUrl.startsWith('http')) warn('중', p.path, `og:url 상대경로: ${ogUrl}`);
  if (ogImg && !ogImg.startsWith('http')) warn('중', p.path, `og:image 상대경로: ${ogImg}`);
}
console.log(`검사 완료 (누락/불일치는 아래 이슈 목록)`);

console.log('\n=== 3. 제목 구조(H1 유일성·계층) ===');
for (const p of PAGES) {
  const html = docs[p.path];
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  if (h1.length !== 1) warn('상', p.path, `H1 ${h1.length}개`);
  const heads = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => +m[1]);
  let prev = 0, jump = 0;
  for (const lv of heads) { if (prev && lv > prev + 1) jump++; prev = lv; }
  if (jump) warn('하', p.path, `제목 레벨 건너뜀 ${jump}회`);
  const counts = heads.reduce((a, l) => (a[l] = (a[l] || 0) + 1, a), {});
  console.log(`${p.path.padEnd(22)} h1=${counts[1] || 0} h2=${counts[2] || 0} h3=${counts[3] || 0} h4=${counts[4] || 0}`);
}

console.log('\n=== 4. 구조화 데이터(JSON-LD) 유효성 ===');
for (const p of PAGES) {
  const blocks = [...docs[p.path].matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  for (const b of blocks) {
    try {
      const j = JSON.parse(b);
      const collect = (o) => { if (!o || typeof o !== 'object') return; if (o['@type']) types.push(o['@type']); if (o['@graph']) o['@graph'].forEach(collect); };
      collect(j);
    } catch { warn('상', p.path, 'JSON-LD 파싱 실패'); }
  }
  const uniq = [...new Set(types)];
  if (!uniq.includes('BreadcrumbList') && p.path !== '/') warn('중', p.path, 'BreadcrumbList 없음');
  if (!uniq.includes('Organization')) warn('중', p.path, 'Organization 없음');
  console.log(`${p.path.padEnd(22)} ${uniq.join(', ')}`);
}

console.log('\n=== 5. 이미지 alt ===');
for (const p of PAGES) {
  const imgs = [...docs[p.path].matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/alt="[^"]+"/.test(t));
  if (noAlt.length) warn('중', p.path, `alt 없는 이미지 ${noAlt.length}개`);
  if (imgs.length) console.log(`${p.path.padEnd(22)} img ${imgs.length}개 (alt 누락 ${noAlt.length})`);
}

console.log('\n=== 6. 내부링크 유입(고아 페이지 확인) ===');
const inbound = Object.fromEntries(PAGES.map((p) => [p.path, 0]));
for (const p of PAGES) {
  const hrefs = new Set([...docs[p.path].matchAll(/href="(\/[^"#]*)/g)].map((m) => m[1]));
  for (const h of hrefs) if (h !== p.path && inbound[h] !== undefined) inbound[h]++;
}
for (const [path, n] of Object.entries(inbound).sort((a, b) => a[1] - b[1])) {
  if (n < 3) warn(n === 0 ? '상' : '하', path, `내부 유입링크 ${n}개(적음)`);
  console.log(`${path.padEnd(22)} ${n}개`);
}

console.log('\n=== 7. 키워드 중복(카니발라이제이션) ===');
const kwMap = {};
for (const p of PAGES) for (const k of p.keywords) (kwMap[k] ||= []).push(p.path);
const dup = Object.entries(kwMap).filter(([, v]) => v.length > 1);
if (dup.length) dup.forEach(([k, v]) => warn('중', v.join(' / '), `키워드 중복: "${k}"`));
console.log(dup.length ? dup.map(([k, v]) => `${k} → ${v.join(', ')}`).join('\n') : '중복 없음');

console.log('\n=== 8. 본문 분량 ===');
for (const p of PAGES) {
  const body = docs[p.path].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
  const n = koLen(body);
  if (n < 2000) warn('중', p.path, `본문 ${n}자(얇음)`);
}
console.log('OK (얇은 페이지는 이슈 목록 참고)');

console.log('\n\n════════ 이슈 요약 ════════');
const order = { 상: 0, 중: 1, 하: 2 };
issues.sort((a, b) => order[a.sev] - order[b.sev]);
if (!issues.length) console.log('발견된 이슈 없음');
for (const i of issues) console.log(`[${i.sev}] ${i.path} — ${i.msg}`);
console.log(`\n총 ${issues.length}건 (상 ${issues.filter((i) => i.sev === '상').length} / 중 ${issues.filter((i) => i.sev === '중').length} / 하 ${issues.filter((i) => i.sev === '하').length})`);
