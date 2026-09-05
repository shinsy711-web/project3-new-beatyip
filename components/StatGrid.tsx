export type Stat = { label: string; value: string; sub?: string };

/** 숫자 강조 카드 그리드 (검색량·비용·기간 등) */
export default function StatGrid({ items }: { items: Stat[] }) {
  return (
    <div className="grid-auto grid-auto--sm">
      {items.map((s, i) => (
        <div key={i} className="card" style={{ padding: '22px' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>{s.label}</p>
          <p style={{ fontSize: 22, fontWeight: 950, letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1.2 }}>{s.value}</p>
          {s.sub && <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}
