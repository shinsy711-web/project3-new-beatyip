import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { getPage } from '@/lib/site';
import { UNIVERSITIES } from '@/data/constants';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import FormSection from '@/components/FormSection';
import DataTable from '@/components/DataTable';
import Callout from '@/components/Callout';
import StatGrid from '@/components/StatGrid';
import FaqSection from '@/components/FaqSection';
import RelatedLinks from '@/components/RelatedLinks';
import CtaBanner from '@/components/CtaBanner';

const PATH = '/univ/etc/';
export const metadata = pageMetadata(PATH);

const TRACK_LABEL: Record<string, string> = {
  hair: '헤어',
  makeup: '메이크업',
  cosmetic: '화장품',
  skin: '피부',
  nail: '네일',
};

function trackText(track: string[]) {
  return track.map((t) => TRACK_LABEL[t] ?? t).join('·');
}

export default function UnivEtcPage() {
  const page = getPage(PATH);
  const univs = UNIVERSITIES.filter((u) => u.path === PATH);

  return (
    <PageShell path={PATH} width="wide">
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="대학 · 2027학년도 미용입시 기준"
        lead="부천대·한성대·광주여대·서경대·원광대·수원여대·건국대 글로컬캠퍼스, 7개 대학의 미용 관련 학과를 한 페이지에 모았습니다. 검색량은 개별로 크지 않지만 실기 유무와 트랙이 대학마다 뚜렷하게 갈립니다."
        chips={['7개 대학 한 번에 비교', '실기 있는 대학 4곳', '실기 없는 대학 3곳', '전문대·4년제 혼합']}
      />

      <StatGrid
        items={[
          { label: '비교 대학', value: '7개교', sub: '4년제 5곳 · 전문대(2~3년제) 2곳' },
          { label: '실기 있는 대학', value: '4곳', sub: '광주여대·서경대·원광대·수원여대' },
          { label: '실기 없는 대학', value: '3곳', sub: '부천대·한성대·건국대 글로컬' },
          { label: '트랙 구성', value: '헤어·메이크업·화장품·피부', sub: '대학별로 1~4개 트랙 운영' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="univ-etc"
          heading="7개 대학 중 나에게 맞는 곳 진단받기"
          subheading="희망 지역과 실기 여부만 알려주시면 7개 대학 중 지원 가능성이 높은 대학을 무료로 안내합니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">검색량은 작아도 놓치면 안 되는 7개 대학</h2>
          <p>
            <strong>부천대 뷰티케어과</strong>를 비롯해 한성대·광주여대·서경대·원광대·수원여대·건국대 글로컬캠퍼스는 개별 검색량은 크지 않지만, 실기 유무와 트랙 구성이 명확해 지역·전형 조건이 맞으면 오히려 지원 경쟁이 상대적으로 낮은 경우가 있습니다. 아래 요약표로 먼저 전체를 훑어보고, 관심 있는 대학의 h2 섹션에서 자세한 내용을 확인하세요.
          </p>

          <h3>7개 대학 요약 비교표</h3>
          <DataTable
            head={['대학 · 학과', '소재지', '학위', '실기 여부', '트랙']}
            align={['left', 'center', 'center', 'center', 'left']}
            rows={univs.map((u) => [
              <span key={u.id}>{u.name}<br /><span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: 12 }}>{u.dept}</span></span>,
              u.region,
              u.degree,
              u.practical ? '있음' : '없음',
              trackText(u.track),
            ])}
            caption="※ 2026년 9월 기준 학과명·소재지이며, 실기 여부는 대표 전형 기준입니다. 전형별로 다를 수 있으니 반드시 각 대학 입학처 모집요강을 확인하세요."
          />
          <p>
            실기 없는 대학부터 살펴보고 싶다면 <Link href="/major/cosmetic/">화장품학과 총정리</Link>를, 실기 있는 대학의 준비물이 궁금하다면 <Link href="/practice/">실기 총정리</Link> 페이지를 함께 참고하세요.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">부천대학교 뷰티케어과</h2>
          <p>
            경기 부천에 있는 전문대(2~3년제)로, 헤어디자인전공·뷰티디자인전공 등 세부 전공으로 나뉘어 헤어·메이크업·피부 영역을 실무 중심으로 배웁니다. NCS(국가직무능력표준) 기반 커리큘럼으로 현장 실무 능력을 키우는 데 초점이 맞춰져 있습니다.
            실기 반영 여부는 전형에 따라 다를 수 있어 확인이 필요하지만, 대체로 실기 없이 학생부·서류 중심으로 선발하는 전형이 중심입니다. 전문대 특성상 취업 연계가 빠르다는 점이 장점입니다.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">한성대학교 뷰티디자인학과</h2>
          <p>
            서울에 있는 4년제로, 뷰티산업 환경 변화에 대응하는 뷰티디자인 이론과 실무를 함께 배웁니다. 다만 한성대의 뷰티디자인학과는 <strong>미래플러스대학(야간)</strong> 소속으로, 재직자·성인학습자를 대상으로 주 1회 수업과 선행학습경험인정제도(RPL)를 운영하는 학위과정 성격이 강합니다.
            일반 고3 수험생을 대상으로 한 주간·정시 실기 모집 여부는 대학마다 운영 방식이 다를 수 있으므로, 지원을 고려한다면 전형 대상(고교 졸업 예정자 vs 재직자)부터 입학처에 확인하는 것이 중요합니다.
          </p>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">광주여자대학교 미용과학과</h2>
          <p>
            광주에 있는 4년제로, 헤어·메이크업·피부·네일 등 미용 전 영역을 폭넓게 다루는 학과입니다. 지방 4년제 중 미용 관련 트랙을 가장 다양하게 운영하는 곳 중 하나로, 실기 전형을 함께 운영하는 것으로 파악됩니다.
            광주·전남권 수험생이라면 통학 부담이 적고, 헤어·메이크업 중 진로를 아직 정하지 못했더라도 입학 후 트랙을 좁혀갈 수 있다는 점이 장점입니다.
          </p>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">서경대학교 메이크업디자인학과</h2>
          <p>
            서울에 있는 4년제로, 메이크업 한 분야에 집중한 학과입니다. 메이크업디자인학과는 자체 실기고사를 운영하는 것으로 확인되며, <Link href="/practice/artmask/">아트마스크</Link>·뷰티일러스트 계열 실기 경험이 있는 학생에게 유리한 구조로 알려져 있습니다.
            메이크업 한 트랙에 집중하고 싶은 <Link href="/major/makeup/">메이크업학과</Link> 지망생이라면 서경대를 지원 후보에 넣고 실기 기출 자료를 확인해 볼 만합니다.
          </p>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">원광대학교 뷰티디자인학과</h2>
          <p>
            전북 익산에 있는 4년제로, 헤어·메이크업·피부 영역을 아우르는 뷰티디자인학과를 운영합니다. 실기 전형이 있는 것으로 파악되며, 호남권에서 통학 가능한 4년제 미용 관련 학과를 찾는 수험생에게 대표적인 선택지입니다.
            지역 특성상 서울·수도권 대학보다 경쟁이 상대적으로 낮을 수 있어, 실기 준비 시간이 부족한 학생도 함께 검토해볼 만합니다.
          </p>
        </section>

        <section aria-labelledby="sec-7">
          <h2 id="sec-7">수원여자대학교 미용예술과</h2>
          <p>
            경기 수원에 있는 전문대(2~3년제)로, 피부미용전공·헤어전공·메이크업전공 세 개 전공으로 나뉘어 있습니다. 전공별로 NCS 기반 커리큘럼을 운영해 실무 자격증 취득과 취업을 함께 준비할 수 있는 구조입니다.
            실기 전형을 운영하는 것으로 파악되며, 수도권 남부(수원·용인·화성) 수험생이라면 <Link href="/region/">지역별 학원</Link>과 연계해 통학 준비를 계획할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-8">
          <h2 id="sec-8">건국대학교 글로컬캠퍼스 뷰티화장품학과</h2>
          <p>
            충북 충주에 있는 4년제로, 뷰티스페셜리스트·뷰티마케터·화장품 기획·항노화 바이오화장품 등 실무보다 기획·연구·마케팅에 가까운 커리큘럼을 갖춘 학과입니다. 실기 없이 학생부·서류 중심으로 선발하는 전형이 중심으로 파악됩니다.
            손기술 실기보다 화장품 산업 전반(기획·마케팅·연구)에 관심이 있는 학생에게 적합하며, <Link href="/major/cosmetic/">화장품학과 총정리</Link>에서 유사 학과와 진로를 비교해 볼 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-9">
          <h2 id="sec-9">지원 전 반드시 확인할 것</h2>
          <p>
            위 7개 대학은 검색량은 작아도 실존하는 학과이며, 각각 실기 유무와 트랙이 뚜렷하게 다릅니다. 다만 학과명·전형 구조가 개편되는 경우가 있어, 지원을 고려한다면 반드시 각 대학 입학처 홈페이지에서 최신 정보를 다시 확인해야 합니다.
          </p>
          <Callout type="warn" title="전형·모집인원·경쟁률은 매년 바뀝니다">
            이 페이지의 실기 여부·트랙 정보는 2026년 9월 기준으로 확인한 참고 자료입니다. 학과명이 개편되거나 실기 전형이 신설·폐지될 수 있으므로, 지원 전 반드시 해당 대학 입학처의 2027학년도 최신 모집요강으로 확인하세요.
          </Callout>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="univ-etc-faq"
          title="그 외 미용대학 자주 묻는 질문"
          items={[
            { q: '부천대 뷰티케어과는 실기가 있나요?', a: '전공과 전형에 따라 다를 수 있습니다. 대체로 학생부·서류 중심 전형이 많은 것으로 파악되며, 정확한 실기 반영 여부는 부천대 입학처 모집요강에서 확인해야 합니다.' },
            { q: '한성대 뷰티디자인학과는 고3도 지원할 수 있나요?', a: '한성대 뷰티디자인학과는 미래플러스대학(야간) 소속으로 재직자·성인학습자 대상 학위과정 성격이 강합니다. 고3 수험생 대상 주간·정시 모집 여부는 대학마다 운영이 다를 수 있어 입학처에 직접 확인하는 것이 안전합니다.' },
            { q: '서경대 메이크업디자인학과 실기는 어떻게 준비하나요?', a: '아트마스크·뷰티일러스트 계열의 메이크업 실기 경험이 도움이 되는 것으로 알려져 있습니다. 정확한 실기 과목과 채점 기준은 서경대 입학처에서 공개하는 기출 자료로 확인해야 합니다.' },
            { q: '광주여대·원광대·수원여대는 어떤 학생에게 유리한가요?', a: '각각 광주·익산·수원 지역에 있어 해당 지역 및 인근(호남권·수도권 남부) 수험생의 통학 부담이 적습니다. 실기 전형을 운영해 헤어·메이크업 실기 경험이 있는 학생에게 유리한 구조입니다.' },
            { q: '건국대 글로컬캠퍼스 뷰티화장품학과는 실기가 없나요?', a: '실기보다 서류·학생부 중심 전형이 중심인 것으로 파악됩니다. 손기술 실기보다 화장품 기획·마케팅·연구 분야에 관심 있는 학생에게 적합한 학과입니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/univ/', '/univ/sungshin/', '/univ/seowon/', '/major/cosmetic/', '/region/']}
        labels={{ '/diagnosis/': '7개 대학 중 지원 가능 대학 진단' }}
      />

      <CtaBanner
        title="7개 대학 중 나에게 맞는 곳을 찾아드립니다"
        desc="지역과 실기 여부만 알려주시면 지원 가능성이 높은 대학을 5초 만에 안내합니다."
      />
    </PageShell>
  );
}
