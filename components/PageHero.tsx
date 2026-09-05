import { getPage } from '@/lib/site';

type Props = {
  path: string;            // 레지스트리 경로 → h1 자동
  eyebrow?: string;        // 상단 작은 라벨 (기본: 섹션명 + 연도)
  lead: string;            // h1 아래 설명 (1~2문장)
  chips?: string[];        // 핵심 포인트 칩
  h1?: string;             // 필요 시 h1 오버라이드
  children?: React.ReactNode; // 히어로 안에 폼 등 삽입
};

/** 서브페이지 다크 히어로 (project23 funding/employment 계승) */
export default function PageHero({ path, eyebrow, lead, chips, h1, children }: Props) {
  const p = getPage(path);
  return (
    <header
      style={{
        background: 'var(--accent)', borderRadius: 32, padding: 'clamp(36px, 5vw, 60px) clamp(24px, 4vw, 44px)',
        marginBottom: 48, color: 'white', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 12, letterSpacing: '0.08em', marginBottom: 18 }}>
          {eyebrow ?? `${p.section} · 2027학년도 미용입시`}
        </p>
        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 950, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 18 }}>
          {h1 ?? p.h1}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 16, lineHeight: 1.75, maxWidth: 620, marginBottom: chips?.length ? 30 : 0 }}>
          {lead}
        </p>
        {chips && chips.length > 0 && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {chips.map((t) => (
              <span key={t} className="chip chip--dark" style={{ fontSize: 13, padding: '10px 16px', borderRadius: 12 }}>{t}</span>
            ))}
          </div>
        )}
        {children && <div style={{ marginTop: 32 }}>{children}</div>}
      </div>
      <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, background: 'var(--primary)', opacity: 0.08, borderRadius: '50%' }} />
    </header>
  );
}
