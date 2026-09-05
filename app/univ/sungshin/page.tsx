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

const PATH = '/univ/sungshin/';
export const metadata = pageMetadata(PATH);

export default function SungshinPage() {
  const page = getPage(PATH);

  return (
    <PageShell path={PATH}>
      <ArticleJsonLd path={PATH} />
      <PageHero
        path={PATH}
        eyebrow="대학 · 서울 · 2027학년도 미용입시"
        lead="성신여대 뷰티산업학과는 헤어·메이크업·화장품(뷰티산업) 영역을 함께 다루는 서울 소재 4년제 학과입니다. 실기고사가 있지만 와인딩·아트마스크 같은 기술 실기가 아니라 '미술 실기'라는 점이 다른 미용대학과 가장 크게 다릅니다."
        chips={['서울 소재 4년제', '미술 실기고사 실시', '헤어·메이크업·화장품 트랙 포괄', '경쟁률 연도별 변동 큼']}
      />

      <StatGrid
        items={[
          { label: '소재지', value: '서울', sub: '4년제 · 뷰티산업학과' },
          { label: '실기 여부', value: '미술 실기고사', sub: '기술 실기(와인딩·아트마스크)가 아닌 조형·디자인 계열 실기' },
          { label: '주요 전형', value: '학생부종합·실기·정시', sub: '전형별 실기 반영 여부가 다름' },
          { label: '검색량', value: '월 1,270회', sub: '단일 대학 학과 기준 최다 검색' },
        ]}
      />

      <div style={{ margin: '48px 0 56px' }}>
        <FormSection
          cta={page.cta}
          sourcePage="univ-sungshin"
          heading="성신여대 뷰티산업학과 합격 가능성 진단"
          subheading="내신 등급과 실기 준비 상태를 알려주시면 성신여대 지원이 현실적인지, 어떤 전형이 유리한지 무료로 안내합니다."
        />
      </div>

      <article className="prose">
        <section aria-labelledby="sec-1">
          <h2 id="sec-1">성신여대 뷰티산업학과, 어떤 학과인가</h2>
          <p>
            <strong>성신여대 뷰티산업학과</strong>는 미용 관련 학과 중에서도 검색량이 가장 많은 단일 대학·학과입니다. 서울 소재 4년제이고, 헤어·메이크업·화장품(뷰티산업) 영역을 폭넓게 다루는 융합형 커리큘럼이 특징입니다. K-뷰티 산업이 성장하면서 관련 학과에 대한 관심도 함께 높아지는 추세입니다.
            단일 학과 트랙으로 나뉘는 다른 대학과 달리, 뷰티산업 전반(마케팅·기획·트렌드 분석 포함)을 함께 배운다는 점에서 <Link href="/major/cosmetic/">화장품학과</Link>와 <Link href="/major/makeup/">메이크업학과</Link>의 성격을 동시에 가진 학과로 이해하면 됩니다.
          </p>
          <p>
            지원을 고려하고 있다면 가장 먼저 확인해야 할 것은 “실기가 있는가”입니다. 결론부터 말하면 실기고사가 있지만, 그 형태가 다른 미용대학과 다릅니다. 아래에서 전형 방식과 실기 준비법을 순서대로 정리했습니다.
          </p>

          <h3>전형 방식 (유형별 특징)</h3>
          <DataTable
            head={['전형 유형', '반영 요소', '실기 반영', '특징']}
            align={['left', 'left', 'center', 'left']}
            rows={[
              ['학생부종합전형', '내신 + 서류(학생부) + 면접', '없음', '비교과 활동·전공 적합성을 정성 평가. 실기 부담이 없는 대신 서류·면접 준비가 핵심'],
              ['실기(미술) 전형', '내신 + 미술 실기고사', '있음', '기초디자인 계열 조형 실기로 알려져 있으며, 헤어·메이크업 기술 실기와는 전혀 다른 형태'],
              ['정시(수능)전형', '수능 성적 중심', '전형에 따라 다름', '수능 위주 선발. 실기 포함 여부는 모집단위·연도에 따라 달라질 수 있음'],
            ]}
            caption="※ 전형명·반영 비율은 대학 사정에 따라 매년 조정됩니다. 위 표는 일반적인 전형 구조를 정리한 참고용이며, 정확한 2027학년도 전형별 모집인원·반영비율은 성신여대 입학처(ipsi.sungshin.ac.kr) 모집요강에서 확인해야 합니다."
          />
        </section>

        <section aria-labelledby="sec-2">
          <h2 id="sec-2">실기 여부와 준비법 — '미술 실기'가 핵심</h2>
          <p>
            성신여대 뷰티산업학과의 실기고사는 성신여대 입학처가 매년 공개하는 자료실 기준으로 <strong>미술 실기고사</strong>로 안내되고 있습니다. 즉 <Link href="/practice/winding/">와인딩</Link>이나 <Link href="/practice/artmask/">아트마스크</Link>처럼 미용 도구·재료를 직접 다루는 기술 실기가 아니라, 소묘·발상과 표현 같은 조형·디자인 계열 실기에 가깝습니다. 이 차이를 모르고 헤어·메이크업 실기 학원만 다니면 정작 실기고사 대비가 되지 않을 수 있습니다.
          </p>
          <p>
            구체적인 실기 과목명과 출제 유형은 매년 바뀔 수 있으므로, 성신여대 입학처 자료실에 공개되는 직전 연도 기출문제와 우수작 자료를 반드시 확인해야 합니다. 준비 방향은 크게 두 가지입니다. 첫째, 미대 입시학원에서 다루는 기초 소묘·발상과 표현 훈련을 병행하는 방법입니다. 둘째, 실기 반영 비중이 낮은 학생부종합전형으로 방향을 잡고 비교과 활동과 면접에 집중하는 방법입니다.
          </p>
          <Callout type="tip" title="실기 형태를 먼저 확인하세요">
            미용입시 실기 학원에 상담하기 전에 “성신여대는 미술 실기”라는 점을 먼저 알려주면, 학원에서도 일반 헤어·메이크업 실기반이 아니라 적합한 준비 과정을 안내받을 수 있습니다.
          </Callout>
        </section>

        <section aria-labelledby="sec-3">
          <h2 id="sec-3">최근 경쟁률 추이 (참고용)</h2>
          <p>
            경쟁률은 해마다 크게 출렁였습니다. 한 입시 정보 블로그의 정리에 따르면 2023학년도 경쟁률은 약 2.88대 1 수준이었으나, 2024학년도에는 약 17대 1까지 뛰어 그해 성신여대 내에서 가장 높은 경쟁률을 기록한 학과로 언급되기도 했습니다. 다만 이 수치는 공식 입학처 발표가 아닌 참고 자료이며, 전형·모집단위 구분 방식에 따라 다르게 집계될 수 있습니다.
          </p>
          <p>
            경쟁률이 이렇게 큰 폭으로 변한다는 것 자체가 중요한 신호입니다. “작년에 낮았으니 올해도 낮을 것”이라는 예측은 위험하며, 반대로 “작년에 높았으니 포기”할 필요도 없습니다. 매년 대학어디가(adiga.kr)와 성신여대 입학처 홈페이지에서 최근 3개년 통계를 함께 확인하고 지원 전략을 세우는 것이 안전합니다.
          </p>
          <Callout type="warn" title="전형·모집인원·경쟁률은 매년 바뀝니다">
            위 경쟁률과 전형 구조는 참고용 정보이며 실제 지원 시점과 다를 수 있습니다. 반드시 성신여대 입학처(ipsi.sungshin.ac.kr)의 2027학년도 최신 모집요강과 대학어디가 공식 통계로 재확인한 뒤 지원 전략을 세우세요.
          </Callout>
        </section>

        <section aria-labelledby="sec-4">
          <h2 id="sec-4">합격 준비 전략 — 학년별 로드맵</h2>
          <StepList
            steps={[
              { title: '학과 이해 · 기초 조형 훈련 시작', period: '고1~고2', desc: '뷰티산업학과가 다루는 영역(헤어·메이크업·화장품·트렌드 기획)을 파악하고, 미술 실기에 대비해 기초 소묘와 발상 훈련을 조금씩 시작합니다.' },
              { title: '전형 방향 결정', period: '고2 겨울', desc: '내신이 안정적이면 학생부종합전형, 조형 감각에 자신이 있으면 실기전형 쪽으로 준비 비중을 조정합니다.' },
              { title: '기출 분석 · 모의 실기', period: '고3 1학기', desc: '성신여대 입학처 자료실의 직전 연도 기출문제와 우수작을 분석하고, 시간 제한을 두고 모의 실기를 반복합니다.' },
              { title: '서류·면접 준비 병행', period: '고3 여름', desc: '학생부종합전형을 함께 준비한다면 비교과 활동 정리와 면접 예상 질문 연습을 이 시기에 마칩니다.' },
              { title: '원서 접수 · 실기고사', period: '고3 9월~', desc: '수시 원서 접수 후 실기고사 일정에 맞춰 컨디션을 관리하고, 최신 출제 경향 위주로 마무리 점검합니다.' },
            ]}
          />
          <p style={{ marginTop: 24 }}>
            실기 준비 기간과 재료비가 궁금하다면 <Link href="/cost/">미용입시학원 학원비 총정리</Link>에서 화장품·미술 계열 대비반 비용 범위를 확인할 수 있습니다. 가산점 자격증을 함께 준비하고 싶다면 <Link href="/license/cosmetic/">맞춤형화장품조제관리사</Link> 페이지도 참고하세요.
          </p>
        </section>
      </article>

      <div style={{ margin: '56px 0' }}>
        <FaqSection
          id="sungshin-faq"
          title="성신여대 뷰티산업학과 자주 묻는 질문"
          items={[
            { q: '성신여대 뷰티산업학과는 실기가 있나요?', a: '전형에 따라 다릅니다. 실기(미술) 전형은 실기고사가 있고, 학생부종합전형은 실기 없이 서류와 면접으로 선발합니다. 실기가 있는 전형이라도 와인딩·아트마스크 같은 기술 실기가 아니라 미술 실기(조형·디자인 계열)라는 점이 특징입니다.' },
            { q: '성신여대 뷰티산업학과 실기는 어떤 과목인가요?', a: '입학처 자료실에 공개되는 기출문제 기준으로 미술 실기고사로 안내되고 있습니다. 세부 과목명과 출제 유형은 매년 달라질 수 있어 직전 연도 기출문제와 우수작 자료를 확인하는 것이 가장 정확합니다.' },
            { q: '성신여대 뷰티산업학과 경쟁률은 어느 정도인가요?', a: '연도별 변동이 큰 편입니다. 참고 자료에 따르면 2023학년도 약 2.88대 1에서 2024학년도 약 17대 1까지 크게 오른 사례가 있습니다. 정확한 수치는 매년 달라지므로 지원 전 대학어디가와 입학처 공식 자료로 재확인해야 합니다.' },
            { q: '헤어·메이크업 실기 학원을 다니면 성신여대 실기를 준비할 수 있나요?', a: '일반 헤어·메이크업 실기 학원 커리큘럼과는 다릅니다. 성신여대는 미술 실기이므로 기초 소묘·발상과 표현 등 조형 훈련이 필요합니다. 상담 시 목표 대학을 미리 알려주면 맞는 준비 과정을 안내받을 수 있습니다.' },
            { q: '내신이 낮아도 성신여대 지원이 가능한가요?', a: '전형에 따라 다릅니다. 실기 비중이 큰 전형이라면 내신 부담이 상대적으로 줄어들 수 있고, 학생부종합전형은 내신과 비교과를 함께 봅니다. 정확한 지원 가능성은 최근 입시 결과와 함께 진단받는 것이 안전합니다.' },
          ]}
        />
      </div>

      <RelatedLinks
        paths={['/diagnosis/', '/univ/', '/univ/seowon/', '/major/cosmetic/', '/license/cosmetic/', '/cost/']}
        labels={{ '/diagnosis/': '성신여대 합격 가능성 진단', '/univ/': '미용대학 비교표 전체 보기' }}
      />

      <CtaBanner
        title="성신여대, 나에게 맞는 전형인지 확인하세요"
        desc="실기 전형과 학생부종합전형 중 어느 쪽이 유리한지, 5초 진단으로 먼저 방향을 잡아보세요."
      />
    </PageShell>
  );
}
