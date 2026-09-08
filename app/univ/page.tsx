import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { getPage, childrenOf } from '@/lib/site';
import { UNIVERSITIES } from '@/data/constants';
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

const PATH = '/univ/';
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

export default function UnivHubPage() {
  const page = getPage(PATH);
  const children = childrenOf(PATH);
  const practicalUnivs = UNIVERSITIES.filter((u) => u.practical);
  const nonPracticalUnivs = UNIVERSITIES.filter((u) => !u.practical);

  return (
    <PageShell path={PATH} width="wide">
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="대학 · 2027학년도 미용입시 기준"
        lead="미용대학 비교는 학과 이름만 봐서는 알 수 없습니다. 같은 '뷰티'라는 이름이 붙어도 실기가 있는 대학과 없는 대학, 4년제와 전문대가 섞여 있기 때문입니다. 전국 9개 대학의 학과·소재지·학위·실기 여부·트랙을 표로 한 번에 비교하세요."
        chips={['전국 9개 대학 비교', '실기 있는 대학 6곳 · 없는 대학 3곳', '전형 유형 4가지', '경쟁률·등급컷은 매년 변동']}
      />

      <StatGrid
        items={[
          { label: '비교 대상 대학', value: '9개교', sub: '4년제 7곳 · 전문대(2~3년제) 2곳' },
          { label: '실기 있는 대학', value: '6곳', sub: '성신여대·서원대·광주여대·서경대·원광대·수원여대' },
          { label: '실기 없는 대학', value: '3곳', sub: '부천대·한성대·건국대 글로컬' },
          { label: '전형 유형', value: '4가지', sub: '학생부교과·학생부종합·실기우수자·정시' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="univ"
          heading="내 조건으로 지원 가능한 대학 진단받기"
          subheading="내신 등급과 실기 경험, 희망 지역을 알려주시면 9개 대학 중 지원 가능성이 높은 곳을 무료로 안내합니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">미용대학, 전국에 몇 곳이나 있을까</h2>
          <p>
            <strong>미용대학</strong>이라는 이름으로 검색하면 헤어·메이크업·화장품·피부 계열이 뒤섞여 나오지만, 실제로 고등학생이 지원할 수 있는 미용 관련 학과 개설 대학은 한정적입니다. 이 페이지에서는 서울권 4년제부터 지방 전문대까지 실존 학과를 확인해 9개 대학으로 정리했습니다.
            가장 먼저 확인해야 할 것은 실기 유무입니다. 실기가 있는 대학은 준비 기간이 6개월 이상 필요하고, 실기가 없는 대학은 <Link href="/major/cosmetic/">화장품학과</Link>처럼 학생부와 면접 중심으로 지원할 수 있습니다.
          </p>
          <p>
            내 상황에 맞는 학과 트랙(헤어·메이크업·화장품)을 먼저 정하지 못했다면 <Link href="/major/">미용학과 총정리</Link>에서 트랙별 차이를 먼저 확인하고 오시는 것을 권합니다. 실기 준비물과 학원비 범위는 각각 <Link href="/practice/">실기 총정리</Link>, <Link href="/cost/">학원비 총정리</Link> 페이지에 정리되어 있습니다.
          </p>

          <h3>실기가 있는 대학 (6곳)</h3>
          <DataTable
            head={['대학 · 학과', '소재지', '학위', '트랙', '상세보기']}
            align={['left', 'center', 'center', 'left', 'center']}
            rows={practicalUnivs.map((u) => [
              <span key={u.id}>{u.name} <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{u.dept}</span></span>,
              u.region,
              u.degree,
              trackText(u.track),
              <Link key={`${u.id}-l`} href={u.path ?? '/univ/'}>보기 →</Link>,
            ])}
            caption="※ 실기 반영 여부는 전형별로 다를 수 있습니다(예: 학생부종합은 실기 없이 선발). 대학·학과명·소재지는 2026년 9월 기준이며, 정확한 실기 과목과 전형은 각 대학 입학처 모집요강을 확인하세요."
          />

          <h3>실기가 없는 대학 (3곳)</h3>
          <DataTable
            head={['대학 · 학과', '소재지', '학위', '트랙', '상세보기']}
            align={['left', 'center', 'center', 'left', 'center']}
            rows={nonPracticalUnivs.map((u) => [
              <span key={u.id}>{u.name} <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{u.dept}</span></span>,
              u.region,
              u.degree,
              trackText(u.track),
              <Link key={`${u.id}-l`} href={u.path ?? '/univ/'}>보기 →</Link>,
            ])}
            caption="※ '실기 없음'은 대표 전형 기준이며, 대학에 따라 실기우수자전형을 별도로 신설·폐지할 수 있습니다. 지원 전 반드시 최신 모집요강을 확인하세요."
          />
          <p>
            실기가 없는 대학이 반드시 쉬운 것은 아닙니다. 학생부 교과·비교과 관리와 면접 준비 부담이 실기 연습 부담을 대신할 뿐입니다. 내신이 안정적이고 실기에 자신이 없다면 <Link href="/major/cosmetic/">화장품학과</Link> 쪽 대학부터 살펴보는 것이 효율적입니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">전형 유형 4가지, 뭐가 다른가</h2>
          <p>
            미용 관련 학과의 전형은 크게 네 가지로 나뉩니다. <strong>학생부교과전형</strong>은 내신 등급 위주로 정량 평가하고, <strong>학생부종합전형</strong>은 내신에 비교과 활동·면접을 더해 정성 평가합니다. <strong>실기우수자전형</strong>은 실기 성적 비중이 가장 크고(대학에 따라 내신과 합산), <strong>정시(수능)전형</strong>은 수능 성적을 중심으로 실기를 함께 보거나 수능 100%로 선발하는 대학으로 갈립니다.
          </p>
          <p>
            같은 대학이라도 학과에 따라, 같은 학과라도 연도에 따라 이 네 가지 전형의 비중이 달라집니다. 예를 들어 어떤 대학은 학생부종합전형에서는 실기를 전혀 반영하지 않지만 실기우수자전형에서는 실기 비중이 70% 이상인 경우도 있습니다. 지원하려는 대학이 정해졌다면 <Link href="/univ/sungshin/">성신여대</Link>, <Link href="/univ/seokyeong/">서경대</Link>, <Link href="/univ/seowon/">서원대</Link> 페이지처럼 학과별 상세 페이지에서 전형별 반영 요소를 확인하세요. 서경대 헤어디자인학과처럼 <strong>같은 학과를 A·B 두 유형으로 나눠</strong> 실기 80%와 교과 60%로 반영 비율을 다르게 모집하는 곳도 있어, 내신에 따라 유리한 유형이 달라집니다.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">경쟁률·등급컷, 어떻게 읽어야 할까</h2>
          <p>
            경쟁률과 등급컷은 매년 크게 출렁입니다. 어떤 학과는 특정 해에 지원자가 몰려 경쟁률이 전년 대비 몇 배로 뛰기도 하고, 다음 해에는 다시 낮아지기도 합니다. 그래서 “작년 등급컷이 3등급이었다”는 정보만 믿고 지원 전략을 세우는 것은 위험합니다.
          </p>
          <p>
            가장 신뢰할 수 있는 방법은 두 가지입니다. 첫째, <strong>대학어디가(adiga.kr)</strong>의 대입정보포털에서 최근 3개년 경쟁률·충원율 통계를 함께 비교하는 것입니다. 한 해만 보지 않고 3개년 추이를 보면 “일시적 쏠림”과 “꾸준한 인기 상승”을 구분할 수 있습니다. 둘째, 각 대학 <strong>입학처 홈페이지</strong>의 “입시결과” 자료실에서 최종 등록자 기준 등급·점수 분포를 확인하는 것입니다. 이 자료는 대학이 직접 공개하는 만큼 사설 입시 정보보다 신뢰도가 높습니다.
          </p>
          <Callout type="warn" title="전형·모집인원·경쟁률은 매년 바뀝니다">
            이 페이지와 하위 대학별 페이지에 나온 전형 방식·모집인원·경쟁률은 참고용 범위이며, 실제 지원 시점의 수치와 다를 수 있습니다. 지원 전 반드시 해당 대학 입학처의 2027학년도 최신 모집요강과 대학어디가(adiga.kr) 공식 통계로 재확인하세요.
          </Callout>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">대학 선택 체크리스트</h2>
          <p>
            아래 순서대로 확인하면 9개 대학 중에서 지원 후보를 빠르게 좁힐 수 있습니다.
          </p>
          <ol>
            <li><strong>실기 여부부터 확인.</strong> 실기가 부담스럽다면 실기 없는 대학(부천대·한성대·건국대 글로컬) 위주로, 자신 있다면 실기 있는 대학까지 넓혀서 봅니다.</li>
            <li><strong>희망 트랙 확인.</strong> 헤어·메이크업·화장품 중 어디에 가까운 학과인지 <Link href="/major/">학과 총정리</Link>에서 비교합니다.</li>
            <li><strong>소재지·통학 가능 거리.</strong> 매일 통학할지, 자취를 할지에 따라 학원비·생활비 계획이 달라집니다.</li>
            <li><strong>전형 유형과 반영 비율.</strong> 내 강점(내신 vs 실기 vs 비교과)에 맞는 전형이 있는 대학을 우선순위에 둡니다.</li>
            <li><strong>최근 3개년 경쟁률·충원율.</strong> 대학어디가에서 확인하고, 급등락이 있었다면 원인(학과 신설·정원 변경 등)을 함께 확인합니다.</li>
            <li><strong>가산점 자격증 반영 여부.</strong> <Link href="/license/">가산점 자격증</Link>이 있으면 최종 경쟁에서 유리해질 수 있습니다.</li>
          </ol>
          <StepList
            steps={[
              { title: '학과 트랙 정하기', period: '고1~고2', desc: '헤어·메이크업·화장품 중 관심 분야를 정하고 관련 학과 목록을 넓게 훑어봅니다.' },
              { title: '실기 여부에 따라 준비 시작', period: '고2 겨울', desc: '실기 있는 대학을 목표로 한다면 이 시점부터 실기 준비를 시작하는 것이 표준입니다.' },
              { title: '지원 후보 3~5개교 압축', period: '고3 1학기', desc: '내신·실기 수준이 어느 정도 잡히면 최근 3개년 경쟁률을 참고해 후보를 좁힙니다.' },
              { title: '수시 원서 6장 확정', period: '고3 9월', desc: '전형 유형별로 안정·적정·소신 지원을 배분해 최종 6장을 확정합니다.' },
            ]}
          />
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">대학별 자세히 보기</h2>
          <p>
            검색량이 가장 많은 성신여대와 서원대는 개별 페이지로, 나머지 7개 대학은 한 페이지에 묶어 정리했습니다. 아래 카드를 눌러 대학별 전형·실기·준비 전략을 확인하세요.
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
                <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', margin: '0 0 8px' }}>{c.grade}등급 · 월 {c.volume.toLocaleString()}회 검색</p>
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
          id="univ-faq"
          title="미용대학 비교 자주 묻는 질문"
          items={[
            { q: '미용 관련 학과가 있는 대학은 몇 곳인가요?', a: '전국적으로 헤어·메이크업·화장품 계열 학과를 운영하는 대학은 이 페이지 기준 9개 대학입니다. 4년제 7곳, 전문대(2~3년제) 2곳이며, 6곳은 실기 전형을, 3곳은 실기 없이 학생부·면접 중심 전형을 운영합니다.' },
            { q: '실기 없이 갈 수 있는 미용대학도 있나요?', a: '있습니다. 부천대 뷰티케어과, 한성대 뷰티디자인학과, 건국대 글로컬캠퍼스 뷰티화장품학과는 실기 없이 지원할 수 있는 전형이 중심입니다. 대표적으로 화장품·향장 계열 학과가 실기 부담이 적습니다.' },
            { q: '경쟁률과 등급컷은 어디서 확인하나요?', a: '대학어디가(adiga.kr)에서 최근 3개년 통계를 비교하거나, 각 대학 입학처 홈페이지의 입시결과 자료실을 확인하는 것이 가장 정확합니다. 사설 입시 블로그 수치는 참고만 하고 반드시 공식 자료로 재확인하세요.' },
            { q: '4년제와 전문대(2~3년제) 중 어디가 유리한가요?', a: '취업 시장에서 원하는 직무와 자격에 따라 다릅니다. 실무 취업을 빨리 하고 싶다면 전문대가, 연구·기획·해외 진출 등을 목표로 한다면 4년제가 상대적으로 유리한 편입니다. 진로 방향은 페이지 하단 진단에서 함께 상담받을 수 있습니다.' },
            { q: '여러 대학 중 어디부터 지원 전략을 세워야 하나요?', a: '실기 여부와 희망 트랙(헤어·메이크업·화장품)을 먼저 정한 뒤, 내신·실기 수준에 맞춰 안정·적정·소신 지원 대학을 나누는 순서를 권합니다. 내 조건에 맞는 대학은 무료 진단으로 빠르게 확인할 수 있습니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/major/', '/practice/', '/license/', '/cost/', '/univ/sungshin/']}
        labels={{ '/diagnosis/': '내 조건 지원 가능 대학 진단', '/univ/sungshin/': '성신여대 뷰티산업학과 보기' }}
      />

      <CtaBanner
        title="9개 대학 중 나에게 맞는 곳부터 확인하세요"
        desc="내신 등급과 실기 수준만 선택하면 지원 가능성이 높은 대학을 5초 만에 진단해 드립니다."
      />
    </PageShell>
  );
}
