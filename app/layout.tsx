import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCtaBar from '@/components/MobileCtaBar';
import { SITE_NAME, SITE_SHORT, SITE_URL, OG, OG_IMAGE, ADSENSE_PUB, GA_ID, NAVER_VERIFICATION, OPERATOR, PROFILES, getPage, PAGES } from '@/lib/site';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

const HOME = getPage('/');
const TITLE = HOME.title;
const DESC = HOME.description;

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${SITE_SHORT}`,
  },
  description: DESC,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  keywords: Array.from(new Set(PAGES.flatMap((p) => p.keywords))).slice(0, 40),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: OG.width, height: OG.height, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_NAME,
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  authors: [{ name: SITE_NAME }],
  publisher: SITE_NAME,
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  formatDetection: { telephone: false, date: false, address: false, email: false },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  ...(NAVER_VERIFICATION ? { verification: { other: { 'naver-site-verification': NAVER_VERIFICATION } } } : {}),
  other: {
    ...(ADSENSE_PUB ? { 'google-adsense-account': ADSENSE_PUB } : {}),
    'NaverBot': 'all',
    'Yeti': 'all',
    'googlebot': 'all',
    'subject': SITE_NAME,
    'title': TITLE,
    'publisher': SITE_NAME,
    'author': SITE_NAME,
    'Other Agent': SITE_NAME,
    'location': 'South Korea',
    'distribution': 'global',
    'rating': 'general',
    'format-detection': 'telephone=no, date=no, address=no, email=no',
    'itemprop:name': TITLE,
    'itemprop:description': DESC,
    'itemprop:image': OG_IMAGE,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: 'ko-KR',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: OPERATOR.company,
        alternateName: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon.png`,
        description: '미용입시학원 학원비·실기·대학 전형·자격증 가산점 정보를 비교 제공하는 미용입시 전문 정보 사이트입니다.',
        ...(PROFILES.length ? { sameAs: PROFILES } : {}),
        knowsAbout: [
          '미용입시', '미용입시학원 학원비', '헤어디자인학과 입시', '메이크업학과 입시',
          '화장품학과 입시', '미용대학 전형', '미용입시 실기', '미용사 자격증 가산점',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: OPERATOR.email,
          contactType: 'customer support',
          areaServed: 'KR',
          availableLanguage: 'Korean',
        },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service`,
        name: '미용입시학원 학원비 비교 및 지원 가능 대학 진단',
        serviceType: '미용입시 상담 서비스',
        areaServed: { '@type': 'Country', name: 'KR' },
        provider: { '@id': `${SITE_URL}/#organization` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW', description: '무료 학원비 견적·대학 진단 상담' },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: TITLE,
        inLanguage: 'ko-KR',
        description: DESC,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: ['미용입시학원', '미용입시 학원비', '미용학과', '미용대학', '헤어 입시 실기', '메이크업 입시 실기', '화장품학과', '미용입시 가산점 자격증'],
        mainEntity: { '@id': `${SITE_URL}/#service` },
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${SITE_URL}/#nav`,
        name: PAGES.filter((p) => p.parent === '/').map((p) => p.nav),
        url: PAGES.filter((p) => p.parent === '/').map((p) => `${SITE_URL}${p.path}`),
      },
    ],
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          id="json-ld-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Schema.org microdata */}
        <meta itemProp="name" content={TITLE} />
        <meta itemProp="description" content={DESC} />
        <meta itemProp="image" content={OG_IMAGE} />

        {/* 언어 / 지역 */}
        <meta httpEquiv="content-language" content="ko-KR" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.country" content="KR" />
        <meta name="geo.placename" content="South Korea" />

        {/* 사이트 분류 */}
        <meta name="classification" content="교육, 입시, 미용, 뷰티" />
        <meta name="category" content="미용입시학원 교육" />
        <meta name="copyright" content={SITE_NAME} />
        <meta name="revisit-after" content="7 days" />

        {/* OG 이미지 상세 (카카오·네이버 미리보기) */}
        <meta property="og:image:width" content={String(OG.width)} />
        <meta property="og:image:height" content={String(OG.height)} />
        <meta property="og:image:type" content={OG.type} />

        {GA_ID && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {/*
          게시자 ID가 없으면 로더를 아예 넣지 않는다.
          빈 client= 로 로드하면 'google_ad_client is missing from the tag config' 런타임 오류가 난다.

          주 이용자가 고등학생(만 18세 미만)이라 개인 맞춤 광고를 요청하지 않는다.
          Google 광고 정책상 만 18세 미만에게는 개인 맞춤 광고를 게재할 수 없어,
          로더보다 먼저 비맞춤(non-personalized) 플래그를 세운다.
        */}
        {ADSENSE_PUB && (
          <>
            <Script id="adsense-npa" strategy="beforeInteractive">
              {`(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;`}
            </Script>
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        )}
      </head>
      <body className={geist.variable}>
        <Header />
        {children}
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
