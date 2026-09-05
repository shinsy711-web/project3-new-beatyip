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

const PATH = '/guide/';
export const metadata = pageMetadata(PATH);

export default function GuideHubPage() {
  const page = getPage(PATH);
  const children = childrenOf(PATH);

  return (
    <PageShell path={PATH} width="wide">
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="가이드 · 2027학년도 미용입시 로드맵"
        lead="미용입시는 정보가 흩어져 있어서 어디서부터 시작해야 할지 막막하기 쉽습니다. 이 페이지는 진로·학과 정하기부터 전형 선택, 실기, 자격증, 원서 접수까지 준비 순서를 하나의 흐름으로 정리했습니다. 학년별로 지금 무엇을 해야 하는지부터 확인하세요."
        chips={['준비 5단계', '학년별 체크리스트', '수시·정시 전형 비교', '면접 준비까지 3개 가이드']}
      />

      <StatGrid
        items={[
          { label: '준비 단계', value: '5단계', sub: '진로 → 전형 → 실기 → 자격증 → 원서' },
          { label: '표준 준비 기간', value: '6~10개월', sub: '고2 겨울 ~ 고3 9월 수시 원서' },
          { label: '하위 가이드', value: '3개', sub: '준비 시기 · 수시·정시 · 면접' },
          { label: '전형 갈림길', value: '실기 유·무', sub: '내신·실기 조건에 따라 전형이 달라짐' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="guide"
          heading="내 상황(학년·내신·실기 경험) 기준 준비 순서 상담"
          subheading="학년과 현재 상황을 알려주시면 지금부터 원서 접수까지 무엇을 먼저 해야 하는지 순서대로 안내합니다. 무료 상담이고 등록 강요는 없습니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">미용입시, 순서대로 준비하는 법</h2>
          <p>
            <strong>미용입시</strong>는 “학원 등록”부터 시작하는 것이 아닙니다. 먼저 어떤 학과(헤어·메이크업·화장품)로 갈지 정하고, 그다음 내 내신·실기 조건에 맞는 전형을 좁힌 뒤에야 실기 연습과 자격증 준비가 의미를 가집니다.
            순서를 건너뛰면 실기 학원부터 등록했다가 나중에 “이 학과는 실기가 필요 없었다”는 걸 알게 되는 식으로 시간과 비용을 낭비하기 쉽습니다.
            아래 5단계는 대부분의 수험생이 실제로 거치는 순서이며, 이미 특정 단계까지 진행했다면 건너뛰고 다음 단계부터 확인하면 됩니다.
          </p>
          <StepList
            steps={[
              { title: '진로·학과 정하기', period: '고1~고2 초', desc: '헤어디자인·메이크업·화장품 중 어느 트랙이 맞는지 정합니다. 손으로 만드는 실기가 편한지, 이론·면접형이 편한지가 1차 기준입니다.' },
              { title: '전형 정하기', period: '고2 중반', desc: '수시(학생부교과·학생부종합·실기우수자)와 정시 중 내신·실기·수능 조건에 맞는 전형을 좁힙니다. 이 단계에서 실기 준비 여부가 갈립니다.' },
              { title: '실기 시작하기', period: '고2 겨울~', desc: '실기가 있는 전형을 목표한다면 와인딩·업스타일·아트마스크 등 과제별 연습을 시작합니다. 실기가 없는 전형이면 이 단계는 건너뛰고 학생부·면접 준비로 넘어갑니다.' },
              { title: '가산점 자격증 준비', period: '고3 상반기', desc: '지원할 대학이 가산점을 인정하는 자격증인지 먼저 확인한 뒤, 시험 접수·응시 일정에 맞춰 병행 준비합니다.' },
              { title: '원서 접수·실기고사·면접', period: '고3 9월~', desc: '수시 원서를 접수하고 대학별 실기고사·면접 일정에 맞춰 컨디션과 준비물을 최종 점검합니다.' },
            ]}
          />

          <h3>단계별로 확인할 페이지</h3>
          <DataTable
            head={['단계', '확인할 페이지', '무엇을 확인하나']}
            align={['left', 'left', 'left']}
            rows={[
              ['① 진로·학과 정하기', <Link key="major" href="/major/">학과별 총정리</Link>, '헤어·메이크업·화장품학과의 전형 방식·실기 유무·진로 차이'],
              ['② 전형 정하기', <Link key="ss" href="/guide/susi-jeongsi/">수시 vs 정시 비교</Link>, '내신·실기·수능 조건별로 유리한 전형 매트릭스'],
              ['③ 실기 시작하기', <Link key="pr" href="/practice/">실기 총정리</Link>, '과제별 준비물, 연습 목표 시간, 채점 포인트'],
              ['④ 자격증 준비', <Link key="li" href="/license/">가산점 자격증 반영표</Link>, '대학별로 인정하는 자격증 종류와 시험 일정'],
              ['⑤ 원서·실기고사·면접', <Link key="in" href="/guide/interview/">면접 빈출 질문</Link>, '면접 답변 구조와 자주 나오는 질문 유형'],
            ]}
            caption="※ 위 순서는 표준 흐름입니다. 이미 학과나 전형이 정해졌다면 해당 단계부터 시작해도 됩니다."
          />
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">학년별로 지금 해야 할 일</h2>
          <p>
            같은 “미용입시 준비”라도 학년에 따라 지금 당장 할 일은 다릅니다. 고1이라면 아직 학과를 확정할 필요가 없고, 고3이라면 전형 선택과 실기·자격증을 동시에 굴려야 합니다.
            내 학년에 맞는 줄만 먼저 확인하고, 나머지는 참고용으로 넘어가도 괜찮습니다.
          </p>
          <DataTable
            head={['학년·상태', '이 시기에 할 일', '마감·체크포인트']}
            align={['left', 'left', 'left']}
            rows={[
              ['고1', '진로 탐색, 내신 관리, 관련 동아리·체험활동', '학과 확정은 서두르지 않아도 됨. 내신 등급대만 꾸준히 관리'],
              ['고2', '학과·전형 방향 정하기, 늦어도 겨울방학부터 실기 시작', '고2 겨울까지 실기 시작이 표준. 실기 없는 전형이면 학생부 활동 정리'],
              ['고3', '실기·자격증 병행, 6월부터 지원 대학 좁히기, 9월 수시 원서', '수시 원서접수 9월 초(2027학년도 기준 9/7~9/11), 정시 원서접수 1월 초(1/4~1/7)'],
              ['N수생', '전년도 결과 분석 후 학과·전형 재점검, 실기 감각 유지', '재학생보다 학원 선택·실기 시간 확보가 자유로운 편. /guide/timing/ 참고'],
            ]}
            caption="※ 2027학년도 대입 기준 원서접수 일정은 확정 발표된 시행계획을 참고했습니다. 정확한 일정·전형 방법은 각 대학 모집요강과 대학어디가(adiga.kr)에서 다시 확인하세요."
          />
          <p>
            학년별로 더 자세한 시작 시나리오(남은 기간·주당 실기 횟수·예상 총비용)는 <Link href="/guide/timing/">미용입시 언제부터 준비할까</Link> 페이지에서 확인할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">실기 유무부터 정해야 이후 단계가 빨라집니다</h2>
          <p>
            미용입시 준비에서 가장 큰 갈림길은 “실기가 있는 전형이냐, 없는 전형이냐”입니다. 실기가 있으면 학원 등록·재료 준비·연습 시간 확보가 우선순위가 되고, 실기가 없으면 내신 관리와 면접 준비가 우선순위가 됩니다.
            두 트랙은 준비 방법도, 비용도 완전히 다르기 때문에 이 결정을 뒤로 미룰수록 남은 기간 안에 할 수 있는 선택지가 줄어듭니다.
          </p>
          <p>
            판단이 어렵다면 세 가지 질문을 스스로 해보는 것이 도움이 됩니다. 첫째, 손으로 무언가를 반복해서 완성하는 과정이 즐거운가. 둘째, 내신 관리보다 실기 연습에 시간을 쓰는 것이 더 자신 있는가. 셋째, 화장품 성분이나 뷰티 산업처럼 이론·트렌드 쪽에 흥미가 더 큰가. 앞의 두 질문에 “그렇다”라면 실기 트랙, 세 번째 질문에 더 끌린다면 실기 없는 트랙을 먼저 검토해 볼 만합니다.
          </p>
          <p>
            내신이 안정적이고 실기에 자신이 없다면 <Link href="/major/cosmetic/">화장품학과(실기 없음)</Link> 트랙을 함께 검토해 볼 만합니다. 반대로 손 기술에 자신이 있고 실기 점수로 승부하고 싶다면 <Link href="/practice/">실기 과제별 가이드</Link>부터 확인하고 학원 등록 시점을 앞당기는 편이 유리합니다.
            전형별로 내신·실기·수능이 어떻게 조합되는지는 <Link href="/guide/susi-jeongsi/">수시 vs 정시 비교</Link> 페이지에서 매트릭스로 정리했습니다.
          </p>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">가이드에서 더 자세히 다루는 내용</h2>
          <p>
            아래 3개 페이지는 이 로드맵의 각 구간을 더 깊게 다룹니다. 지금 막혀 있는 단계부터 골라 읽으시면 됩니다.
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
                <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', margin: '0 0 8px' }}>가이드</p>
                <h3 style={{ fontSize: 18, fontWeight: 900, margin: '0 0 8px', color: 'var(--text-primary)' }}>{c.nav}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>{c.description}</p>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">준비하다 보면 자주 막히는 지점</h2>
          <p>
            매년 비슷한 지점에서 학생·학부모가 멈춥니다. 첫째는 “우리 학교 내신으로 실기 없는 전형이 가능한가”이고, 둘째는 “지금 시작해도 늦지 않았는가”이며, 셋째는 “면접에서 뭘 물어보는가”입니다.
            앞의 두 가지는 <Link href="/diagnosis/">5초 진단</Link>과 <Link href="/guide/timing/">준비 시기 가이드</Link>로 어느 정도 가늠할 수 있고, 세 번째는 <Link href="/guide/interview/">면접 가이드</Link>에서 빈출 질문과 답변 구조를 확인하면 됩니다.
          </p>
          <Callout type="warn" title="전형 일정·방식은 대학마다, 해마다 다릅니다">
            같은 학과라도 대학별로 수시·정시 모집 인원, 실기 반영 여부, 면접 실시 여부가 다르고 해마다 조금씩 바뀝니다. 이 페이지의 일정·수치는 참고용 범위이며, 정확한 전형 일정·방식은 각 대학 2027학년도 모집요강과 대학어디가(adiga.kr)에서 확인해야 합니다.
          </Callout>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">처음 시작하는 학생과 학부모에게 드리는 팁</h2>
          <p>
            가장 흔한 실수는 “일단 유명한 학원부터 등록하고 나중에 학과를 정하는 것”입니다. 학과와 전형을 먼저 정해야 그 학과에 필요한 실기·자격증·학생부 활동을 정확히 준비할 수 있고, 불필요한 학원비 지출도 막을 수 있습니다.
            두 번째로 흔한 실수는 “주변 학생들과 같은 속도로 가려는 것”입니다. 실기 감각이나 내신 상황은 개인마다 달라서, 옆 친구가 다니는 학원·진도를 그대로 따라가기보다 내 조건에 맞는 계획을 세우는 것이 훨씬 효율적입니다.
          </p>
          <ul>
            <li><strong>학생이 챙길 것.</strong> 학과·전형을 정한 뒤에는 그 전형에 필요한 것만 우선순위로 준비합니다. 실기 전형이면 과제별 연습 시간을, 학생부 전형이면 세부능력특기사항과 면접 준비 시간을 확보하는 식으로 나눠 계획을 짜면 남은 기간을 낭비하지 않습니다.</li>
            <li><strong>학부모가 챙길 것.</strong> 학원비·재료비 총액을 먼저 파악해 두는 것이 좋습니다. 준비 기간별 총비용은 <Link href="/cost/">학원비 총정리</Link>에서, 대학별 조건 비교는 <Link href="/univ/">미용대학 비교표</Link>에서 확인할 수 있습니다. 특히 “합격 보장” 같은 문구보다 최근 합격 실적과 환불 규정을 먼저 확인하는 것이 안전합니다.</li>
            <li><strong>검정고시·N수·성인학습자.</strong> 재학생과 다른 일정으로 움직이는 경우도 많습니다. 검정고시 합격 시점, 직장 병행 여부에 따라 실기 연습 시간 확보 방법이 달라지므로, 일반적인 학년별 일정을 참고용으로만 삼고 본인 상황에 맞춰 조정하는 것이 좋습니다.</li>
          </ul>
          <p>
            아직 학과도, 전형도 정하지 못했다면 혼자 판단하기보다 상담을 통해 방향을 잡는 것이 시간을 아끼는 방법입니다. 특히 준비 기간이 짧을수록 잘못된 선택을 되돌릴 여유가 없기 때문에, 초반에 방향을 정확히 잡는 것이 이후 몇 달의 효율을 결정합니다.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="guide-faq"
          title="미용입시 준비 순서 자주 묻는 질문"
          items={[
            { q: '미용입시는 뭐부터 준비해야 하나요?', a: '학과(헤어·메이크업·화장품)와 전형(수시·정시, 실기 유무)을 먼저 정하는 것이 우선입니다. 그다음 실기가 필요하면 실기 학원, 필요 없으면 학생부·면접 준비로 넘어가는 순서가 시간과 비용을 가장 아낄 수 있습니다.' },
            { q: '고1인데 지금부터 학원을 다녀야 하나요?', a: '고1은 내신 관리와 진로 탐색이 우선이고, 실기 학원 등록을 서두를 필요는 없습니다. 학과·전형이 어느 정도 정해지는 고2 중반부터 실기 준비를 시작해도 충분한 경우가 많습니다.' },
            { q: '수시와 정시 중 뭐가 유리한지 어떻게 판단하나요?', a: '내신 등급, 실기 준비 여부, 수능 기대 성적을 기준으로 판단합니다. 조건별 매트릭스는 수시 vs 정시 비교 가이드에서 확인할 수 있고, 정확한 판단은 성적을 넣어 5초 진단을 받아보는 것이 가장 빠릅니다.' },
            { q: '자격증은 언제부터 준비하나요?', a: '지원할 대학이 인정하는 자격증인지 먼저 확인한 뒤 고3 상반기부터 병행하는 경우가 많습니다. 자격증마다 시험 일정이 다르므로 자격증 총정리 페이지에서 회차를 확인하고 역산해 계획을 세우세요.' },
            { q: '전형별로 원서를 몇 개까지 쓸 수 있나요?', a: '수시는 최대 6장까지 지원할 수 있고, 정시는 가·나·다군에서 각 1개씩 총 3개까지 지원할 수 있습니다. 수시와 정시는 중복 지원이 가능합니다. 자세한 지원 전략은 수시 vs 정시 가이드를 참고하세요.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/cost/', '/practice/', '/major/', '/license/', '/univ/']}
        labels={{ '/diagnosis/': '내 상황 기준 지원 가능 대학 진단' }}
      />

      <CtaBanner
        title="순서가 헷갈린다면, 내 상황부터 진단받아 보세요"
        desc="학년·내신·실기 경험만 알려주시면 지금 무엇부터 해야 하는지 순서대로 안내합니다. 5초면 끝나고 무료입니다."
      />
    </PageShell>
  );
}
