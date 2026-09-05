import Breadcrumbs from './Breadcrumbs';

type Props = {
  path: string;
  width?: 'narrow' | 'wide';
  children: React.ReactNode;
};

/** 서브페이지 공용 래퍼: 브레드크럼 + 본문 폭 */
export default function PageShell({ path, width = 'narrow', children }: Props) {
  return (
    <main
      className={width === 'wide' ? 'container' : 'container-narrow'}
      style={{ paddingTop: 36, paddingBottom: 110 }}
    >
      <Breadcrumbs path={path} />
      {children}
    </main>
  );
}
