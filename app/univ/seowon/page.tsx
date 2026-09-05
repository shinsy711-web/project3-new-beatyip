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

const PATH = '/univ/seowon/';
export const metadata = pageMetadata(PATH);

export default function SeowonPage() {
  const page = getPage(PATH);

  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="대학 · 충북 청주 · 2027학년도 미용입시"
        lead="서원대 뷰티학과는 충북 청주에 있는 4년제 학과로, 아트마스크·헤어(커트+펌) 두 개 실기 트랙을 운영하는 예체능(실기)전형이 있습니다. 청주·천안·세종권 수험생이라면 통학 부담 없이 준비할 수 있는 대표적인 선택지입니다."
        chips={['충북 청주 소재 4년제', '예체능(실기)전형 운영', '아트마스크·헤어 실기 트랙', '청주·천안·세종 통학권']}
      />

      <StatGrid
        items={[
          { label: '소재지', value: '충북 청주', sub: '4년제 · 뷰티학과' },
          { label: '실기 트랙', value: '2종', sub: '아트마스크(메이크업) · 헤어(커트+펌)' },
          { label: '예체능전형 모집인원', value: '트랙별 약 10명', sub: '2026학년도 수시 기준 참고치' },
          { label: '통학권', value: '청주·천안·세종', sub: '충청권 수험생 접근성 높음' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="univ-seowon"
          heading="서원대 뷰티학과 합격 가능성 진단받기"
          subheading="희망 실기 트랙(아트마스크·헤어)과 내신 등급을 알려주시면 서원대 지원 가능성과 준비 순서를 무료로 안내합니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">서원대 뷰티학과, 청주·천안권 수험생이 주목하는 이유</h2>
          <p>
            <strong>서원대 뷰티학과</strong>는 충북 청주에 있는 4년제 대학의 미용 관련 학과입니다. 서울권 대학에 비해 상대적으로 덜 알려져 있지만, 실기 트랙이 명확하게 나뉘어 있고 충청권(청주·천안·세종)에서 통학이 가능하다는 점이 뚜렷한 장점입니다. 서울로 통학하거나 자취하기 부담스러운 학생들에게는 현실적인 지원 후보입니다.
          </p>
          <p>
            <Link href="/region/">우리 지역 미용입시학원</Link>에서 청주·천안 지역 학원 정보를 확인할 수 있고, 실기 준비물과 학원비 범위는 <Link href="/cost/">학원비 총정리</Link>에서 함께 참고하면 좋습니다.
          </p>
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">서원대 vs 서울권 대학 — 무엇이 다를까</h2>
          <p>
            같은 미용 관련 학과라도 서울권 대학과 서원대는 준비 방식이 조금 다릅니다. 서울권은 학원·학생 수가 많아 정보 접근성이 좋은 대신 경쟁이 치열하고, 실기 학원까지 통학하는 데 시간과 비용이 추가로 듭니다. 반면 서원대처럼 지방 거점 대학은 상대적으로 정보가 적게 알려져 있어 미리 준비한 학생에게 유리할 수 있고, 청주·천안·세종권에 거주한다면 실기 학원 통학 부담이 크게 줄어듭니다.
          </p>
          <p>
            다만 지방 대학이라고 해서 무조건 경쟁이 낮은 것은 아닙니다. 실기 트랙별 모집인원이 서울권보다 적은 경우가 많아, 소수 인원을 두고 실기 완성도로 승부가 갈리는 경향이 있습니다. 따라서 “인원이 적으니 쉽다”가 아니라 “적은 인원 안에서 확실한 완성도를 보여줘야 한다”는 전제로 준비하는 것이 현실적입니다.
          </p>

          <h3>전형 방식과 모집인원</h3>
          <DataTable
            head={['전형 유형', '실기 트랙', '모집인원(참고)', '특징']}
            align={['left', 'left', 'center', 'left']}
            rows={[
              ['예체능(실기)전형', '아트마스크', '약 10명', '메이크업 계열 실기. 도안·채색 중심 평가'],
              ['예체능(실기)전형', '헤어(커트+펌)', '약 10명', '헤어디자인 계열 실기. 마네킹 커트·펌 기술 평가'],
              ['학생부 위주 전형', '실기 없음', '전형별 상이', '내신·서류 중심. 실기 부담 없이 지원 가능'],
            ]}
            caption="※ 모집인원은 2026학년도 수시모집 기준 참고치이며, 2027학년도 모집인원·전형 방식은 매년 달라질 수 있습니다. 정확한 수치는 서원대 입학처(www.seowon.ac.kr/iphak) 최신 모집요강에서 확인하세요."
          />
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">실기 트랙 두 가지 — 아트마스크 vs 헤어</h2>
          <p>
            서원대 뷰티학과의 실기는 메이크업 계열의 <Link href="/practice/artmask/">아트마스크</Link>와 헤어디자인 계열의 커트+펌으로 나뉩니다. 아트마스크는 정해진 시간 안에 도안을 채색하는 방식으로, <Link href="/major/makeup/">메이크업학과</Link> 지망생에게 익숙한 과제입니다. 헤어(커트+펌) 트랙은 마네킹을 대상으로 <Link href="/practice/haircut/">커트</Link> 기술과 펌 시술 능력을 함께 평가하는 방식으로 알려져 있어, 일반적인 미용사(일반) 실기와 겹치는 부분이 있습니다.
          </p>
          <p>
            두 트랙 중 어느 쪽이 유리한지는 그동안 어떤 실기를 연습했는지에 따라 갈립니다. 메이크업 도안 연습 경험이 많다면 아트마스크 트랙을, 커트·펌 기술을 배워온 학생이라면 헤어 트랙을 선택하는 것이 자연스럽습니다. 아직 실기 경험이 없다면 두 트랙의 난이도와 준비 기간을 함께 상담받아 보는 것이 좋습니다.
          </p>
          <p>
            트랙을 정한 뒤에는 서원대 입학처에 공개되는 실기고사 문제은행(기출 도안·과제 유형)을 반드시 확인해야 합니다. 같은 아트마스크라도 대학마다 요구하는 도안 스타일과 채점 포인트가 다르고, 헤어 트랙 역시 커트 도면의 기준선·비율을 대학별 채점 기준에 맞춰 연습해야 감점을 줄일 수 있습니다. 막연히 “아트마스크를 잘 그린다”, “커트를 잘한다”는 자신감만으로는 부족하고, 서원대 출제 경향에 맞춘 반복 연습이 필요합니다.
          </p>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">합격 전략 — 트랙별 준비 순서</h2>
          <StepList
            steps={[
              { title: '실기 트랙 선택', period: '고2 겨울', desc: '아트마스크와 헤어(커트+펌) 중 관심과 적성에 맞는 트랙을 정하고, 해당 실기 위주로 학원 상담을 시작합니다.' },
              { title: '기본기 완성', period: '고2 2월~고3 3월', desc: '아트마스크는 도안 채색 기본형 완성을, 헤어 트랙은 커트 도면 이해와 펌 와인딩 기초를 목표로 합니다.' },
              { title: '모의 실기 · 시간 단축', period: '고3 4~6월', desc: '제한시간 안에 완성하는 연습을 반복하고, 서원대 기출 실기고사 문제은행 자료를 참고해 출제 경향을 파악합니다.' },
              { title: '지원 확정 · 최종 점검', period: '고3 7~9월', desc: '내신·실기 준비 상태를 종합해 지원 여부를 확정하고, 원서 접수 후 실기고사 일정에 맞춰 컨디션을 관리합니다.' },
            ]}
          />
          <p>
            올댓뷰티 천안지점에서는 과거 서원대 실기 대비 특강을 운영한 경험이 있어, 지역 학생들의 실기 준비 흐름을 비교적 잘 파악하고 있습니다. 청주·천안권에서 실기 준비 학원을 찾는다면 <Link href="/region/">지역별 미용입시학원</Link> 페이지에서 가까운 지점을 확인해 보세요.
          </p>
          <Callout type="tip" title="학생부 위주 전형도 함께 검토하세요">
            실기 준비가 부담스럽다면 서원대 뷰티학과의 학생부 위주 전형도 선택지입니다. 내신이 안정적인 학생이라면 실기 없이 지원할 수 있는지 함께 확인해 보세요.
          </Callout>
          <Callout type="warn" title="전형·모집인원·경쟁률은 매년 바뀝니다">
            위 트랙별 모집인원과 전형 구조는 최근 연도 기준 참고치이며, 2027학년도 모집요강에서 트랙 구성이나 인원이 조정될 수 있습니다. 반드시 서원대 입학처 최신 모집요강으로 재확인하세요.
          </Callout>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="seowon-faq"
          title="서원대 뷰티학과 자주 묻는 질문"
          items={[
            { q: '서원대 뷰티학과는 실기가 있나요?', a: '예체능(실기)전형에서 아트마스크와 헤어(커트+펌) 두 트랙의 실기고사를 운영하는 것으로 확인됩니다. 학생부 위주 전형은 실기 없이 지원할 수 있습니다. 정확한 트랙 구성은 매년 모집요강에서 확인해야 합니다.' },
            { q: '서원대 뷰티학과 모집인원은 몇 명인가요?', a: '2026학년도 수시모집 기준으로 예체능전형에서 아트마스크 약 10명, 헤어(커트+펌) 약 10명이 참고 수치로 확인됩니다. 2027학년도 모집인원은 서원대 입학처 최신 모집요강에서 다시 확인해야 합니다.' },
            { q: '서원대는 어느 지역 학생들이 통학하기 좋나요?', a: '충북 청주에 위치해 청주·천안·세종 등 충청권에서 통학이 비교적 수월합니다. 서울·수도권 대학에 비해 통학·자취 부담이 적다는 점이 장점입니다.' },
            { q: '아트마스크와 헤어 트랙 중 어느 쪽이 유리한가요?', a: '개인의 실기 경험에 따라 다릅니다. 메이크업 도안 연습이 많다면 아트마스크, 커트·펌 기술 경험이 많다면 헤어 트랙이 상대적으로 수월합니다. 아직 정하지 못했다면 무료 상담에서 적성을 함께 확인할 수 있습니다.' },
            { q: '천안에서도 서원대 실기를 준비할 수 있나요?', a: '가능합니다. 올댓뷰티 천안지점에서 서원대 실기 대비 특강을 운영한 경험이 있어, 청주까지 이동하지 않고도 인근 지역에서 준비할 수 있는 선택지가 있습니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/univ/', '/univ/sungshin/', '/practice/artmask/', '/practice/haircut/', '/region/']}
        labels={{ '/diagnosis/': '서원대 합격 가능성 진단', '/region/': '청주·천안권 학원 찾기' }}
      />

      <CtaBanner
        title="아트마스크와 헤어, 어느 트랙이 나에게 맞을까요"
        desc="내신 등급과 실기 경험만 알려주시면 서원대 두 트랙 중 어느 쪽이 유리한지 5초 만에 진단해 드립니다."
      />
    </PageShell>
  );
}
