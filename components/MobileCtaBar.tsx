"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** 모바일 하단 고정 CTA — 진단 페이지 자체에서는 숨김 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/diagnosis')) return null;
  return (
    <div className="mobile-cta-bar" role="complementary" aria-label="빠른 상담">
      <Link href="/cost/#form" className="btn btn--ghost" style={{ flex: 1, padding: '13px 10px', fontSize: 14, borderRadius: 12 }}>학원비 견적</Link>
      <Link href="/diagnosis/" className="btn btn--dark" style={{ flex: 1.4, padding: '13px 10px', fontSize: 14, borderRadius: 12 }}>5초 대학 진단 →</Link>
    </div>
  );
}
