import Link from 'next/link';
import { PAGES, SUPPORT_PAGES, OPERATOR, SITE_NAME, type Section } from '@/lib/site';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsModal from './TermsModal';
import LegalNoticeModal from './LegalNoticeModal';

const COLUMNS: { title: string; sections: Section[] }[] = [
  { title: '시작하기 · 가이드', sections: ['전환', '가이드'] },
  { title: '실기', sections: ['실기'] },
  { title: '학과 · 대학', sections: ['학과', '대학'] },
  { title: '자격증 · 진로 · 지역', sections: ['자격증', '진로', '지역'] },
];

/** 푸터: 23페이지 전체 링크(크롤 분배) + 법률 모달 3종 + 운영주체 */
export default function Footer() {
  return (
    <footer style={{ background: 'var(--accent)', color: 'white', padding: '64px 1.5rem 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 44 }}>
          <div style={{ gridColumn: 'span 1' }}>
            <p style={{ fontWeight: 900, fontSize: 16, color: 'var(--primary)', marginBottom: 10 }}>{SITE_NAME}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 14 }}>
              헤어·메이크업·화장품학과 입시를 준비하는 학생·학부모를 위해 학원비, 실기, 대학 전형, 자격증 가산점 정보를 한곳에 모았습니다.
            </p>
            <address style={{ fontStyle: 'normal', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.9 }}>
              운영: {OPERATOR.company}<br />
              상담 파트너: {OPERATOR.partner} ({OPERATOR.partnerDesc})<br />
              문의: <a href={`mailto:${OPERATOR.email}`} style={{ textDecoration: 'underline' }}>{OPERATOR.email}</a><br />
              상담 시간: {OPERATOR.hours}
            </address>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={`푸터 ${col.title}`}>
              <p style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em', marginBottom: 12 }}>{col.title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PAGES.filter((p) => col.sections.includes(p.section) && p.path !== '/').map((p) => (
                  <li key={p.path}>
                    <Link href={p.path} title={p.title} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                      {p.parent && p.parent !== '/' ? `· ${p.nav}` : p.nav}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: 20 }}>
            {SUPPORT_PAGES.map((p) => (
              <Link key={p.path} href={p.path} title={p.title} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                {p.nav}
              </Link>
            ))}
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}><PrivacyPolicyModal /></span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}><TermsModal /></span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}><LegalNoticeModal /></span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', lineHeight: 1.8, maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            본 사이트는 정보 제공을 목적으로 운영되며, 학원비·경쟁률·등급컷 등은 학원 운영 방침과 대학 모집요강에 따라 실제와 다를 수 있습니다.<br />
            정확한 비용은 상담을 통해, 입시 정보는 각 대학 공식 모집요강을 통해 반드시 확인하시기 바랍니다.<br />
            © 2026 {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
