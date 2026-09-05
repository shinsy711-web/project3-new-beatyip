import type { Metadata } from 'next';
import Link from 'next/link';
import { OPERATOR, SITE_NAME, SITE_URL, SUPPORT_PAGES } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import DataTable from '@/components/DataTable';
import Callout from '@/components/Callout';
import FormSection from '@/components/FormSection';

const DEF = SUPPORT_PAGES.find((p) => p.path === '/contact/')!;

export const metadata: Metadata = {
  title: { absolute: DEF.title },
  description: DEF.description,
  alternates: { canonical: DEF.path },
  openGraph: { title: DEF.title, description: DEF.description, url: DEF.path, type: 'article' },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact/#contact`,
    name: DEF.title,
    description: DEF.description,
    inLanguage: 'ko-KR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: OPERATOR.company,
      email: OPERATOR.email,
      contactPoint: {
        '@type': 'ContactPoint',
        email: OPERATOR.email,
        contactType: 'customer support',
        areaServed: 'KR',
        availableLanguage: 'Korean',
      },
    },
  };

  return (
    <main className="container-narrow" style={{ paddingTop: 44, paddingBottom: 110 }}>
      <JsonLd data={jsonLd} />

      <nav aria-label="브레드크럼" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 26 }}>
        <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0 }}>
          <li><Link href="/" style={{ fontWeight: 600 }}>홈</Link></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>문의하기</li>
        </ol>
      </nav>

      <header style={{ marginBottom: 40 }}>
        <p className="eyebrow">문의하기</p>
        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 950, lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: 16 }}>
          무엇을 도와드릴까요
        </h1>
        <p className="lead" style={{ fontSize: 16 }}>
          입시 상담은 아래 폼이 가장 빠릅니다. 정보 정정, 개인정보 삭제, 학원 제휴처럼 상담이 아닌 문의는 이메일로 받습니다.
        </p>
      </header>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">문의 종류별 창구</h2>
          <DataTable
            head={['문의 내용', '창구', '처리 기한']}
            align={['left', 'left', 'center']}
            rows={[
              ['학원비 견적 · 지원 가능 대학 상담', <span key="a">아래 상담 폼 또는 <Link href="/diagnosis/">5초 진단</Link></span>, '영업일 1일 내'],
              ['사이트 정보 오류 정정 요청', <a key="b" href={`mailto:${OPERATOR.email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{OPERATOR.email}</a>, '영업일 3일 내'],
              ['개인정보 열람 · 정정 · 삭제 요청', <a key="c" href={`mailto:${OPERATOR.email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{OPERATOR.email}</a>, '지체 없이 처리'],
              ['미용입시학원 제휴 문의', <a key="d" href={`mailto:${OPERATOR.email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{OPERATOR.email}</a>, '영업일 3일 내'],
              ['광고 · 콘텐츠 제휴', <a key="e" href={`mailto:${OPERATOR.email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{OPERATOR.email}</a>, '영업일 3일 내'],
            ]}
            caption={`※ 상담 가능 시간: ${OPERATOR.hours}. 이메일은 시간과 관계없이 접수되며 영업일 기준으로 회신합니다.`}
          />
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">개인정보 삭제를 원하시면</h2>
          <p>
            상담을 신청한 뒤 마음이 바뀌셨다면 언제든 삭제를 요청할 수 있습니다. 이메일에 <strong>신청 시 입력한 성함과 연락처 뒷자리</strong>를 적어 보내주시면
            본인 확인 후 수집된 정보를 지체 없이 파기하고 결과를 회신합니다. 삭제를 요청했다는 이유로 어떤 불이익도 없습니다.
            자세한 처리 기준은 <Link href="/privacy-policy/">개인정보처리방침</Link>에서 확인하실 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">정보가 틀렸다고 알려주실 때</h2>
          <p>
            대학 전형과 자격증 일정은 해마다 바뀝니다. 아래 내용을 함께 적어주시면 확인이 훨씬 빠릅니다.
          </p>
          <ul>
            <li>어느 페이지의 어떤 문장인지 (주소를 같이 보내주시면 가장 좋습니다)</li>
            <li>실제로는 어떻게 되어야 하는지</li>
            <li>근거 자료가 있다면 그 출처 (대학 입학처 공지, 큐넷 공고 등)</li>
          </ul>
          <Callout type="info" title="확인 후 이렇게 처리합니다">
            공식 자료로 확인되면 본문을 수정하고 수정 사실을 회신드립니다. 확인이 어려우면 해당 문장을 단정형에서 조건형으로 바꾸거나 삭제합니다.
          </Callout>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">운영 정보</h2>
          <DataTable
            head={['구분', '내용']}
            rows={[
              ['사이트명', SITE_NAME],
              ['운영', OPERATOR.company],
              ['상담 파트너', OPERATOR.partner],
              ['이메일', <a key="m" href={`mailto:${OPERATOR.email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{OPERATOR.email}</a>],
              ['개인정보 보호책임자', OPERATOR.privacyOfficer],
              ['상담 시간', OPERATOR.hours],
            ]}
          />
          <p>
            사이트의 운영 원칙과 정보 수집 기준은 <Link href="/about/">사이트 소개</Link>에 정리해 두었습니다.
          </p>
        </section>
      </article>

      <section style={{ marginTop: 56 }}>
        <FormSection
          cta="상담 신청하기 (무료)"
          sourcePage="contact"
          heading="입시 상담은 여기서 바로 신청하세요"
          subheading="희망 학과와 지역을 남겨주시면 올댓뷰티 입시 멘토가 학원비 견적과 지원 가능 대학을 정리해 연락드립니다."
          id="contact-form"
        />
      </section>
    </main>
  );
}
