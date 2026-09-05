import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-narrow" style={{ paddingTop: 100, paddingBottom: 140, textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 14 }}>페이지를 찾을 수 없습니다</h1>
      <p className="lead" style={{ marginBottom: 28 }}>주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 원하는 정보를 찾아보세요.</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn--dark">홈으로</Link>
        <Link href="/diagnosis/" className="btn btn--primary">지원 가능 대학 진단</Link>
        <Link href="/cost/" className="btn btn--ghost">학원비 총정리</Link>
      </div>
    </main>
  );
}
