/**
 * DB 전송 단일 창구. FormSection·DiagnosisForm이 공유한다.
 * 엔드포인트/키/에러 문구를 한 곳에서 관리해 폼마다 달라지는 일을 막는다.
 */

const PLACEHOLDER_KEY = 'REPLACE_WITH_PROJECT29_KEY';

export type SubmitResult = { ok: true } | { ok: false; message: string };

export async function submitLead(payload: Record<string, unknown>): Promise<SubmitResult> {
  const url = process.env.NEXT_PUBLIC_DB_SUBMIT_URL;
  const key = process.env.NEXT_PUBLIC_DB_API_KEY;

  // 배포 전 설정 누락을 조용히 넘기지 않는다 — 폼이 성공한 것처럼 보이면 DB가 통째로 새어나간다.
  if (!url || !key || key === PLACEHOLDER_KEY) {
    console.error('[submitLead] NEXT_PUBLIC_DB_SUBMIT_URL / NEXT_PUBLIC_DB_API_KEY 미설정 (.env.local 확인)');
    return { ok: false, message: '상담 접수 설정이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.' };
  }

  try {
    const res = await fetch(`${url}?api_key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, submitted_at: new Date().toISOString() }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({} as { error?: string }));
      return { ok: false, message: `전송 실패: ${err.error ?? res.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' };
  }
}
