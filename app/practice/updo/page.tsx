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
import StepList from '@/components/StepList';
import FaqSection from '@/components/FaqSection';
import RelatedLinks from '@/components/RelatedLinks';
import CtaBanner from '@/components/CtaBanner';

const PATH = '/practice/updo/';
export const metadata = pageMetadata(PATH);

export default function UpdoPracticePage() {
  const page = getPage(PATH);

  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="실기 · 업스타일 · 2027학년도 미용입시 기준"
        lead="업스타일은 시뇽·트위스트·브레이드·볼륨 업스타일 등 과제 유형이 다양하고, 완성 후 형태를 보는 실기라 채점 기준을 정확히 알아야 연습 방향이 잡힙니다. 과제 유형과 채점 기준, 시간 배분, 감점 포인트, 연습 루틴을 한 번에 정리했습니다."
        chips={['업스타일 과제 4유형', '목표 시간 45~60분', '채점 항목 5가지', '핀 처리·마무리 청결이 승부처']}
      />

      <StatGrid
        items={[
          { label: '업스타일 과제 유형', value: '4종', sub: '시뇽 · 트위스트 · 브레이드 · 볼륨 업스타일' },
          { label: '실기 목표 시간', value: '45~60분', sub: '베이스 볼륨~마무리 스프레이까지' },
          { label: '주요 채점 항목', value: '5가지', sub: '균형·볼륨·표면정리·핀처리·마무리청결' },
          { label: '기본 준비물 비용', value: '5~10만원', sub: '핀·망·빗·스프레이 등 입학 시 1회' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="updo"
          defaultMajor="hair"
          heading="내 업스타일, 어떤 유형부터 연습해야 할지 상담"
          subheading="지원 예정 대학과 현재 연습 경험을 알려주시면 과제 유형별 우선순위와 시간 단축 방법을 안내합니다. 무료이고 등록 강요는 없습니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">업스타일 입시, 어떤 과제가 나오나</h2>
          <p>
            <strong>업스타일</strong>은 긴 머리를 위로 올려 하나의 형태로 완성하는 실기로, 헤어디자인 계열 입시에서 와인딩과 함께 가장 자주 출제되는 과제입니다. 대표적인 과제 유형은 크게 네 가지입니다.
            땋지 않고 모발을 돌돌 말아 고정하는 <strong>시뇽(chignon)</strong>, 모발 두 가닥 이상을 꼬아 올리는 <strong>트위스트</strong>, 세 가닥 이상을 엮는 <strong>브레이드</strong>, 백콤으로 뿌리를 부풀려 형태감을 강조하는 <strong>볼륨 업스타일</strong>입니다.
          </p>
          <p>
            와인딩이 로드 위에서 진행되는 반복 작업이라면, 업스타일은 완성된 형태 전체의 균형을 손으로 직접 잡아가는 작업이라 “예쁘게 보이는 감각”이 추가로 필요합니다. 이 페이지에서는 채점 기준부터 시간 배분, 자주 감점되는 포인트, 연습 루틴까지 순서대로 정리합니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">업스타일 채점 기준 — 무엇을 보고 점수를 매기나</h2>
          <p>
            업스타일은 과제 유형과 무관하게 대체로 다섯 가지 기준으로 평가됩니다. <strong>①균형</strong>(좌우·전후 대칭), <strong>②볼륨</strong>(뿌리 방향·크기), <strong>③표면 정리</strong>(잔머리·삐침 없이 매끈한 표면), <strong>④핀 처리</strong>(핀이 보이지 않게, 흔들리지 않게 고정), <strong>⑤마무리 청결</strong>(스프레이 자국·잔여물 없이 깔끔한 마감)입니다.
            다섯 항목 중 하나라도 크게 무너지면 전체 완성도 점수가 함께 떨어지므로, 특정 항목만 집중 연습하기보다 매 연습마다 다섯 가지를 함께 점검하는 습관이 중요합니다.
          </p>
          <Callout type="warn" title="정확한 실기 과제·시간은 각 대학 모집요강 확인">
            업스타일 과제 유형(시뇽·트위스트·브레이드·볼륨 업스타일 중 무엇을 요구하는지), 제한시간, 세부 배점은 대학·연도별로 다르게 공지됩니다. 아래 시간 배분표는 학원 모의실기 관행을 참고한 일반적인 범위이며, 정확한 정보는 지원 대학의 2027학년도 모집요강 또는 실기고사 안내문에서 확인하세요.
          </Callout>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">업스타일 시간 배분표</h2>
          <DataTable
            head={['단계', '목표 시간', '체크 포인트']}
            align={['left', 'center', 'left']}
            rows={[
              ['섹션 나누기 · 베이스 잡기', '5~8분', '전체 균형선 미리 확인, 좌우 대칭 기준선 설정'],
              ['볼륨 작업(백콤 · 텐션)', '10~15분', '뿌리 방향 일정하게, 과도한 백콤으로 손상 티 나지 않게'],
              ['형태 완성(시뇽 · 트위스트 · 브레이드)', '15~25분', '과제 유형별 패턴 정확히, 표면 매끈하게 정리'],
              ['핀 고정 · 마무리 스프레이', '5~8분', '핀 보이지 않게, 흔들림 없는지 흔들어 확인'],
            ]}
            caption="※ 학원 모의실기 관행을 참고한 일반적인 범위입니다(전체 45~60분). 대학·과제 유형에 따라 시간이 달라지므로 반드시 모집요강을 확인하세요."
          />
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">자주 감점되는 포인트 5가지</h2>
          <ol>
            <li><strong>좌우 비대칭.</strong> 거울을 보며 작업해도 실제로는 한쪽에 볼륨이 쏠리는 경우가 많습니다. 완성 후 정면·측면·후면을 번갈아 확인하는 습관이 필요합니다.</li>
            <li><strong>잔머리 · 삐침.</strong> 특히 목덜미·귀 옆 잔머리 정리를 놓치기 쉽습니다. 헤어핀이나 왁스로 마지막에 한 번 더 정리하세요.</li>
            <li><strong>핀이 눈에 보임.</strong> 핀을 모발 결 방향과 맞지 않게 꽂으면 반짝임이 그대로 드러납니다. 핀은 모발 안쪽에서 사선으로 고정하는 연습이 필요합니다.</li>
            <li><strong>볼륨 방향이 제각각.</strong> 백콤을 부위마다 다른 방향으로 넣으면 전체 형태가 흐트러집니다. 시작 전 볼륨 방향을 미리 정해두세요.</li>
            <li><strong>시간 초과로 인한 마무리 생략.</strong> 형태를 완성하는 데 시간을 다 쓰고 마무리 스프레이·잔머리 정리를 생략하면 청결 항목에서 감점됩니다. 마무리 시간을 별도로 확보해 두는 것이 중요합니다.</li>
          </ol>
        </section>

        <section aria-labelledby="sec-5">
          <h2 id="sec-5">연습 루틴 — 주차별 목표</h2>
          <p>
            업스타일도 와인딩과 마찬가지로 “정확하게 완성”과 “시간 안에 완성”을 나눠 연습해야 합니다. 처음부터 여러 유형을 동시에 연습하기보다, 한 가지 유형을 완성한 뒤 다음 유형으로 넘어가는 방식이 효율적입니다.
          </p>
          <StepList
            steps={[
              { title: '기본 형태 익히기', period: '1~3주차', desc: '시간 제한 없이 시뇽 한 가지 유형만 완성합니다. 볼륨 방향과 핀 고정 순서를 손에 익히는 단계입니다.' },
              { title: '유형 확장', period: '4~6주차', desc: '트위스트·브레이드 등 두 번째 유형을 추가하고, 기본 유형은 목표 시간의 130% 안에 완성하도록 연습합니다.' },
              { title: '시간 단축 · 좌우 대칭 점검', period: '7~9주차', desc: '목표 시간의 110~120%로 줄이고, 완성 후 사진을 찍어 좌우 대칭·잔머리를 스스로 점검합니다.' },
              { title: '모의실기 · 지원 대학 과제 집중', period: '10~12주차', desc: '목표 시간의 100~110%로 완성하고, 지원 예정 대학이 자주 출제하는 유형 위주로 반복합니다.' },
            ]}
          />
          <p>
            업스타일용 마네킹은 와인딩과 마찬가지로 젖은 상태에서 여러 번 재사용할 수 있어 재료비 부담이 크지 않습니다. 전체 준비 일정은 <Link href="/practice/">실기 준비 타임라인</Link>에서, 재료비를 포함한 총비용은 <Link href="/cost/">미용입시학원 학원비 총정리</Link>에서 확인할 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="sec-6">
          <h2 id="sec-6">업스타일 준비물 체크리스트</h2>
          <DataTable
            head={['품목', '수량', '대략 비용', '메모']}
            align={['left', 'center', 'center', 'left']}
            rows={[
              ['핀(실핀 · U핀 · 대핀)', '각 1~2통', '1~3만원', '핀 색상은 모발 색과 비슷한 것으로'],
              ['헤어망 · 도넛(볼륨 보조)', '2~3개', '5천원~1만원', '시뇽·볼륨 업스타일 형태 잡기용'],
              ['꼬리빗 · 백콤 빗', '각 1개', '1~2만원', '섹션 나누기와 백콤 겸용'],
              ['왁스 · 스프레이 · 무스', '각 1개', '2~4만원', '잔머리 정리와 마무리 고정용'],
              ['드라이어 · 롤브러시', '1세트', '3~8만원', '베이스 볼륨 작업용(헤어 실기 공통 소모품)'],
              ['업스타일용 마네킹', '3~5개', '개당 3~6만원', '와인딩과 겸용 가능, 젖은 상태로 재사용'],
            ]}
            caption="※ 2026년 기준 참고 범위입니다. 와인딩 준비물과 겹치는 품목이 많아 함께 구매하면 비용을 아낄 수 있습니다."
          />
          <p>
            업스타일 준비물 대부분은 <Link href="/practice/winding/">와인딩</Link> 준비물과 겹칩니다. 두 과제를 함께 준비한다면 마네킹·드라이어·빗 등은 공용으로 쓰고 핀·헤어망 등 소모품만 추가로 구매하면 됩니다.
            업스타일 다음 단계로 <Link href="/practice/haircut/">입시 커트</Link>를 준비하거나, 자격증 가산점을 함께 노린다면 <Link href="/license/hair/">이용사 자격증</Link> 정보도 참고하세요. 헤어디자인학과 전형 전반은 <Link href="/major/hair/">헤어디자인학과 총정리</Link>에서 확인할 수 있습니다.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="updo-faq"
          title="업스타일 입시 자주 묻는 질문"
          items={[
            { q: '업스타일 입시에는 어떤 과제가 나오나요?', a: '시뇽·트위스트·브레이드·볼륨 업스타일 네 가지가 대표적인 유형입니다. 대학마다 한 가지만 지정하거나 두 가지를 혼합해 요구할 수 있어, 지원 대학의 모집요강에서 정확한 과제 유형을 확인해야 합니다.' },
            { q: '업스타일은 뭘 기준으로 채점하나요?', a: '균형(좌우 대칭), 볼륨(뿌리 방향·크기), 표면 정리(잔머리 없이 매끈한지), 핀 처리(보이지 않고 흔들리지 않는지), 마무리 청결(스프레이 자국 없이 깔끔한지) 다섯 가지가 공통 기준으로 꼽힙니다.' },
            { q: '업스타일 실기 시간은 얼마나 되나요?', a: '학원 모의실기 기준으로 45~60분 범위가 자주 쓰이지만, 정확한 제한시간은 대학·연도별 모집요강에 따라 달라 반드시 확인이 필요합니다.' },
            { q: '업스타일에서 가장 많이 감점되는 부분은 어디인가요?', a: '좌우 비대칭, 잔머리·삐침, 핀이 눈에 보이는 것, 볼륨 방향이 제각각인 것, 시간 초과로 마무리를 생략하는 것 다섯 가지가 대표적인 감점 포인트입니다.' },
            { q: '업스타일 연습은 얼마나 걸리나요?', a: '기본 유형 하나를 손에 익히는 데 3주 내외, 두 번째 유형을 추가하고 시간을 단축하는 데 추가로 6~9주 정도가 걸립니다. 목표 대학의 지정 유형을 먼저 확인하면 연습 범위를 줄일 수 있습니다.' },
            { q: '업스타일과 와인딩 중 어느 것을 먼저 연습해야 하나요?', a: '정해진 순서는 없지만, 손끝 텐션 감각을 먼저 익히는 와인딩을 먼저 연습한 뒤 업스타일로 넘어가면 형태 잡는 감각을 더 빨리 습득하는 경우가 많습니다. 지원 대학이 둘 중 하나만 출제한다면 그 과제부터 집중하세요.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/practice/', '/practice/winding/', '/practice/haircut/', '/major/hair/', '/license/hair/', '/cost/']}
        labels={{ '/practice/': '실기 허브로 돌아가기' }}
      />

      <CtaBanner
        title="업스타일, 어떤 유형부터 준비해야 할지 확인하세요"
        desc="지원 대학이 정해지면 준비해야 할 업스타일 유형이 좁혀집니다. 내신·실기 수준만 선택하면 5초면 진단이 끝납니다."
      />
    </PageShell>
  );
}
