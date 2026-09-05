// 폼 옵션·지역·대학 데이터 (수정은 이 파일만)

export const REGIONS = [
  '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종',
  '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
] as const;

/** 희망 학과 (3개 트랙 + 미정) */
export const MAJORS = [
  { id: 'hair', label: '헤어디자인학과', short: '헤어', path: '/major/hair/' },
  { id: 'makeup', label: '메이크업학과', short: '메이크업', path: '/major/makeup/' },
  { id: 'cosmetic', label: '화장품학과(실기 없음)', short: '화장품', path: '/major/cosmetic/' },
  { id: 'undecided', label: '아직 못 정했어요', short: '미정', path: '/major/' },
] as const;
export type MajorId = (typeof MAJORS)[number]['id'];

/** 전형 유형 */
export const ADMISSION_TYPES = [
  { id: 'susi_practical', label: '수시 실기전형', desc: '내신 + 실기(와인딩·아트마스크 등)' },
  { id: 'susi_record', label: '수시 학생부전형', desc: '실기 없이 내신·면접' },
  { id: 'jeongsi', label: '정시(수능)', desc: '수능 + 실기 또는 수능 100%' },
  { id: 'retake', label: 'N수·편입·검정고시', desc: '재도전·전과·성인 학습자' },
  { id: 'unknown', label: '아직 모르겠어요', desc: '멘토가 함께 정해드립니다' },
] as const;
export type AdmissionTypeId = (typeof ADMISSION_TYPES)[number]['id'];

/** 학년/상태 */
export const GRADES = ['고1', '고2', '고3', 'N수생', '검정고시', '성인·직장인'] as const;

/** 내신 등급대 (진단용) */
export const GRADE_BANDS = ['1~2등급', '3등급', '4등급', '5등급', '6등급', '7등급 이하', '모르겠어요'] as const;

/**
 * 지역별 학원 페이지용 12개 지역 — TODO: 올댓뷰티 실제 12개 지점명으로 교체 확인 필요
 * (설계서: "12지점 실제 보유", 천안지점 특강 이력 언급)
 */
export const BRANCH_REGIONS = [
  { id: 'gangnam', name: '강남', area: '서울 강남·서초·송파', keyword: '강남미용입시학원' },
  { id: 'suwon', name: '수원', area: '경기 남부(수원·용인·화성)', keyword: '수원미용입시학원' },
  { id: 'incheon', name: '인천', area: '인천·김포', keyword: '인천미용입시학원' },
  { id: 'bucheon', name: '부천', area: '부천·광명·시흥', keyword: '부천미용입시학원' },
  { id: 'cheonan', name: '천안', area: '천안·아산·평택', keyword: '천안미용입시학원' },
  { id: 'daejeon', name: '대전', area: '대전·세종', keyword: '대전미용입시학원' },
  { id: 'cheongju', name: '청주', area: '청주·충북', keyword: '청주미용입시학원' },
  { id: 'gwangju', name: '광주', area: '광주·전남', keyword: '광주미용입시학원' },
  { id: 'daegu', name: '대구', area: '대구·경북', keyword: '대구미용입시학원' },
  { id: 'busan', name: '부산', area: '부산·김해·양산', keyword: '부산미용입시학원' },
  { id: 'ulsan', name: '울산', area: '울산·경남 동부', keyword: '울산미용입시학원' },
  { id: 'jeonju', name: '전주', area: '전주·익산·전북', keyword: '전주미용입시학원' },
] as const;

/**
 * 대학 비교표 기초 데이터.
 * 수치(경쟁률·등급컷)는 연도별로 바뀌므로 "범위/참고" 표기 원칙. 반드시 각 대학 모집요강 재확인 문구 동반.
 */
export type University = {
  id: string;
  name: string;         // 대학명
  dept: string;         // 학과명
  region: string;       // 소재지
  track: ('hair' | 'makeup' | 'cosmetic' | 'skin' | 'nail')[];
  degree: '4년제' | '전문대(2~3년제)';
  practical: boolean;   // 실기 전형 유무
  path?: string;        // 상세 페이지
  note?: string;
};

export const UNIVERSITIES: University[] = [
  { id: 'sungshin', name: '성신여자대학교', dept: '뷰티산업학과', region: '서울', track: ['makeup', 'cosmetic', 'hair'], degree: '4년제', practical: true, path: '/univ/sungshin/', note: '검색량 1위 단일 대학. 학생부·실기 병행 확인' },
  { id: 'seowon', name: '서원대학교', dept: '뷰티학과', region: '충북 청주', track: ['hair', 'makeup', 'cosmetic'], degree: '4년제', practical: true, path: '/univ/seowon/', note: '충청권 대표 뷰티학과' },
  { id: 'bucheon', name: '부천대학교', dept: '뷰티케어과', region: '경기 부천', track: ['hair', 'makeup', 'skin'], degree: '전문대(2~3년제)', practical: false, path: '/univ/etc/' },
  { id: 'hansung', name: '한성대학교', dept: '뷰티디자인학과', region: '서울', track: ['makeup', 'cosmetic'], degree: '4년제', practical: false, path: '/univ/etc/', note: '미래플러스대학(야간) · 재직자·성인학습자 대상 RPL 학위과정. 고3 대상 정시 실기 여부는 별도 확인' },
  { id: 'kwu', name: '광주여자대학교', dept: '미용과학과', region: '광주', track: ['hair', 'makeup', 'skin', 'nail'], degree: '4년제', practical: true, path: '/univ/etc/' },
  { id: 'skuniv', name: '서경대학교', dept: '메이크업디자인학과', region: '서울', track: ['makeup'], degree: '4년제', practical: true, path: '/univ/etc/' },
  { id: 'wonkwang', name: '원광대학교', dept: '뷰티디자인학과', region: '전북 익산', track: ['hair', 'makeup', 'skin'], degree: '4년제', practical: true, path: '/univ/etc/' },
  { id: 'swwu', name: '수원여자대학교', dept: '미용예술과', region: '경기 수원', track: ['hair', 'makeup', 'skin', 'nail'], degree: '전문대(2~3년제)', practical: true, path: '/univ/etc/' },
  { id: 'kku', name: '건국대학교 글로컬캠퍼스', dept: '뷰티화장품학과', region: '충북 충주', track: ['cosmetic'], degree: '4년제', practical: false, path: '/univ/etc/' },
];
