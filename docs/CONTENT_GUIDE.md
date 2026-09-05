# project29 콘텐츠 페이지 제작 가이드 (서브에이전트 공용)

사이트: **미용입시학원 학원비 비교** — 미용입시 DB(상담 신청) 수집 사이트.
메인 = 미용입시학원, 서브 트랙 3개 = 헤어입시 / 메이크업입시 / 화장품(학과)입시.
구조·SEO는 `project23_makeup`(makeupcost.com)을 계승. 이 프로젝트의 **참조 구현은 `app/cost/page.tsx`** — 반드시 먼저 읽고 같은 패턴으로 작성.

## 0. 절대 규칙
- 페이지 정의(title·h1·description·cta·keywords·memo)는 **`lib/site.ts`의 PAGES**에 이미 있다. 그대로 쓴다. title/h1 문구를 바꾸지 않는다.
- URL은 **트레일링 슬래시 포함** (`/practice/winding/`). `next.config.mjs`에 `trailingSlash: true`. 모든 `<Link href>`도 `/`로 끝낼 것.
- 파일 위치: `app/<path>/page.tsx` (예: `/practice/winding/` → `app/practice/winding/page.tsx`).
- 서버 컴포넌트로 작성 (`"use client"` 금지). 폼은 `<FormSection />`(클라이언트)만 import해서 쓴다.
- **본문 마크업 규칙: `article.prose` 안에서 h2 하나당 `<section aria-labelledby="sec-N">` 하나.** h2에 `id="sec-N"`을 주고 섹션이 그것을 가리킨다(순번은 페이지 안에서 1부터). 지역 페이지처럼 앵커용 고유 id가 이미 있으면 그 id를 그대로 쓴다. h2를 section 없이 평평하게 나열하지 말 것 — `node scripts/audit-semantics.mjs`가 잡아낸다.
- 새 컴포넌트·새 CSS 파일 만들지 말 것. 아래 공용 컴포넌트 + `globals.css` 클래스(`.prose .card .chip .callout .btn .grid-auto .table-wrap`) + 인라인 스타일만.
- Bash 히어독으로 파일 쓰지 말고 **Write 도구**로 파일 생성 (이 환경은 히어독 내 따옴표가 깨진다).
- 작성 끝나면 `npx tsc --noEmit -p .` 로 타입 확인하고 오류 0으로 만든다.

## 1. 페이지 골격 (그대로 따를 것)
```tsx
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { getPage } from '@/lib/site';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import FormSection from '@/components/FormSection';
import DataTable from '@/components/DataTable';
import Callout from '@/components/Callout';
import StatGrid from '@/components/StatGrid';
import StepList from '@/components/StepList';
import FaqSection from '@/components/FaqSection';
import RelatedLinks from '@/components/RelatedLinks';
import CtaBanner from '@/components/CtaBanner';

const PATH = '/practice/winding/';
export const metadata = pageMetadata(PATH);

export default function Page() {
  const page = getPage(PATH);
  return (
    <PageShell path={PATH}>              {/* 브레드크럼 + BreadcrumbList JSON-LD 자동 */}
      <ArticleJsonLd path={PATH} />
      <PageHero path={PATH} eyebrow="..." lead="..." chips={[...]} />   {/* h1 자동 */}
      <StatGrid items={[...]} />          {/* 선택: 핵심 숫자 3~4개 */}
      <div style={{ margin: '48px 0 56px' }}>
        <FormSection cta={page.cta} sourcePage="winding" heading="..." subheading="..." />
      </div>
      <article className="prose">
        {/* 본문은 h2 하나당 <section> 하나. 섹션은 자기 h2를 aria-labelledby로 가리킨다. */}
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">...</h2>
          <p>...</p>
          {/* 이어서 h3/p/ul/ol/DataTable/Callout/StepList */}
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">...</h2>
          ...
        </section>
      </article>
      <div style={{ margin: '56px 0' }}><FaqSection id="xxx-faq" title="..." items={[...4~6개]} /></div>
      <RelatedLinks paths={[...]} labels={{...}} />
      <CtaBanner title="..." desc="..." />   {/* 기본 href=/diagnosis/ */}
    </PageShell>
  );
}
```
- 허브 페이지(`/practice/`, `/major/`, `/univ/`, `/license/`)는 `PageShell width="wide"` 가능. 하위 페이지 카드 그리드는 `childrenOf(PATH)`(lib/site) 로 뿌려 링크 분배.
- `FormSection` props: `cta`(= page.cta), `sourcePage`(경로 슬러그), `defaultMajor`('hair'|'makeup'|'cosmetic'), `heading`, `subheading`, `id`(페이지에 폼 2개면 두 번째는 id 다르게).
- `PageHero` props: `path`, `eyebrow`, `lead`(1~2문장, 키워드 포함), `chips`(핵심 포인트 3~4개), `children`(폼 넣을 때).
- `DataTable` props: `head: string[]`, `rows: ReactNode[][]`, `align`, `caption`(출처·기준일·주의 문구 — 필수).
- `Callout type="tip"|"warn"|"info" title="...">`.
- `StepList steps=[{title, desc, period?}]`.
- `FaqSection items=[{q, a}]` — FAQPage JSON-LD 자동. a는 2~4문장, 숫자 포함.
- `RelatedLinks paths=[...]` — 부모 + 형제 + `/diagnosis/` + `/cost/` 등 4~6개. `labels`로 라벨 커스텀 가능.

## 2. SEO 원칙 (project5/16/23에서 검증된 것)
- h1은 1개(PageHero). h2 4~7개, 각 h2 아래 300자 이상. **본문 총 2,500~4,500자**(한글 기준, 표 제외). 얇은 글 금지.
- 첫 h2 첫 문단에 타겟 키워드(`page.keywords[0]`)를 `<strong>`으로 1회. 이후 키워드는 자연스럽게 3~6회. 키워드 스터핑 금지.
- 표(DataTable) 최소 1개, 가능하면 2~3개. 비교 사이트이므로 “표로 비교”가 핵심 포맷.
- FAQ 4~6개 (검색자가 실제로 치는 질문 형태: "~얼마예요", "~되나요", "~언제").
- 내부링크: 본문 중 `<Link href="/...">앵커텍스트</Link>` 5개 이상 (형제 페이지·허브·/diagnosis/·/cost/·/license/ 등). 앵커텍스트는 키워드형(“와인딩 방법”, “화장품학과 총정리”).
- 연도 표기: 입시는 **2027학년도**, 자격증 시험일정·비용은 **2026년**. 오늘은 2026-09-03.
- 토픽 희석 금지: 네일·피부미용·취미 미용 등 **설계서 밖 주제로 확장하지 말 것**. 항상 “입시” 맥락(가산점·실기·전형) 안에서만 서술. 자격증 페이지는 설계서 메모대로 “입시 가산점 프레임” 필수.

## 3. 사실·수치 규칙 (신뢰성)
- 대학 전형 방식·실기 여부·모집인원·경쟁률·등급컷은 **연도별로 바뀐다.** 반드시 WebSearch로 1~2회 확인 후 쓰고, 확인 못 한 수치는 쓰지 않는다. 대신 “최근 3개년 기준 ○~○ 범위”, “실기 반영 여부는 연도별 모집요강 확인” 같은 조건부 표현 + `Callout type="warn"`으로 “정확한 정보는 각 대학 모집요강(어디가·대학 입학처) 확인” 문구를 **페이지마다 1회 이상** 넣는다.
- 자격증(이용사·미용사·맞춤형화장품조제관리사)의 시험 과목·응시료·시행처(한국산업인력공단 큐넷 / 대한상공회의소·식약처 등)는 WebSearch로 확인. 2026년 일정은 “회차·접수월” 수준으로만, 날짜가 확실치 않으면 “공식 사이트 공고 확인” 처리.
- 학원비·재료비는 `app/cost/page.tsx`의 범위와 **일관되게**(헤어·메이크업 실기반 월 40~70만원, 화장품 대비반 20~35만원, 10개월 총 500~730만원).
- 연봉·수입은 “○○~○○만원 수준(경력·지역 편차 큼)”처럼 범위 + 편차 언급.
- 새로운 고유명사·통계 창작 금지. 모르면 범위/조건부.

## 4. 톤·형식
- 독자: 고1~고3 학생 + 학부모. 존댓말, 쉬운 문장, 문단 3~5문장. 과장·공포 마케팅 금지.
- CTA는 자연스럽게: 폼 1개(상단 StatGrid 아래) + 하단 CtaBanner(→ /diagnosis/). 필요하면 본문 중간에 `Callout`으로 “1:1 피드백 신청” 링크 1회.
- 아트마스크 페이지처럼 설계서 메모에 “도안 다운로드=연락처 수집”이 있으면, 폼 heading을 “도안 PDF 무료 받기” 식으로 잡고 subheading에 “신청 후 문자로 도안과 채점표를 보내드립니다” 등 안내(실제 파일은 상담 시 발송).
- 지역 페이지 12지역은 `data/constants.ts`의 `BRANCH_REGIONS` 사용. 대학 목록은 `UNIVERSITIES` 사용(필요 시 항목 추가 가능, 단 실존 학과만).

## 5. 완료 조건
1. 담당 페이지 파일 전부 생성.
2. `npx tsc --noEmit -p .` 오류 0.
3. 최종 보고: 생성한 파일 경로, 각 페이지 본문 글자수(대략), WebSearch로 확인한 사실과 확인 못 해 조건부로 쓴 항목 목록.
