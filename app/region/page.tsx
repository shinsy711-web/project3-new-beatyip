import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { getPage } from '@/lib/site';
import { BRANCH_REGIONS } from '@/data/constants';
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

const PATH = '/region/';
export const metadata = pageMetadata(PATH);

/** 상세 페이지가 별도로 있는 지역 — 허브 상단 표·앵커 목록에서 이 3곳은 상세 페이지로 연결한다 */
const DETAIL_PAGE_IDS = new Set(['gangnam', 'suwon', 'gwangju']);

/** 지역별 상세 서술(지역 특징·인근 대학·학원비 편차·실기 특징). id는 BRANCH_REGIONS와 동일하게 유지 */
const REGION_DETAILS: Record<
  string,
  { group: string; univ: string; feature: React.ReactNode; costFeature: React.ReactNode }
> = {
  gangnam: {
    group: '수도권',
    univ: '성신여대·서경대·한성대(서울)',
    feature: (
      <>
        강남·서초·송파는 학원가 자체가 발달해 학원 선택지가 많은 대신, 강사 경력이나 합격 실적을 비교해 고르는 것이 특히 중요한 지역입니다. 통학 소요시간, 서울 소재 대학 3곳 정보, 학원 고를 때 체크포인트는{' '}
        <Link href="/region/gangnam/">강남 미용입시학원 상세 페이지</Link>에서 확인할 수 있습니다.
      </>
    ),
    costFeature: (
      <>
        <strong>강남미용입시학원</strong> 학원비는 <Link href="/cost/">전국 평균 대비 10~20% 높게</Link> 형성되는 경우가 많습니다. 왜 더 비싼지, 그만큼 값을 하는지에 대한 판단 기준은 상세 페이지에 정리했습니다.
      </>
    ),
  },
  suwon: {
    group: '수도권',
    univ: '수원여대(경기 수원)',
    feature: (
      <>
        수원·용인·화성은 경기 남부 학군이 두꺼운 지역으로, 인구가 많아 통학 가능한 학원 선택지도 다양한 편입니다. 지역에서 준비할지 서울까지 다닐지 고민된다면{' '}
        <Link href="/region/suwon/">수원 미용입시학원 상세 페이지</Link>의 통학 시간 비교표를 참고하세요.
      </>
    ),
    costFeature: (
      <>
        <strong>수원미용입시학원</strong>을 비롯한 경기 남부권 학원비는 서울 강남권보다는 낮고, 전국 평균과 비슷한 수준으로 형성되는 편입니다. 인근 <Link href="/univ/etc/">수원여대 미용예술과</Link> 정보도 상세 페이지에서 함께 확인할 수 있습니다.
      </>
    ),
  },
  incheon: {
    group: '수도권',
    univ: '부천대(인접 부천)',
    feature: (
      <>
        인천·김포권은 서울 서부와 인접해 있어 서울 학원으로 통학하는 학생과 지역 내 학원을 이용하는 학생이 나뉩니다. 국제학교·특성화고 등 다양한 학교군이 섞여 있어 진학 목표도 학교별로 다양한 편입니다.
        명단 내 인천 소재 미용 관련 대학은 없지만, 인접한 부천 지역의 <Link href="/univ/etc/">부천대학교 뷰티케어과</Link>가 비교적 가까운 통학권입니다.
      </>
    ),
    costFeature: (
      <>
        <strong>인천미용입시학원</strong> 학원비는 수도권 외곽 평균 수준으로, 서울 강남권보다는 낮게 형성되는 편입니다. 공항·항만 접근성이 좋은 지역 특성상 주말 집중반을 함께 운영하는 학원도 있습니다.
      </>
    ),
  },
  bucheon: {
    group: '수도권',
    univ: '부천대(경기 부천)',
    feature: (
      <>
        부천·광명·시흥은 서울과 인천 사이에 위치해 양쪽 방향 통학이 모두 가능한 지역입니다. 대중교통으로 서울 서남권 학원까지도 비교적 짧은 시간에 이동할 수 있습니다.
        지역 내에 <Link href="/univ/etc/">부천대학교 뷰티케어과</Link>가 있어, 실기 없이 학생부 전형으로 지원하는 경로를 함께 고려하는 학생이 많습니다.
      </>
    ),
    costFeature: (
      <>
        <strong>부천미용입시학원</strong> 학원비는 인천권과 비슷하게 서울 강남권보다 낮은 수준으로 형성됩니다. 헤어·메이크업 실기반과 함께 화장품학과 대비 학생부·면접반을 함께 운영하는 학원도 있습니다.
      </>
    ),
  },
  cheonan: {
    group: '충청권',
    univ: '서원대(청주)·건국대 글로컬(충주)',
    feature: (
      <>
        천안·아산·평택은 충남 북부 산업·주거 밀집지로 수도권과의 접근성이 좋아 통학권이 넓은 편입니다. KTX·SRT·전철 노선이 함께 지나 서울·수도권 학원과의 왕복 통학을 병행하는 학생도 있습니다.
        충청권으로는 <Link href="/univ/seowon/">서원대학교 뷰티학과</Link>(청주), <Link href="/univ/etc/">건국대학교 글로컬캠퍼스 뷰티화장품학과</Link>(충주)가 비교적 가까운 대학입니다.
      </>
    ),
    costFeature: (
      <>
        <strong>천안미용입시학원</strong> 학원비는 다른 지방 권역과 비슷한 수준으로, 서울 강남권보다 낮게 형성되는 편입니다. 산업단지 인구가 많아 저녁·주말 시간대 수업 비중이 높은 것도 특징입니다.
      </>
    ),
  },
  daejeon: {
    group: '충청권',
    univ: '서원대(청주)·건국대 글로컬(충주)',
    feature: (
      <>
        대전·세종은 충청권 중심 도시로 대전 광역시 안에서 통학 가능한 학원이 모여 있고, 세종에서 넘어오는 통학생도 꾸준합니다. 과학·연구단지가 있는 지역 특성상 화장품학과·연구직 진로에 대한 관심도 상대적으로 높은 편입니다.
        충청권 대표 대학인 <Link href="/univ/seowon/">서원대학교 뷰티학과</Link>와 <Link href="/univ/etc/">건국대 글로컬캠퍼스 뷰티화장품학과</Link>가 인근 통학권에 있습니다.
      </>
    ),
    costFeature: (
      <>
        <strong>대전미용입시학원</strong> 학원비는 다른 광역시와 비슷한 수준으로, 서울권보다 낮게 형성되는 편입니다. 세종·공주 등 인근 지역 학생을 위한 주말 집중반을 함께 운영하는 학원도 있습니다.
      </>
    ),
  },
  cheongju: {
    group: '충청권',
    univ: '서원대(청주)',
    feature: (
      <>
        청주는 충북 유일의 광역 학군으로, 충북 전역에서 통학·주말반을 병행하는 학생들이 모입니다. 지역 내 대학 진학을 목표로 하는 학생 비중이 다른 권역보다 높은 편입니다.
        <Link href="/univ/seowon/">서원대학교 뷰티학과</Link>가 지역 내에 있어 실기·학생부 전형 정보를 가장 가까이에서 얻을 수 있고, <Link href="/univ/etc/">건국대 글로컬캠퍼스</Link>(충주)도 충북권 통학권입니다.
      </>
    ),
    costFeature: (
      <>
        <strong>청주미용입시학원</strong> 학원비는 다른 지방 광역시와 비슷한 수준입니다. 지역 대학 실기고사 출제 경향을 오래 지켜본 강사진이 있는 학원을 선택하면 정보 면에서 유리합니다.
      </>
    ),
  },
  gwangju: {
    group: '호남권',
    univ: '광주여대(광주)',
    feature: (
      <>
        광주는 호남권 최대 학군으로, 전남 각지에서 통학·기숙을 병행하는 학생이 많습니다. 지역에서 준비해도 수도권 대학까지 지원할 수 있는지 궁금하다면{' '}
        <Link href="/region/gwangju/">광주 미용입시학원 상세 페이지</Link>에서 통학 시간과 정보력 격차를 좁히는 방법을 확인하세요.
      </>
    ),
    costFeature: (
      <>
        <strong>광주미용입시학원</strong> 학원비는 전국 평균과 비슷하거나 약간 낮은 수준으로 형성됩니다. 인근 <Link href="/univ/etc/">광주여대 미용과학과</Link> 정보도 상세 페이지에서 함께 확인할 수 있습니다.
      </>
    ),
  },
  daegu: {
    group: '영남권',
    univ: '해당 없음(원거리 지원 검토)',
    feature: (
      <>
        대구·경북권은 명단 내 뷰티 관련 학과 개설 대학이 없어, 서울·수도권이나 인근 권역 대학까지 지원 범위를 넓히는 학생이 많습니다. 정확한 최신 개설 학과 목록은 <Link href="/univ/">미용대학 비교 페이지</Link>에서 확인하는 것이 안전합니다.
      </>
    ),
    costFeature: (
      <>
        <strong>대구미용입시학원</strong> 학원비는 다른 광역시와 비슷한 수준으로 형성되는 편입니다. 지원 대학이 대부분 원거리이다 보니, 실기 완성도뿐 아니라 대학별 출제 경향 정보력을 갖춘 학원인지가 특히 중요합니다.
      </>
    ),
  },
  busan: {
    group: '영남권',
    univ: '해당 없음(원거리 지원 검토)',
    feature: (
      <>
        부산·김해·양산권은 영남 동남부 최대 학군으로, 인근 도시에서 넘어오는 통학생이 많습니다. 명단 내 미용 관련 대학은 없어 서울·수도권 대학이나 호남·충청권 대학까지 지원 범위를 넓히는 경우가 일반적입니다. 최신 개설 학과는 <Link href="/univ/">미용대학 비교 페이지</Link>에서 확인하세요.
      </>
    ),
    costFeature: (
      <>
        <strong>부산미용입시학원</strong> 학원비는 다른 광역시와 비슷한 수준입니다. 원거리 대학 지원이 많은 지역 특성상 모의고사·모의실기 응시 횟수를 넉넉히 확보한 학원을 고르는 것이 좋습니다.
      </>
    ),
  },
  ulsan: {
    group: '영남권',
    univ: '해당 없음(부산권과 통학권 공유)',
    feature: (
      <>
        울산은 부산·경남 동부권과 통학권을 공유하는 산업도시로, 인근 부산권 학원까지 함께 고려하는 학생이 많습니다. 명단 내 지역 소재 대학은 없어 <Link href="/univ/">미용대학 비교 페이지</Link>에서 원거리 지원 후보를 먼저 넓게 살펴보는 것을 권장합니다.
      </>
    ),
    costFeature: (
      <>
        <strong>울산미용입시학원</strong> 학원비는 다른 광역시와 비슷한 수준으로 형성되는 편입니다. 부산권 학원과 병행 통학하는 학생이 있어 주말 집중반 수요가 상대적으로 높습니다.
      </>
    ),
  },
  jeonju: {
    group: '호남권',
    univ: '원광대(익산)',
    feature: (
      <>
        전주·익산은 전북 학군의 중심지로, 도내 여러 지역에서 통학이 몰리는 곳입니다. 지역 내 <Link href="/univ/etc/">원광대학교 뷰티디자인학과</Link>(익산)가 있어 실기·학생부 전형 정보를 비교적 가까이에서 확인할 수 있습니다.
      </>
    ),
    costFeature: (
      <>
        <strong>전주미용입시학원</strong> 학원비는 다른 지방 권역과 비슷한 수준으로, 서울 강남권보다 낮게 형성되는 편입니다. 익산·군산 등 인근 지역 통학생을 위한 주말반을 함께 운영하는 학원도 있습니다.
      </>
    ),
  },
};

export default function RegionPage() {
  const page = getPage(PATH);

  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="지역별 학원 · 2027학년도 미용입시 기준"
        lead="지역별 미용입시학원 정보를 12개 지역으로 정리했습니다. 수원미용입시학원, 광주미용입시학원, 강남미용입시학원처럼 우리 동네에서 통학 가능한 학원부터, 지역별 학원비 경향과 실기 수업 특징까지 비교해 보세요."
        chips={['12개 지역', '통학권별 특징', '지역 학원비 경향', '기숙 vs 통학 비교']}
      />

      <StatGrid
        items={[
          { label: '커버 지역', value: '12곳', sub: '수도권 4 · 충청권 3 · 호남권 2 · 영남권 3' },
          { label: '서울·강남권 학원비', value: '+10~20%', sub: '지방 평균 대비 프리미엄' },
          { label: '광역시 학원비', value: '전국 평균 수준', sub: '대전·광주·대구·부산·울산 유사' },
          { label: '통학 기준선', value: '편도 60분', sub: '초과 시 기숙·주말반 검토 권장' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="region"
          heading="우리 지역 미용입시학원 학원비 견적"
          subheading="거주 지역과 희망 학과를 알려주시면 통학 가능한 권역과 예상 학원비를 함께 안내합니다. 무료이고 등록 강요는 없습니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">지역별 미용입시학원, 어디서부터 찾아야 할까</h2>
          <p>
            미용입시학원은 서울 강남권에만 몰려 있지 않습니다. <strong>수원미용입시학원</strong>을 찾는 경기 남부권 학생, <Link href="#gwangju">광주미용입시학원</Link>을 찾는 호남권 학생, <Link href="#gangnam">강남미용입시학원</Link>을 찾는 서울권 학생까지 — 지역마다 통학 여건과 학원비, 인근에서 지원 가능한 대학이 다릅니다.
            아래 요약표와 12개 지역 앵커 링크로 우리 동네부터 빠르게 확인하고, 각 지역 섹션에서 통학권·인근 대학·학원비 편차·실기 수업 특징을 자세히 살펴보세요.
          </p>
          <DataTable
            head={['지역', '권역', '인근 지원 가능 대학', '학원비 경향', '특징']}
            align={['left', 'left', 'left', 'center', 'left']}
            rows={BRANCH_REGIONS.map((r) => [
              DETAIL_PAGE_IDS.has(r.id) ? <Link key={r.id} href={`/region/${r.id}/`}>{r.name} 상세 →</Link> : <a key={r.id} href={`#${r.id}`}>{r.name}</a>,
              REGION_DETAILS[r.id].group,
              REGION_DETAILS[r.id].univ,
              r.id === 'gangnam' ? '+10~20%' : '전국 평균 수준',
              r.area,
            ])}
            caption="※ 인근 대학은 data/constants.ts의 UNIVERSITIES 소재지 기준이며, 명단에 없는 권역은 원거리 지원을 함께 검토하시길 권합니다. 학원비 경향은 2026년 기준 참고 범위로 실제 금액은 학원·강사 경력에 따라 다릅니다. 강남·수원·광주는 학원비·통학·대학 정보를 더 깊이 다룬 상세 페이지가 별도로 있습니다."
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '18px 0 8px' }}>
            {BRANCH_REGIONS.map((r) =>
              DETAIL_PAGE_IDS.has(r.id) ? (
                <Link key={r.id} href={`/region/${r.id}/`} className="chip chip--outline" style={{ fontSize: 13 }}>
                  {r.name} 상세 →
                </Link>
              ) : (
                <a key={r.id} href={`#${r.id}`} className="chip chip--outline" style={{ fontSize: 13 }}>
                  {r.name}
                </a>
              ),
            )}
          </div>
          <Callout type="warn" title="지점 정보는 상담 시 정확히 안내합니다">
            아래 지역별 서술은 통학권·인근 대학·학원비 경향을 지역 단위로 정리한 참고 정보이며, 실제 상담 가능한 정확한 지점·주소는 폼 신청 후 담당 멘토가 안내합니다. 대학 전형·실기 반영 여부는 연도별로 바뀌므로 정확한 정보는 각 대학 모집요강(어디가·대학 입학처)에서 확인하세요.
          </Callout>
        </section>

        <section aria-labelledby="gangnam">
          <h2 id="gangnam">강남 — 강남미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.gangnam.feature}</p>
          <p>{REGION_DETAILS.gangnam.costFeature}</p>
          <p><Link href="/region/gangnam/">→ 강남 미용입시학원 학원비·통학·대학 정보 자세히 보기</Link></p>
        </section>

        <section aria-labelledby="suwon">
          <h2 id="suwon">수원 — 수원미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.suwon.feature}</p>
          <p>{REGION_DETAILS.suwon.costFeature}</p>
          <p><Link href="/region/suwon/">→ 수원 미용입시학원 학원비·통학·대학 정보 자세히 보기</Link></p>
        </section>

        <section aria-labelledby="incheon">
          <h2 id="incheon">인천 — 인천미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.incheon.feature}</p>
          <p>{REGION_DETAILS.incheon.costFeature}</p>
        </section>

        <section aria-labelledby="bucheon">
          <h2 id="bucheon">부천 — 부천미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.bucheon.feature}</p>
          <p>{REGION_DETAILS.bucheon.costFeature}</p>
        </section>

        <section aria-labelledby="cheonan">
          <h2 id="cheonan">천안 — 천안미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.cheonan.feature}</p>
          <p>{REGION_DETAILS.cheonan.costFeature}</p>
        </section>

        <section aria-labelledby="daejeon">
          <h2 id="daejeon">대전 — 대전미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.daejeon.feature}</p>
          <p>{REGION_DETAILS.daejeon.costFeature}</p>
        </section>

        <section aria-labelledby="cheongju">
          <h2 id="cheongju">청주 — 청주미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.cheongju.feature}</p>
          <p>{REGION_DETAILS.cheongju.costFeature}</p>
        </section>

        <section aria-labelledby="gwangju">
          <h2 id="gwangju">광주 — 광주미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.gwangju.feature}</p>
          <p>{REGION_DETAILS.gwangju.costFeature}</p>
          <p><Link href="/region/gwangju/">→ 광주 미용입시학원 학원비·통학·대학 정보 자세히 보기</Link></p>
        </section>

        <section aria-labelledby="daegu">
          <h2 id="daegu">대구 — 대구미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.daegu.feature}</p>
          <p>{REGION_DETAILS.daegu.costFeature}</p>
        </section>

        <section aria-labelledby="busan">
          <h2 id="busan">부산 — 부산미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.busan.feature}</p>
          <p>{REGION_DETAILS.busan.costFeature}</p>
        </section>

        <section aria-labelledby="ulsan">
          <h2 id="ulsan">울산 — 울산미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.ulsan.feature}</p>
          <p>{REGION_DETAILS.ulsan.costFeature}</p>
        </section>

        <section aria-labelledby="jeonju">
          <h2 id="jeonju">전주 — 전주미용입시학원을 찾는다면</h2>
          <p>{REGION_DETAILS.jeonju.feature}</p>
          <p>{REGION_DETAILS.jeonju.costFeature}</p>

          <div style={{ margin: '48px 0 56px' }}>
            <FormSection
              id="form-bottom"
              cta={page.cta}
              sourcePage="region"
              heading="우리 지역 미용입시학원 학원비 견적"
              subheading="12개 지역 중 내 통학권을 찾으셨나요? 정확한 학원비와 통학 가능한 학원 정보를 무료로 받아보세요."
            />
          </div>
        </section>

        <section aria-labelledby="sec-14">
          <h2 id="sec-14">우리 동네 학원 고르는 법</h2>
          <p>
            같은 지역 안에서도 학원마다 합격률·학원비·수업 방식 차이가 큽니다. 상담 전에 아래 항목을 체크리스트로 확인하면 시행착오를 줄일 수 있습니다.
          </p>
          <ul>
            <li><strong>강사 경력과 최근 3년 합격 대학 리스트.</strong> 학원비보다 이 항목이 합격률과 더 직접적으로 연결됩니다.</li>
            <li><strong>반 인원(소수정예 여부).</strong> 실기는 개별 첨삭 빈도가 중요해 8명 이하 반을 권장합니다.</li>
            <li><strong>대학별 최신 출제 경향 자료 보유 여부.</strong> 특히 메이크업 계열은 도안·출제 경향이 매년 바뀝니다.</li>
            <li><strong>재료비·모의고사비 포함/별도 여부.</strong> <Link href="/cost/">학원비 페이지</Link>의 항목별 표와 비교해 견적을 받아보세요.</li>
            <li><strong>통학 편의성(대중교통·주차).</strong> 편도 60분을 넘으면 체력 소모가 커 실기 연습 시간이 줄어들 수 있습니다.</li>
            <li><strong>환불 규정의 명확성.</strong> 계약 전 서면으로 환불 기준을 확인하는 것이 안전합니다.</li>
          </ul>
        </section>

        <section aria-labelledby="sec-15">
          <h2 id="sec-15">원거리 통학 vs 기숙·주말반</h2>
          <p>
            거주 지역에 원하는 학원이 없거나, 특정 대학 실기 출제 경향에 강한 학원이 다른 지역에 있다면 원거리 통학과 기숙·주말반을 함께 고려하게 됩니다. 무엇이 더 나은지는 편도 통학 시간과 학생의 체력·생활 패턴에 따라 달라집니다.
          </p>
          <DataTable
            head={['방식', '장점', '단점', '적합한 경우']}
            align={['left', 'left', 'left', 'left']}
            rows={[
              ['근거리 통학(편도 40분 이내)', '체력 소모 적음 · 학교 병행 부담 적음', '학원 선택지가 제한적일 수 있음', '내신·학교 활동 병행이 중요한 경우'],
              ['원거리 통학(편도 40~90분)', '원하는 학원·강사 선택 가능', '왕복 시간만큼 연습·수면 시간 감소', '특정 대학 출제 경향에 강한 학원이 따로 있는 경우'],
              ['주말 집중반', '평일 학교 생활과 분리 가능', '주중 자율 연습 관리가 필요함', '평일 학원 통학이 물리적으로 어려운 경우'],
              ['기숙·합숙형(학원별 상이)', '연습 시간 확보 최대화', '비용이 더 들 수 있음 · 운영 학원이 제한적', '고3 막판 집중기 · 원거리 지역 거주'],
            ]}
            caption="※ 기숙·합숙 프로그램 운영 여부는 학원마다 다르므로 상담 시 확인이 필요합니다. 통학 시간 기준은 일반적인 권장 범위이며 개인 체력·생활 패턴에 따라 달라질 수 있습니다."
          />
          <p>
            결정이 어렵다면 <Link href="/diagnosis/">지원 가능 대학 진단</Link>으로 목표 대학을 먼저 좁힌 뒤, 그 대학 실기 출제 경향에 강한 학원이 어느 지역에 있는지부터 확인하는 순서를 권합니다.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="region-faq"
          title="지역별 미용입시학원 자주 묻는 질문"
          items={[
            { q: '우리 동네에 미용입시학원이 없으면 어떻게 하나요?', a: '인근 권역 학원까지 통학 범위를 넓히거나 주말 집중반·기숙형 프로그램을 운영하는 학원을 고려할 수 있습니다. 12개 지역 요약표에서 가장 가까운 권역을 먼저 확인하고, 상담을 통해 실제 통학 가능한 학원을 안내받으세요.' },
            { q: '지방에서도 서울 미용대학 지원이 가능한가요?', a: '가능합니다. 대학 실기고사와 전형은 거주 지역과 무관하게 지원할 수 있습니다. 다만 통학이 어려우면 실기 준비를 원거리 통학이나 기숙·주말반으로 진행하는 경우가 많습니다.' },
            { q: '지역마다 학원비는 얼마나 차이 나나요?', a: '서울 강남권은 전국 평균보다 10~20% 높게 형성되는 경우가 많고, 대전·광주·대구·부산·울산 등 지방 광역시는 전국 평균과 비슷한 수준입니다. 정확한 과정별 금액은 학원비 페이지의 표를 참고하세요.' },
            { q: '기숙사가 있는 학원도 있나요?', a: '학원에 따라 기숙·합숙형 프로그램을 운영하는 경우가 있습니다. 모든 학원이 운영하는 것은 아니므로 상담 시 기숙 가능 여부와 비용을 함께 확인하는 것이 정확합니다.' },
            { q: '통학이 오래 걸리는데 그냥 다른 지역 학원에 다녀도 되나요?', a: '가능합니다. 다만 편도 90분을 넘어가면 체력 소모가 커 연습 시간이 줄어들 수 있어, 주말 집중반이나 방학 기간 단기 기숙 프로그램과 병행하는 방법을 함께 고려하시는 것을 권합니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/cost/', '/major/', '/univ/', '/license/', '/practice/']}
        labels={{ '/diagnosis/': '지원 가능 대학 5초 진단', '/cost/': '과정별 학원비 총정리' }}
      />

      <CtaBanner
        title="우리 지역 통학권부터 확인하고 시작하세요"
        desc="거주 지역과 희망 학과가 정해지면 통학 가능한 학원과 예상 학원비를 바로 안내받을 수 있습니다. 5초 진단으로 지원 가능 대학도 함께 확인해보세요."
      />
    </PageShell>
  );
}
