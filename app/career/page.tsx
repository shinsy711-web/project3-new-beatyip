import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { getPage, childrenOf } from '@/lib/site';
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

const PATH = '/career/';
export const metadata = pageMetadata(PATH);

export default function CareerPage() {
  const page = getPage(PATH);
  const children = childrenOf(PATH);

  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="진로 · 뷰티 직업 가이드"
        lead="메이크업아티스트, 헤어디자이너, 화장품 연구원까지 — 뷰티 직업은 생각보다 다양합니다. 직업별로 어떤 학과·자격증을 거쳐야 하는지, 초봉과 경력별 수입은 어느 정도인지, 나에게 맞는 트랙은 무엇인지 한 페이지에서 확인하세요."
        chips={['직업 7종 비교', '초봉·경력별 수입', '성향 자가진단', '고1~고3 준비 로드맵']}
      />

      <StatGrid
        items={[
          { label: '뷰티 직업 스펙트럼', value: '7종', sub: '실기형부터 연구·마케팅형까지' },
          { label: '실기 없는 트랙', value: '3종', sub: '연구원 · 품질관리 · MD·마케터' },
          { label: '초봉 범위(직업 평균)', value: '2,600~4,600만원', sub: '직업·기업 규모별 편차 큼' },
          { label: '진로 결정 골든타임', value: '고1~고2', sub: '학과·자격증 준비 방향이 갈리는 시기' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="career"
          heading="내 성향에 맞는 학과·진로 상담"
          subheading="적성 체크 결과와 관심 직업을 알려주시면 어떤 학과·자격증부터 준비하면 좋을지 1:1로 안내합니다. 진로를 아직 못 정했어도 괜찮습니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">뷰티 직업, 종류부터 한눈에 보기</h2>
          <p>
            &quot;뷰티 쪽으로 가고 싶다&quot;는 말은 사실 굉장히 넓은 범위를 가리킵니다. 손으로 직접 시술하는 <strong>메이크업아티스트</strong>부터 매장에서 머리를 만지는 헤어디자이너, 화장품 성분을 연구하는 연구원, 신제품을 기획하는 MD·마케터까지 — 같은 &quot;뷰티 업계&quot;라도 하는 일과 필요한 준비가 전혀 다릅니다.
            아래 표에서 7가지 직업을 한눈에 비교하고, 관심 가는 직업을 아래 상세 설명에서 더 자세히 확인하세요.
          </p>
          <DataTable
            head={['직업', '핵심 진로 경로', '필요 자격증', '초봉 범위', '실기 부담']}
            align={['left', 'left', 'left', 'center', 'center']}
            rows={[
              ['메이크업아티스트', <Link key="mk" href="/major/makeup/">메이크업학과</Link>, <Link key="lm" href="/license/makeup/">미용사(메이크업)</Link>, '2,000만원대~ (편차 큼)', '큼'],
              ['헤어디자이너', <Link key="hd" href="/major/hair/">헤어디자인학과</Link>, <Link key="lh" href="/license/hair/">이용사·미용사(일반)</Link>, '최저임금대~ (인센티브 편차 큼)', '큼'],
              ['화장품 연구원(R&D)', <Link key="cs1" href="/major/cosmetic/">화장품학과</Link>, '학사 이상 · 화학·화장품 전공', '3,000만원대 초중반~', '없음'],
              ['화장품 품질관리·인허가', <Link key="cs2" href="/major/cosmetic/">화장품학과</Link>, <Link key="lc" href="/license/cosmetic/">맞춤형화장품조제관리사</Link>, '3,000만원대 초중반~', '없음'],
              ['뷰티 브랜드 MD·마케터', <Link key="cs3" href="/major/cosmetic/">화장품학과</Link>, '전공 무관(경영·마케팅 유리)', '2,600~4,600만원', '없음'],
              ['뷰티 교육자(강사·교수)', '해당 전공 + 현장 경력', <Link key="lall" href="/license/">국가자격증</Link>, '기관·경력별 편차 큼', '중'],
              ['피부관리사', '피부미용 관련 학과·과정', '미용사(피부)', '최저임금대~ (편차 큼)', '중'],
            ]}
            caption="※ 초봉은 워크넷(고용24)·커리어넷 직업정보와 채용 공고·연봉 정보 사이트를 참고한 대략적인 범위이며, 기업 규모·지역·업장에 따라 실제 금액 차이가 매우 큽니다. 정확한 최신 통계는 워크넷(work.go.kr) 직업정보에서 확인하세요."
          />
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">메이크업 아티스트 되는 법</h2>
          <p>
            메이크업 아티스트가 되는 가장 일반적인 경로는 <Link href="/major/makeup/">메이크업학과</Link>(또는 뷰티디자인학과 메이크업 전공)에 진학해 기초 이론과 실기를 배우고, 재학 중이나 졸업 후 <Link href="/license/makeup/">미용사(메이크업) 국가자격증</Link>을 취득한 뒤 샵·스튜디오·방송 현장에서 어시스턴트로 경력을 쌓는 것입니다.
            학과 진학 없이 사설 학원에서 자격증만 취득해 진입하는 경우도 있지만, 채용 시장에서는 관련 학과 졸업이 여전히 유리하게 작용하는 경우가 많습니다.
          </p>
          <p>
            수입은 <strong>초봉이 2,000만원대 초중반 수준에서 시작하는 경우가 많고, 프리랜서로 전환하거나 실장급으로 올라가면 관련 직업정보 평균 통계 기준 3,000만원대 초중반까지 오르며, 지명도가 높은 경우 이보다 훨씬 높아지는 등 지역·업장·활동 형태에 따른 편차가 매우 큽니다.</strong>
            웨딩·방송·개인샵 등 활동 분야에 따라서도 수입 구조가 다르므로, 특정 분야를 정하기 전에는 다양한 현장을 경험해 보는 것이 좋습니다.
          </p>
          <p>
            전망은 뷰티 콘텐츠·SNS 채널이 늘면서 프리랜서·개인 브랜드로 활동하는 아티스트가 많아지는 추세입니다. 다만 그만큼 경쟁도 치열해, 특정 분야(웨딩·방송·헤어메이크업 등)에서 전문성을 쌓는 것이 장기적으로 유리합니다.
            분야별 초봉·수입 비교와 프리랜서 전환 시점, 포트폴리오의 역할까지 자세히 알고 싶다면 <Link href="/career/makeup-artist/">메이크업 아티스트 되는 법</Link>에서 확인하세요.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">헤어디자이너 연봉, 실제로 얼마나 될까</h2>
          <p>
            헤어디자이너가 되려면 <Link href="/major/hair/">헤어디자인학과</Link>에서 커트·펌·컬러 등 기초 기술을 배우고, <Link href="/license/hair/">이용사 또는 미용사(일반) 자격증</Link>을 취득한 뒤 미용실에서 스태프(인턴)로 입사해 디자이너로 승급하는 경로가 일반적입니다. 승급까지는 보통 1~3년 정도가 걸립니다.
          </p>
          <p>
            헤어디자이너 연봉은 <strong>기본급 + 인센티브(시술 매출의 일정 비율) + 기타 수당</strong>으로 구성되는 경우가 대부분입니다. 신입 스태프 시기에는 최저임금 수준에서 시작하는 경우가 많고, 디자이너로 승급한 뒤에는 본인이 유치·시술하는 고객 매출에 따라 인센티브 비중이 커지기 때문에 같은 경력이라도 수입 편차가 매우 큽니다.
            정확한 평균 임금 통계는 워크넷(고용24) 직업정보에서 확인할 수 있습니다.
          </p>
          <p>
            전망 면에서는 프랜차이즈 미용실 확대와 1인샵 창업이 동시에 늘고 있어, 안정적인 매출을 만드는 실력과 개인 브랜딩(SNS 등) 역량이 함께 중요해지는 추세입니다.
            인턴에서 디자이너, 실장·원장, 살롱 창업까지 단계별 성장 구조와 자격증의 역할은 <Link href="/career/hairdresser/">헤어디자이너 되는 법</Link>에서 더 자세히 볼 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">미용사 연봉과 자격증 — 어떤 자격증이 어떤 직업으로 연결될까</h2>
          <p>
            &quot;미용사&quot;는 하나의 자격증이 아니라 <Link href="/license/">미용사(일반)·미용사(메이크업)·미용사(피부)·미용사(네일)·이용사</Link> 등 여러 국가자격증을 통칭하는 말입니다. 어떤 자격증을 취득하느냐에 따라 갈 수 있는 직업이 달라지므로, 미용사 연봉을 이야기할 때는 어떤 세부 분야인지 먼저 구분해야 합니다.
          </p>
          <p>
            헤어(이용사·미용사 일반)는 앞서 설명한 헤어디자이너 경로로, 메이크업(미용사 메이크업)은 메이크업 아티스트 경로로 이어집니다. <strong>피부관리사</strong>는 미용사(피부) 자격증을 기반으로 피부관리샵·에스테틱 브랜드에서 일하며, 신입은 최저임금대에서 시작해 경력과 매장 규모에 따라 수입이 올라가는 구조로 헤어·메이크업과 마찬가지로 편차가 큽니다.
            입시 단계에서는 피부미용 관련 학과가 화장품학과·향장학과와 커리큘럼이 겹치는 경우가 있어, 관심이 있다면 <Link href="/major/cosmetic/">화장품학과 총정리</Link>에서 함께 확인해 보시기 바랍니다.
          </p>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">화장품 연구원·품질관리·인허가 — 실기 없이 화학 쪽으로 가는 길</h2>
          <p>
            실기 시험 부담 없이 뷰티 업계로 가고 싶다면 화장품 연구·개발(R&D)이나 품질관리(QA·QC)·인허가 직무를 생각해볼 만합니다. 두 직무 모두 <Link href="/major/cosmetic/">화장품학과·향장학과·화장품과학과</Link> 등에서 화학·제형·성분 지식을 쌓고, 화장품 회사의 연구소나 품질관리 부서에 지원하는 경로가 일반적입니다. 연구원 채용은 대학원 진학 시 더 유리한 경우가 많습니다.
          </p>
          <p>
            수입은 <strong>신입 기준 3,000만원대 초중반 수준에서 시작하는 경우가 많고, 경력 5년 이상이면 채용 공고·기업 연봉 정보 기준 3,600만~5,000만원 수준까지 오르는 편으로, 기업 규모(대기업·중견·중소)에 따른 편차가 큽니다.</strong>
            인허가 직무는 <Link href="/license/cosmetic/">맞춤형화장품조제관리사</Link> 자격증이 실무에 도움이 되는 경우가 많아, 화장품학과 재학 중 함께 준비하는 경우가 많습니다.
            연구개발·품질관리·인허가·브랜드 MD·마케팅까지 직무별 비교표는 <Link href="/career/cosmetic/">화장품 회사 취업</Link>에서 한 번에 확인할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">뷰티 브랜드 MD·마케터 — 화장품을 기획하고 파는 일</h2>
          <p>
            제품을 직접 만들기보다 기획하고 알리는 일에 관심이 있다면 뷰티 브랜드의 MD(상품기획)나 마케터 직무가 맞을 수 있습니다. 특정 전공을 요구하지 않는 경우가 많지만, <Link href="/major/cosmetic/">화장품학과</Link>나 경영·마케팅 전공이 실무에서 유리하게 작용하는 편입니다.
          </p>
          <p>
            초봉은 <strong>중소 브랜드·에이전시 기준 2,600만~3,300만원, 대기업(주요 화장품 회사) 기준 4,000만~4,600만원 수준</strong>으로 기업 규모에 따라 차이가 크고(채용 공고·연봉 정보 사이트 기준), 경력 5년 이상이면 4,000만원 이상까지도 올라갑니다. 이커머스·콘텐츠 커머스 확대로 온라인 MD·퍼포먼스 마케터 수요가 늘고 있는 것도 특징입니다.
          </p>
        </section>

        <section aria-labelledby="sec-7">
          <h2 id="sec-7">뷰티 교육자(강사·교수) — 가르치는 사람이 되는 길</h2>
          <p>
            미용입시학원 강사, 직업전문학교 강사, 전문대·대학 겸임·전임교원까지 &quot;가르치는 뷰티 직업&quot;도 있습니다. 대부분 헤어·메이크업·피부 등 해당 분야에서 몇 년 이상 현장 경력을 쌓은 뒤 강사로 전환하는 경로를 밟으며, 대학 교원이 되려면 석사 이상의 학위가 필요한 경우가 많습니다.
          </p>
          <p>
            급여 체계는 학원 시간강사(강의 시수 기준), 학원 전임강사(고정급), 전문대·대학 전임교원(호봉제)으로 다양해 기관·경력에 따른 편차가 매우 큽니다. 특정 대학·기관의 정확한 급여는 공개된 채용 공고를 통해 확인하는 것이 정확합니다. 진로로 고려한다면 먼저 현장 경력을 쌓는 것이 순서입니다.
          </p>
          <Callout type="warn" title="연봉·전형 정보는 계속 바뀝니다">
            이 페이지의 초봉·연봉 범위는 워크넷·커리어넷 직업정보와 채용 공고를 참고한 대략적인 범위이며, 기업·기관·지역에 따라 실제 금액은 다를 수 있습니다. 진학할 학과의 전형 방식·실기 반영 여부도 연도별로 바뀌므로 정확한 정보는 각 대학 모집요강(어디가·대학 입학처)에서 확인하세요.
          </Callout>
        </section>

        <section aria-labelledby="sec-8">
          <h2 id="sec-8">성향 체크와 학년별 준비 로드맵</h2>
          <h3>내 성향에 맞는 트랙 자가진단</h3>
          <p>
            아직 어떤 직업이 맞는지 모르겠다면, 아래 4가지 성향 중 강하게 끌리는 항목부터 확인해 보세요. 하나로 딱 떨어지지 않아도 괜찮습니다. 2개 이상 겹치는 트랙이 있다면 그 방향을 우선 고려하면 됩니다.
          </p>
          <DataTable
            head={['성향', '해당하는 특징', '추천 트랙', '관련 학과']}
            align={['left', 'left', 'left', 'left']}
            rows={[
              ['손재주형', '손으로 만들고 다듬는 게 편하고 반복 연습을 잘 견딘다', '헤어디자이너 · 메이크업아티스트', <Link key="a" href="/major/hair/">헤어디자인학과</Link>],
              ['색감·미적감각형', '색 조합과 이미지 표현에 관심이 많고 그림·드로잉을 좋아한다', '메이크업아티스트', <Link key="b" href="/major/makeup/">메이크업학과</Link>],
              ['과학·화학 흥미형', '성분표를 읽는 게 재미있고 화학·생명과학 과목을 좋아한다', '화장품 연구원 · 품질관리·인허가', <Link key="c" href="/major/cosmetic/">화장품학과</Link>],
              ['대인 응대형', '사람 만나고 설득하는 일이 편하고 트렌드에 관심이 많다', '뷰티 MD·마케터 · 교육자', <Link key="d" href="/major/cosmetic/">화장품학과</Link>],
            ]}
            caption="※ 성향 자가진단은 참고용 가이드입니다. 실제 적성은 실습·현장 경험을 통해 더 정확히 확인할 수 있습니다."
          />

          <h3>고1~고3, 학년별 준비 로드맵</h3>
          <p>
            진로를 일찍 정할수록 학과·자격증 준비에 여유가 생기지만, 고3이라도 지금부터 시작하면 늦지 않습니다. 학년별로 무엇에 집중하면 좋은지 정리했습니다.
          </p>
          <StepList
            steps={[
              { title: '탐색기 — 다양하게 경험해보기', period: '고1', desc: '특정 직업을 확정하기보다 헤어·메이크업·화장품 3개 트랙의 차이를 이해하는 시기입니다. 진로 체험, 유튜브·박람회 등을 통해 실제 현장을 간접 경험해 보세요. 이 시기엔 내신 관리가 최우선입니다.' },
              { title: '방향 설정 — 트랙 하나로 좁히기', period: '고2', desc: '성향 자가진단과 관심 직업을 바탕으로 헤어·메이크업·화장품 중 하나의 트랙을 정합니다. 실기가 필요한 트랙이면 이 시기 겨울방학부터 실기 준비를 시작하는 것이 표준적입니다.' },
              { title: '집중 준비 — 실기·자격증·학생부', period: '고3', desc: '정한 트랙에 맞춰 실기 실력을 끌어올리거나(헤어·메이크업), 학생부·면접·자격증을 준비합니다(화장품). 9월 수시 원서 전까지 지원 대학을 확정하는 것이 목표입니다.' },
            ]}
          />
          <p style={{ marginTop: 24 }}>
            학과별 실기 준비물과 비용은 <Link href="/practice/">실기 총정리</Link>와 <Link href="/cost/">학원비 페이지</Link>에서, 지원 가능한 대학은 <Link href="/diagnosis/">5초 진단</Link>으로 바로 확인할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-9">
          <h2 id="sec-9">직업별로 더 자세히 알아보기</h2>
          <p>
            아래 3개 페이지에서 직업별 성장 경로, 분야별 초봉·경력별 수입 비교, 필요한 학과·자격증을 자세히 확인할 수 있습니다. 관심 있는 직업이 정해졌다면 해당 페이지에서 구체적인 준비 순서를 확인해 보세요.
          </p>
          <div className="grid-auto" style={{ margin: '20px 0 8px' }}>
            {children.map((c) => (
              <Link
                key={c.path}
                href={c.path}
                className="card"
                title={c.title}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 900, margin: '0 0 8px', color: 'var(--text-primary)' }}>{c.nav}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>{c.description}</p>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="career-faq"
          title="뷰티 진로 자주 묻는 질문"
          items={[
            { q: '메이크업 아티스트가 되려면 꼭 대학을 나와야 하나요?', a: '필수는 아닙니다. 사설 학원에서 자격증만 취득해 진입하는 경로도 있습니다. 다만 채용 시장에서는 관련 학과 졸업이 유리하게 작용하는 경우가 많고, 학과 재학 중 인맥·실습 기회를 얻기도 쉬워 대학 진학이 더 일반적인 경로입니다.' },
            { q: '헤어디자이너 연봉은 신입과 경력자가 얼마나 차이 나나요?', a: '기본급에 시술 매출 인센티브가 더해지는 구조라 편차가 매우 큽니다. 신입 스태프는 최저임금 수준에서 시작하지만, 디자이너 승급 후에는 매출에 따라 수입이 크게 달라집니다. 정확한 평균 통계는 워크넷(고용24) 직업정보에서 확인할 수 있습니다.' },
            { q: '미용사 자격증 종류가 많은데 뭐부터 따야 하나요?', a: '희망 진로에 맞춰 선택하면 됩니다. 헤어 지망이면 이용사·미용사(일반), 메이크업 지망이면 미용사(메이크업), 피부관리사 지망이면 미용사(피부)가 우선입니다. 화장품학과 지망이라면 맞춤형화장품조제관리사가 더 실무 관련성이 높습니다.' },
            { q: '화장품 연구원이 되려면 무슨 과를 가야 하나요?', a: '화장품학과·향장학과·화장품과학과 등 화학·제형을 다루는 학과가 기본 경로입니다. 대학원(석사 이상)에 진학하면 R&D 직무 지원에 더 유리한 경우가 많습니다. 실기 시험 없이 학생부·면접으로 지원할 수 있는 학과가 대부분입니다.' },
            { q: '진로를 아직 못 정했는데 어떤 학과부터 알아봐야 하나요?', a: '성향 자가진단표를 참고해 손재주형·색감형·과학형·대인응대형 중 가까운 유형을 먼저 확인하세요. 확정하지 못했더라도 5초 진단을 통해 현재 성적으로 지원 가능한 학과 범위를 먼저 좁혀보는 방법도 있습니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/major/', '/license/', '/cost/', '/practice/', '/region/']}
        labels={{ '/diagnosis/': '내 성향·성적으로 학과 진단', '/region/': '우리 지역 학원 찾기' }}
      />

      <CtaBanner
        title="어떤 직업이 나에게 맞는지, 학과부터 확인하세요"
        desc="관심 직업이 정해지면 필요한 학과와 자격증도 자연스럽게 정해집니다. 5초 진단으로 내 성적에 맞는 학과부터 확인해보세요."
      />
    </PageShell>
  );
}
