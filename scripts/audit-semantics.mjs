// 렌더된 HTML의 시맨틱 구조 점검: h2가 어떤 조상 안에 있는지, section/article 사용 실태.
// 사용: node scripts/audit-semantics.mjs [http://localhost:3129]
import fs from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:3129').replace(/\/$/, '');
const src = fs.readFileSync(new URL('../lib/site.ts', import.meta.url), 'utf8');
const PATHS = [...src.matchAll(/path: '([^']+)', parent/g)].map((m) => m[1]);

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

/** 태그 스택을 쌓아 각 h2의 조상 체인을 구한다 */
function analyze(html) {
  const body = html.slice(html.indexOf('<body'));
  const stack = [];
  const h2s = [];
  const counts = { section: 0, article: 0, nav: 0, header: 0, footer: 0, aside: 0, main: 0 };
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(body))) {
    const [, close, rawTag, attrs, selfClose] = m;
    const tag = rawTag.toLowerCase();
    if (tag === 'script' || tag === 'style') {
      // 내용 건너뛰기
      const end = body.indexOf(`</${tag}>`, re.lastIndex);
      if (!close && end !== -1) re.lastIndex = end;
      continue;
    }
    if (close) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) { stack.length = i; break; }
      }
      continue;
    }
    if (counts[tag] !== undefined) counts[tag]++;
    if (tag === 'h2') {
      h2s.push({ ancestors: stack.map((s) => s.tag + (s.cls ? `.${s.cls.split(' ')[0]}` : '')) });
    }
    if (!VOID.has(tag) && !selfClose) {
      const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
      stack.push({ tag, cls });
    }
  }
  return { h2s, counts };
}

const rows = [];
for (const p of PATHS) {
  const html = await (await fetch(BASE + p)).text();
  const { h2s, counts } = analyze(html);
  // h2의 "가장 가까운 시맨틱 조상"
  const nearest = h2s.map((h) => {
    const sem = [...h.ancestors].reverse().find((a) => /^(section|article|aside|nav|header|footer|main)\b/.test(a));
    return sem ? sem.split('.')[0] : '(없음)';
  });
  const tally = nearest.reduce((a, k) => (a[k] = (a[k] || 0) + 1, a), {});
  rows.push({ path: p, h2: h2s.length, counts, tally });
}

console.log('경로'.padEnd(26), 'h2  section article  h2의 직속 시맨틱 조상');
for (const r of rows) {
  const t = Object.entries(r.tally).map(([k, v]) => `${k}×${v}`).join(' ');
  console.log(
    r.path.padEnd(26),
    String(r.h2).padEnd(3),
    String(r.counts.section).padEnd(7),
    String(r.counts.article).padEnd(7),
    t,
  );
}

const inArticleOnly = rows.filter((r) => (r.tally['article'] || 0) > 0 && (r.tally['section'] || 0) === 0);
const mixed = rows.filter((r) => (r.tally['article'] || 0) > 0 && (r.tally['section'] || 0) > 0);
const sectionOnly = rows.filter((r) => (r.tally['section'] || 0) > 0 && (r.tally['article'] || 0) === 0);
const orphan = rows.filter((r) => r.tally['(없음)']);

console.log('\n요약');
console.log(`  h2 전부 article 안 (section 미사용): ${inArticleOnly.length}개 — ${inArticleOnly.map((r) => r.path).join(' ')}`);
console.log(`  article + section 혼합           : ${mixed.length}개 — ${mixed.map((r) => r.path).join(' ')}`);
console.log(`  section 위주                     : ${sectionOnly.length}개 — ${sectionOnly.map((r) => r.path).join(' ')}`);
console.log(`  시맨틱 조상 없는 h2 존재          : ${orphan.length}개 — ${orphan.map((r) => r.path).join(' ')}`);
