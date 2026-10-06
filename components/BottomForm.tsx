'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import PrivacyModal, { type Consents } from './PrivacyModal'
import { parsePhone, type ParsedPhone } from '@/lib/validate'
import { submitLead } from '@/lib/submit'

type Status = { kind: 'idle' | 'sending' | 'done' | 'error'; message: string }

const IDLE: Status = { kind: 'idle', message: '' }

/**
 * 화면 하단 고정 상담 바(모바일·PC 공통). layout.tsx 에서 전역 마운트한다.
 *
 * 흐름은 본문 폼(FormSection)과 같다 — 전송 클릭 → 동의 → submitLead() POST.
 *   · 동의 체크박스를 켜지 않고 전송하면 본문 폼이 쓰는 PrivacyModal 을 띄워 동의를 받는다.
 *   · 체크박스를 켠 상태면 바로 전송한다(선택 항목인 광고성 정보 수신은 동의하지 않은 것으로 보낸다).
 * 번호만 받으므로 나머지 필드는 빈 값으로 보내되 payload 모양은 FormSection 과 동일하게 맞춘다.
 */
export default function BottomForm() {
  const pathname = usePathname()
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState<Status>(IDLE)
  const barRef = useRef<HTMLDivElement>(null)

  const sending = status.kind === 'sending'

  // 바가 본문 마지막 내용을 가리지 않도록 실제 바 높이를 body 아래 여백으로 넘긴다.
  // 줄바꿈·상태 문구로 높이가 바뀌어도 따라가게 ResizeObserver 로 관찰한다.
  // (JS 전에는 globals.css 의 기본값 여백이 적용된다)
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

  /** 입력값을 FormSection 과 같은 parsePhone 규칙으로 검증한다(8자리 또는 010 포함 11자리) */
  const resolvePhone = (): ParsedPhone | string => {
    const digits = phone.replace(/\D/g, '')
    if (!digits) return '휴대폰 번호를 입력해 주세요.'
    return parsePhone('010', digits)
  }

  const send = async (parsed: ParsedPhone, consents: Consents) => {
    setStatus({ kind: 'sending', message: '전송 중입니다...' })
    const result = await submitLead({
      customer_name: '',
      customer_birth: '',
      mobile1: parsed.mobile1,
      mobile2: parsed.mobile2,
      mobile3: '',
      customer_sex: '',
      region: '',
      has_license: 'N',
      major: '',
      interest_field: '',
      source_page: `bottom-form${pathname ?? ''}`,
      category: '미용입시',
      consent_privacy: true,
      consent_third_party: true,
      consent_marketing: consents.marketing,
    })
    if (result.ok) {
      setPhone('')
      setAgreed(false)
      setStatus({ kind: 'done', message: '상담 신청이 완료되었습니다. 올댓뷰티 입시 멘토가 곧 연락드리겠습니다.' })
    } else {
      setStatus({ kind: 'error', message: result.message })
    }
  }

  const handleSubmit = () => {
    if (sending) return
    const parsed = resolvePhone()
    if (typeof parsed === 'string') {
      setStatus({ kind: 'error', message: parsed })
      return
    }
    if (!agreed) {
      setStatus({ kind: 'error', message: '필수 동의 항목에 동의해 주세요.' })
      setShowModal(true)
      return
    }
    void send(parsed, { marketing: false })
  }

  // 모달에서 동의하면 체크박스를 켜고 그대로 전송한다(본문 폼과 같은 흐름).
  const handleModalConfirm = (consents: Consents) => {
    setAgreed(true)
    const parsed = resolvePhone()
    if (typeof parsed === 'string') {
      setStatus({ kind: 'error', message: parsed })
      return
    }
    void send(parsed, consents)
  }

  const statusColor =
    status.kind === 'error' ? 'var(--primary-dark)'
      : status.kind === 'done' ? 'var(--success)'
        : 'var(--text-muted)'

  return (
    <>
      {showModal && (
        <PrivacyModal onConfirm={handleModalConfirm} onClose={() => setShowModal(false)} />
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

          <div className="bottom-form__fields">
            <input
              type="tel"
              inputMode="numeric"
              aria-label="휴대폰 번호"
              placeholder="휴대폰 번호 ('-' 없이 입력)"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              autoComplete="tel-national"
              className="bottom-form__phone"
              disabled={sending}
            />
            <button type="submit" className="btn btn--primary bottom-form__submit" disabled={sending}>
              {sending ? '전송 중...' : '상담 신청'}
            </button>
          </div>

          <p className="bottom-form__status" aria-live="polite" style={{ color: statusColor }}>
            {status.message}
          </p>
        </form>
      </div>
    </>
  )
}
