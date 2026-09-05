# project29_beauty_ipsi — 미용입시학원 학원비 비교

설계서: 미용입시 학원비 비교 사이트 — 페이지 설계서 (구글시트, 2026-09-03). 단일 도메인 · 목적: 입시 DB 수집.
설계서 23페이지 + 확장 15페이지 = **콘텐츠 38페이지**, 여기에 소개·문의 2페이지와 정책 2페이지(noindex)를 더해 총 42개 라우트.
확장분: 실기 3(준비물·포트폴리오·컬러링), 가이드 4(허브·준비시기·수시정시·면접), 진로 3(메이크업아티스트·헤어디자이너·화장품직무), 자격증 2(미용사 피부·퍼스널컬러), 지역 3(강남·수원·광주).
구조·SEO는 `project23_makeup`(makeupcost.com)을 계승. 메인 = 미용입시학원, 서브 3트랙 = 헤어입시 / 메이크업입시 / 화장품(학과)입시.

## 실행
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## 점검 스크립트
빌드 후 `npx next start -p 3129` 로 띄운 뒤 실행한다.
```bash
node scripts/verify-routes.mjs http://localhost:3129   # 전 라우트 200·title 일치·canonical·noindex·sitemap 개수
node scripts/audit-seo.mjs   http://localhost:3129     # 제목·설명 길이, 메타 누락, H1/제목 계층, JSON-LD, alt, 내부링크, 키워드 중복, 본문 분량
```

## 배포 전 반드시 채울 것 (TODO)
| 항목 | 위치 | 상태 |
|---|---|---|
| 배포 도메인 | `.env.local` → `NEXT_PUBLIC_SITE_URL` | 임시값 `https://beautyipsi.kr` (설계서에 도메인 없음) |
| DB API 키 | `.env.local` → `NEXT_PUBLIC_DB_API_KEY` | `REPLACE_WITH_PROJECT29_KEY` — 이 사이트 전용 키 발급 필요 |
| GA4 측정 ID | `.env.local` → `NEXT_PUBLIC_GA_ID` | 비어 있으면 GA 스크립트 미삽입 |
| 네이버 서치어드바이저 | `.env.local` → `NEXT_PUBLIC_NAVER_VERIFICATION` | 비어 있으면 메타 미삽입 |
| OG 썸네일 / 히어로 배경 | `public/thumb.png`, `public/bg.png` | project28(beautyip.kr) 자산을 임시 복사. 교체 권장 |
| 파비콘 | `public/favicon.ico`, `app/icon.png` | 임시 |
| 12개 지역(지점) 목록 | `data/constants.ts` → `BRANCH_REGIONS` | 올댓뷰티 실제 지점명 확인 후 교체 |
| 대학 데이터 | `data/constants.ts` → `UNIVERSITIES` | 연도별 모집요강으로 실기 여부 재확인 |
| ads.txt | `public/ads.txt` | 공용 pub ID 입력됨 |
| 성신여대 경쟁률 수치 | `app/univ/sungshin/page.tsx` | 출처가 입시 블로그. 대학어디가(adiga.kr)·입학처 공식 통계로 교체 권장 (현재는 "참고 자료"로 명시 + 경고 박스) |
| 대학별 가산점 반영표 | `app/license/page.tsx` | 대학 실명 반영표는 모집요강 확인 후 확정 |
| **제3자 제공처 실명** | `components/legal/PrivacyPolicyContent.tsx` 제4조 | 현재 "올댓뷰티 멘토 / 제휴 미용입시학원 / 그 밖의 제휴 교육기관" 유형으로만 기재. 실제 제공처가 확정되면 유형별 목록을 구체화할 것 |
| **개인정보 위탁 수탁사 상호** | 같은 파일 제5조 | 문자·알림톡 발송 대행사, 클라우드 사업자 상호를 실제 계약사로 교체 |
| **만 14세 미만 정책** | `lib/validate.ts` `UNDER14_POLICY` | 현재 `'block'`(접수 차단). 보호자 확인 문자 발송·검증을 백엔드에 붙인 뒤에만 `'guardian-verify'`로 변경할 것 |
| **광고성 정보 발송 템플릿** | 백엔드/발송 시스템 | `consent_marketing: true`인 건에만 발송. "(광고)" 표기·전송자명·무료 수신거부 방법 포함, 21시~08시 발송 금지 |

## 구조
- `lib/site.ts` — **단일 소스**: 브랜드·운영주체·23페이지 레지스트리(title/h1/description/cta/keywords/priority). nav·sitemap·breadcrumb·RelatedLinks·metadata가 전부 여기서 나옴.
- `lib/metadata.ts` — `pageMetadata(path)` (설계서 title을 absolute로 사용).
- `data/constants.ts` — 폼 옵션(지역·학과·전형), 12지역, 대학 데이터.
- `components/FormSection.tsx` — DB 상담 폼. 신청 → `PrivacyModal`(동의) → POST → 완료. project23 구조 그대로 + 만 14세 미만 보호자 동의.
- `components/DiagnosisForm.tsx` — 4단계 진단 폼(전형유형→희망학과→지역·내신→연락처), 같은 모달 흐름.
- `components/Footer.tsx` — 23페이지 링크 + 법률 모달 3종(`PrivacyPolicyModal`, `TermsModal`, `LegalNoticeModal`).
- `components/legal/*Content.tsx` — 모달과 `/privacy-policy/`, `/terms-of-service/` 페이지가 본문 공유.
- 공용 블록: `PageShell`(브레드크럼+JSON-LD), `PageHero`, `DataTable`, `FaqSection`(FAQPage JSON-LD), `RelatedLinks`, `CtaBanner`, `StepList`, `StatGrid`, `Callout`, `ArticleJsonLd`.
- `docs/CONTENT_GUIDE.md` — 페이지 제작 규칙(서브에이전트 공용).

## SEO 체크리스트 (적용됨)
- 트레일링 슬래시 URL(설계서와 동일), canonical, OG/Twitter, robots max-snippet.
- JSON-LD: WebSite/Organization/Service/WebPage/SiteNavigationElement(레이아웃) + BreadcrumbList(전 페이지) + Article(콘텐츠 페이지) + FAQPage(FAQ 있는 페이지).
- sitemap.xml에 23페이지 전부, priority는 설계서 DB등급 반영. 정책 페이지는 noindex + robots disallow.
- 내부링크: 헤더 드롭다운·푸터 전체 링크·RelatedLinks·본문 앵커링크로 허브↔스포크 순환.
- 콘텐츠 페이지에 noindex 없음.
