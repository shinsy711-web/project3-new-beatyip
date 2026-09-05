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
import FaqSection from '@/components/FaqSection';
import RelatedLinks from '@/components/RelatedLinks';
import CtaBanner from '@/components/CtaBanner';

const PATH = '/major/hair/';
export const metadata = pageMetadata(PATH);

export default function MajorHairPage() {
  const page = getPage(PATH);

  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="헤어디자인학과 · 2027학년도 미용입시 기준"
        lead="헤어디자인학과·헤어디자인과는 와인딩·업스타일·커트 실기가 중심인 학과입니다. 4년제부터 전문대까지 전국에 고르게 개설되어 있고, 이용사·미용사(일반) 자격증이 입시 가산점으로 자주 반영됩니다. 전형과 실기 과제부터 정리했습니다."
        chips={['전국 개설 대학 다수', '실기: 와인딩·업스타일·커트', '가산점: 이용사·미용사(일반)', '진로: 헤어디자이너·살롱 창업']}
      />

      <StatGrid
        items={[
          { label: '핵심 실기 과제', value: '3종', sub: '와인딩 · 업스타일 · 커트' },
          { label: '준비 총비용', value: '500~730만원', sub: '10개월 · 재료비 포함' },
          { label: '가산점 자격증', value: '이용사 · 미용사(일반)', sub: '국가자격증 필기·실기' },
          { label: '학위 형태', value: '4년제 · 전문대', sub: '전국 4년제·전문대 혼재 개설' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="major-hair"
          defaultMajor="hair"
          heading="헤어디자인학과, 내 성적·실기 수준으로 어디까지 갈 수 있을까"
          subheading="희망 지역과 실기 준비 상태를 알려주시면 지원 가능한 대학과 준비해야 할 과제를 정리해 드립니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">헤어디자인학과·헤어디자인과, 전국 대학 목록</h2>
          <p>
            <strong>헤어디자인학과</strong>는 4년제에서는 헤어디자인학과·뷰티디자인학과·뷰티산업학과 안의 헤어 트랙으로, 전문대에서는 헤어디자인과·미용예술과라는 이름으로 개설됩니다.
            아래 표는 <Link href="/univ/">미용대학 비교</Link> 데이터베이스에 있는 대학과, 헤어디자인과가 별도로 개설된 것으로 확인된 대학을 함께 정리한 것입니다.
          </p>
          <DataTable
            head={['대학', '학과명', '소재지', '학위', '실기']}
            align={['left', 'left', 'left', 'center', 'center']}
            rows={[
              [<Link key="ss" href="/univ/sungshin/">성신여자대학교</Link>, '뷰티산업학과', '서울', '4년제', '전형별 상이'],
              [<Link key="sw" href="/univ/seowon/">서원대학교</Link>, '뷰티학과', '충북 청주', '4년제', '있음'],
              [<Link key="kw" href="/univ/etc/">광주여자대학교</Link>, '미용과학과', '광주', '4년제', '있음'],
              [<Link key="wk" href="/univ/etc/">원광대학교</Link>, '뷰티디자인학과', '전북 익산', '4년제', '있음'],
              [<Link key="bc" href="/univ/etc/">부천대학교</Link>, '뷰티케어과', '경기 부천', '전문대', '전형별 상이'],
              [<Link key="sww" href="/univ/etc/">수원여자대학교</Link>, '미용예술과', '경기 수원', '전문대', '있음'],
              ['동명대학교', '헤어디자인과', '부산', '4년제', '모집요강 확인'],
              ['계명문화대학교', '헤어디자인과', '대구', '전문대', '모집요강 확인'],
              ['대구과학대학교', '헤어디자인과', '대구', '전문대', '모집요강 확인'],
            ]}
            caption="※ 학과명·소재지는 각 대학 공식 홈페이지 기준으로 확인했습니다. 실기 반영 여부·모집 정원은 연도별로 바뀌므로 지원 전 각 대학 입학처와 2027학년도 모집요강을 반드시 확인하세요."
          />
          <Callout type="warn" title="실기 반영 방식은 대학마다, 연도마다 다릅니다">
            같은 헤어디자인 계열이라도 실기 100% 반영 대학, 실기+학생부 병행 대학, 실기 없이 학생부·면접만 보는 대학이 섞여 있습니다. 정확한 실기 과목·배점은 어디가(대입정보포털)와 각 대학 입학처 공지에서 확인하세요.
          </Callout>
          <p>
            지역으로 보면 서울·수도권(성신여대·부천대)뿐 아니라 충북(서원대)·전북(원광대)·광주(광주여대)·부산(동명대)·대구(계명문화대·대구과학대)까지 전국에 고르게 개설되어 있습니다. 거주 지역 학원비까지 함께 보고 싶다면 <Link href="/region/">지역별 미용입시학원</Link> 페이지도 참고할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">전형 방식 — 실기전형이 여전히 중심</h2>
          <p>
            헤어디자인학과는 세 트랙 중 실기 반영 비중이 가장 높은 편입니다. 수시 실기전형이 중심이고, 정시에서도 수능과 실기를 함께 보는 대학이 있습니다. 다만 최근에는 실기 없이 학생부와 면접으로 뽑는 전형을 함께 운영하는 대학도 늘고 있어, 실기 부담이 크다면 이런 전형도 확인해 볼 만합니다.
          </p>
          <DataTable
            head={['전형 유형', '핵심 평가 요소', '유리한 학생']}
            align={['left', 'left', 'left']}
            rows={[
              ['수시 실기전형', '내신 + 실기(와인딩·업스타일·커트 등)', '실기 연습 기간을 충분히 확보할 수 있는 경우'],
              ['수시 학생부전형', '내신 + 면접(실기 없음, 일부 대학)', '내신이 안정적이고 실기 준비가 어려운 경우'],
              ['정시(수능)', '수능 성적 위주 또는 수능+실기', '수능 성적이 상대적으로 높은 경우'],
            ]}
            caption="※ 대학별 반영 비율은 모집요강에 따라 다릅니다. 실기 없는 전형만 운영하는 대학도 있으니 지원 전 확인이 필요합니다."
          />
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">실기 과제 — 와인딩·업스타일·커트</h2>
          <p>
            헤어디자인학과 실기에서 가장 많이 다루는 과제는 <Link href="/practice/winding/">와인딩</Link>, <Link href="/practice/updo/">업스타일</Link>, <Link href="/practice/haircut/">커트</Link> 세 가지입니다.
            와인딩은 마네킹에 퍼머 로드를 정확히 감는 과제로 섹션 나누기와 시간 배분이 핵심이고, 업스타일은 머리를 올려 형태를 완성하는 과제, 커트는 도면을 읽고 그래쥬에이션·레이어드 같은 기법을 정확히 구현하는 과제입니다.
            세 과제 중 어떤 것이 나올지는 대학마다 다르므로, 지원 대학을 좁힌 뒤 그 대학의 최근 실기고사 안내문을 확인하는 것이 가장 정확합니다.
          </p>
          <p>
            세 과제 모두 마네킹을 이용한 실습이라 재료 소모가 큰 편입니다. 특히 커트는 한 번 자르면 되돌릴 수 없어 마네킹을 가장 많이 씁니다. 과제별 연습 순서와 시간 배분은 <Link href="/practice/">미용입시 실기 총정리</Link>에서 단계별로 확인할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">가산점 자격증 — 이용사·미용사(일반)</h2>
          <p>
            헤어디자인학과 입시에서 가장 많이 준비하는 가산점 자격증은 <Link href="/license/hair/">이용사·미용사(일반) 국가자격증</Link>입니다. 실기 시험에 와인딩·커트 등 입시 실기와 겹치는 과제가 많아, 자격증과 입시 실기를 함께 준비하면 재료비와 연습 시간을 이중으로 쓰지 않아도 됩니다.
            가산점 반영 여부와 비율은 대학마다 다르므로, 목표 대학이 정해지면 해당 대학 모집요강에서 자격증 가산점 항목을 꼭 확인하세요.
          </p>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">졸업 후 진로</h2>
          <p>
            헤어디자인학과 졸업 후 가장 일반적인 진로는 <strong>헤어디자이너</strong>로 살롱에 취업하는 것입니다. 경력을 쌓은 뒤 살롱을 직접 운영하는 창업으로 이어지는 경우도 많고, 학원·직업전문학교에서 후배를 가르치는 교육 강사로 방향을 잡는 경우도 있습니다.
            직업별 초봉·경력별 수입과 전망은 <Link href="/career/">뷰티 진로 가이드</Link>에서 범위로 확인할 수 있습니다. 준비 과정의 정확한 비용이 궁금하다면 <Link href="/cost/">미용입시학원 학원비 총정리</Link>도 함께 참고하세요.
          </p>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">준비 기간과 학원비, 얼마나 잡아야 할까</h2>
          <p>
            헤어디자인학과는 세 트랙 중 재료 소모가 가장 큰 만큼, 학원비도 신중하게 계산해야 합니다. 고2 겨울방학부터 시작해 고3 9월 수시 원서까지 약 10개월을 쓰는 표준 코스 기준으로 재료비를 포함한 총비용은 <strong>500~730만원</strong> 선입니다.
            고3에 처음 시작한다면 6개월 집중반으로 압축해야 하고, 이 경우 주당 횟수가 늘어 월 학원비는 오르지만 총비용은 표준 코스와 비슷하거나 오히려 낮을 수 있습니다. 정확한 기간별 비용은 <Link href="/cost/">학원비 총정리</Link> 표에서 확인하세요.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="major-hair-faq"
          title="헤어디자인학과 자주 묻는 질문"
          items={[
            { q: '헤어디자인학과는 전국에 몇 곳 있나요?', a: '4년제와 전문대를 합쳐 전국 여러 곳에 헤어디자인학과·헤어디자인과가 개설되어 있습니다. 대학에 따라 뷰티산업학과·뷰티디자인학과 안의 헤어 트랙으로 운영되는 곳도 있어 학과명만으로는 놓치기 쉽습니다.' },
            { q: '헤어디자인학과 실기는 뭘 준비해야 하나요?', a: '와인딩·업스타일·커트가 대표 과제입니다. 대학마다 과제 구성과 제한시간이 달라, 지원 대학을 먼저 좁힌 뒤 그 대학 기출 경향에 맞춰 연습하는 것이 효율적입니다.' },
            { q: '실기 경험이 전혀 없어도 지원할 수 있나요?', a: '가능합니다. 다만 최소 6개월 이상 꾸준한 연습이 필요하므로 시작 시점이 중요합니다. 실기 없는 학생부전형을 운영하는 대학도 있으니 실기 부담이 크다면 함께 검토해 보세요.' },
            { q: '이용사·미용사(일반) 자격증이 입시에 꼭 필요한가요?', a: '필수는 아니지만 실기 시험 내용이 입시 실기와 겹쳐 함께 준비하는 학생이 많습니다. 대학별 가산점 반영 여부와 비율은 다르므로 목표 대학 모집요강에서 확인해야 합니다.' },
            { q: '헤어디자인학과 나오면 뭐가 되나요?', a: '살롱 취업 후 헤어디자이너로 일하는 경우가 가장 많고, 경력을 쌓아 살롱을 창업하거나 학원·직업전문학교에서 강사로 활동하는 경우도 있습니다. 수입은 경력·지역·소속 살롱에 따라 편차가 큽니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/practice/winding/', '/license/hair/', '/major/', '/cost/', '/univ/']}
        labels={{ '/diagnosis/': '지원 가능 대학 진단', '/practice/winding/': '와인딩 실기 준비' }}
      />

      <CtaBanner
        title="헤어디자인학과, 지원 가능한 대학부터 확인하세요"
        desc="내신 등급과 실기 경험만 알려주시면 실기전형·학생부전형 중 어느 쪽이 유리한지 함께 안내합니다."
      />
    </PageShell>
  );
}
