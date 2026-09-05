type Props = {
  type?: 'tip' | 'warn' | 'info';
  title?: string;
  children: React.ReactNode;
};

/** 강조 박스: tip(로즈) / warn(앰버) / info(블루) */
export default function Callout({ type = 'tip', title, children }: Props) {
  const cls = type === 'warn' ? 'callout callout--warn' : type === 'info' ? 'callout callout--info' : 'callout';
  return (
    <div className={cls} style={{ marginBottom: 20 }}>
      {title && <strong style={{ display: 'block', marginBottom: 4 }}>{title}</strong>}
      {children}
    </div>
  );
}
