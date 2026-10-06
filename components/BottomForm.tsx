'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import PrivacyModal, { type Consents } from './PrivacyModal'
import { validateForm, parsePhone, isUnder14, isTeen, UNDER14_POLICY, SPECIAL_CHAR_REG } from '@/lib/validate'
import { submitLead } from '@/lib/submit'
import { REGIONS, MAJORS } from '@/data/constants'

type Status = { kind: 'idle' | 'sending' | 'done' | 'error'; message: string }

const IDLE: Status = { kind: 'idle', message: '' }

/**
 * 입력 항목은 본문 폼(FormSection)과 1:1 로 같다. 여기서 항목을 늘리거나 줄이지 말 것.
 * (성함 · 성별 · 생년월일 · 연락처 앞자리/번호 · 거주 지역 · 희망 학과, 만 14세 미만만 보호자 성함/연락처)
 */
const INITIAL = {
  customer_name: '',
  customer_birth: '',
  mobile1: '010',
  mobile2: '',
  customer_sex: '2',
  region: '',
  major: '',
  guardian_name: '',
  guardian_phone: '',
}

/**
 * 화면 하단 고정 상담 바(모바일·PC 공통). layout.tsx 에서 전역 마운트한다.
 *
 * 본문 폼(FormSection)이 받는 항목을 하나도 빠짐없이 그대로 받는다 — 빈 값을 채워 보내지 않는다.
 * 선택 목록(REGIONS·MAJORS)과 검증(validateForm·parsePhone)·동의 모달(PrivacyModal)·
 * 전송(submitLead)은 모두 본문 폼과 같은 것을 재사용하고, payload 의 키·값 규칙도 동일하다.
 * 다른 점은 유입 구분용 source_page 뿐이다.
 *
 * 접었다 펴는 구조를 쓰지 않는다 — 모든 입력칸이 처음부터 보인다.
 */
export default function BottomForm() {
  const pathname = usePathname()
  const [form, setForm] = useState(INITIAL)
  const [agreed, setAgreed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState<Status>(IDLE)
  const barRef = useRef<HTMLDivElement>(null)

  const sending = status.kind === 'sending'
  const set = (key: keyof typeof INITIAL, value: string) => setForm((p) => ({ ...p, [key]: value }))

  const minor = isUnder14(form.customer_birth)
  const teen = isTeen(form.customer_birth)
  // 만 14세 미만은 법정대리인 동의 "확인" 절차가 갖춰지기 전까지 접수하지 않는다(본문 폼과 같은 정책).
  const blocked = minor && UNDER14_POLICY === 'block'

  // 바가 본문 마지막 내용을 가리지 않도록 실제 바 높이를 body 아래 여백으로 넘긴다.
  // 입력 항목을 모두 펼쳐 바가 높아졌고 안내 문구·보호자 칸으로 높이가 또 바뀌므로
  // ResizeObserver 로 실측해 계속 따라가게 한다. (JS 전에는 globals.css 의 기본값 여백이 적용된다)
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const apply = () => document.body.style.setProperty('--bottom-form-h', `${el.offsetHeight}px`)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => {
      ro.disconnect()
      document.body.style.removeProperty('--bottom-form-h')
    }
  }, [])

  const fail = (message: string) => setStatus({ kind: 'error', message })

  // 본문 폼과 같은 규칙 — 특수문자는 입력 자체를 막는다(본문은 alert, 바는 상태 문구).
  const handleNameChange = (value: string) => {
    if (SPECIAL_CHAR_REG.test(value)) {
      set('customer_name', value.slice(0, -1))
      fail('특수문자는 입력하실 수 없습니다.')
      return
    }
    set('customer_name', value)
  }

  /** 필수값 검증 — 본문 폼(FormSection.handleSubmitClick)과 같은 순서·같은 문구 */
  const firstError = (): string | null => {
    if (blocked) return '만 14세 미만은 본인 명의로 상담을 신청할 수 없습니다. 부모님(보호자) 명의로 다시 신청해 주세요.'
    const error = validateForm({ ...form, privacy: true })
    if (error) return error
    if (!form.region) return '거주 지역을 선택해 주세요.'
    if (!form.major) return '희망 학과를 선택해 주세요.'
    if (minor && !form.guardian_name) return '만 14세 미만은 보호자 성함을 입력해 주세요.'
    if (minor && !/^\d{10,11}$/.test(form.guardian_phone)) return '만 14세 미만은 보호자 연락처(숫자만)를 입력해 주세요.'
    const phoneResult = parsePhone(form.mobile1, form.mobile2)
    if (typeof phoneResult === 'string') return phoneResult
    return null
  }

  const send = async (consents: Consents) => {
    const phoneResult = parsePhone(form.mobile1, form.mobile2)
    if (typeof phoneResult === 'string') { fail(phoneResult); return }

    const majorLabel = MAJORS.find((m) => m.id === form.major)?.label ?? form.major

    // payload 의 키·값 규칙은 본문 폼과 동일하다. source_page 만 바텀폼 유입으로 구분한다.
    const payload = {
      customer_name: form.customer_name,
      customer_birth: form.customer_birth,
      mobile1: phoneResult.mobile1,
      mobile2: phoneResult.mobile2,
      mobile3: '',
      customer_sex: form.customer_sex,
      region: form.region,
      has_license: 'N',
      major: majorLabel,
      interest_field: majorLabel,
      source_page: `bottom-form${pathname ?? ''}`,
      category: '미용입시',
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

    setStatus({ kind: 'sending', message: '전송 중입니다...' })
    const result = await submitLead(payload)
    if (result.ok) {
      setForm(INITIAL)
      setAgreed(false)
      setStatus({ kind: 'done', message: '상담 신청이 완료되었습니다. 올댓뷰티 입시 멘토가 곧 연락드리겠습니다.' })
    } else {
      setStatus({ kind: 'error', message: result.message })
    }
  }

  const handleSubmit = () => {
    if (sending) return
    const error = firstError()
    if (error) { fail(error); return }
    if (!agreed) {
      fail('필수 동의 항목에 동의해 주세요.')
      setShowModal(true)
      return
    }
    // 체크박스를 켠 상태면 바로 전송한다(선택 항목인 광고성 정보 수신은 동의하지 않은 것으로 보낸다).
    void send({ marketing: false })
  }

  // 모달에서 동의하면 체크박스를 켜고 그대로 전송한다(본문 폼과 같은 흐름).
  const handleModalConfirm = (consents: Consents) => {
    setAgreed(true)
    const error = firstError()
    if (error) { fail(error); return }
    void send(consents)
  }

  const statusColor =
    status.kind === 'error' ? 'var(--primary-dark)'
      : status.kind === 'done' ? 'var(--success)'
        : 'var(--text-muted)'

  // 생년월일로 판정되는 안내(본문 폼의 콜아웃과 같은 내용을 한 줄로 줄였다)
  const note = blocked
    ? '만 14세 미만은 본인 명의로 신청할 수 없습니다. 부모님(보호자) 성함·연락처로 신청해 주세요.'
    : minor
      ? '만 14세 미만은 보호자 정보를 함께 입력해 주세요. 보호자 연락처로 확인 문자를 보낸 뒤 상담을 시작합니다.'
      : teen
        ? '미성년자는 본인이 상담 신청을 하실 수 있지만, 실제 수강 계약은 보호자(법정대리인) 동의가 필요합니다.'
        : ''

  return (
    <>
      {showModal && (
        <PrivacyModal
          onConfirm={handleModalConfirm}
          onClose={() => setShowModal(false)}
          isMinor={minor}
          isTeen={teen}
        />
      )}

      <div className="bottom-form" ref={barRef}>
        <form
          className="bottom-form__inner"
          aria-label="빠른 상담 신청"
          onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
        >
          <p className="bottom-form__title">
            <span className="bottom-form__eyebrow">무료</span>
            학원비 견적 받기
          </p>

          <div className="bottom-form__consent">
            <label className="bottom-form__check">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                <b>[필수]</b> 개인정보 수집 및 이용 동의 · 개인정보 제3자 제공 동의 · 만 14세 이상
              </span>
            </label>
            <button type="button" className="bottom-form__detail" onClick={() => setShowModal(true)}>
              상세보기
            </button>
          </div>

          {/* 성함 · 성별 */}
          <div className="bf-f bf-f--name">
            <label className="bf-label" htmlFor="bf-name">성함 · 성별</label>
            <div className="bf-box">
              <input
                id="bf-name"
                type="text"
                className="bf-control"
                value={form.customer_name}
                onChange={(e) => handleNameChange(e.target.value)}
                maxLength={8}
                placeholder="성함 입력"
                autoComplete="name"
                disabled={sending}
              />
              <span className="bf-sex" role="group" aria-label="성별">
                {[{ label: '남', val: '1' }, { label: '여', val: '2' }].map(({ label, val }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => set('customer_sex', val)}
                    aria-pressed={form.customer_sex === val}
                    disabled={sending}
                  >
                    {label}
                  </button>
                ))}
              </span>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="bf-f bf-f--birth">
            <label className="bf-label" htmlFor="bf-birth">생년월일 (6자리)</label>
            <div className="bf-box">
              <input
                id="bf-birth"
                type="text"
                inputMode="numeric"
                className="bf-control"
                value={form.customer_birth}
                onChange={(e) => set('customer_birth', e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                placeholder="예) 080315"
                autoComplete="bday"
                disabled={sending}
              />
            </div>
          </div>

          {/* 거주 지역 */}
          <div className="bf-f bf-f--region">
            <label className="bf-label" htmlFor="bf-region">거주 지역</label>
            <div className="bf-box bf-box--select">
              <select
                id="bf-region"
                className={`bf-control${form.region ? '' : ' is-empty'}`}
                value={form.region}
                onChange={(e) => set('region', e.target.value)}
                disabled={sending}
              >
                <option value="" disabled hidden>지역 선택</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <span className="bf-caret" aria-hidden="true">▼</span>
            </div>
          </div>

          {/* 연락처 */}
          <div className="bf-f bf-f--phone">
            <label className="bf-label" htmlFor="bf-mobile2">연락처</label>
            <div className="bf-phone">
              <div className="bf-box bf-box--select bf-phone__prefix">
                <select
                  className="bf-control"
                  aria-label="전화번호 앞자리"
                  value={form.mobile1}
                  onChange={(e) => set('mobile1', e.target.value)}
                  disabled={sending}
                >
                  {['010', '011', '016', '017', '019'].map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
                <span className="bf-caret" aria-hidden="true">▼</span>
              </div>
              <div className="bf-box bf-phone__num">
                <input
                  id="bf-mobile2"
                  type="tel"
                  inputMode="numeric"
                  className="bf-control"
                  value={form.mobile2}
                  onChange={(e) => set('mobile2', e.target.value.replace(/\D/g, ''))}
                  maxLength={11}
                  placeholder="'-' 없이 입력"
                  autoComplete="tel-national"
                  disabled={sending}
                />
              </div>
            </div>
          </div>

          {/* 희망 학과 */}
          <div className="bf-f bf-f--major">
            <label className="bf-label" htmlFor="bf-major">희망 학과</label>
            <div className="bf-box bf-box--select">
              <select
                id="bf-major"
                className={`bf-control${form.major ? '' : ' is-empty'}`}
                value={form.major}
                onChange={(e) => set('major', e.target.value)}
                disabled={sending}
              >
                <option value="" disabled hidden>학과 선택</option>
                {MAJORS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
              <span className="bf-caret" aria-hidden="true">▼</span>
            </div>
          </div>

          <button type="submit" className="btn btn--primary bottom-form__submit" disabled={sending || blocked}>
            {sending ? '전송 중...' : '상담 신청'}
          </button>

          {/* 만 14세 미만 보호자 정보 — 본문 폼과 같은 조건(정책이 guardian-verify 일 때만 나타난다) */}
          {minor && !blocked && (
            <div className="bf-guardian">
              <div className="bf-f">
                <label className="bf-label" htmlFor="bf-gname">보호자 성함</label>
                <div className="bf-box">
                  <input
                    id="bf-gname"
                    type="text"
                    className="bf-control"
                    value={form.guardian_name}
                    onChange={(e) => set('guardian_name', e.target.value)}
                    maxLength={8}
                    placeholder="보호자 성함"
                    disabled={sending}
                  />
                </div>
              </div>
              <div className="bf-f">
                <label className="bf-label" htmlFor="bf-gphone">보호자 연락처</label>
                <div className="bf-box">
                  <input
                    id="bf-gphone"
                    type="tel"
                    inputMode="numeric"
                    className="bf-control"
                    value={form.guardian_phone}
                    onChange={(e) => set('guardian_phone', e.target.value.replace(/\D/g, ''))}
                    maxLength={11}
                    placeholder="숫자만 입력"
                    disabled={sending}
                  />
                </div>
              </div>
            </div>
          )}

          <p className="bottom-form__note" aria-live="polite">{note}</p>

          <p className="bottom-form__status" aria-live="polite" style={{ color: statusColor }}>
            {status.message}
          </p>
        </form>
      </div>
    </>
  )
}
