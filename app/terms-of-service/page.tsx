import type { Metadata } from 'next';
import TermsContent from '@/components/legal/TermsContent';

export const metadata: Metadata = {
  title: '이용약관',
  robots: { index: false, follow: true },
  alternates: { canonical: '/terms-of-service/' },
};

export default function TermsOfService() {
  return (
    <main className="container-narrow" style={{ paddingTop: 48, paddingBottom: 100, maxWidth: 780 }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>이용약관</h1>
      <TermsContent />
    </main>
  );
}
