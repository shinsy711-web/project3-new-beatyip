"use client"

import { useState } from "react"
import Link from "next/link"
import PrivacyModal, { type Consents } from "./PrivacyModal"
import { validateForm, parsePhone, isUnder14, isTeen, UNDER14_POLICY, SPECIAL_CHAR_REG } from "@/lib/validate"
import { submitLead } from "@/lib/submit"
import { REGIONS, MAJORS, ADMISSION_TYPES, GRADE_BANDS } from "@/data/constants"

type Props = { sourcePage?: string }

const STEPS = ['전형유형', '희망학과', '지역·내신', '연락처'] as const

/**
 * 5초 진단 폼 (설계서: 전형유형 → 희망학과 → 지역 → 연락처).
 * 마지막 단계 제출 → PrivacyModal → POST → 완료 화면.
 */
export default function DiagnosisForm({ sourcePage = "diagnosis" }: Props) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    admission_type: "",
    major: "",
    region: "",
    grade_band: "",
    customer_name: "",
    customer_birth: "",
    mobile1: "010",
    mobile2: "",
    customer_sex: "2",
    guardian_name: "",
    guardian_phone: "",
  })
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const minor = isUnder14(form.customer_birth)
  const teen = isTeen(form.customer_birth)
  // 만 14세 미만은 법정대리인 동의 "확인" 절차가 갖춰지기 전까지 접수하지 않는다.
  const blocked = minor && UNDER14_POLICY === 'block'

  const next = () => {
    if (step === 0 && !form.admission_type) { alert("전형 유형을 선택해 주세요."); return }
    if (step === 1 && !form.major) { alert("희망 학과를 선택해 주세요."); return }
    if (step === 2 && !form.region) { alert("거주 지역을 선택해 주세요."); return }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmitClick = () => {
    if (blocked) {
      alert("만 14세 미만은 본인 명의로 진단을 신청할 수 없습니다. 부모님(보호자) 명의로 다시 신청해 주세요.")
      return
    }
    const error = validateForm({ ...form, privacy: true })
    if (error) { alert(error); return }
    if (minor && !form.guardian_name) { alert("만 14세 미만은 보호자 성함을 입력해 주세요."); return }
    if (minor && !/^\d{10,11}$/.test(form.guardian_phone)) { alert("만 14세 미만은 보호자 연락처(숫자만)를 입력해 주세요."); return }
    setShowModal(true)
  }

  const handleConfirm = async (consents: Consents) => {
    const phone = parsePhone(form.mobile1, form.mobile2)
    if (typeof phone === "string") { alert(phone); return }
    const majorLabel = MAJORS.find((m) => m.id === form.major)?.label ?? form.major
    const admissionLabel = ADMISSION_TYPES.find((a) => a.id === form.admission_type)?.label ?? form.admission_type
    const payload = {
      customer_name: form.customer_name,
      customer_birth: form.customer_birth,
      mobile1: phone.mobile1,
      mobile2: phone.mobile2,
      mobile3: "",
      customer_sex: form.customer_sex,
      region: form.region,
      has_license: "N",
      major: majorLabel,
      admission_type: admissionLabel,
      grade_band: form.grade_band,
      interest_field: majorLabel,
      source_page: sourcePage,
      category: "미용입시",
      consent_privacy: true,
      consent_third_party: true,
      consent_marketing: consents.marketing,
      // 만 14세 미만은 보호자 확인 문자로 동의를 확인한 뒤에만 상담을 진행해야 한다(개인정보보호법 제22조의2).
      ...(minor
        ? {
            guardian_name: form.guardian_name,
            guardian_phone: form.guardian_phone,
            consent_guardian: true,
            guardian_verification_required: true,
            is_under_14: true,
          }
        : {}),
      ...(teen ? { is_minor: true } : {}),
    }
    setSubmitting(true)
    const result = await submitLead(payload)
    if (result.ok) setDone(true)
    else alert(result.message)
    setSubmitting(false)
  }

  const majorPath = MAJORS.find((m) => m.id === form.major)?.path ?? '/major/'

  /* ── 스타일 ── */
  const card: React.CSSProperties = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 32, padding: 'clamp(22px, 4vw, 40px)', boxShadow: 'var(--shadow-md)' }
  const optionBtn = (active: boolean): React.CSSProperties => ({
    textAlign: 'left', padding: '16px 18px', borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s',
    border: active ? '2px solid var(--primary)' : '1.5px solid var(--border-color)',
    background: active ? 'var(--primary-light)' : 'white',
  })
  const chipBtn = (active: boolean): React.CSSProperties => ({
    padding: '10px 14px', borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
    border: active ? '2px solid var(--primary)' : '1.5px solid var(--border-color)',
    background: active ? 'var(--primary)' : 'white', color: active ? 'white' : 'var(--text-secondary)',
  })
  const input: React.CSSProperties = { width: '100%', background: 'white', border: '1.5px solid var(--border-color)', borderRadius: 16, padding: '14px 18px', fontSize: 16, outline: 'none', color: 'var(--text-primary)' }
  const label: React.CSSProperties = { fontSize: 12, fontWeight: 800, color: 'var(--primary)', paddingLeft: 4, display: 'block', marginBottom: 8 }
  const primaryBtn: React.CSSProperties = { flex: 1, padding: '18px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 900, cursor: 'pointer' }
  const ghostBtn: React.CSSProperties = { padding: '18px 22px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border-color)', borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: 'pointer' }

  if (done) {
    return (
      <div style={{ ...card, textAlign: 'center' }} aria-live="polite">
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 10 }}>진단 신청이 접수되었습니다</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
          선택하신 <strong>{ADMISSION_TYPES.find((a) => a.id === form.admission_type)?.label}</strong> · <strong>{MAJORS.find((m) => m.id === form.major)?.short}</strong> 기준으로
          올댓뷰티 입시 멘토가 지원 가능 대학 리스트와 학원비 견적을 정리해 <strong>영업일 기준 1일 내</strong> 연락드립니다.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={majorPath} className="btn btn--primary">내 희망 학과 정보 보기</Link>
          <Link href="/univ/" className="btn btn--ghost">미용대학 비교표 보기</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {showModal && <PrivacyModal onConfirm={handleConfirm} onClose={() => setShowModal(false)} isMinor={minor} isTeen={teen} />}

      <div style={card} id="diagnosis-form">
        {/* 진행 표시 */}
        <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: '0 0 26px' }} aria-label="진단 단계">
          {STEPS.map((s, i) => (
            <li key={s} style={{ flex: 1 }}>
              <div style={{ height: 6, borderRadius: 6, background: i <= step ? 'var(--primary)' : 'var(--border-color)', transition: 'background 0.3s' }} />
              <p style={{ fontSize: 11, fontWeight: 800, marginTop: 8, color: i === step ? 'var(--primary)' : 'var(--text-muted)' }}>{i + 1}. {s}</p>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <fieldset style={{ border: 'none' }}>
            <legend style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>어떤 전형으로 지원할 계획인가요?</legend>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 18 }}>모르셔도 괜찮아요. 멘토가 내신·실기 상태를 보고 함께 정해드립니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {ADMISSION_TYPES.map((a) => (
                <button key={a.id} type="button" onClick={() => set("admission_type", a.id)} aria-pressed={form.admission_type === a.id} style={optionBtn(form.admission_type === a.id)}>
                  <span style={{ display: 'block', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{a.label}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.desc}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset style={{ border: 'none' }}>
            <legend style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>희망 학과를 골라주세요</legend>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 18 }}>화장품학과는 실기 없이 지원 가능한 대학이 많습니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {MAJORS.map((m) => (
                <button key={m.id} type="button" onClick={() => set("major", m.id)} aria-pressed={form.major === m.id} style={optionBtn(form.major === m.id)}>
                  <span style={{ display: 'block', fontWeight: 800, fontSize: 15 }}>{m.label}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div>
            <fieldset style={{ border: 'none', marginBottom: 22 }}>
              <legend style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>거주 지역은 어디인가요?</legend>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {REGIONS.map((r) => (
                  <button key={r} type="button" onClick={() => set("region", r)} aria-pressed={form.region === r} style={chipBtn(form.region === r)}>{r}</button>
                ))}
              </div>
            </fieldset>
            <fieldset style={{ border: 'none' }}>
              <legend style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>내신 등급대 <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: 13 }}>(선택)</span></legend>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {GRADE_BANDS.map((g) => (
                  <button key={g} type="button" onClick={() => set("grade_band", g)} aria-pressed={form.grade_band === g} style={chipBtn(form.grade_band === g)}>{g}</button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>진단 결과를 받을 연락처</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 18 }}>지원 가능 대학 리스트와 학원비 견적을 함께 보내드립니다.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div>
                <label htmlFor="dg-name" style={label}>성함 · 성별</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input id="dg-name" type="text" value={form.customer_name} maxLength={8} placeholder="성함"
                    onChange={(e) => { const v = e.target.value; if (SPECIAL_CHAR_REG.test(v)) { alert("특수문자는 입력하실 수 없습니다."); return } set("customer_name", v) }}
                    style={{ ...input, flex: 1 }} autoComplete="name" />
                  <div style={{ display: 'flex', gap: 4 }} role="group" aria-label="성별">
                    {[{ label: '남', val: '1' }, { label: '여', val: '2' }].map(({ label: l, val }) => (
                      <button key={val} type="button" onClick={() => set("customer_sex", val)} aria-pressed={form.customer_sex === val}
                        style={{ width: 50, borderRadius: 16, border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: 13, background: form.customer_sex === val ? 'var(--primary)' : 'var(--bg-main)', color: form.customer_sex === val ? 'white' : 'var(--text-muted)' }}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="dg-birth" style={label}>생년월일 (6자리)</label>
                <input id="dg-birth" type="text" inputMode="numeric" value={form.customer_birth} maxLength={6} placeholder="예) 080315"
                  onChange={(e) => set("customer_birth", e.target.value.replace(/\D/g, ""))} style={input} autoComplete="bday" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="dg-phone" style={label}>연락처</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select aria-label="전화번호 앞자리" value={form.mobile1} onChange={(e) => set("mobile1", e.target.value)} style={{ ...input, width: 96, flexShrink: 0, appearance: 'none' }}>
                    {["010", "011", "016", "017", "019"].map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <input id="dg-phone" type="tel" inputMode="numeric" value={form.mobile2} maxLength={11} placeholder="'-' 없이 입력"
                    onChange={(e) => set("mobile2", e.target.value.replace(/\D/g, ""))} style={{ ...input, flex: 1 }} autoComplete="tel-national" />
                </div>
              </div>
              {blocked && (
                <div style={{ gridColumn: '1 / -1' }} className="callout callout--warn">
                  <strong>만 14세 미만은 본인 명의로 신청할 수 없습니다.</strong> 이 서비스는 고등학생 이상을 대상으로 상담을 진행합니다. 부모님(보호자) 성함과 연락처로 다시 신청해 주세요.
                </div>
              )}
              {minor && !blocked && (
                <>
                  <div style={{ gridColumn: '1 / -1' }} className="callout callout--warn">
                    <strong>만 14세 미만으로 확인됩니다.</strong> 보호자(부모님) 정보를 함께 입력해 주세요. 입력하신 보호자 연락처로 확인 문자를 보내 동의를 확인한 뒤 상담을 시작합니다.
                  </div>
                  <div>
                    <label htmlFor="dg-gname" style={label}>보호자 성함</label>
                    <input id="dg-gname" type="text" value={form.guardian_name} maxLength={8} placeholder="보호자 성함" onChange={(e) => set("guardian_name", e.target.value)} style={input} />
                  </div>
                  <div>
                    <label htmlFor="dg-gphone" style={label}>보호자 연락처</label>
                    <input id="dg-gphone" type="tel" inputMode="numeric" value={form.guardian_phone} maxLength={11} placeholder="숫자만 입력" onChange={(e) => set("guardian_phone", e.target.value.replace(/\D/g, ""))} style={input} />
                  </div>
                </>
              )}
              {/* 만 14~18세: 개인정보 동의는 본인이 가능하나 수강 계약은 보호자 동의 필요(민법 제5조) */}
              {teen && (
                <div style={{ gridColumn: '1 / -1' }} className="callout callout--info">
                  <strong>미성년자 안내.</strong> 진단 신청은 본인이 하실 수 있습니다. 다만 실제 학원 수강 계약은 보호자(법정대리인) 동의가 필요하니, 등록 단계에서는 부모님과 함께 결정하세요.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 네비 버튼 */}
        <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
          {step > 0 && <button type="button" onClick={prev} style={ghostBtn}>이전</button>}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} style={primaryBtn}>다음 →</button>
          ) : (
            <button type="button" onClick={handleSubmitClick} disabled={submitting || blocked} style={{ ...primaryBtn, opacity: submitting || blocked ? 0.6 : 1, cursor: submitting || blocked ? 'not-allowed' : 'pointer' }}>
              {submitting ? '전송 중...' : '진단 결과 무료로 받기'}
            </button>
          )}
        </div>
        <p style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
          100% 무료 · 학원 등록 강요 없음 · 올댓뷰티 입시 멘토가 직접 안내합니다
        </p>
      </div>
    </>
  )
}
