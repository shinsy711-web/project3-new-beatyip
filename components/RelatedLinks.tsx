import Link from 'next/link';
import { getPage } from '@/lib/site';

type Props = {
  paths: string[];
  title?: string;
  labels?: Record<string, string>; // 경로별 커스텀 라벨(선택)
};

/** 내부링크 허브 칩 — 모든 페이지 하단에 배치해 링크 순환 */
export default function RelatedLinks({ paths, title = '함께 보면 좋은 정보', labels = {} }: Props) {
  return (
    <section className="card" style={{ marginBottom: 40, padding: '26px 30px' }}>
      <p className="eyebrow" style={{ marginBottom: 14 }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {paths.map((path) => {
          const p = getPage(path);
          return (
            <Link
              key={path}
              href={path}
              title={p.title}
              className="chip"
              style={{ fontSize: 13, padding: '8px 16px' }}
            >
              {labels[path] ?? p.nav} →
            </Link>
          );
        })}
      </div>
    </section>
  );
}
