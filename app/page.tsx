import Link from 'next/link';
import Image from 'next/image';
import { pageMetadata } from '@/lib/metadata';
import { getPage, childrenOf } from '@/lib/site';
import { UNIVERSITIES, BRANCH_REGIONS } from '@/data/constants';
import FormSection from '@/components/FormSection';
import FaqSection from '@/components/FaqSection';
import DataTable from '@/components/DataTable';

export const metadata = pageMetadata('/');

const TRACKS = [
  {
    id: 'hair', name: '헤어입시', major: '헤어디자인학과', path: '/major/hair/',
    practical: '와인딩 · 업스타일 · 커트 도면', cost: '월 45~70만원 · 10개월 500~730만원',
    license: '이용사 · 미용사(일반)', career: '헤어디자이너 · 살롱 운영 · 교육',
    links: [{ href: '/practice/winding/', label: '와인딩' }, { href: '/practice/updo/', label: '업스타일' }, { href: '/practice/haircut/', label: '입시 커트' }, { href: '/license/hair/', label: '이용사 자격증' }],
    color: 'var(--primary-light)',
  },
  {
    id: 'makeup', name: '메이크업입시', major: '메이크업학과 · 메이크업디자인학과', path: '/major/makeup/',
    practical: '아트마스크 · 뷰티일러스트', cost: '월 40~65만원 · 10개월 480~700만원',
    license: '미용사(메이크업)', career: '메이크업아티스트 · 방송·웨딩 · 브랜드',
    links: [{ href: '/practice/artmask/', label: '아트마스크' }, { href: '/practice/illust/', label: '뷰티일러스트' }, { href: '/license/makeup/', label: '메이크업 자격증' }],
    color: 'var(--accent-light)',
  },
  {
    id: 'cosmetic', name: '화장품(학과)입시', major: '화장품학과 · 향장학과 · 뷰티산업학과', path: '/major/cosmetic/',
    practical: '실기 없음 — 학생부 · 면접', cost: '월 20~35만원 · 총 100~220만원',
    license: '맞춤형화장품조제관리사', career: '화장품 연구개발 · 품질관리 · 브랜드 MD',
    links: [{ href: '/license/cosmetic/', label: '맞춤형화장품조제관리사' }, { href: '/univ/sungshin/', label: '성신여대 뷰티산업학과' }, { href: '/career/', label: '화장품 진로' }],
    color: '#EEF4FF',
    dark: false,
  },
];

export default function HomePage() {
  const home = getPage('/');
  const practicePages = childrenOf('/practice/');
  const licensePages = childrenOf('/license/');

  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: 100 }}>

      {/* ── 히어로 ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 620, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Image src="/bg.png" alt="미용입시학원 학원비 비교 — 헤어·메이크업·화장품학과 입시 정보" fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,14,26,0.72) 0%, rgba(20,14,26,0.62) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 820, margin: '0 auto', padding: '90px 1.5rem 70px' }}>
          <span className="chip chip--dark" style={{ fontSize: 11, fontWeight: 900, padding: '6px 20px', letterSpacing: '0.18em', marginBottom: 22, textTransform: 'uppercase' }}>
            2027학년도 미용입시 기준
          </span>
          <h1 style={{ color: 'white', fontSize: 'clamp(26px, 5vw, 50px)', fontWeight: 950, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 14 }}>
            {home.h1}
          </h1>
          <p style={{ color: '#F7B8CB', fontSize: 'clamp(13px, 2vw, 18px)', fontWeight: 700, marginBottom: 18, letterSpacing: '-0.01em' }}>
            헤어입시 · 메이크업입시 · 화장품학과 입시 — 학원비·실기·대학·자격증 총정리
          </p>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(13px, 1.6vw, 15px)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto 32px' }}>
            전국 미용입시학원 학원비 범위를 먼저 공개하고, 내 내신·실기 수준으로 갈 수 있는 미용대학을 5초 만에 진단합니다.<br />
            가격을 숨기지 않습니다. 견적과 진단은 100% 무료입니다.
          </p>
          <div style={{ textAlign: 'left' }}>
            <FormSection cta={home.cta} sourcePage="home-hero" id="form" />
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 80 }}>

        {/* ── 미용입시학원이란? (히어로 직후 정의 섹션) ── */}
        <section className="section" aria-labelledby="what-is">
          <p className="eyebrow">기초 정보</p>
          <h2 className="h2" id="what-is">미용입시학원이란?</h2>
          <p className="lead" style={{ marginBottom: 24 }}>
            일반 미용학원·자격증 학원과 무엇이 다른지, 누가 왜 다니는지부터 정리했습니다.
          </p>

          <div className="prose" style={{ maxWidth: 860 }}>
            <p>
              <strong>미용입시학원</strong>은 헤어디자인학과·메이크업학과·화장품학과처럼 <strong>미용 계열 대학 진학</strong>을 목표로,
              대학이 실제로 출제하는 실기 과제와 전형에 맞춰 준비시키는 학원입니다.
              머리를 배우거나 자격증을 따는 곳이 아니라, <strong>대학에 합격하기 위한 곳</strong>이라는 점이 핵심입니다.
            </p>
            <p>
              같은 &ldquo;미용학원&rdquo;이라는 이름을 쓰지만 성격은 셋으로 갈립니다.
              취미 미용학원은 기술 자체를 즐기려는 사람이 다니고, 자격증 학원은 큐넷 시험 과제를 반복해 합격을 목표로 합니다.
              반면 미용입시학원은 <Link href="/practice/winding/">와인딩</Link>·<Link href="/practice/updo/">업스타일</Link>·<Link href="/practice/artmask/">아트마스크</Link>처럼
              대학별로 출제 경향이 다른 과제를 다루고, 채점 기준에 맞춘 개별 첨삭과 지원 대학 선정까지 함께 봅니다.
              그래서 <Link href="/cost/">학원비 구조</Link>도 다릅니다.
            </p>
            <p>
              다니는 시기는 대체로 <strong>고2 겨울방학부터 고3 9월 수시 원서까지</strong>입니다. 실기 트랙은 주 2~3회 통학이 기본이라 최소 6개월,
              여유 있게는 10개월 정도를 잡습니다. 다만 <Link href="/major/cosmetic/">화장품학과</Link>처럼 실기가 없는 트랙을 노린다면
              실기 대신 내신·면접·<Link href="/license/">가산점 자격증</Link>을 준비하므로 다니는 방식과 비용이 완전히 달라집니다.
            </p>
            <p>
              이 사이트는 특정 학원을 홍보하는 곳이 아니라, <strong>학원비 범위를 먼저 공개하고 그 위에서 실기·대학·자격증 정보를 비교</strong>하도록 만든 정보 사이트입니다.
              어떤 트랙이 나에게 맞는지, 내 성적으로 어느 대학까지 지원할 수 있는지는 <Link href="/diagnosis/">지원 가능 대학 진단</Link>에서 확인하실 수 있습니다.
            </p>
          </div>

          <div className="callout" style={{ marginTop: 8 }}>
            <strong>자격증 학원과 헷갈리지 마세요.</strong> 미용사 자격증 과정과 입시 실기 과정은 과제도 채점 기준도 다릅니다.
            자격증은 입시에서 <Link href="/license/">가산점 요소</Link>로 쓰일 뿐이라, 자격증 학원만 다니면 대학 실기는 따로 준비해야 합니다.
            학원을 고르기 전에 <Link href="/practice/">학과별 실기 유형</Link>부터 확인하시는 편이 안전합니다.
          </div>
        </section>

        {/* ── 3개 트랙 ── */}
        <section className="section">
          <p className="eyebrow" style={{ textAlign: 'center' }}>미용입시 3개 트랙</p>
          <h2 className="h2" style={{ textAlign: 'center' }}>헤어 · 메이크업 · 화장품학과, 어디로 갈지부터 정하세요</h2>
          <p className="lead" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
            미용입시학원 학원비는 트랙에 따라 두 배 이상 차이 납니다. 실기가 있는 헤어·메이크업과, 실기 없이 학생부·면접으로 가는 화장품학과의 구조를 먼저 비교하세요.
          </p>
          <div className="grid-auto" style={{ gap: 24 }}>
            {TRACKS.map((t) => (
              <article key={t.id} className="card" style={{ background: t.color, borderColor: 'transparent', padding: 30, display: 'flex', flexDirection: 'column' }}>
                <span className="chip" style={{ alignSelf: 'flex-start', background: 'white' }}>{t.name}</span>
                <h3 style={{ fontSize: 21, fontWeight: 900, margin: '14px 0 16px', letterSpacing: '-0.02em' }}>
                  <Link href={t.path}>{t.major}</Link>
                </h3>
                <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px', fontSize: 14, marginBottom: 20 }}>
                  <dt style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>실기</dt><dd style={{ color: 'var(--text-secondary)' }}>{t.practical}</dd>
                  <dt style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>학원비</dt><dd style={{ color: 'var(--text-secondary)' }}>{t.cost}</dd>
                  <dt style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>가산점</dt><dd style={{ color: 'var(--text-secondary)' }}>{t.license}</dd>
                  <dt style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>진로</dt><dd style={{ color: 'var(--text-secondary)' }}>{t.career}</dd>
                </dl>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                  {t.links.map((l) => (
                    <Link key={l.href} href={l.href} className="chip chip--outline" style={{ fontSize: 12 }}>{l.label} →</Link>
                  ))}
                </div>
                <Link href={t.path} className="btn btn--dark" style={{ marginTop: 18, padding: '12px 20px', fontSize: 14 }}>{t.name} 총정리 보기</Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── 학원비 벤토 ── */}
        <section className="section">
          <div style={{ marginBottom: 36 }}>
            <p className="eyebrow">학원비 현황</p>
            <h2 className="h2">미용입시학원 학원비, 과정별 실제 범위 (2026)</h2>
            <p className="lead">
              상담 전에 가격을 먼저 확인하세요. 아래는 전국 미용입시학원 평균 범위이고, 재료비·모의고사 등 추가 비용까지 포함한 총비용은{' '}
              <Link href="/cost/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>학원비 총정리</Link>에서 표로 정리했습니다.
            </p>
          </div>
          <div className="bento-grid">
            <div className="bento-item" style={{ gridColumn: 'span 2', background: 'var(--primary-light)', borderColor: 'transparent' }}>
              <span style={{ color: 'var(--primary-dark)', fontWeight: 900, fontSize: 12 }}>헤어 · 메이크업 실기반</span>
              <h3 style={{ fontSize: 24, fontWeight: 900, marginTop: 12, marginBottom: 8 }}>월 학원비 (주 2~3회)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 22 }}>소수정예 실기 첨삭 기준.<br />서울·강남권은 10~20% 높음.</p>
              <div style={{ fontSize: 32, fontWeight: 950, color: 'var(--primary-dark)' }}>40~70<span style={{ fontSize: 18, fontWeight: 700 }}>만원</span></div>
            </div>
            <div className="bento-item" style={{ gridColumn: 'span 2', background: 'var(--accent)', color: 'white' }}>
              <span style={{ color: '#F7B8CB', fontWeight: 900, fontSize: 12 }}>표준 10개월 코스</span>
              <h3 style={{ fontSize: 24, fontWeight: 900, marginTop: 12, marginBottom: 8 }}>총비용 (재료비 포함)</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginBottom: 22 }}>고2 겨울 시작 → 고3 9월 수시 원서.<br />마네킹·도안·모의실기·원서비 포함.</p>
              <div style={{ fontSize: 32, fontWeight: 950, color: '#F7B8CB' }}>500~730<span style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>만원</span></div>
            </div>
            <div className="bento-item">
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>화장품학과 대비반</h3>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary)', marginBottom: 12 }}>월 20~35만</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>실기 없음. 학생부·면접·자기소개서 컨설팅 중심.</p>
            </div>
            <div className="bento-item">
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>재료비 (별도)</h3>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary)', marginBottom: 12 }}>20~60만</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>도구 세트 + 마네킹·도안 소모품. 헤어가 메이크업보다 1.5배.</p>
            </div>
            <div className="bento-item" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>고3 3월 시작 집중반</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>6개월 · 주 3~5회 · 학원비 360~540만원</p>
              </div>
              <Link href="/cost/" className="btn btn--ghost" style={{ padding: '10px 18px', fontSize: 13, whiteSpace: 'nowrap' }}>상세 표 보기 →</Link>
            </div>
          </div>
        </section>

        {/* ── 진단 CTA ── */}
        <section className="section" style={{ background: 'var(--accent)', color: 'white', borderRadius: 32, padding: 'clamp(36px, 5vw, 60px) clamp(24px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>
            <div>
              <p style={{ color: '#F7B8CB', fontWeight: 900, fontSize: 12, letterSpacing: '0.08em', marginBottom: 14 }}>지원 가능 대학 진단 · 5초</p>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 950, lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: 16 }}>
                내 성적으로 갈 수 있는<br />미용대학은 어디일까?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 15, lineHeight: 1.8, marginBottom: 26 }}>
                전형유형 → 희망학과 → 지역 → 연락처, 네 단계만 선택하면 지원 가능 대학 리스트와 필요한 실기 과제, 예상 학원비까지 정리해 드립니다.
              </p>
              <Link href="/diagnosis/" className="btn btn--primary">5초 진단 시작하기 →</Link>
            </div>
            <ol style={{ listStyle: 'none', display: 'grid', gap: 12, margin: 0, padding: 0 }}>
              {[
                ['전형유형', '수시 실기 · 학생부 · 정시 · N수'],
                ['희망학과', '헤어 · 메이크업 · 화장품 · 미정'],
                ['지역 · 내신', '17개 시도 · 등급대 선택'],
                ['진단 결과', '지원 가능 대학 · 실기 과제 · 학원비'],
              ].map(([t, d], i) => (
                <li key={t} style={{ display: 'flex', gap: 14, alignItems: 'center', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '14px 18px' }}>
                  <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                  <div><p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>{t}</p><p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div style={{ position: 'absolute', right: -80, bottom: -80, width: 280, height: 280, background: 'var(--primary)', opacity: 0.12, borderRadius: '50%' }} />
        </section>

        {/* ── 실기 허브 ── */}
        <section className="section">
          <p className="eyebrow">실기 준비</p>
          <h2 className="h2">미용입시 실기, 과제별로 준비법이 다릅니다</h2>
          <p className="lead" style={{ marginBottom: 32 }}>
            헤어는 와인딩·업스타일·커트, 메이크업은 아트마스크·뷰티일러스트가 핵심 과제입니다. 과제별 채점 기준과 시간 배분, 감점 포인트를 정리했습니다.{' '}
            <Link href="/practice/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>실기 총정리 보기</Link>
          </p>
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {practicePages.map((p) => (
              <Link key={p.path} href={p.path} className="bento-item" style={{ display: 'block', padding: 24 }}>
                <span className="chip" style={{ marginBottom: 12 }}>{p.keywords[0]}</span>
                <p style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: 'var(--text-primary)', lineHeight: 1.35 }}>{p.h1}</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{p.description.split('.')[0]}.</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 대학 비교 ── */}
        <section className="section">
          <p className="eyebrow">대학 비교</p>
          <h2 className="h2">미용대학 한눈에 비교 — 실기 있는 대학 vs 없는 대학</h2>
          <p className="lead" style={{ marginBottom: 28 }}>
            같은 “뷰티” 학과라도 실기 전형 유무, 4년제·전문대, 소재지에 따라 준비 방법과 학원비가 달라집니다. 전형·경쟁률·등급컷 읽는 법은{' '}
            <Link href="/univ/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>미용대학 비교</Link>에서 확인하세요.
          </p>
          <DataTable
            head={['대학 · 학과', '소재지', '학위', '실기 전형', '트랙', '상세']}
            align={['left', 'center', 'center', 'center', 'left', 'center']}
            rows={UNIVERSITIES.map((u) => [
              `${u.name} ${u.dept}`,
              u.region,
              u.degree,
              u.practical ? '있음(연도별 확인)' : '없음',
              u.track.map((t) => ({ hair: '헤어', makeup: '메이크업', cosmetic: '화장품', skin: '피부', nail: '네일' }[t])).join(' · '),
              u.path ? <Link key={u.id} href={u.path} style={{ color: 'var(--primary)', fontWeight: 700 }}>보기 →</Link> : '—',
            ])}
            caption="※ 전형 방식·실기 여부·모집인원은 매년 달라집니다. 반드시 각 대학 입학처의 2027학년도 모집요강으로 확인하세요."
          />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <Link href="/univ/sungshin/" className="chip" style={{ fontSize: 13, padding: '8px 16px' }}>성신여대 뷰티산업학과 →</Link>
            <Link href="/univ/seowon/" className="chip" style={{ fontSize: 13, padding: '8px 16px' }}>서원대 뷰티학과 →</Link>
            <Link href="/univ/etc/" className="chip" style={{ fontSize: 13, padding: '8px 16px' }}>그 외 미용대학 7곳 →</Link>
          </div>
        </section>

        {/* ── 자격증 가산점 ── */}
        <section className="section">
          <p className="eyebrow">가산점 자격증</p>
          <h2 className="h2">미용입시 가산점, 트랙별로 준비할 자격증이 다릅니다</h2>
          <p className="lead" style={{ marginBottom: 28 }}>
            자격증은 취업용이 아니라 <strong>입시 가산점·면접 소재</strong>로 준비해야 효율이 납니다. 대학별 반영표는{' '}
            <Link href="/license/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>가산점 자격증 총정리</Link>에서 확인하세요.
          </p>
          <div className="grid-auto">
            {licensePages.map((p) => (
              <Link key={p.path} href={p.path} className="card" style={{ display: 'block' }}>
                <span className="chip" style={{ marginBottom: 12 }}>{p.nav}</span>
                <p style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: 'var(--text-primary)', lineHeight: 1.35 }}>{p.h1}</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{p.description.split('.')[0]}.</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 상담 폼 ── */}
        <section id="consulting" className="section" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 32, padding: 'clamp(36px, 5vw, 60px) clamp(20px, 4vw, 40px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p className="eyebrow">무료 견적 · 상담</p>
            <h2 className="h2">내 조건으로 학원비 견적 받기</h2>
            <p className="lead">희망 학과·지역·전형을 알려주시면 올댓뷰티 입시 멘토가 재료비까지 포함한 실제 총비용과 준비 일정을 안내합니다.</p>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <FormSection cta={home.cta} sourcePage="home-consulting" id="consulting-form" />
          </div>
        </section>

        {/* ── 지역 ── */}
        <section className="section">
          <p className="eyebrow">지역별 학원</p>
          <h2 className="h2">우리 동네 미용입시학원 — 12개 지역</h2>
          <p className="lead" style={{ marginBottom: 20 }}>
            실기는 주 2~3회 통학이 기본이라 거주 지역이 학원 선택의 첫 조건입니다. 지역별 학원비 편차와 인근 지원 가능 대학은{' '}
            <Link href="/region/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>지역별 미용입시학원</Link>에서 확인하세요.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {BRANCH_REGIONS.map((r) => (
              <Link key={r.id} href={`/region/#${r.id}`} className="chip chip--outline" style={{ fontSize: 14, padding: '10px 18px' }}>{r.name}</Link>
            ))}
          </div>
        </section>

        {/* ── SEO 심층 본문 ── */}
        <section className="section card" style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
          <p className="eyebrow">심층 가이드</p>
          <h2 className="h2" style={{ marginBottom: 20 }}>미용입시학원 학원비 완벽 가이드 — 비용·실기·대학·자격증까지 한 번에</h2>
          <div className="prose">
            <p>
              <strong>미용입시학원</strong>은 미용사 자격증 학원이나 취미 미용학원과 다릅니다. 대학 실기 과제(와인딩·업스타일·커트, 아트마스크·뷰티일러스트)에 맞춘 첨삭 수업과, 학생부·면접 컨설팅, 지원 대학 선정까지 입시 전 과정을 다루기 때문에 <strong>미용학원 비용</strong>도 구조가 다릅니다.
              이 사이트는 헤어입시·메이크업입시·화장품학과 입시 세 트랙의 학원비를 먼저 공개하고, 그 위에서 실기·대학·자격증 정보를 비교할 수 있게 만들었습니다.
            </p>

            <h3>미용학원 비용은 트랙이 결정한다</h3>
            <p>
              헤어·메이크업처럼 실기가 있는 트랙은 주 2~3회 실기 수업이 필수라 월 40~70만원, 10개월 기준 총 500~730만원이 평균 범위입니다. 반면 <Link href="/major/cosmetic/">화장품학과</Link>는 대부분 실기가 없어 학생부·면접 대비 월 20~35만원, 총 100~220만원 선에서 준비가 끝납니다.
              내신이 3~4등급대이고 실기 경험이 없다면 화장품학과 트랙이 비용과 합격 가능성 양쪽에서 유리한 경우가 많습니다. 과정별·기간별 상세 표는 <Link href="/cost/">미용입시학원 학원비 총정리</Link>에서 확인하세요.
            </p>

            <h3>미용학원 추천 기준 — 학원비보다 먼저 볼 것</h3>
            <p>
              좋은 미용입시학원은 ① 최근 3년 합격 대학 리스트를 공개하고, ② 반 인원이 8명 이하로 개별 첨삭이 가능하며, ③ 지원 대학별 출제 경향 자료를 갖추고, ④ 재료비·모의고사 비용을 계약 전에 명시합니다.
              “합격 보장”, “전액 환불” 문구보다 이 네 가지를 확인하세요. 지역별 학원 고르는 법은 <Link href="/region/">지역별 미용입시학원</Link>에 정리했습니다.
            </p>

            <h3>미용대학 입시 — 전형 유형부터 이해하기</h3>
            <p>
              <Link href="/univ/">미용대학</Link> 전형은 크게 수시 실기전형(내신+실기), 수시 학생부전형(실기 없음), 정시(수능)로 나뉩니다. 같은 대학이라도 연도별로 실기 반영 여부가 바뀌기 때문에, 목표 대학이 정해졌다면 <Link href="/univ/sungshin/">성신여대 뷰티산업학과</Link>, <Link href="/univ/seowon/">서원대 뷰티학과</Link>처럼 대학별 페이지에서 최신 전형을 확인하고 학원 수업 방향을 맞추는 것이 중요합니다.
              어느 전형이 유리한지 모르겠다면 <Link href="/diagnosis/">지원 가능 대학 진단</Link>부터 받아보세요.
            </p>

            <h3>실기와 자격증, 동시에 준비하는 법</h3>
            <p>
              헤어 트랙은 <Link href="/practice/winding/">와인딩</Link>이 가장 비중 큰 과제이고, <Link href="/license/hair/">이용사 자격증</Link>이 가산점 1순위입니다. 메이크업 트랙은 <Link href="/practice/artmask/">아트마스크</Link>가 핵심이며 <Link href="/license/makeup/">미용사(메이크업) 자격증</Link>이 우대됩니다.
              화장품 트랙은 실기 대신 <Link href="/license/cosmetic/">맞춤형화장품조제관리사</Link>가 면접과 서류에서 힘을 발휘합니다. 자격증은 고2 겨울~고3 상반기에 취득해야 수시 원서에 반영할 수 있으니, 실기 학원 등록 시 자격증 대비 포함 여부를 함께 확인하세요.
            </p>

            <h3>진로까지 보고 학과를 고르세요</h3>
            <p>
              헤어디자이너·메이크업아티스트·화장품 연구개발·브랜드 MD는 출발 학과가 다릅니다. 고1~고2라면 <Link href="/career/">뷰티 진로 가이드</Link>에서 직업별 연봉 범위와 전망을 보고 트랙을 정한 뒤 학원을 고르는 것이 학원비 낭비를 막는 가장 확실한 방법입니다.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FaqSection
          id="home-faq"
          title="미용입시학원 학원비·입시 자주 묻는 질문"
          items={[
            { q: '미용입시학원 학원비는 얼마인가요?', a: '2026년 기준 헤어·메이크업 실기반은 주 2회 40~50만원, 주 3회 55~70만원이 평균입니다. 고2 겨울부터 10개월 준비하면 재료비 포함 500~730만원, 실기가 없는 화장품학과 대비반은 총 100~220만원 수준입니다.' },
            { q: '미용입시는 언제부터 준비해야 하나요?', a: '실기 트랙은 고2 겨울방학(12월) 시작이 표준이고, 늦어도 고3 3월에는 시작해야 9월 수시 원서까지 6개월을 확보할 수 있습니다. 화장품학과처럼 실기가 없는 트랙은 고3 1학기 학생부 마감 전까지 내신과 자격증에 집중하면 됩니다.' },
            { q: '실기 없이 갈 수 있는 미용 관련 학과가 있나요?', a: '있습니다. 화장품학과·향장학과·뷰티산업학과 등은 학생부교과·종합·면접 전형 위주로 선발하는 대학이 많습니다. 단, 대학·연도별로 실기 반영 여부가 다르므로 모집요강 확인이 필요합니다.' },
            { q: '자격증이 있으면 미용대학 입시에 가산점이 되나요?', a: '대학과 전형에 따라 가산점, 우대, 서류 반영, 미반영으로 나뉩니다. 헤어는 이용사·미용사(일반), 메이크업은 미용사(메이크업), 화장품학과는 맞춤형화장품조제관리사가 대표적입니다. 반영 여부와 점수는 지원 대학 모집요강에서 반드시 확인하세요.' },
            { q: '학원비 견적과 대학 진단은 정말 무료인가요?', a: '네. 견적과 진단은 100% 무료이며, 올댓뷰티 입시 멘토가 지원 가능 대학 리스트·필요 실기 과제·예상 총비용을 안내합니다. 학원 등록을 강요하지 않으며, 입력한 개인정보는 상담 목적 외에 사용되지 않습니다.' },
          ]}
        />
      </div>
    </main>
  );
}
