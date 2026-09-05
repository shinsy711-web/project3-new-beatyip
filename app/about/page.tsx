import type { Metadata } from 'next';
import Link from 'next/link';
import { OPERATOR, SITE_NAME, SITE_URL, SUPPORT_PAGES, PAGES } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import DataTable from '@/components/DataTable';
import Callout from '@/components/Callout';
import CtaBanner from '@/components/CtaBanner';

const DEF = SUPPORT_PAGES.find((p) => p.path === '/about/')!;

export const metadata: Metadata = {
  title: { absolute: DEF.title },
  description: DEF.description,
  alternates: { canonical: DEF.path },
  openGraph: { title: DEF.title, description: DEF.description, url: DEF.path, type: 'article' },
};

export default function AboutPage() {
  const totalVolume = PAGES.reduce((sum, p) => sum + p.volume, 0).toLocaleString();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about/#about`,
    name: DEF.title,
    description: DEF.description,
    inLanguage: 'ko-KR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <main className="container-narrow" style={{ paddingTop: 44, paddingBottom: 110 }}>
      <JsonLd data={jsonLd} />

      <nav aria-label="브레드크럼" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 26 }}>
        <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0 }}>
          <li><Link href="/" style={{ fontWeight: 600 }}>홈</Link></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>사이트 소개</li>
        </ol>
      </nav>

      <header style={{ marginBottom: 44 }}>
        <p className="eyebrow">사이트 소개</p>
        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 38px)', fontWeight: 950, lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: 16 }}>
          미용입시 정보를 어떻게 정리하나요
        </h1>
        <p className="lead" style={{ fontSize: 16 }}>
          {SITE_NAME}는 헤어·메이크업·화장품학과 진학을 준비하는 학생과 학부모가 학원비와 입시 정보를 한자리에서 비교하도록 만든 정보 사이트입니다.
          어떤 기준으로 정보를 모으고, 무엇으로 수익을 내는지 먼저 밝힙니다.
        </p>
      </header>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">이 사이트를 만든 이유</h2>
          <p>
            미용입시는 정보 격차가 유난히 큰 분야입니다. 학원비는 상담을 받아야만 알 수 있고, 대학별 실기 과제는 매년 바뀌며, 자격증 가산점은 대학마다 다릅니다.
            그래서 학생과 학부모가 처음 접하는 정보가 대부분 특정 학원의 홍보물입니다.
          </p>
          <p>
            이 사이트는 그 반대 순서로 만들었습니다. <strong>가격 범위를 먼저 공개</strong>하고, 그다음에 실기·대학·자격증 정보를 비교표로 제공합니다.
            상담 폼은 정보를 다 본 뒤에 필요한 사람만 쓰도록 배치했습니다. 학원비가 궁금해서 들어온 사람에게 연락처부터 요구하지 않는 것이 원칙입니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">운영 주체와 상담 파트너</h2>
          <DataTable
            head={['구분', '내용']}
            rows={[
              ['사이트 운영', OPERATOR.company],
              ['상담 파트너', `${OPERATOR.partner} (${OPERATOR.partnerDesc})`],
              ['문의 이메일', <a key="m" href={`mailto:${OPERATOR.email}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{OPERATOR.email}</a>],
              ['상담 가능 시간', OPERATOR.hours],
              ['개인정보 보호책임자', OPERATOR.privacyOfficer],
            ]}
            caption="※ 상담 신청 시 수집하는 정보와 제공 범위는 개인정보처리방침에서 확인하실 수 있습니다."
          />
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">수익 구조를 밝힙니다</h2>
          <p>
            이용자에게 받는 비용은 없습니다. 학원비 견적과 지원 가능 대학 진단은 전부 무료입니다.
            사이트는 <strong>상담을 신청한 이용자를 제휴 미용입시학원과 연결하고 그 대가를 학원으로부터 받는 구조</strong>로 운영됩니다.
            검색 광고 수익도 일부 발생합니다.
          </p>
          <Callout type="info" title="그래서 이렇게 합니다">
            수익 구조상 특정 학원을 추천하게 될 유인이 있다는 점을 인정합니다. 그래서 학원비 범위와 추가 비용을 먼저 공개하고,
            제휴 여부와 무관하게 대학·자격증 정보는 공개 자료 기준으로만 씁니다. 특정 학원을 광고하는 문구는 본문에 넣지 않습니다.
          </Callout>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">정보를 모으는 기준</h2>
          <p>이 사이트의 정보는 성격에 따라 출처와 확실성이 다릅니다. 그래서 표기 방식도 다르게 합니다.</p>
          <DataTable
            head={['정보 종류', '출처', '표기 방식']}
            align={['left', 'left', 'left']}
            rows={[
              ['대학 전형·모집인원·실기 여부', '각 대학 입학처 모집요강, 대학어디가(adiga.kr)', '확인된 내용만 서술하고, 연도별 변동 안내를 함께 표시'],
              ['경쟁률·등급 범위', '대학 공개 통계 또는 입시 정보 자료', '출처의 성격을 밝히고 “참고용”으로 표기. 단정하지 않음'],
              ['자격증 시험 과목·응시료·일정', '한국산업인력공단 큐넷, 대한상공회의소 등 시행처', '시행처 기준으로 서술하고, 일정은 공고 확인을 안내'],
              ['학원비·재료비 범위', '전국 미용입시학원 상담 데이터', '평균 범위로 제시하고 지역·학원별 편차를 함께 명시'],
              ['직업별 수입', '워크넷 등 공개 직업 정보', '범위로 제시하고 경력·지역 편차를 명시'],
            ]}
            caption={`※ 이 사이트는 ${PAGES.length}개 주제 페이지로 구성되어 있으며, 조회량 자료가 확인된 키워드 기준 월간 검색량 합계는 약 ${totalVolume}회입니다.`}
          />
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">이 사이트가 하지 않는 것</h2>
          <ul>
            <li><strong>합격을 보장하지 않습니다.</strong> 진단은 지원 가능 범위를 좁혀주는 참고 자료이지 합격 예측이 아닙니다.</li>
            <li><strong>확인되지 않은 수치를 쓰지 않습니다.</strong> 경쟁률이나 등급컷을 그럴듯하게 만들어 넣지 않습니다.</li>
            <li><strong>등록을 강요하지 않습니다.</strong> 상담 후 학원을 선택하지 않아도 불이익이 없습니다.</li>
            <li><strong>정보를 상담 목적 외에 쓰지 않습니다.</strong> 요청하면 즉시 삭제합니다.</li>
          </ul>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">정보가 틀렸다면 알려주세요</h2>
          <p>
            대학 전형은 해마다 바뀌고, 저희가 놓치는 변경도 생깁니다. 잘못된 내용을 발견하시면{' '}
            <Link href="/contact/">문의하기</Link>로 알려주시면 확인 후 수정하고, 어떻게 고쳤는지 회신드립니다.
            개인정보 열람·삭제 요청도 같은 창구에서 처리합니다.
          </p>
        </section>

        <section aria-labelledby="sec-7">
          <h2 id="sec-7">주요 페이지</h2>
          <p>처음 오셨다면 아래 순서로 보시는 것을 권합니다.</p>
          <ol>
            <li><Link href="/cost/">미용입시학원 학원비 총정리</Link> — 가격 범위와 추가 비용부터 확인</li>
            <li><Link href="/major/">미용학과 총정리</Link> — 헤어·메이크업·화장품 세 트랙 비교</li>
            <li><Link href="/practice/">미용입시 실기 총정리</Link> — 학과별 실기 과제와 준비물</li>
            <li><Link href="/univ/">미용대학 비교</Link> — 실기 있는 대학과 없는 대학 구분</li>
            <li><Link href="/license/">가산점 자격증 총정리</Link> — 트랙별로 유리한 자격증</li>
            <li><Link href="/diagnosis/">지원 가능 대학 진단</Link> — 내 조건으로 범위 좁히기</li>
          </ol>
        </section>
      </article>

      <div style={{ marginTop: 56 }}>
        <CtaBanner
          title="정보를 다 보셨다면, 내 조건으로 범위를 좁혀보세요"
          desc="전형유형·희망학과·지역만 선택하면 지원 가능 대학과 예상 학원비를 정리해 드립니다. 무료이고 등록 의무는 없습니다."
        />
      </div>
    </main>
  );
}
