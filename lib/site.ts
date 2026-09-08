// ─────────────────────────────────────────────────────────────
// 사이트 단일 소스: 브랜드·운영주체·페이지 레지스트리(23p)
// 설계서: 미용입시 학원비 비교 사이트 — 페이지 설계서 (2026-09-03)
// 이 파일 하나로 nav / sitemap / breadcrumb / 관련링크 / metadata 를 모두 만든다.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// 운영자 설정 — 사이트를 넘겨받으면 .env.local 값만 바꾸면 된다.
// 코드에 특정 업체·개인 정보를 남기지 않는다(판매·이관 시 그대로 따라가면 안 되므로).
// 값이 비어 있으면 화면에 눈에 띄는 자리표시자가 나오도록 해서 설정 누락을 바로 알아챈다.
// ─────────────────────────────────────────────────────────────
const env = (key: string, fallback = '') => (process.env[key] ?? '').trim() || fallback;

export const SITE_NAME = env('NEXT_PUBLIC_SITE_NAME', '미용입시학원 학원비 비교');
export const SITE_SHORT = env('NEXT_PUBLIC_SITE_SHORT', SITE_NAME);
export const SITE_URL = env('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000').replace(/\/$/, '');
/**
 * 공유 미리보기(OG) 이미지. 파일을 교체하면 여기 경로·크기·타입만 바꾸면
 * 레이아웃과 모든 페이지 메타데이터가 함께 따라간다.
 */
export const OG = {
  path: '/thumb.webp',
  width: 1536,
  height: 1024,
  type: 'image/webp',
} as const;
export const OG_IMAGE = `${SITE_URL}${OG.path}`;

/** 광고·분석 ID — 비어 있으면 해당 스크립트를 아예 넣지 않는다. */
export const ADSENSE_PUB = env('NEXT_PUBLIC_ADSENSE_PUB');           // 예: ca-pub-0000000000000000
export const GA_ID = env('NEXT_PUBLIC_GA_ID');                        // 예: G-XXXXXXXXXX
export const NAVER_VERIFICATION = env('NEXT_PUBLIC_NAVER_VERIFICATION');
export const GOOGLE_VERIFICATION = env('NEXT_PUBLIC_GOOGLE_VERIFICATION');

/**
 * Organization 스키마의 sameAs — 이 사이트 운영 주체와 동일 주체임이 확인되는 외부 프로필만.
 * 구글이 엔티티를 같은 대상으로 묶는 신호라서, 확실하지 않은 링크를 넣으면 역효과다.
 * .env.local 에 콤마로 구분해 입력한다. 예: NEXT_PUBLIC_PROFILES=https://blog.naver.com/xxx,https://instagram.com/xxx
 */
export const PROFILES: string[] = env('NEXT_PUBLIC_PROFILES')
  .split(',')
  .map((s) => s.trim())
  .filter((s) => /^https?:\/\//.test(s));

/**
 * 운영 주체 정보. 개인정보처리방침·약관·푸터가 전부 이 값을 쓴다.
 * 사이트를 넘겨받은 쪽이 개인정보처리자가 되므로 반드시 실제 정보로 채워야 한다.
 */
export const OPERATOR = {
  /** 사업자명(법인명 또는 상호) */
  company: env('NEXT_PUBLIC_COMPANY', '(운영사명을 입력하세요)'),
  /** 상담을 진행하는 브랜드명 — 본문 곳곳에 노출된다 */
  partner: env('NEXT_PUBLIC_PARTNER', '입시 상담팀'),
  /** 상담 브랜드 한 줄 소개 */
  partnerDesc: env('NEXT_PUBLIC_PARTNER_DESC', '미용입시 전문 상담'),
  /** 문의·개인정보 요청을 받는 이메일 */
  email: env('NEXT_PUBLIC_CONTACT_EMAIL', 'example@example.com'),
  /** 상담 가능 시간 */
  hours: env('NEXT_PUBLIC_HOURS', '월~토 10:00 ~ 19:00 (일요일·공휴일 휴무)'),
  /** 개인정보 보호책임자 성명 */
  privacyOfficer: env('NEXT_PUBLIC_PRIVACY_OFFICER', '(보호책임자 성명)'),
  /** 사업자등록번호(선택) — 입력하면 푸터·소개 페이지에 표시 */
  bizNumber: env('NEXT_PUBLIC_BIZ_NUMBER'),
  /** 개인정보처리방침 시행일 */
  policyDate: env('NEXT_PUBLIC_POLICY_DATE', '2026년 9월 5일'),
};

export type Section = '전환' | '실기' | '학과' | '대학' | '자격증' | '진로' | '지역' | '가이드';
export type Grade = 'S' | 'A' | 'B' | 'C';

export type PageDef = {
  path: string;          // 트레일링 슬래시 포함 ('/practice/winding/')
  parent: string | null; // 브레드크럼용 상위 경로
  section: Section;
  grade: Grade;          // DB등급 S=최우선
  volume: number;        // 월간 검색량 (네이버 키워드도구 2026-09). 0 = 설계서에 조회량 자료 없음(확장 페이지)
  nav: string;           // 짧은 메뉴명
  title: string;         // <title> (검색결과 표시) — 설계서 원문 그대로
  h1: string;            // 페이지 H1 — 설계서 원문 그대로
  description: string;   // meta description
  cta: string;           // 폼 CTA 문구
  keywords: string[];    // 타겟 키워드
  memo?: string;         // 제작 메모 (설계서)
  priority: number;      // sitemap priority
};

export const PAGES: PageDef[] = [
  // ── 전환 ──────────────────────────────────────────────
  {
    path: '/', parent: null, section: '전환', grade: 'S', volume: 300, nav: '홈',
    title: '미용입시학원 학원비 비교 | 전국 미용입시학원 한눈에',
    h1: '미용입시학원 학원비, 한눈에 비교하세요',
    description: '미용입시학원 학원비를 한눈에 비교하세요. 헤어·메이크업·화장품학과 실기, 지원 가능 대학 5초 진단, 가산점 자격증까지 총정리.',
    cta: '내 조건으로 학원비 견적 받기 (무료)',
    keywords: ['미용입시학원', '미용학원 비용', '미용입시 학원비', '미용학원 추천', '미용대학 입시'],
    memo: '브랜드·전환 페이지. 하위 20여 페이지로 링크 분배가 본 임무',
    priority: 1.0,
  },
  {
    path: '/diagnosis/', parent: '/', section: '전환', grade: 'S', volume: 1440, nav: '대학 진단',
    title: '지원 가능 대학 진단 | 내신·실기로 5초 진단',
    h1: '내 성적으로 갈 수 있는 미용대학은?',
    description: '내신과 실기 수준만 고르면 5초 만에 지원 가능한 미용대학·미용학과를 알려드립니다. 진단은 무료입니다.',
    cta: '5초 진단 시작하기',
    keywords: ['미용학과', '미용대학', '미용대학 지원 가능', '미용학과 등급'],
    memo: '★최강 DB 훅. 모든 페이지의 CTA가 여기로 모이게',
    priority: 0.95,
  },
  {
    path: '/cost/', parent: '/', section: '전환', grade: 'S', volume: 560, nav: '학원비',
    title: '미용입시학원 학원비 총정리 | 과정별·기간별 비용',
    h1: '미용입시학원 학원비, 얼마나 들까?',
    description: '미용입시학원 학원비, 과정별 월 비용과 기간별 총비용을 공개합니다. 재료비 등 추가 비용 범위까지.',
    cta: '내 과정 정확한 견적 받기',
    keywords: ['미용학원 비용', '미용학원 추천', '미용입시학원 학원비', '미용입시 학원비'],
    memo: '★가격 범위를 반드시 공개할 것. 폼 벽을 세우면 검색 유입은 이탈함',
    priority: 0.95,
  },

  // ── 실기 ──────────────────────────────────────────────
  {
    path: '/practice/', parent: '/', section: '실기', grade: 'A', volume: 150, nav: '실기',
    title: '미용입시 실기 총정리 | 학과별 실기 유형',
    h1: '미용입시 실기, 학과별로 뭐가 다를까',
    description: '미용입시 실기는 학과별로 다릅니다. 헤어·메이크업 실기 유형과 준비물, 채점 기준을 정리했습니다.',
    cta: '내 학과 실기 준비 상담',
    // 준비물·포트폴리오는 하위 전용 페이지가 가져갔다(카니발라이제이션 방지). 허브는 상위 개념만 겨냥한다.
    keywords: ['미용입시 실기', '미용입시 실기 유형', '학과별 실기', '실기 전형'],
    memo: '실기 하위 페이지 허브',
    priority: 0.85,
  },
  {
    path: '/practice/winding/', parent: '/practice/', section: '실기', grade: 'A', volume: 2570, nav: '와인딩',
    title: '와인딩 방법 총정리 | 헤어 입시 실기',
    h1: '와인딩, 입시 실기에서 이렇게 나옵니다',
    description: '와인딩 방법을 단계별로 정리했습니다. 입시 실기 출제 방식, 시간 배분, 감점 포인트까지.',
    cta: '내 실기 1:1 피드백 신청',
    keywords: ['와인딩', '와인딩 방법', '헤어 실기 와인딩', '와인딩 시간'],
    memo: '★단일 최대 실기 키워드. 단계별 사진/영상 필수',
    priority: 0.9,
  },
  {
    path: '/practice/updo/', parent: '/practice/', section: '실기', grade: 'A', volume: 1160, nav: '업스타일',
    title: '업스타일 입시 완전정복 | 과제 유형·채점 기준',
    h1: '업스타일 입시, 뭘 보고 채점할까',
    description: '업스타일 입시 실기의 과제 유형과 채점 기준. 시간 배분, 감점 포인트, 연습 루틴을 정리했습니다.',
    cta: '내 실기 1:1 피드백 신청',
    keywords: ['업스타일', '업스타일 입시', '업스타일 실기', '헤어 업스타일'],
    priority: 0.85,
  },
  {
    path: '/practice/artmask/', parent: '/practice/', section: '실기', grade: 'A', volume: 860, nav: '아트마스크',
    title: '아트마스크 그리는 법 | 도안·채색·시간배분',
    h1: '아트마스크, 처음부터 끝까지',
    description: '아트마스크 그리는 법을 도안 선택부터 채색·시간 배분까지 단계별로 안내합니다. 채점 기준 포함.',
    cta: '아트마스크 도안 무료 받기 + 피드백',
    keywords: ['아트마스크', '아트마스크 도안', '아트마스크 그리는 법', '메이크업 입시 실기'],
    memo: '★도안 다운로드 = 연락처 수집 자산. 메이크업 입시 핵심',
    priority: 0.85,
  },
  {
    path: '/practice/haircut/', parent: '/practice/', section: '실기', grade: 'B', volume: 360, nav: '입시 커트',
    title: '입시 커트 도면 분석 | 그래쥬에이션·레이어드',
    h1: '입시 커트, 도면부터 읽는 법',
    description: '입시 커트 도면 읽는 법을 그래쥬에이션·레이어드 중심으로. 마네킹 선택과 감점 포인트까지.',
    cta: '내 실기 1:1 피드백 신청',
    keywords: ['그래쥬에이션 커트', '헤어 마네킹', '레이어드 커트', '입시 커트'], // 컬러링은 /practice/coloring/ 담당
    priority: 0.75,
  },
  {
    path: '/practice/illust/', parent: '/practice/', section: '실기', grade: 'B', volume: 110, nav: '뷰티일러스트',
    title: '뷰티일러스트 그리는 법 | 준비물·채색',
    h1: '뷰티일러스트, 준비물부터 채색까지',
    description: '뷰티일러스트 준비물부터 채색 순서까지. 입시 실기에서 평가하는 요소와 연습 방법을 안내합니다.',
    cta: '실기 피드백 신청',
    keywords: ['뷰티일러스트', '뷰티일러스트 준비물', '뷰티일러스트 채색'],
    priority: 0.7,
  },

  // ── 학과 ──────────────────────────────────────────────
  {
    path: '/major/', parent: '/', section: '학과', grade: 'A', volume: 2330, nav: '학과',
    title: '미용학과 총정리 | 학과별 전형·진로 비교',
    h1: '미용학과, 어디로 가야 할까',
    description: '미용학과, 어디로 가야 할까? 헤어디자인·메이크업·화장품학과의 전형과 실기 유무, 진로를 비교합니다.',
    cta: '내 성적으로 갈 수 있는 학과 진단',
    keywords: ['미용학과', '뷰티학과', '미용대학', '뷰티디자인학과'],
    memo: '학과 3개로 갈라지는 허브',
    priority: 0.9,
  },
  {
    path: '/major/cosmetic/', parent: '/major/', section: '학과', grade: 'A', volume: 2360, nav: '화장품학과',
    title: '화장품학과 총정리 | 실기 없는 뷰티 전형',
    h1: '화장품학과, 실기 없이도 갑니다',
    description: '화장품학과는 실기 없이 학생부·면접으로 갑니다. 향장·화장품과학과 차이와 개설 대학, 진로 정리.',
    cta: '실기 없는 전형 지원 가능 대학 진단',
    keywords: ['화장품학과', '향장학과', '화장품과학과', '피부미용과', '화장품학과 순위', '코스메틱학과'],
    memo: "★학과 중 볼륨 1위. '실기 부담 없음'이 최강 차별점",
    priority: 0.9,
  },
  {
    path: '/major/makeup/', parent: '/major/', section: '학과', grade: 'A', volume: 720, nav: '메이크업학과',
    title: '메이크업학과 총정리 | 전국 대학·전형·등급',
    h1: '메이크업학과, 전국 어디에 있나',
    description: '메이크업학과 전국 대학, 전형 방식과 실기 과제 유형을 정리했습니다. 지원 가능 대학 무료 진단.',
    cta: '지원 가능 대학 진단',
    keywords: ['메이크업학과', '메이크업디자인학과', '메이크업학과 대학', '메이크업학과 등급'],
    priority: 0.85,
  },
  {
    path: '/major/hair/', parent: '/major/', section: '학과', grade: 'B', volume: 330, nav: '헤어디자인학과',
    title: '헤어디자인학과 총정리 | 전국 대학·전형',
    h1: '헤어디자인학과, 어디로 갈까',
    description: '헤어디자인학과 전국 대학과 전형, 실기 과제와 이용사 자격증 가산점을 정리했습니다.',
    cta: '지원 가능 대학 진단',
    keywords: ['헤어디자인과', '헤어디자인학과', '헤어디자인학과 대학', '헤어 입시'],
    memo: '볼륨 최소. 실기·자격증 탭이 트래픽 책임',
    priority: 0.8,
  },

  // ── 대학 ──────────────────────────────────────────────
  {
    path: '/univ/', parent: '/', section: '대학', grade: 'A', volume: 670, nav: '대학',
    title: '미용대학 비교 | 전형·경쟁률·등급컷 한눈에',
    h1: '미용대학, 한눈에 비교하세요',
    description: '미용대학 전형·경쟁률·등급컷을 한 표로 비교합니다. 실기 있는 대학과 없는 대학을 구분했습니다.',
    cta: '내 조건 지원 가능 대학 진단',
    keywords: ['미용대학', '미용대학 비교', '미용대학 경쟁률', '미용대학 등급컷'],
    memo: '★비교사이트 핵심 포맷. 표 형태 + 정렬/필터',
    priority: 0.9,
  },
  {
    path: '/univ/sungshin/', parent: '/univ/', section: '대학', grade: 'S', volume: 1270, nav: '성신여대',
    title: '성신여대 뷰티산업학과 입시 | 전형·실기·경쟁률',
    h1: '성신여대 뷰티산업학과, 이렇게 준비합니다',
    description: '성신여대 뷰티산업학과 전형과 실기 여부, 경쟁률 추이와 준비 전략을 정리했습니다.',
    cta: '성신여대 합격 가능성 진단받기',
    keywords: ['성신여대 뷰티산업학과', '성신여대 뷰티산업학과 실기', '성신여대 뷰티산업학과 경쟁률'],
    memo: '★단일 대학 최대. DB 전환율 최고 (지망 확정된 사람)',
    priority: 0.95,
  },
  {
    path: '/univ/seowon/', parent: '/univ/', section: '대학', grade: 'S', volume: 230, nav: '서원대',
    title: '서원대 뷰티학과 입시 | 전형·경쟁률',
    h1: '서원대 뷰티학과, 이렇게 준비합니다',
    description: '서원대 뷰티학과 전형·모집인원·경쟁률과 준비 전략. 청주·천안권 수험생을 위한 안내입니다.',
    cta: '서원대 합격 가능성 진단받기',
    keywords: ['서원대 뷰티학과', '서원대 뷰티학과 입시', '서원대 뷰티학과 경쟁률'],
    memo: '천안지점 특강 이력 = 콘텐츠 재료 보유',
    priority: 0.9,
  },
  {
    // 확장 페이지(설계서 밖). '그 외 대학'에 묶여 있던 서경대를 미용예술대학 3개 학과 기준으로 분리.
    // 헤어 A/B 차이·계약학과(준오뷰티 등)·실기우수자 경쟁률이 롱테일 검색을 받는다.
    path: '/univ/seokyeong/', parent: '/univ/', section: '대학', grade: 'S', volume: 0, nav: '서경대',
    title: '서경대 미용예술대학 입시 | 전형·실기·경쟁률',
    h1: '서경대 미용예술대학, 3개 학과 전형 총정리',
    description: '서경대 헤어디자인·메이크업디자인·코스메틱뷰티매니지먼트학과의 수시 실기우수자 전형과 경쟁률·등급컷·실기 일정을 정리했습니다.',
    cta: '서경대 합격 가능성 진단받기',
    keywords: ['서경대 미용예술대학', '서경대 헤어디자인학과', '서경대 메이크업디자인학과', '서경대 코스메틱뷰티매니지먼트학과', '서경대 수시 실기우수자', '서경대 뷰티 경쟁률', '서경대 준오뷰티 계약학과'],
    memo: '3개 학과 + 헤어 A/B 반영비율 차이가 핵심. 실기 80% 학과는 내신 5~6등급대도 합격선',
    priority: 0.9,
  },
  {
    path: '/univ/etc/', parent: '/univ/', section: '대학', grade: 'A', volume: 640, nav: '그 외 대학',
    // 설계서 title 원문은 "그 외 미용대학 (7곳)". 검색결과 CTR을 위해 대표 대학명만 덧붙였다
    // (7개 전체를 붙이면 43자로 잘림 — H1에는 7곳 전부 유지).
    title: '그 외 미용대학 7곳 | 부천대·한성대·광주여대 외 전형',
    h1: '부천대·한성대·광주여대·서경대·원광대·수원여대·건국대글로컬',
    description: '부천대·한성대·광주여대·서경대·원광대·수원여대·건국대 글로컬 등 미용대학 7곳의 전형을 비교합니다.',
    cta: '지원 가능 대학 진단',
    keywords: ['부천대 뷰티케어과', '한성대 AI뷰티디자인학과', '광주여대 미용과학과', '원광대 뷰티디자인학과', '수원여대 미용예술과', '건국대 글로컬 뷰티'],
    // 서경대 관련 키워드는 /univ/seokyeong/ 로 넘겼다(중복 방지). 비교표에는 계속 7곳 유지.
    memo: '개별 검색량이 작아 1페이지에 묶음. 커지면 분리',
    priority: 0.85,
  },

  // ── 자격증 ────────────────────────────────────────────
  {
    path: '/license/', parent: '/', section: '자격증', grade: 'A', volume: 6170, nav: '자격증',
    title: '미용입시 가산점 자격증 총정리 | 대학별 반영표',
    h1: '미용입시 가산점, 어떤 자격증이 반영될까',
    description: '미용입시 가산점 자격증을 대학별 반영 유형으로 정리했습니다. 내 학과에 유리한 자격증 확인.',
    cta: '내 학과 가산점 자격증 상담',
    keywords: ['미용사 자격증', '미용입시 가산점', '미용 자격증 가산점', '미용사 자격증 종류'],
    memo: '입시 맥락 유지 = 가산점 프레임 필수',
    priority: 0.9,
  },
  {
    path: '/license/hair/', parent: '/license/', section: '자격증', grade: 'B', volume: 4820, nav: '이용사 자격증',
    title: '이용사 자격증 | 필기·실기·시험일정',
    h1: '이용사 자격증, 헤어 입시 가산점 1순위',
    description: '이용사 자격증 필기·실기 과목과 2026 시험일정, 합격률. 헤어 입시 가산점 활용법까지.',
    cta: '자격증 + 입시 동시 준비 상담',
    keywords: ['이용사 자격증', '이용사 필기', '이용사 실기', '이용사 시험일정', '미용사 일반 필기', '미용사 일반'],
    memo: '★볼륨 최대 자격증 페이지. DB 질은 낮으니 입시 필터 문구 필요',
    priority: 0.8,
  },
  {
    path: '/license/cosmetic/', parent: '/license/', section: '자격증', grade: 'B', volume: 10040, nav: '맞춤형화장품조제관리사',
    title: '맞춤형화장품조제관리사 | 시험일정·난이도·교재',
    h1: '맞춤형화장품조제관리사, 화장품학과 지망생 필수',
    description: '맞춤형화장품조제관리사 시험일정·난이도·합격률·교재. 화장품학과 입시와 병행하는 방법.',
    cta: '자격증 + 입시 동시 준비 상담',
    keywords: ['맞춤형화장품조제관리사', '맞춤형화장품조제관리사 시험일정', '맞춤형화장품조제관리사 교재', '맞춤형화장품조제관리사 합격률', '맞춤형화장품조제관리사 독학'], // 퍼스널컬러는 /license/personal-color/ 담당
    memo: '★볼륨 최대. special005·008 판매중 = 교차판매',
    priority: 0.8,
  },
  {
    path: '/license/makeup/', parent: '/license/', section: '자격증', grade: 'B', volume: 2960, nav: '메이크업 자격증',
    title: '메이크업 국가자격증 | 필기·실기·준비물',
    h1: '메이크업 국가자격증, 입시 가산점 되나요',
    description: '미용사(메이크업) 자격증 필기·실기 과목과 준비물, 2026 시험일정. 입시 가산점 여부까지.',
    cta: '자격증 + 입시 동시 준비 상담',
    keywords: ['메이크업 자격증', '메이크업 국가자격증', '미용사 메이크업 필기', '미용사 메이크업 실기'],
    priority: 0.8,
  },

  // ── 진로 ──────────────────────────────────────────────
  {
    path: '/career/', parent: '/', section: '진로', grade: 'C', volume: 4460, nav: '진로',
    title: '뷰티 진로 가이드 | 직업별 연봉·전망',
    h1: '뷰티 직업, 뭐가 나한테 맞을까',
    description: '뷰티 직업별 연봉과 전망을 비교합니다. 메이크업아티스트·헤어디자이너가 되는 법과 관련 학과.',
    cta: '이 직업으로 가는 학과 알아보기',
    // 직업별 상세 키워드는 하위 3페이지가 가져갔다. 허브는 "무슨 직업이 있나" 단계만 겨냥한다.
    keywords: ['뷰티 직업', '뷰티 진로', '미용 관련 직업', '뷰티 직업 종류', '뷰티 진로 탐색'],
    memo: '고1~2 인지 단계. DB 질은 낮지만 퍼널 최상단 + 볼륨 큼',
    priority: 0.75,
  },

  // ── 실기 (확장) ───────────────────────────────────────
  {
    path: '/practice/supplies/', parent: '/practice/', section: '실기', grade: 'B', volume: 0, nav: '실기 준비물',
    title: '미용입시 실기 준비물 총정리 | 품목·수량·비용',
    h1: '실기 준비물, 뭘 얼마나 사야 할까',
    description: '헤어·메이크업 실기 준비물을 품목·수량·비용까지 표로 정리했습니다. 뭘 먼저 사야 하는지.',
    cta: '내 학과 준비물 체크리스트 받기',
    keywords: ['헤어 실기 준비물', '메이크업 실기 시험 준비물', '미용입시 준비물', '실기 재료비'],
    priority: 0.75,
  },
  {
    path: '/practice/portfolio/', parent: '/practice/', section: '실기', grade: 'B', volume: 0, nav: '포트폴리오',
    title: '헤어 포트폴리오 만드는 법 | 구성·장수·촬영',
    h1: '헤어 포트폴리오, 뭘 몇 장 넣어야 하나',
    description: '헤어 포트폴리오 구성과 장수, 촬영 방법. 실기 우수자 전형과 면접에서 쓰이는 방식까지.',
    cta: '내 포트폴리오 1:1 피드백 신청',
    keywords: ['헤어 포트폴리오', '미용 포트폴리오', '입시 포트폴리오', '메이크업 포트폴리오'],
    priority: 0.75,
  },
  {
    path: '/practice/coloring/', parent: '/practice/', section: '실기', grade: 'B', volume: 0, nav: '헤어 컬러링',
    title: '헤어 컬러링 실기 | 색상표·도포 순서·시간',
    h1: '헤어 컬러링 실기, 색이 안 나오는 이유',
    description: '헤어 컬러링 실기의 색상표 읽는 법과 도포 순서, 시간 배분과 감점 포인트를 정리했습니다.',
    cta: '내 실기 1:1 피드백 신청',
    keywords: ['헤어 컬러링 실기', '헤어 컬러링', '염색 실기', '컬러링 색상표'],
    priority: 0.7,
  },

  // ── 자격증 (확장) ─────────────────────────────────────
  {
    path: '/license/skin/', parent: '/license/', section: '자격증', grade: 'B', volume: 0, nav: '미용사(피부)',
    title: '미용사(피부) 자격증 | 필기·실기·입시 가산점',
    h1: '미용사(피부) 자격증, 화장품·피부 계열 지망생에게',
    description: '미용사(피부) 자격증 필기·실기 과제와 응시료, 시험 일정. 화장품·피부 계열 입시 가산점까지.',
    cta: '자격증 + 입시 동시 준비 상담',
    keywords: ['미용사 피부', '미용사 피부 자격증', '피부미용사 실기', '피부미용과 자격증'],
    priority: 0.7,
  },
  {
    path: '/license/personal-color/', parent: '/license/', section: '자격증', grade: 'C', volume: 0, nav: '퍼스널컬러',
    title: '퍼스널컬러 자격증 | 민간자격 실체와 입시 활용',
    h1: '퍼스널컬러 자격증, 입시에 도움이 될까',
    description: '퍼스널컬러 자격증은 국가자격이 아닌 민간자격입니다. 입시에서 인정되는 범위를 정리했습니다.',
    cta: '내 학과에 유리한 자격증 상담',
    keywords: ['퍼스널컬러 자격증', '퍼스널컬러 민간자격', '컬러리스트 자격증', '퍼스널컬러 취득'],
    priority: 0.65,
  },

  // ── 가이드 ────────────────────────────────────────────
  {
    path: '/guide/', parent: '/', section: '가이드', grade: 'A', volume: 0, nav: '입시 가이드',
    title: '미용입시 준비 가이드 | 시기·전형·면접 총정리',
    h1: '미용입시, 순서대로 준비하는 법',
    description: '미용입시를 언제부터 어떤 순서로 준비할지 정리했습니다. 학년별 시기, 수시·정시, 면접까지.',
    cta: '내 상황에 맞는 준비 순서 상담',
    keywords: ['미용입시', '미용입시 준비', '미용입시 가이드', '미용대학 준비'],
    priority: 0.85,
  },
  {
    path: '/guide/timing/', parent: '/guide/', section: '가이드', grade: 'A', volume: 0, nav: '준비 시기',
    title: '미용입시 언제부터 준비할까 | 학년별 시작 시기',
    h1: '미용입시, 지금 시작해도 늦지 않을까',
    description: '고1·고2·고3·N수생별 미용입시 시작 시기. 실기에 필요한 기간과 늦었을 때 대안까지.',
    cta: '내 시점 기준 준비 일정 받기',
    keywords: ['미용입시 준비 시기', '미용입시 언제부터', '고3 미용입시', '실기 준비 기간'],
    priority: 0.8,
  },
  {
    path: '/guide/susi-jeongsi/', parent: '/guide/', section: '가이드', grade: 'A', volume: 0, nav: '수시·정시',
    title: '미용입시 수시 vs 정시 | 내 성적에 유리한 전형',
    h1: '수시로 갈까, 정시로 갈까',
    description: '미용입시 수시와 정시 중 무엇이 유리한지 내신·실기·수능 조건별로 비교했습니다.',
    cta: '내 조건에 유리한 전형 진단',
    keywords: ['미용입시 수시', '미용입시 정시', '미용대학 전형', '실기 반영 비율'],
    priority: 0.8,
  },
  {
    path: '/guide/interview/', parent: '/guide/', section: '가이드', grade: 'B', volume: 0, nav: '면접',
    title: '미용학과 면접 | 빈출 질문과 답변 준비법',
    h1: '미용학과 면접, 뭘 물어볼까',
    description: '미용학과·화장품학과 면접 빈출 질문과 답변 준비법. 지원 동기와 전공 지식 질문까지.',
    cta: '면접 준비 1:1 상담 신청',
    keywords: ['미용학과 면접', '화장품학과 면접', '뷰티학과 면접 질문', '미용입시 면접'],
    priority: 0.75,
  },

  // ── 진로 (확장) ───────────────────────────────────────
  {
    path: '/career/makeup-artist/', parent: '/career/', section: '진로', grade: 'C', volume: 0, nav: '메이크업아티스트',
    title: '메이크업 아티스트 되는 법 | 학과·자격증·연봉',
    h1: '메이크업 아티스트, 어떻게 되나요',
    description: '메이크업 아티스트가 되는 경로를 학과·자격증·취업·수입까지 단계별로 정리했습니다.',
    cta: '메이크업 트랙 학과·학원 상담',
    keywords: ['메이크업 아티스트 되는 법', '메이크업아티스트', '메이크업 아티스트 연봉', '메이크업아티스트 되려면'],
    priority: 0.7,
  },
  {
    path: '/career/hairdresser/', parent: '/career/', section: '진로', grade: 'C', volume: 0, nav: '헤어디자이너',
    title: '헤어디자이너 되는 법 | 자격증·연봉·성장 경로',
    h1: '헤어디자이너, 얼마나 벌고 어떻게 크나요',
    description: '헤어디자이너가 되는 경로와 수입 구조. 승급 단계, 자격증의 역할, 창업까지 안내합니다.',
    cta: '헤어 트랙 학과·학원 상담',
    keywords: ['헤어디자이너', '헤어디자이너 연봉', '헤어디자이너 되는 법', '미용사 연봉'],
    priority: 0.7,
  },
  {
    path: '/career/cosmetic/', parent: '/career/', section: '진로', grade: 'C', volume: 0, nav: '화장품 직무',
    title: '화장품 회사 취업 | 연구원·품질관리·MD 직무',
    h1: '화장품 회사, 어떤 직무로 들어가나',
    description: '화장품 연구개발·품질관리·인허가·MD 직무를 비교했습니다. 필요한 학과와 자격증까지.',
    cta: '화장품 트랙 학과 상담',
    keywords: ['화장품 연구원', '화장품 회사 취업', '화장품 품질관리', '화장품 MD'],
    priority: 0.7,
  },

  // ── 지역 ──────────────────────────────────────────────
  {
    path: '/region/', parent: '/', section: '지역', grade: 'A', volume: 160, nav: '지역별 학원',
    title: '지역별 미용입시학원 | 12개 지역',
    h1: '우리 동네 미용입시학원',
    description: '지역별 미용입시학원을 12개 지역으로 정리했습니다. 지역별 학원비와 실기 수업 특징 비교.',
    cta: '우리 지역 학원비 견적 받기',
    // 강남·수원·광주는 전용 페이지가 가져갔다. 허브는 지역 비교·선택 단계를 겨냥한다.
    keywords: ['지역별 미용입시학원', '우리동네 미용입시학원', '미용입시학원 지역 비교', '지방 미용입시학원'],
    memo: '볼륨은 작지만 로컬 전환 최상. 12지점 실제 보유 = 진정성',
    priority: 0.8,
  },
  {
    path: '/region/gangnam/', parent: '/region/', section: '지역', grade: 'A', volume: 0, nav: '강남',
    title: '강남 미용입시학원 | 학원비·통학·합격 실적 비교',
    h1: '강남 미용입시학원, 비싼 만큼 값을 할까',
    description: '강남미용입시학원의 학원비와 수업 방식, 통학 여건. 강남권이 유리한 경우를 구분했습니다.',
    cta: '강남권 학원비 견적 받기',
    keywords: ['강남미용입시학원', '강남 미용학원', '서울 미용입시학원', '강남 미용입시'],
    priority: 0.75,
  },
  {
    path: '/region/suwon/', parent: '/region/', section: '지역', grade: 'A', volume: 0, nav: '수원',
    title: '수원 미용입시학원 | 경기 남부 학원비·대학 비교',
    h1: '수원 미용입시학원, 어디까지 통학할까',
    description: '수원미용입시학원의 학원비와 경기 남부 통학 여건, 인근 지원 가능 대학을 정리했습니다.',
    cta: '수원·경기 남부 학원비 견적',
    keywords: ['수원미용입시학원', '수원 미용학원', '경기 미용입시학원', '용인 미용입시학원'],
    priority: 0.75,
  },
  {
    path: '/region/gwangju/', parent: '/region/', section: '지역', grade: 'A', volume: 0, nav: '광주',
    title: '광주 미용입시학원 | 호남권 학원비·대학 비교',
    h1: '광주 미용입시학원, 지역에서 준비해도 될까',
    description: '광주미용입시학원의 학원비와 호남권 입시 여건, 인근 대학과 수도권 지원 판단 기준.',
    cta: '광주·호남권 학원비 견적',
    keywords: ['광주미용입시학원', '광주 미용학원', '전남 미용입시학원', '호남 미용입시'],
    priority: 0.75,
  },
];

/**
 * 설계서 23페이지 밖의 신뢰(E-E-A-T) 페이지.
 * 메인 네비에는 넣지 않고 푸터·사이트맵에만 노출한다.
 */
export const SUPPORT_PAGES = [
  {
    path: '/about/',
    nav: '사이트 소개',
    title: '사이트 소개 | 미용입시 정보를 어떻게 정리하나요',
    description: '미용입시학원 학원비 비교 사이트의 운영 주체, 정보 수집·검증 기준, 무료 상담 운영 방식과 수익 구조를 투명하게 공개합니다.',
    priority: 0.5,
  },
  {
    path: '/contact/',
    nav: '문의하기',
    title: '문의하기 | 정보 정정·개인정보 삭제·제휴 문의',
    description: '미용입시 정보 정정 요청, 개인정보 열람·삭제 요청, 학원 제휴 문의를 받는 창구입니다. 이메일과 처리 기한을 안내합니다.',
    priority: 0.4,
  },
] as const;

export function getPage(path: string): PageDef {
  const p = PAGES.find((x) => x.path === path);
  if (!p) throw new Error(`[site] 레지스트리에 없는 경로: ${path}`);
  return p;
}

export function childrenOf(path: string): PageDef[] {
  return PAGES.filter((p) => p.parent === path);
}

/** 브레드크럼 체인 (홈 → … → 현재) */
export function breadcrumbChain(path: string): PageDef[] {
  const chain: PageDef[] = [];
  let cur: PageDef | undefined = getPage(path);
  while (cur) {
    chain.unshift(cur);
    cur = cur.parent ? getPage(cur.parent) : undefined;
  }
  return chain;
}

export function absUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export type NavNode = { label: string; path: string; children?: { label: string; path: string }[] };

/** 헤더/푸터 공용 네비 트리 */
const sub = (parent: string) => childrenOf(parent).map((p) => ({ label: p.nav, path: p.path }));

export const NAV_TREE: NavNode[] = [
  { label: '대학 진단', path: '/diagnosis/' },
  { label: '학원비', path: '/cost/' },
  { label: '실기', path: '/practice/', children: sub('/practice/') },
  { label: '학과', path: '/major/', children: sub('/major/') },
  { label: '대학', path: '/univ/', children: sub('/univ/') },
  { label: '자격증', path: '/license/', children: sub('/license/') },
  { label: '가이드', path: '/guide/', children: sub('/guide/') },
  { label: '진로', path: '/career/', children: sub('/career/') },
  { label: '지역', path: '/region/', children: sub('/region/') },
];
