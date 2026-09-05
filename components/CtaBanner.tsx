import Link from 'next/link';

type Props = {
  title: string;
  desc: string;
  href?: string;
  label?: string;
  variant?: 'soft' | 'gradient';
};

/** 페이지 하단 CTA — 기본 목적지는 /diagnosis/ (설계서: 모든 CTA는 진단으로 모인다) */
export default function CtaBanner({ title, desc, href = '/diagnosis/', label = '지원 가능 대학 5초 진단 →', variant = 'gradient' }: Props) {
  const bg = variant === 'gradient'
    ? 'linear-gradient(135deg, #FCE9EF 0%, #F6F5FA 100%)'
    : 'var(--primary-light)';
  return (
    <section style={{ background: bg, borderRadius: 28, padding: 'clamp(32px, 4vw, 48px) clamp(22px, 4vw, 40px)', textAlign: 'center', marginBottom: 40 }}>
      <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 900, marginBottom: 12, letterSpacing: '-0.02em' }}>{title}</h2>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 26, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 26px' }}>{desc}</p>
      <Link href={href} className="btn btn--dark">{label}</Link>
    </section>
  );
}
