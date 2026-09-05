import JsonLd from './JsonLd';

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  id?: string;
};

/** 가시 FAQ 카드 + FAQPage JSON-LD (리치 스니펫) */
export default function FaqSection({ items, title = '자주 묻는 질문', eyebrow = 'FAQ', id }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="section" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <JsonLd data={jsonLd} />
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2" id={id ? `${id}-title` : undefined} style={{ marginBottom: 24 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((f, i) => (
          <div key={i} className="card" style={{ padding: '24px 26px' }}>
            <p style={{ fontWeight: 900, fontSize: 16, marginBottom: 10, color: 'var(--text-primary)', lineHeight: 1.4 }}>
              <span style={{ color: 'var(--primary)', marginRight: 6 }}>Q.</span>{f.q}
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
