"use client"

import { useState } from "react"
import PrivacyModal, { type Consents } from "./PrivacyModal"
import { validateForm, parsePhone, isUnder14, isTeen, UNDER14_POLICY, SPECIAL_CHAR_REG } from "@/lib/validate"
import { submitLead } from "@/lib/submit"
import { REGIONS, MAJORS, type MajorId } from "@/data/constants"

type Props = {
  cta?: string             // 버튼 문구 (설계서 페이지별 CTA)
  sourcePage?: string      // DB에 남길 유입 페이지 식별자
  defaultMajor?: MajorId   // 학과 페이지에서 기본 선택
  heading?: string         // 카드 위 제목(선택)
  subheading?: string
  id?: string              // 앵커 (기본 'form')
}

/**
 * DB 상담 폼 (project23 FormSection 구조 그대로).
 * 신청 클릭 → 검증 → PrivacyModal → 동의 → POST(NEXT_PUBLIC_DB_SUBMIT_URL) → 완료 alert
 */
export default function FormSection({
  cta = "내 조건으로 학원비 견적 받기 (무료)",
  sourcePage = "home",
  defaultMajor,
  heading,
  subheading,
  id = "form",
}: Props) {
  const initial = {
    customer_name: "",
    customer_birth: "",
    mobile1: "010",
    mobile2: "",
    customer_sex: "2",
    region: "",
    major: (defaultMajor ?? "") as string,
    guardian_name: "",
    guardian_phone: "",
  }
  const [form, setForm] = useState(initial)
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const set = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }))
  const minor = isUnder14(form.customer_birth)
  const teen = isTeen(form.customer_birth)
  // 만 14세 미만은 법정대리인 동의 "확인" 절차가 갖춰지기 전까지 접수하지 않는다.
  const blocked = minor && UNDER14_POLICY === 'block'

  const handleNameChange = (value: string) => {
    if (SPECIAL_CHAR_REG.test(value)) {
      alert("특수문자는 입력하실 수 없습니다.")
      set("customer_name", value.slice(0, -1))
      return
    }
    set("customer_name", value)
  }

  const handleSubmitClick = () => {
    if (blocked) {
      alert("만 14세 미만은 본인 명의로 상담을 신청할 수 없습니다. 부모님(보호자) 명의로 다시 신청해 주세요.")
      return
    }
    const error = validateForm({ ...form, privacy: true })
    if (error) { alert(error); return }
    if (!form.region) { alert("거주 지역을 선택해 주세요."); return }
    if (!form.major) { alert("희망 학과를 선택해 주세요."); return }
    if (minor && !form.guardian_name) { alert("만 14세 미만은 보호자 성함을 입력해 주세요."); return }
    if (minor && !/^\d{10,11}$/.test(form.guardian_phone)) { alert("만 14세 미만은 보호자 연락처(숫자만)를 입력해 주세요."); return }
    setShowModal(true)
  }

  const handleConfirm = async (consents: Consents) => {
    const phoneResult = parsePhone(form.mobile1, form.mobile2)
    if (typeof phoneResult === "string") { alert(phoneResult); return }

    const majorLabel = MAJORS.find((m) => m.id === form.major)?.label ?? form.major

    const payload = {
      customer_name: form.customer_name,
      customer_birth: form.customer_birth,
      mobile1: phoneResult.mobile1,
      mobile2: phoneResult.mobile2,
      mobile3: "",
      customer_sex: form.customer_sex,
      region: form.region,
      has_license: "N",
      major: majorLabel,
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

    setSubmitted(true)
    const result = await submitLead(payload)
    if (result.ok) {
      alert("상담 신청이 완료되었습니다. 올댓뷰티 입시 멘토가 곧 연락드리겠습니다.")
      setForm(initial)
    } else {
      alert(result.message)
    }
    setSubmitted(false)
  }

  const inputGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }
  const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em', paddingLeft: '4px', textAlign: 'left' }
  const getInputWrapperStyle = (fieldName: string): React.CSSProperties => ({
    background: 'var(--bg-card)',
    border: `1.5px solid ${focusedField === fieldName ? 'var(--primary)' : 'var(--border-color)'}`,
    borderRadius: '16px',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: focusedField === fieldName ? '0 4px 20px rgba(217, 72, 110, 0.12)' : 'none',
  })
  const inputStyle: React.CSSProperties = { flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)', width: '100%' }
  const caret = (right: number) => <span aria-hidden="true" style={{ position: 'absolute', right, pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '10px' }}>▼</span>

  return (
    <>
      {showModal && (
        <PrivacyModal onConfirm={handleConfirm} onClose={() => setShowModal(false)} isMinor={minor} isTeen={teen} />
      )}

      <div id={id} style={{ scrollMarginTop: 90 }}>
        {(heading || subheading) && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            {/* h2로 두어야 히어로(h1) 다음 제목 레벨이 건너뛰지 않는다 */}
            {heading && <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>{heading}</h2>}
            {subheading && <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{subheading}</p>}
          </div>
        )}

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '32px', padding: 'clamp(24px, 4vw, 40px)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} role="group" aria-label="미용입시 상담 신청 폼">

            {/* 이름·성별 & 생년월일 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div style={inputGroupStyle}>
                <label htmlFor={`${id}-name`} style={labelStyle}>성함 · 성별</label>
                <div style={getInputWrapperStyle('name')}>
                  <input
                    id={`${id}-name`}
                    type="text"
                    value={form.customer_name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    maxLength={8}
                    placeholder="성함 입력"
                    autoComplete="name"
                    style={inputStyle}
                  />
                  <div style={{ display: 'flex', gap: '4px', marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid var(--border-color)', flexShrink: 0 }} role="group" aria-label="성별">
                    {[{ label: '남', val: '1' }, { label: '여', val: '2' }].map(({ label, val }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => set("customer_sex", val)}
                        aria-pressed={form.customer_sex === val}
                        style={{
                          width: '32px', height: '32px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                          fontWeight: 900, fontSize: '11px', transition: 'all 0.2s',
                          background: form.customer_sex === val ? 'var(--primary)' : 'var(--bg-main)',
                          color: form.customer_sex === val ? 'white' : 'var(--text-muted)',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label htmlFor={`${id}-birth`} style={labelStyle}>생년월일 (6자리)</label>
                <div style={getInputWrapperStyle('birth')}>
                  <input
                    id={`${id}-birth`}
                    type="text"
                    inputMode="numeric"
                    value={form.customer_birth}
                    onChange={(e) => set("customer_birth", e.target.value.replace(/\D/g, ""))}
                    onFocus={() => setFocusedField('birth')}
                    onBlur={() => setFocusedField(null)}
                    maxLength={6}
                    placeholder="예) 080315"
                    autoComplete="bday"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* 연락처 & 거주지역 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div style={inputGroupStyle}>
                <label htmlFor={`${id}-mobile2`} style={labelStyle}>연락처</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ ...getInputWrapperStyle('mobile1'), width: '90px', flexShrink: 0, padding: '12px 12px 12px 16px', position: 'relative' }}>
                    <select
                      aria-label="전화번호 앞자리"
                      value={form.mobile1}
                      onChange={(e) => set("mobile1", e.target.value)}
                      onFocus={() => setFocusedField('mobile1')}
                      onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    >
                      {["010", "011", "016", "017", "019"].map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                    {caret(12)}
                  </div>
                  <div style={{ ...getInputWrapperStyle('mobile2'), flex: 1 }}>
                    <input
                      id={`${id}-mobile2`}
                      type="tel"
                      inputMode="numeric"
                      value={form.mobile2}
                      onChange={(e) => set("mobile2", e.target.value.replace(/\D/g, ""))}
                      onFocus={() => setFocusedField('mobile2')}
                      onBlur={() => setFocusedField(null)}
                      maxLength={11}
                      placeholder="'-' 없이 입력"
                      autoComplete="tel-national"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label htmlFor={`${id}-region`} style={labelStyle}>거주 지역</label>
                <div style={{ ...getInputWrapperStyle('region'), position: 'relative' }}>
                  <select
                    id={`${id}-region`}
                    value={form.region}
                    onChange={(e) => set("region", e.target.value)}
                    onFocus={() => setFocusedField('region')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.region ? 'var(--text-primary)' : 'var(--text-muted)' }}
                  >
                    <option value="" disabled hidden>지역 선택</option>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {caret(20)}
                </div>
              </div>
            </div>

            {/* 희망학과 (전형 유형은 입력 부담을 줄이려 제거 — 상담 단계에서 확인한다) */}
            <div style={inputGroupStyle}>
              <label htmlFor={`${id}-major`} style={labelStyle}>희망 학과</label>
              <div style={{ ...getInputWrapperStyle('major'), position: 'relative' }}>
                <select
                  id={`${id}-major`}
                  value={form.major}
                  onChange={(e) => set("major", e.target.value)}
                  onFocus={() => setFocusedField('major')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.major ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  <option value="" disabled hidden>학과 선택</option>
                  {MAJORS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
                {caret(20)}
              </div>
            </div>

            {/* 만 14세 미만: 접수 차단 안내 (보호자 명의로 신청하도록) */}
            {blocked && (
              <div className="callout callout--warn" style={{ fontSize: 13 }}>
                <strong>만 14세 미만은 본인 명의로 신청할 수 없습니다.</strong> 이 서비스는 고등학생 이상을 대상으로 상담을 진행합니다.
                <br />부모님(보호자) 성함과 연락처로 다시 신청해 주시면 동일하게 학원비 견적과 대학 정보를 안내해 드립니다.
              </div>
            )}

            {/* 만 14세 미만 보호자 정보 (guardian-verify 정책일 때만) */}
            {minor && !blocked && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="callout callout--warn" style={{ fontSize: 13 }}>
                  <strong>만 14세 미만으로 확인됩니다.</strong> 개인정보보호법에 따라 보호자(부모님) 정보를 함께 입력해 주세요.
                  입력하신 보호자 연락처로 확인 문자를 보내 동의를 확인한 뒤 상담을 시작합니다.
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div style={inputGroupStyle}>
                    <label htmlFor={`${id}-gname`} style={labelStyle}>보호자 성함</label>
                    <div style={getInputWrapperStyle('gname')}>
                      <input id={`${id}-gname`} type="text" value={form.guardian_name} onChange={(e) => set("guardian_name", e.target.value)} onFocus={() => setFocusedField('gname')} onBlur={() => setFocusedField(null)} maxLength={8} placeholder="보호자 성함" style={inputStyle} />
                    </div>
                  </div>
                  <div style={inputGroupStyle}>
                    <label htmlFor={`${id}-gphone`} style={labelStyle}>보호자 연락처</label>
                    <div style={getInputWrapperStyle('gphone')}>
                      <input id={`${id}-gphone`} type="tel" inputMode="numeric" value={form.guardian_phone} onChange={(e) => set("guardian_phone", e.target.value.replace(/\D/g, ""))} onFocus={() => setFocusedField('gphone')} onBlur={() => setFocusedField(null)} maxLength={11} placeholder="숫자만 입력" style={inputStyle} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 미성년자(만 14~18세) 안내 — 개인정보 동의는 본인이 가능하나 수강 계약은 보호자 동의 필요(민법 제5조) */}
            {teen && (
              <div className="callout callout--info" style={{ fontSize: 13 }}>
                <strong>미성년자 안내.</strong> 상담 신청은 본인이 하실 수 있습니다. 다만 실제 학원 수강 계약은 보호자(법정대리인) 동의가 필요하니, 등록 단계에서는 부모님과 함께 결정하세요.
              </div>
            )}

            {/* 제출 버튼 */}
            <div style={{ marginTop: '4px' }}>
              <button
                type="button"
                onClick={handleSubmitClick}
                disabled={submitted || blocked}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: 950,
                  cursor: submitted || blocked ? 'not-allowed' : 'pointer',
                  opacity: submitted || blocked ? 0.6 : 1,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(217, 72, 110, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                }}
              >
                {submitted ? '전송 중...' : cta}
              </button>
              <p style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 500 }}>
                100% 무료 · 올댓뷰티 입시 멘토가 1:1로 안내합니다 · 정보는 암호화되어 전송됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
