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

const PATH = '/license/';
export const metadata = pageMetadata(PATH);

/** 하위 자격증 페이지 카드에 표시할 트랙 라벨 */
const TRACK: Record<string, string> = {
  '/license/hair/': '헤어 입시 가산점',
  '/license/cosmetic/': '화장품학과 필수',
  '/license/makeup/': '메이크업 입시 가산점',
  '/license/skin/': '피부·화장품 계열 참고',
  '/license/personal-color/': '민간자격 — 참고용',
};

export default function LicenseHubPage() {
  const page = getPage(PATH);
  const children = childrenOf(PATH);

  return (
    <PageShell path={PATH} width="wide">
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="자격증 · 2027학년도 미용입시 기준"
        lead="미용입시 가산점이 되는 자격증은 학과마다 다릅니다. 헤어디자인학과는 이용사·미용사(일반), 메이크업학과는 미용사(메이크업), 화장품학과는 맞춤형화장품조제관리사가 중심입니다. 자격증은 어디까지나 입시를 보완하는 카드이므로, 내 학과에 실제로 반영되는지부터 확인하고 준비하세요."
        chips={['자격증 3종 + 입시 트랙 매핑', '대학마다 반영 방식 다름', '고1~고3 병행 가능', '취업이 아닌 입시 가산점 목적']}
      />

      <StatGrid
        items={[
          { label: '헤어 트랙 대표 자격증', value: '이용사·미용사(일반)', sub: '필기 60문항 + 실기 작업형' },
          { label: '메이크업 트랙 대표 자격증', value: '미용사(메이크업)', sub: '필기 60문항 + 실기 4과제' },
          { label: '화장품 트랙 대표 자격증', value: '맞춤형화장품조제관리사', sub: '필기 100문항 · 연 2회 시행' },
          { label: '병행 권장 시작 시점', value: '고2 겨울~고3 초', sub: '실기 준비와 겹치지 않게 분산' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="license"
          heading="내 학과에 맞는 가산점 자격증 상담"
          subheading="희망 학과와 지원 예정 대학을 알려주시면 해당 학과 전형에서 자격증이 실제로 반영되는지, 반영된다면 언제까지 취득해야 하는지 안내합니다. 자격증만 단독으로 준비하시는 분보다 입시를 함께 준비하는 학생·학부모를 우선 상담합니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">미용입시 가산점, 어떤 자격증이 반영될까</h2>
          <p>
            <strong>미용입시 가산점</strong>으로 자주 언급되는 자격증은 미용사(일반·메이크업·<Link href="/license/skin/">피부</Link>·네일), 이용사, 맞춤형화장품조제관리사입니다. 이 중 이 사이트가 다루는 3개 입시 트랙(헤어·메이크업·화장품)과 직접 관련된 자격증은 이용사·미용사(일반), 미용사(메이크업), 맞춤형화장품조제관리사입니다.
            자격증은 그 자체로 합격을 보장하지 않습니다. 대학마다 가산점을 주는 곳도 있고, 서류 우대에 그치는 곳도 있고, 아예 반영하지 않는 곳도 있어 지원 대학을 먼저 좁힌 뒤 자격증 취득 여부를 결정하는 순서가 안전합니다.
          </p>
          <p>
            검색량만 보면 이용사·맞춤형화장품조제관리사가 압도적으로 크지만, 이는 취업 목적 응시자와 성인 학습자가 함께 검색하기 때문입니다. 입시생 입장에서는 검색량이 아니라 “내 지망 학과 전형에 실제로 반영되는가”를 기준으로 자격증을 선택해야 시간과 학원비를 낭비하지 않습니다. 이 페이지에서는 취업이 아닌 <strong>입시 가산점 활용</strong> 관점으로만 자격증을 다룹니다.
          </p>
          <DataTable
            head={['자격증', '시행처', '시험 형태', '응시료(필기·실기)', '대략 합격률', '관련 학과 트랙']}
            align={['left', 'left', 'left', 'center', 'center', 'left']}
            rows={[
              ['이용사', '한국산업인력공단(큐넷)', '필기 60문항(CBT) + 실기 2시간10분', '14,500원 · 20,100원', '필기 60%대 · 실기 45% 내외', <Link key="h" href="/license/hair/">헤어디자인학과</Link>],
              ['미용사(일반)', '한국산업인력공단(큐넷)', '필기 60문항(CBT) + 실기 약 2시간30분', '14,500원 · 17,200원', '회차별 편차 큼', <Link key="h2" href="/license/hair/">헤어디자인학과</Link>],
              ['미용사(메이크업)', '한국산업인력공단(큐넷)', '필기 60문항(CBT) + 실기 2시간35분', '14,500원 · 17,200원', '회차별 편차 큼', <Link key="m" href="/license/makeup/">메이크업학과</Link>],
              ['맞춤형화장품조제관리사', '대한상공회의소(식약처 위탁)', '필기 100문항(120분) · 실기 없음', '100,000원', '평균 20%대(회차별 7~26%)', <Link key="c" href="/license/cosmetic/">화장품학과</Link>],
              ['미용사(피부)·미용사(네일)', '한국산업인력공단(큐넷)', '필기 + 실기(과제형)', '필기 14,500원 내외', '회차별 상이', '피부미용·네일 계열 — 이 사이트 3개 트랙 밖 참고용'],
            ]}
            caption="※ 2026년 큐넷(Q-net)·대한상공회의소 자격평가사업단 공개 정보 기준. 응시료·시험 구성은 매년 소폭 변경될 수 있으니 접수 전 공식 사이트 공고를 확인하세요."
          />
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">대학별 자격증 반영 유형 — 가산점일까, 우대일까</h2>
          <p>
            같은 자격증이라도 대학·전형마다 취급이 다릅니다. 실기 점수에 직접 가산점을 더하는 대학, 서류(학생부·자기소개서) 평가에서 우대하는 대학, 자격증 소지 여부만 확인하고 점수에는 반영하지 않는 대학이 섞여 있습니다.
            아래 표는 대학명을 특정하지 않은 <strong>일반적인 반영 유형</strong>입니다. 실제 반영 여부와 점수는 연도·대학마다 완전히 다르므로 지원 대학이 정해지면 반드시 해당 대학 모집요강에서 직접 확인해야 합니다.
          </p>
          <DataTable
            head={['자격증', '반영 유형(대학별 상이)', '주로 활용되는 전형', '비고']}
            align={['left', 'left', 'left', 'left']}
            rows={[
              ['이용사·미용사(일반)', '가산점 / 서류 우대 / 미반영 중 택1', '수시 실기전형·학생부전형', '실기 반영 대학이 상대적으로 많음'],
              ['미용사(메이크업)', '서류 우대 / 면접 가점 위주', '수시 학생부전형·면접', '실기 점수 직접 가산은 드묾'],
              ['맞춤형화장품조제관리사', '가산점 / 서류 반영 / 면접 우대', '화장품학과 수시 학생부·면접전형', '화장품 계열 학과에서 반영 빈도 상대적으로 높음'],
            ]}
            caption="※ 반영 여부·명칭(가산점/우대 등)은 대학이 매년 공개하는 모집요강 기준으로 재확인이 필요한 일반화된 분류입니다."
          />
          <Callout type="warn" title="가산점 반영 여부·점수는 반드시 모집요강 확인">
            “자격증이 있으면 가산점”이라는 말만 믿고 준비하면 실제로는 서류 우대에 그치거나 아예 반영되지 않는 대학일 수 있습니다. 지원 예정 대학이 정해졌다면 어디가(대입정보포털) 또는 대학 입학처 홈페이지에서 <Link href="/univ/">2027학년도 모집요강</Link>을 직접 확인하세요.
          </Callout>
          <p>
            세 가지 반영 유형은 실무적으로 이렇게 구분해서 이해하면 됩니다. <strong>가산점</strong>은 실기 점수나 학생부 성적에 정해진 점수를 더해주는 방식으로 합격선에 직접 영향을 줍니다. <strong>우대</strong>는 동점자 처리나 정성평가에서 우선권을 주는 방식이라 효과가 간접적입니다. <strong>서류 반영</strong>은 자기소개서·면접에서 활용할 수 있는 자료로만 인정되는 경우로, 점수 자체에는 영향을 주지 않습니다. 같은 “자격증 우대”라는 표현도 대학마다 실제 의미가 다르니 모집요강 원문의 배점표를 확인하는 것이 가장 정확합니다.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">학과별로 어떤 자격증을 준비해야 할까</h2>
          <p>
            자격증 취득 자체가 목적이 아니라 <strong>지망 학과 입시에 도움이 되는 자격증</strong>을 골라야 시간과 비용 낭비가 없습니다. 세 가지 트랙 모두 “자격증 실기가 입시 실기와 얼마나 겹치는가”를 기준으로 우선순위를 정하면 됩니다.
          </p>
          <ul>
            <li><strong><Link href="/major/hair/">헤어디자인학과</Link></strong> 지망 → 이용사 또는 미용사(일반). 실기 과제(커트·펌·염색)가 <Link href="/practice/winding/">와인딩</Link>·<Link href="/practice/haircut/">입시 커트</Link> 실기와 겹치는 부분이 많아 세 트랙 중 병행 효율이 가장 높습니다. 둘 중 어느 자격증을 고를지는 지원 대학이 특정 종목을 지정하지 않는 이상 실기 과제 구성이 입시 실기와 더 가까운 쪽을 선택하면 됩니다.</li>
            <li><strong><Link href="/major/makeup/">메이크업학과</Link></strong> 지망 → 미용사(메이크업). 실기 과제 구성이 <Link href="/practice/artmask/">아트마스크</Link> 등 입시 실기와 완전히 같지는 않지만, 색조 제품을 다루는 손기술과 도구 위생 관리 습관을 키우는 데 도움이 됩니다. 자격증 준비를 입시 실기의 대체가 아닌 보조 수단으로 보는 것이 현실적입니다.</li>
            <li><strong><Link href="/major/cosmetic/">화장품학과</Link></strong> 지망 → 맞춤형화장품조제관리사. 실기가 없는 화장품학과 전형 특성상 이 자격증이 학생부·면접에서 활용도가 가장 높고, 세 트랙 중 유일하게 “취득 여부 자체”가 전공 적합성을 보여주는 자료로 쓰이는 경우가 많습니다.</li>
          </ul>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">자격증 취득에 드는 시간·비용, 입시 실기와 비교하면</h2>
          <p>
            자격증 준비는 공짜가 아닙니다. 필기·실기 응시료만 최소 3~4만원, 재수강·재응시까지 포함하면 10만원 안팎이 들고, 준비 기간도 짧게는 한 달, 길게는 서너 달이 걸립니다. 같은 시간을 입시 실기나 내신에 투자했을 때의 효과와 비교해 보고 결정해야 합니다.
          </p>
          <p>
            일반적인 기준은 이렇습니다. 지망 대학이 자격증을 <strong>가산점</strong>으로 명확히 반영한다면 투자할 가치가 충분합니다. <strong>서류 우대</strong> 수준이라면 시간이 여유로울 때만 준비하고, 내신·실기가 급하다면 뒤로 미뤄도 됩니다. <strong>미반영</strong> 대학만 지원한다면 자격증보다 실기 연습에 시간을 쓰는 편이 합격 가능성을 높이는 데 더 효율적입니다. 학원비까지 포함한 전체 준비 비용은 <Link href="/cost/">미용입시학원 학원비 총정리</Link>에서 함께 확인하세요.
          </p>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">자격증 + 입시, 언제부터 준비해야 할까</h2>
          <p>
            자격증 시험과 입시 실기·내신 준비가 겹치면 둘 다 놓칠 수 있습니다. 아래는 자격증을 입시와 병행할 때 흔히 쓰는 타임라인입니다.
          </p>
          <StepList
            steps={[
              { title: '지망 학과·전형 확정', period: '고1~고2 초', desc: '헤어·메이크업·화장품 중 어느 트랙인지 먼저 정합니다. 트랙에 따라 준비할 자격증과 실기 과목이 달라지므로 가장 먼저 해결해야 하는 단계입니다.' },
              { title: '자격증 필기 준비', period: '고2 여름~겨울', desc: '실기 시즌과 겹치지 않는 시기에 필기부터 끝냅니다. 필기 합격은 보통 2년간 유효하므로 여유 있게 미리 따두는 편이 안전합니다.' },
              { title: '자격증 실기 준비', period: '고2 겨울~고3 초', desc: '입시 실기 학원 수업과 겹치는 과제(커트·염색 등)는 함께 연습하면 시간을 아낄 수 있습니다. 맞춤형화장품조제관리사는 실기가 없어 이 단계를 건너뜁니다.' },
              { title: '입시 실기·학생부 집중', period: '고3 봄~9월 원서', desc: '자격증을 이미 취득했다면 이 시기는 온전히 입시 실기와 내신, 자기소개서에 집중합니다. 자격증을 못 땄다면 무리하게 병행하기보다 입시를 우선하세요.' },
            ]}
          />
          <p style={{ marginTop: 24 }}>
            병행이 부담스럽다면 자격증 없이 입시만 준비해도 됩니다. 대학 대부분은 자격증을 필수 요건이 아닌 선택 우대 요소로 다루기 때문에, <Link href="/diagnosis/">지원 가능 대학 진단</Link>으로 자격증 반영 여부가 큰 전형인지부터 확인하는 것이 우선입니다.
          </p>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">자격증별 자세히 보기</h2>
          <p>
            아래 5개 페이지에서 자격증별 필기·실기 과목, 2026년 시험일정, 응시료, 입시 병행 전략을 자세히 확인할 수 있습니다. 지망 학과가 이미 정해졌다면 해당 트랙 페이지로 바로 이동해 시험 구조와 병행 스케줄을 확인하시고, 아직 학과를 정하지 못했다면 위의 학과별 매핑을 참고해 트랙부터 좁혀보시기 바랍니다.
            피부미용 계열에 관심이 있다면 <Link href="/license/skin/">미용사(피부)</Link>를, 색채 진단에 관심이 있지만 국가자격이 아닌 자격증의 실체가 궁금하다면 <Link href="/license/personal-color/">퍼스널컬러 자격증</Link> 페이지를 참고하세요.
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
                <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', margin: '0 0 8px' }}>{TRACK[c.path] ?? '자격증'}</p>
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
          id="license-faq"
          title="미용입시 가산점 자격증 자주 묻는 질문"
          items={[
            { q: '미용 자격증이 있으면 무조건 가산점을 받나요?', a: '아닙니다. 대학·전형마다 가산점, 서류 우대, 미반영으로 나뉩니다. 같은 헤어디자인학과라도 대학에 따라 취급이 다르므로 지원 대학의 2027학년도 모집요강에서 반영 여부를 직접 확인해야 합니다.' },
            { q: '취업이 아니라 입시 목적으로도 자격증을 따는 게 의미 있나요?', a: '네. 자격증 실기 과제(커트·염색·메이크업 등)가 입시 실기와 상당 부분 겹쳐 연습 효과가 있고, 서류·면접에서 학과에 대한 관심을 보여주는 자료로도 활용됩니다. 다만 자격증만으로 실기 점수를 대체할 수는 없습니다.' },
            { q: '자격증은 몇 개나 따는 게 좋을까요?', a: '지망 학과 하나에 맞는 자격증 1개면 충분합니다. 헤어디자인학과 지망이면 이용사 또는 미용사(일반) 중 하나, 화장품학과 지망이면 맞춤형화장품조제관리사 하나를 목표로 하는 것이 현실적입니다.' },
            { q: '자격증 준비와 입시 실기를 같이 하면 시간이 부족하지 않나요?', a: '겹치는 실기 과제(예: 헤어 커트)는 함께 연습하면 시간을 아낄 수 있습니다. 다만 시험 직전 1~2개월은 자격증과 입시 실기 중 하나에 집중 배분하는 것이 효율적입니다.' },
            { q: '어떤 자격증부터 알아봐야 하나요?', a: '먼저 지망 학과(헤어·메이크업·화장품)를 정한 뒤 이 페이지의 학과별 매핑을 참고하세요. 학과가 아직 정해지지 않았다면 지원 가능 대학 진단을 먼저 받아보는 것을 권합니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/cost/', '/practice/', '/major/', '/univ/']}
        labels={{ '/diagnosis/': '내 학과 자격증 필요 여부 진단' }}
      />

      <CtaBanner
        title="내 학과에 실제로 반영되는 자격증인지부터 확인하세요"
        desc="지망 학과와 지원 대학이 정해지면 자격증이 가산점인지 서류 우대인지, 언제까지 취득해야 하는지 명확해집니다. 5초 진단으로 시작하세요."
      />
    </PageShell>
  );
}
