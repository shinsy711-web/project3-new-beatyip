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

const PATH = '/major/makeup/';
export const metadata = pageMetadata(PATH);

export default function MajorMakeupPage() {
  const page = getPage(PATH);

  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="메이크업학과 · 2027학년도 미용입시 기준"
        lead="메이크업학과는 아트마스크·뷰티일러스트 같은 실기가 핵심인 학과와, 실기 없이 학생부·면접으로 뽑는 학과가 함께 존재합니다. 메이크업디자인학과라는 이름이 붙은 곳도 있어 전형 방식을 먼저 확인해야 지원 전략이 명확해집니다."
        chips={['전국 개설 대학 10곳+', '실기 + 학생부 혼재', '가산점: 미용사(메이크업)', '실기 과제: 아트마스크·뷰티일러스트']}
      />

      <StatGrid
        items={[
          { label: '전국 개설 대학', value: '10곳+', sub: '4년제·전문대 혼재 (UNIVERSITIES 기준)' },
          { label: '주요 실기 과제', value: '아트마스크 · 뷰티일러스트', sub: '대학별 페이스 메이크업 병행' },
          { label: '준비 총비용', value: '500~730만원', sub: '10개월 · 실기반 기준' },
          { label: '가산점 자격증', value: '미용사(메이크업)', sub: '국가자격증 필기·실기' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="major-makeup"
          defaultMajor="makeup"
          heading="내 성적으로 갈 수 있는 메이크업학과, 무료로 확인하세요"
          subheading="희망 지역과 실기 준비 상태를 알려주시면 지원 가능한 대학과 준비 과제를 함께 안내합니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">메이크업학과·메이크업디자인학과, 전국 어디에 있나</h2>
          <p>
            <strong>메이크업학과</strong>는 대학에 따라 메이크업디자인학과, 뷰티산업학과·뷰티디자인학과 안의 메이크업 트랙, 미용예술과의 메이크업 전공 등 이름이 다양합니다.
            서경대학교처럼 메이크업만 따로 학과명을 붙인 곳도 있고, 성신여대·원광대처럼 헤어·화장품과 함께 뷰티 계열 안에서 메이크업을 다루는 곳도 있습니다. 아래 표는 <Link href="/univ/">미용대학 비교</Link> 데이터베이스 기준 메이크업 트랙 개설 대학을 정리한 것입니다.
          </p>
          <p>
            학과명이 “메이크업”을 직접 담고 있지 않아도 실제로는 메이크업 실기를 반영하는 대학이 많으므로, 지원 대학을 조사할 때는 학과명뿐 아니라 <strong>모집요강의 전형 요소</strong>까지 함께 확인해야 놓치는 대학이 없습니다.
          </p>
          <DataTable
            head={['대학', '학과명', '소재지', '학위', '실기']}
            align={['left', 'left', 'left', 'center', 'center']}
            rows={[
              [<Link key="ss" href="/univ/sungshin/">성신여자대학교</Link>, '뷰티산업학과', '서울', '4년제', '전형별 상이'],
              [<Link key="sw" href="/univ/seowon/">서원대학교</Link>, '뷰티학과', '충북 청주', '4년제', '있음'],
              [<Link key="sk" href="/univ/etc/">서경대학교</Link>, '메이크업디자인학과', '서울', '4년제', '있음'],
              [<Link key="kw" href="/univ/etc/">광주여자대학교</Link>, '미용과학과', '광주', '4년제', '있음'],
              [<Link key="wk" href="/univ/etc/">원광대학교</Link>, '뷰티디자인학과', '전북 익산', '4년제', '있음'],
              [<Link key="bc" href="/univ/etc/">부천대학교</Link>, '뷰티케어과', '경기 부천', '전문대', '전형별 상이'],
              [<Link key="hs" href="/univ/etc/">한성대학교</Link>, '뷰티디자인학과 (미래플러스대학·야간)', '서울', '4년제', '없음'],
              [<Link key="sww" href="/univ/etc/">수원여자대학교</Link>, '미용예술과(메이크업미용전공)', '경기 수원', '전문대', '있음'],
              ['연성대학교', '뷰티스타일리스트과(메이크업전공)', '경기 안양', '전문대', '모집요강 확인'],
              ['명지전문대학', '헤어·메이크업과', '서울', '전문대', '모집요강 확인'],
            ]}
            caption="※ 학과명·소재지는 각 대학 공식 홈페이지 기준으로 확인했습니다. 실기 반영 여부·모집 정원은 연도별로 바뀌므로 지원 전 각 대학 입학처와 2027학년도 모집요강을 반드시 확인하세요."
          />
          <Callout type="warn" title="같은 학과명이라도 전형은 대학마다 다릅니다">
            위 표의 “실기” 표시는 최근 전형 기준의 일반적인 경향이며, 대학이 전형을 개편하면 실기 반영 방식이 바뀔 수 있습니다. 정확한 실기 과목·비중은 어디가(대입정보포털)와 각 대학 입학처 공지에서 확인하세요.
          </Callout>
          <p>
            지역 분포로 보면 서울(성신여대·서경대·한성대·명지전문대)에 가장 많이 몰려 있지만, 충북(서원대)·전북(원광대)·광주(광주여대)·경기(부천대·수원여대·연성대)에도 고르게 개설되어 있습니다. 통학이 어렵다면 기숙사 운영 여부를 함께 확인하는 것이 좋습니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">전형 방식 — 실기전형 vs 학생부전형</h2>
          <p>
            메이크업학과는 크게 <strong>실기전형</strong>과 <strong>학생부전형</strong>으로 나뉘고, 두 방식을 함께 운영하는 대학도 많습니다. 실기전형은 내신 부담이 상대적으로 줄어드는 대신 아트마스크·뷰티일러스트 같은 과제를 실전 수준으로 준비해야 하고, 학생부전형은 실기 없이 내신과 면접으로 승부합니다.
          </p>
          <DataTable
            head={['전형 유형', '핵심 평가 요소', '유리한 학생']}
            align={['left', 'left', 'left']}
            rows={[
              ['수시 실기전형', '내신 + 실기(아트마스크·뷰티일러스트 등)', '실기 연습 기간을 6개월 이상 확보할 수 있는 경우'],
              ['수시 학생부전형', '내신 + 면접(실기 없음)', '내신이 안정적이고 실기 준비 시간이 부족한 경우'],
              ['정시(수능)', '수능 성적 위주 또는 수능+실기', '수능 성적이 상대적으로 높은 경우'],
            ]}
            caption="※ 대학별 반영 비율은 모집요강에 따라 다릅니다. 실기 없는 학생부전형만 운영하는 대학도 있으니 지원 전 확인이 필요합니다."
          />
          <p>
            내신 등급대별로 어느 전형이 유리한지는 <Link href="/diagnosis/">지원 가능 대학 진단</Link>의 일반 경향표와 크게 다르지 않습니다. 실기 완성도가 높으면 등급이 다소 낮아도 도전할 수 있고, 실기 경험이 없다면 학생부전형이나 <Link href="/major/cosmetic/">실기 없는 화장품 트랙</Link>도 함께 검토해 볼 만합니다.
          </p>
          <p>
            두 전형을 동시에 준비하는 것도 방법입니다. 실기 연습을 하면서도 내신 관리를 놓지 않으면, 지원 시점에 실기전형과 학생부전형 두 카드를 모두 쥐고 지원 대학을 선택할 수 있어 선택지가 넓어집니다.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">실기 과제 — 아트마스크·뷰티일러스트가 핵심</h2>
          <p>
            메이크업학과 실기전형에서 가장 자주 나오는 과제는 <Link href="/practice/artmask/">아트마스크</Link>와 <Link href="/practice/illust/">뷰티일러스트</Link>입니다. 아트마스크는 도안 위에 채색하는 과제로 색감·완성도가 중요하고, 뷰티일러스트는 인물 얼굴을 화장 콘셉트에 맞게 그리는 과제로 데생 기초가 필요합니다.
            일부 대학은 실제 모델이나 마네킹에 직접 메이크업을 하는 페이스 메이크업 과제를 함께 봅니다. 과제 구성은 대학마다 다르므로, 지원을 확정하기 전에 최근 실기고사 안내문을 확인하는 것이 가장 정확합니다.
          </p>
          <p>
            실기 완성도는 하루아침에 만들어지지 않습니다. 아트마스크는 도안 하나를 완성하는 데도 90~120분이 걸리는 과제라, 처음에는 시간 제한 없이 정확하게 그리는 연습부터 시작해 점차 제한시간 안에 끝내는 순서로 훈련하는 것이 일반적입니다.
          </p>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">가산점 자격증과 진로</h2>
          <p>
            메이크업학과 입시에서 가장 많이 준비하는 가산점 자격증은 <Link href="/license/makeup/">미용사(메이크업) 국가자격증</Link>입니다. 실기 시험 내용이 입시 실기와 상당 부분 겹쳐, 자격증을 준비하며 입시 실기 감각도 함께 다지는 학생이 많습니다.
            졸업 후 진로는 메이크업아티스트, 웨딩·방송 메이크업, 뷰티 브랜드 교육·마케팅, 뷰티 에디터 등으로 다양합니다. 직업별 연봉과 전망은 <Link href="/career/">뷰티 진로 가이드</Link>에서 확인할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">준비 기간과 학원비, 얼마나 잡아야 할까</h2>
          <p>
            메이크업학과 실기는 헤어 실기보다 재료비 부담은 적지만, 도안 하나하나를 완성하는 데 시간이 많이 듭니다. 고2 겨울방학부터 시작해 고3 9월 수시 원서까지 약 10개월을 쓰는 것이 가장 흔한 코스이고, 이 경우 준비 총비용은 <strong>500~730만원</strong> 선입니다.
            고3 봄에 처음 시작한다면 주 3회 이상 집중반으로 6개월 안에 압축해야 하므로, 시작 시기가 늦을수록 월 학원비 부담이 커진다는 점을 감안해야 합니다. 과정별 상세 비용은 <Link href="/cost/">학원비 총정리</Link>에서 확인할 수 있습니다.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="major-makeup-faq"
          title="메이크업학과 자주 묻는 질문"
          items={[
            { q: '메이크업학과는 전국에 몇 곳 있나요?', a: '4년제와 전문대를 합쳐 10곳 이상에 메이크업 관련 트랙이 개설되어 있습니다. 학과명이 메이크업디자인학과, 뷰티산업학과, 미용예술과 등으로 다양해 이름만으로는 놓치기 쉽습니다.' },
            { q: '메이크업학과 실기는 뭘 준비해야 하나요?', a: '아트마스크와 뷰티일러스트가 가장 자주 나오는 과제이고, 일부 대학은 페이스 메이크업을 함께 봅니다. 대학마다 과제 구성이 다르니 지원 대학을 먼저 좁힌 뒤 그 대학 기출 경향에 맞춰 준비하는 것이 효율적입니다.' },
            { q: '메이크업학과 등급은 어느 정도여야 하나요?', a: '실기 반영 비율이 높은 전형은 실기 점수로 등급을 상당 부분 보완할 수 있어 정해진 커트라인이 없습니다. 학생부전형은 내신 비중이 커지므로 등급 관리가 더 중요합니다. 정확한 범위는 진단에서 확인하세요.' },
            { q: '실기 없이 메이크업 계열로 갈 수 있나요?', a: '가능합니다. 같은 대학이라도 학생부교과·종합처럼 실기를 보지 않는 전형이 함께 열리는 경우가 많고, 화장품·뷰티산업 계열은 대부분 실기 없이 선발합니다. 다만 야간·성인학습자 대상 과정은 고등학교 졸업 예정자가 지원할 수 없는 경우가 있으니 모집 대상을 먼저 확인하세요.' },
            { q: '미용사(메이크업) 자격증이 입시에 꼭 필요한가요?', a: '필수는 아니지만 실기 시험 내용이 겹치는 부분이 많아 함께 준비하는 학생이 많습니다. 대학별 가산점 반영 여부는 다르니 목표 대학 모집요강에서 확인하세요.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/practice/artmask/', '/license/makeup/', '/major/', '/cost/', '/univ/']}
        labels={{ '/diagnosis/': '지원 가능 대학 진단', '/practice/artmask/': '아트마스크 실기 준비' }}
      />

      <CtaBanner
        title="메이크업학과, 지원 가능한 대학부터 확인하세요"
        desc="내신 등급과 실기 경험만 알려주시면 실기전형·학생부전형 중 어느 쪽이 유리한지 함께 안내합니다."
      />
    </PageShell>
  );
}
