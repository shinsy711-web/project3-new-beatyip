import type { Metadata } from 'next';
import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  robots: { index: false, follow: true },
  alternates: { canonical: '/privacy-policy/' },
};

export default function PrivacyPolicy() {
  return (
    <main className="container-narrow" style={{ paddingTop: 48, paddingBottom: 100, maxWidth: 780 }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>개인정보처리방침</h1>
      <PrivacyPolicyContent />
    </main>
  );
}
