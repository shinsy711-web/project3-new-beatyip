import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import DiagnosisForm from '@/components/DiagnosisForm';
import DataTable from '@/components/DataTable';
import Callout from '@/components/Callout';
import StepList from '@/components/StepList';
import FaqSection from '@/components/FaqSection';
import RelatedLinks from '@/components/RelatedLinks';
import CtaBanner from '@/components/CtaBanner';

const PATH = '/diagnosis/';
export const metadata = pageMetadata(PATH);

export default function DiagnosisPage() {
  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="지원 가능 대학 진단 · 5초 · 무료"
        lead="전형유형 → 희망학과 → 지역·내신 → 연락처, 네 단계만 선택하세요. 올댓뷰티 입시 멘토가 내신 등급대와 실기 준비 상태를 기준으로 지원 가능한 미용대학·미용학과 리스트와 필요한 실기 과제, 예상 학원비를 정리해 드립니다."
        chips={['4년제 · 전문대 모두 포함', '실기 있는 전형 / 없는 전형 구분', '예상 학원비 · 준비 기간 안내', '등록 강요 없음']}
      >
        <DiagnosisForm sourcePage="diagnosis" />
      </PageHero>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">미용대학 진단, 왜 “전형유형”부터 고르나요</h2>
          <p>
            <strong>미용학과</strong>·뷰티학과 입시에서 지원 가능 범위를 가장 크게 바꾸는 변수는 내신 등급이 아니라 <strong>전형유형</strong>입니다.
            같은 4등급이라도 수시 실기전형이면 실기 완성도로 4년제 지원이 가능한 반면, 학생부전형이면 실기 없는 화장품 계열이나 전문대 쪽으로 범위가 이동합니다. 그래서 진단은 전형유형을 먼저 정하고, 희망학과(헤어·메이크업·화장품)와 지역을 좁힌 뒤 내신 등급대를 확인하는 순서로 진행합니다.
          </p>
          <p>
            진단 결과는 자동 점수표가 아니라, 멘토가 최근 3개년 전형 결과와 올해 모집요강 변경 사항을 대조해 정리한 리스트로 보내드립니다. 그래서 신청 후 영업일 기준 1일 정도가 걸립니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">내신 등급대별 지원 가능 범위 — 일반적인 경향</h2>
          <p>아래 표는 최근 미용 관련 학과 입시 결과에서 반복적으로 나타나는 경향을 정리한 것입니다. 실제 합격선은 대학·연도·실기 점수에 따라 크게 달라지므로 “출발점”으로만 참고하세요.</p>
          <DataTable
            head={['내신 등급대', '수시 실기전형', '수시 학생부전형(실기 없음)', '정시(수능)']}
            align={['left', 'left', 'left', 'left']}
            rows={[
              ['1~3등급', '서울·수도권 4년제 실기전형 적극 지원. 실기 완성도가 합격 좌우', '4년제 화장품·뷰티산업 계열 학생부교과·종합 지원 가능', '수능 성적에 따라 4년제 정시 실기 병행'],
              ['4~5등급', '4년제 실기전형(실기 비중 높은 대학) + 전문대 실기전형 병행', '전문대 뷰티 계열 + 일부 4년제 화장품 계열(면접 비중 높은 전형)', '전문대 정시 또는 4년제 실기 정시'],
              ['6등급 이하', '실기 비중 70% 이상 대학·전문대 실기전형 집중. 실기로 역전 가능', '전문대 학생부전형·면접전형 중심', '실기 반영 정시 위주'],
              ['N수·검정고시·성인', '검정고시 성적 환산 후 실기전형. 실기 준비 기간 확보가 관건', '전문대 학생부(검정고시) 전형·성인학습자 전형 확인', '수능 응시 후 실기 병행 정시'],
            ]}
            caption="※ 일반적인 경향 정리이며 합격을 보장하지 않습니다. 대학·전형별 실제 반영 비율과 실기 과제는 각 대학 2027학년도 모집요강에서 확인하세요."
          />
          <Callout type="warn" title="주의">
            경쟁률·등급컷은 매년 바뀌고, 특히 실기전형은 내신 등급보다 실기 점수가 결과를 좌우하는 경우가 많습니다. 등급만 보고 지원 대학을 포기하지 마세요. 정확한 판단은 <Link href="/univ/">미용대학 비교</Link>와 대학 입학처 자료를 함께 보며 하는 것이 안전합니다.
          </Callout>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">진단 결과에 들어가는 4가지</h2>
          <StepList
            steps={[
              { title: '지원 가능 대학 · 학과 리스트', desc: '선택한 전형유형·희망학과·지역·내신 등급대를 기준으로 도전·적정·안정 세 구간으로 나눈 대학 리스트. 4년제와 전문대를 모두 포함합니다.', period: '핵심' },
              { title: '필요한 실기 과제와 준비 기간', desc: '헤어(와인딩·업스타일·커트), 메이크업(아트마스크·뷰티일러스트) 중 목표 대학이 실제로 출제하는 과제와, 현재 시점에서 필요한 준비 기간(주당 횟수 포함).', period: '실기 트랙' },
              { title: '예상 학원비 총액', desc: '재료비·모의실기·원서비까지 포함한 총비용 범위. 학원비 총정리 페이지의 기준(실기반 월 40~70만원, 화장품 대비반 월 20~35만원)과 같은 기준으로 계산합니다.', period: '비용' },
              { title: '가산점 자격증 · 일정', desc: '이용사·미용사(메이크업)·맞춤형화장품조제관리사 중 목표 대학에서 반영되는 자격증과, 수시 원서 전까지 취득 가능한 시험 회차.', period: '가산점' },
            ]}
          />
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">진단 전에 알아두면 좋은 것</h2>
          <h3>희망학과를 아직 못 정했어도 됩니다</h3>
          <p>
            “아직 못 정했어요”를 선택하면 내신·실기 경험·성향을 기준으로 세 트랙(<Link href="/major/hair/">헤어디자인학과</Link>, <Link href="/major/makeup/">메이크업학과</Link>, <Link href="/major/cosmetic/">화장품학과</Link>) 중 유리한 순서를 함께 안내합니다.
            실기 경험이 전혀 없고 고3이라면 실기 없는 화장품 계열을, 손재주와 시간이 있다면 실기 트랙을 권하는 식입니다.
          </p>
          <h3>내신 등급대는 대략만 알아도 됩니다</h3>
          <p>전 과목 평균이 아니라 “주요 과목 대략 몇 등급대”면 충분합니다. 정확한 반영 과목·비율은 대학마다 달라서, 멘토가 결과 정리 단계에서 다시 확인합니다.</p>
          <h3>진단은 무료이고 학원 등록과 무관합니다</h3>
          <p>
            진단 결과를 받은 뒤 학원비 견적이 필요하면 <Link href="/cost/">미용입시학원 학원비 총정리</Link>를 참고해 다시 문의하셔도 되고, 그대로 두셔도 됩니다. 입력한 정보는 상담 목적 외에는 사용하지 않고, 요청 시 즉시 삭제합니다.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="diagnosis-faq"
          title="지원 가능 대학 진단 자주 묻는 질문"
          items={[
            { q: '진단 결과는 얼마나 걸리나요?', a: '신청 후 영업일 기준 1일 내에 문자 또는 전화로 안내합니다. 자동 계산이 아니라 멘토가 최근 3개년 결과와 올해 모집요강을 대조해 정리하기 때문입니다.' },
            { q: '내신이 6등급인데 미용대학 갈 수 있나요?', a: '실기 비중이 높은 수시 실기전형이나 전문대 실기전형에서는 실기 점수로 역전하는 사례가 많습니다. 다만 실기 준비에 최소 6개월이 필요하므로 시작 시점이 중요합니다. 진단에서 현재 시점 기준 현실적인 범위를 안내합니다.' },
            { q: '실기 경험이 없어도 진단이 되나요?', a: '됩니다. 실기 경험이 없는 경우 실기 없는 전형(화장품·뷰티산업 계열 학생부·면접)과 실기 트랙을 시작했을 때의 준비 기간을 함께 비교해 드립니다.' },
            { q: 'N수생·검정고시·성인도 신청할 수 있나요?', a: '가능합니다. 전형유형에서 “N수·편입·검정고시”를 선택하면 검정고시 성적 환산, 성인학습자 전형, 편입 실기 전형 등 해당 경로에 맞춰 안내합니다.' },
            { q: '진단 후 꼭 학원에 등록해야 하나요?', a: '아닙니다. 진단과 견적은 무료이고 등록 의무가 없습니다. 상담 후 필요할 때만 다시 문의하시면 됩니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/cost/', '/univ/', '/major/', '/practice/', '/license/']}
        labels={{ '/cost/': '학원비 총정리 (과정별·기간별)', '/univ/': '미용대학 전형·경쟁률 비교' }}
      />

      <CtaBanner
        title="진단 결과와 함께 학원비 총비용도 미리 확인하세요"
        desc="과정별 월 학원비, 10개월 총비용, 재료비·모의고사 등 추가 비용을 표로 정리했습니다. 가격을 알고 상담하면 훨씬 빠릅니다."
        href="/cost/"
        label="미용입시학원 학원비 총정리 →"
      />
    </PageShell>
  );
}
