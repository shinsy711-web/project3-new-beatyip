/**
 * article.prose 안에 평평하게 나열된 h2 블록을 각각 <section>으로 감싼다.
 *   <article className="prose">        <article className="prose">
 *     <h2>제목</h2>            →         <section aria-labelledby="sec-1">
 *     <p>...</p>                           <h2 id="sec-1">제목</h2>
 *     <DataTable ... />                    <p>...</p>
 *     <h2>다음</h2>                        <DataTable ... />
 *                                        </section>
 *
 * h2에 id가 이미 있으면(지역 페이지 앵커) 그대로 두고 aria-labelledby만 연결한다.
 * 사용: node scripts/codemod-sections.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const ROOT = new URL('../app', import.meta.url).pathname.replace(/^\//, '');

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'page.tsx') files.push(p);
  }
})(ROOT);

const OPEN = '<article className="prose">';
let changed = 0;

for (const file of files) {
  const srcText = fs.readFileSync(file, 'utf8');
  const lines = srcText.split('\n');

  const openIdx = lines.findIndex((l) => l.trim() === OPEN);
  if (openIdx === -1) continue;

  const indent = lines[openIdx].match(/^\s*/)[0];
  const childIndent = indent + '  ';
  const closeIdx = lines.findIndex((l, i) => i > openIdx && l === `${indent}</article>`);
  if (closeIdx === -1) {
    console.log(`건너뜀(닫는 태그 못 찾음): ${file}`);
    continue;
  }

  const body = lines.slice(openIdx + 1, closeIdx);
  const isH2 = (l) => l.startsWith(`${childIndent}<h2`) && !l.startsWith(`${childIndent}<h2 `.replace('h2 ', 'h2x'));
  if (body.some((l) => l.trim().startsWith('<section'))) {
    console.log(`건너뜀(이미 section 사용): ${file}`);
    continue;
  }

  const h2Positions = body.map((l, i) => (isH2(l) ? i : -1)).filter((i) => i !== -1);
  if (h2Positions.length === 0) continue;

  const out = [];
  // 첫 h2 앞 내용은 그대로 둔다(대개 없음).
  out.push(...body.slice(0, h2Positions[0]));

  h2Positions.forEach((start, n) => {
    const end = n + 1 < h2Positions.length ? h2Positions[n + 1] : body.length;
    let block = body.slice(start, end);
    // 블록 끝의 빈 줄은 section 밖으로 뺀다.
    const trailing = [];
    while (block.length && block[block.length - 1].trim() === '') trailing.push(block.pop());

    // h2에 id 부여(이미 있으면 유지) + section 연결
    const h2Line = block[0];
    const existingId = h2Line.match(/\sid="([^"]+)"/);
    const id = existingId ? existingId[1] : `sec-${n + 1}`;
    if (!existingId) {
      block[0] = h2Line.replace(/^(\s*<h2)(\s|>)/, `$1 id="${id}"$2`);
    }

    out.push(`${childIndent}<section aria-labelledby="${id}">`);
    out.push(...block.map((l) => (l.trim() === '' ? l : '  ' + l)));
    out.push(`${childIndent}</section>`);
    if (n + 1 < h2Positions.length) out.push('');
  });

  const next = [...lines.slice(0, openIdx + 1), ...out, ...lines.slice(closeIdx)].join('\n');
  if (next !== srcText) {
    changed++;
    if (!DRY) fs.writeFileSync(file, next);
    console.log(`${DRY ? '[dry] ' : ''}변환: ${file} (section ${h2Positions.length}개)`);
  }
}

console.log(`\n${DRY ? '변환 예정' : '변환 완료'}: ${changed}개 파일`);
