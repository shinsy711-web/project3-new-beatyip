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
import FaqSection from '@/components/FaqSection';
import RelatedLinks from '@/components/RelatedLinks';
import CtaBanner from '@/components/CtaBanner';

const PATH = '/major/';
export const metadata = pageMetadata(PATH);

/** 하위 학과 카드에 표시할 한 줄 요약 */
const SUMMARY: Record<string, string> = {
  '/major/cosmetic/': '실기 없이 학생부·면접으로 지원. 검색량 학과 중 1위',
  '/major/makeup/': '아트마스크·뷰티일러스트 실기 + 학생부 병행 대학도 존재',
  '/major/hair/': '와인딩·업스타일·커트 실기 중심. 이용사 자격증 가산점',
};

export default function MajorHubPage() {
  const page = getPage(PATH);
  const children = childrenOf(PATH);

  return (
    <PageShell path={PATH} width="wide">
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="학과 · 2027학년도 미용입시 기준"
        lead="미용학과는 대학마다 미용학과·뷰티학과·뷰티디자인학과·뷰티산업학과 등 이름이 제각각이지만, 크게 보면 헤어·메이크업·화장품 세 트랙으로 나뉩니다. 실기 유무와 학과명만 정리해도 지원 전략이 훨씬 명확해집니다."
        chips={['3개 트랙: 헤어·메이크업·화장품', '학과명 10종 이상 혼재', '실기 트랙 vs 실기 없는 트랙', '4년제·전문대 혼재']}
      />

      <StatGrid
        items={[
          { label: '미용 계열 트랙', value: '3개', sub: '헤어디자인 · 메이크업 · 화장품(학과)' },
          { label: '실기 트랙 총비용', value: '500~730만원', sub: '10개월 기준 · 헤어·메이크업' },
          { label: '화장품 트랙 총비용', value: '100~220만원', sub: '4~6개월 · 실기 없음' },
          { label: '학위 형태', value: '4년제 · 전문대', sub: '2~3년제 전문대도 다수 개설' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="major"
          heading="내 성적으로 갈 수 있는 학과, 3분이면 정리됩니다"
          subheading="내신·실기 경험을 알려주시면 헤어·메이크업·화장품 세 트랙 중 어디가 유리한지, 지원 가능한 대학까지 함께 안내합니다. 무료이고 등록 강요는 없습니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">미용학과·뷰티학과·뷰티디자인학과, 이름이 다 다른 이유</h2>
          <p>
            <strong>미용학과</strong>를 검색하면 미용학과·뷰티학과·뷰티디자인학과·뷰티산업학과·미용예술과처럼 비슷하면서도 조금씩 다른 이름이 계속 나옵니다.
            같은 계열이라도 대학이 4년제인지 전문대인지, 예술 감각을 강조하는지 산업·경영 관점을 강조하는지에 따라 학과명을 다르게 짓기 때문입니다. 이름만 보고 지원을 포기하거나 놓치는 경우가 많아, 아래 표로 먼저 정리했습니다.
          </p>
          <DataTable
            head={['학과명 유형', '주로 쓰는 대학', '커리큘럼 강조점', '예시']}
            align={['left', 'left', 'left', 'left']}
            rows={[
              ['미용예술과 · 미용과', '전문대 다수', '헤어·메이크업·피부 등 실무 통합 교육', '수원여대 미용예술과'],
              ['뷰티디자인학과', '4년제 다수', '헤어·메이크업 + 디자인·트렌드 감각', <Link key="w" href="/univ/etc/">원광대 뷰티디자인학과</Link>],
              ['뷰티산업학과', '4년제', '실기 + 산업·마케팅·브랜드 관점 포함', <Link key="s" href="/univ/sungshin/">성신여대 뷰티산업학과</Link>],
              ['화장품학과 · 향장학과 · 화장품과학과', '4년제 위주', '화학·제품 개발 중심, 대부분 실기 없음', <Link key="c" href="/major/cosmetic/">화장품학과 총정리</Link>],
              ['메이크업디자인학과', '4년제', '메이크업 실기 특화', '서경대 메이크업디자인학과'],
              ['헤어디자인학과 · 헤어디자인과', '4년제 · 전문대', '헤어 실기 특화', <Link key="h" href="/major/hair/">헤어디자인학과 총정리</Link>],
            ]}
            caption="※ 학과명과 커리큘럼 경향을 정리한 표이며, 실제 커리큘럼·전형은 대학마다 다릅니다. 정확한 정보는 각 대학 학과 홈페이지에서 확인하세요."
          />
          <p>
            그래서 학과를 검색할 때는 “미용학과”라는 넓은 단어 하나만 보지 말고, 내가 관심 있는 트랙 키워드(헤어·메이크업·화장품)를 함께 넣어 찾는 편이 훨씬 정확합니다.
            예를 들어 손 기술보다 제품·성분에 관심이 크다면 “화장품학과”·“향장학과”로, 실기에 자신이 있다면 “헤어디자인학과”·“메이크업디자인학과”로 검색 범위를 좁히는 식입니다.
            같은 이유로 이 사이트도 학과명이 아니라 <strong>트랙</strong> 기준으로 정보를 나눠 두었습니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">헤어·메이크업·화장품, 3트랙 한눈에 비교</h2>
          <p>
            결국 미용학과를 고를 때 가장 중요한 기준은 학과명이 아니라 <strong>실기가 있는지, 내가 실기를 감당할 수 있는지</strong>입니다.
            헤어디자인과 메이크업은 실기 중심 트랙이고, 화장품학과는 실기가 없는 대신 학생부와 면접 준비가 중심입니다. 세 트랙을 한 표로 비교하면 다음과 같습니다.
          </p>
          <DataTable
            head={['트랙', '전형 방식', '실기', '학원비 총액', '가산점 자격증', '주요 진로']}
            align={['left', 'left', 'center', 'center', 'left', 'left']}
            rows={[
              [<Link key="h" href="/major/hair/">헤어디자인</Link>, '수시 실기전형 중심 (학생부전형 병행 대학도 있음)', '있음', '500~730만원', <Link key="lh" href="/license/hair/">이용사·미용사(일반)</Link>, '헤어디자이너·살롱 창업·교육'],
              [<Link key="m" href="/major/makeup/">메이크업</Link>, '실기전형 + 학생부전형 혼재', '있음', '500~730만원', <Link key="lm" href="/license/makeup/">미용사(메이크업)</Link>, '메이크업아티스트·뷰티 에디터'],
              [<Link key="c" href="/major/cosmetic/">화장품(학과)</Link>, '학생부교과·종합·면접·수능 중심', '없음', '100~220만원', <Link key="lc" href="/license/cosmetic/">맞춤형화장품조제관리사</Link>, '화장품 연구개발·품질관리·MD'],
            ]}
            caption="※ 학원비는 10개월(실기 트랙) · 4~6개월(화장품 트랙) 준비 기준 참고 범위입니다. 전형 방식과 실기 반영 여부는 대학·연도별로 달라 2027학년도 모집요강 확인이 필요합니다."
          />
          <Callout type="warn" title="내신 등급 커트라인은 대학·연도별로 다릅니다">
            이 페이지와 하위 학과 페이지의 등급 관련 서술은 최근 입시 결과에서 반복적으로 나타나는 <strong>일반적인 경향</strong>이며, 특정 등급이면 합격한다는 뜻이 아닙니다.
            실기 트랙은 실기 점수가, 화장품 트랙은 학생부·면접 준비도가 등급보다 더 크게 작용하는 경우가 많습니다. 정확한 판단은 <Link href="/univ/">미용대학 비교</Link>와 대학 입학처 모집요강을 함께 확인하세요.
          </Callout>
          <p>
            최근에는 세 트랙 중 <strong>화장품 트랙에 대한 관심이 눈에 띄게 늘고 있습니다.</strong> 실기 부담이 없다는 점 때문에, 손재주보다 성실한 내신 관리에 자신 있는 학생·학부모의 문의가 꾸준히 늘어난 것으로 보입니다.
            반대로 헤어·메이크업 트랙은 검색량은 상대적으로 적어도, 실기 완성도로 내신을 보완할 수 있다는 점에서 여전히 확고한 수요가 있습니다. 트랙마다 “유리한 학생 유형”이 다르다는 점을 기억해 두세요.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">4년제 vs 전문대(2~3년제), 뭐가 다를까</h2>
          <p>
            같은 헤어디자인학과라도 4년제와 전문대는 커리큘럼 구성과 진로 진입 속도가 다릅니다. 내신·실기 준비 상황뿐 아니라 <strong>졸업 후 언제 취업하고 싶은지</strong>도 함께 고려해야 합니다.
          </p>
          <DataTable
            head={['구분', '수업 연한', '커리큘럼 특징', '진로 강점', '예시']}
            align={['left', 'center', 'left', 'left', 'left']}
            rows={[
              ['4년제', '4년', '이론·실습 병행, 학사 학위, 편입·대학원 진학에 유리', '화장품 기업·브랜드·연구직 지원 시 학사 우대 전형이 많음', '성신여대·서경대·원광대 등'],
              ['전문대(2~3년제)', '2~3년', '실무·실습 비중이 매우 높음, 자격증 취득 연계 강함', '살롱·현장 취업까지 진입 속도가 빠름', '수원여대·부천대·계명문화대 등'],
            ]}
            caption="※ 커리큘럼 구성은 학교·학과별로 차이가 있으니 정확한 이수 과목은 각 학과 홈페이지에서 확인하세요."
          />
          <p>
            정답은 없지만, 대략적인 기준을 잡자면 <strong>대학원 진학이나 기업 취업까지 염두에 둔다면 4년제</strong>가, <strong>졸업 후 최대한 빨리 현장에서 경력을 쌓고 싶다면 전문대</strong>가 조금 더 직접적인 경로입니다.
            같은 4년제라도 학교에 따라 실습 비중이 크게 차이 날 수 있으니, 학과 커리큘럼표에서 실습 과목과 이론 과목의 비율을 직접 확인해 보는 것을 권합니다.
          </p>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">학과 선택, 이 3가지 기준으로 정하세요</h2>
          <p>
            트랙(헤어·메이크업·화장품)과 학위 형태(4년제·전문대)를 이해했다면, 실제 학과를 좁히는 데는 아래 세 가지 기준이 가장 실용적입니다. 순서대로 점검해 보세요.
          </p>
          <ol>
            <li><strong>내신 등급.</strong> 실기 반영 비율이 높은 전형은 등급 부담이 상대적으로 줄어들고, 화장품 트랙(학생부 중심)은 내신 관리가 더 중요합니다.</li>
            <li><strong>실기 소질과 시간.</strong> 와인딩·아트마스크 같은 실기는 최소 6개월 이상 꾸준한 연습이 필요합니다. 손재주보다 <Link href="/practice/">꾸준히 연습할 시간</Link>이 있는지가 더 중요합니다.</li>
            <li><strong>진로 방향.</strong> 살롱·현장 디자이너를 원하면 실기 트랙, 화장품 기업·연구직·마케팅을 원하면 화장품 트랙이 더 직접적으로 연결됩니다. 직업별 연봉·전망은 <Link href="/career/">뷰티 진로 가이드</Link>에서 비교할 수 있습니다.</li>
          </ol>
          <p>
            세 기준 중 하나라도 확신이 없다면 직접 판단하기보다 <Link href="/diagnosis/">지원 가능 대학 진단</Link>을 먼저 받아보는 편이 빠릅니다. 내신·실기 경험만 입력하면 세 트랙 중 유리한 순서를 함께 안내받을 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">트랙별 자세히 보기</h2>
          <p>
            아래 3개 페이지에서 트랙별 전국 개설 대학, 전형 방식, 실기 과제(또는 학생부·면접 준비), 가산점 자격증을 자세히 정리했습니다. 관심 있는 트랙을 먼저 확인해 보세요.
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
                <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', margin: '0 0 8px' }}>{c.section} · 검색 {c.volume.toLocaleString()}/월</p>
                <h3 style={{ fontSize: 18, fontWeight: 900, margin: '0 0 8px', color: 'var(--text-primary)' }}>{c.nav}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>{SUMMARY[c.path] ?? c.description}</p>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">학과를 정한 다음에 할 일</h2>
          <p>
            트랙을 정했다면 다음은 <Link href="/cost/">학원비 총정리</Link>에서 정확한 비용 범위를 확인하고, 실기 트랙이라면 <Link href="/practice/">실기 과제별 준비 가이드</Link>로, 화장품 트랙이라면 <Link href="/license/cosmetic/">맞춤형화장품조제관리사</Link> 페이지로 넘어가시면 됩니다.
            어느 대학을 지원할지까지 정해야 실기·학생부 준비 방향이 명확해지므로, <Link href="/univ/">미용대학 비교표</Link>를 함께 보시는 것을 권합니다.
          </p>
          <p>
            아직 고1~고2라 시간이 있다면 트랙을 하나로 확정하지 않아도 괜찮습니다. 다만 고3이 가까워질수록 실기 트랙은 준비 기간이 절대적으로 부족해지므로, 실기 여부만이라도 먼저 정하고 <Link href="/diagnosis/">지원 가능 대학 진단</Link>을 받아보는 것이 시간을 아끼는 방법입니다.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="major-faq"
          title="미용학과 자주 묻는 질문"
          items={[
            { q: '미용학과와 뷰티학과는 같은 학과인가요?', a: '계열은 같지만 대학마다 붙이는 이름이 다릅니다. 미용예술과·미용과는 전문대에, 뷰티디자인학과·뷰티산업학과는 4년제에 많이 쓰이는 이름이고, 커리큘럼 강조점(실기 중심 또는 산업·경영 관점 포함)에 따라서도 이름이 달라집니다.' },
            { q: '실기 없는 미용학과도 있나요?', a: '있습니다. 화장품학과·향장학과·화장품과학과 계열은 대부분 실기 없이 학생부와 면접, 일부는 수능 성적으로 선발합니다. 손 기술보다 화학·제품 지식과 내신 관리에 자신이 있다면 이 트랙이 유리합니다.' },
            { q: '4년제와 전문대 중 어디가 더 나은가요?', a: '어느 쪽이 우월하다기보다 목표가 다릅니다. 4년제는 이론·실습을 병행하며 편입·대학원 진학이나 기업 취업에 유리하고, 전문대는 실무 비중이 높아 살롱 등 현장 취업 속도가 빠른 편입니다.' },
            { q: '미용학과 학원비는 얼마나 드나요?', a: '헤어·메이크업 실기 트랙은 10개월 기준 500~730만원, 화장품 트랙은 실기가 없어 100~220만원 수준입니다. 과정별 상세 비용은 학원비 총정리 페이지에서 확인할 수 있습니다.' },
            { q: '내신이 낮으면 미용학과는 어렵나요?', a: '트랙에 따라 다릅니다. 실기 반영 비율이 높은 전형은 실기 점수로 등급을 상당 부분 보완할 수 있고, 화장품 트랙은 학생부 비중이 커 내신 관리가 더 중요합니다. 정확한 범위는 진단을 통해 확인하는 것이 안전합니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/cost/', '/practice/', '/univ/', '/license/', '/career/']}
        labels={{ '/diagnosis/': '내 성적으로 갈 수 있는 학과 진단' }}
      />

      <CtaBanner
        title="헤어·메이크업·화장품, 어느 트랙이 나에게 맞을까요"
        desc="내신 등급과 실기 경험만 알려주시면 지원 가능한 학과와 대학을 무료로 정리해 드립니다."
      />
    </PageShell>
  );
}
