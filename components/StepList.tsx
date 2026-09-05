export type Step = { title: string; desc: string; period?: string };

/** 번호 타임라인 (준비 로드맵·시험 절차 등) */
export default function StepList({ steps }: { steps: Step[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <div key={i} style={{ display: 'flex', gap: 18, paddingBottom: last ? 0 : 26 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 900, flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              {!last && <div style={{ width: 2, flex: 1, background: 'var(--border-color)', marginTop: 8 }} />}
            </div>
            <div style={{ paddingTop: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{s.title}</h3>
                {s.period && <span className="chip chip--outline" style={{ fontSize: 11 }}>{s.period}</span>}
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
