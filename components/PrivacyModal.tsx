"use client"

import { useEffect, useState } from "react"
import { OPERATOR } from "@/lib/site"

export type Consents = {
  /** 마케팅·이벤트 정보 수신 (선택). 거부해도 상담은 정상 진행 — 개인정보보호법 제22조 제5항 */
  marketing: boolean
}

type Props = {
  onConfirm: (consents: Consents) => void
  onClose: () => void
  /** 만 14세 미만 — 법정대리인 동의가 필수가 된다(개인정보보호법 제22조의2) */
  isMinor?: boolean
  /** 만 14~18세 — 법적으로 본인 동의로 충분하지만, 수강 계약은 보호자 동의가 필요함을 안내 */
  isTeen?: boolean
}

/**
 * 폼 제출 시 뜨는 개인정보 동의 모달.
 * 필수(수집·이용 / 제3자 제공 / 14세 미만은 법정대리인)와 선택(마케팅 수신)을 분리한다.
 * 선택 동의를 거부해도 제출은 그대로 진행된다.
 * 흐름: 신청 버튼 → 이 모달 → "동의하고 신청" → onConfirm(동의값) → onClose
 */
export default function PrivacyModal({ onConfirm, onClose, isMinor = false, isTeen = false }: Props) {
  const [priAgree, setPriAgree] = useState(false)
  const [thirdAgree, setThirdAgree] = useState(false)
  const [guardianAgree, setGuardianAgree] = useState(false)
  const [marketingAgree, setMarketingAgree] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const allRequired = priAgree && thirdAgree && (!isMinor || guardianAgree)
  const primary = 'var(--primary)'

  // "전체 동의"는 선택 항목까지 포함한다(전체 체크 상태를 기준으로 토글).
  const allChecked = allRequired && marketingAgree
  const handleAllAgree = () => {
    const next = !allChecked
    setPriAgree(next)
    setThirdAgree(next)
    setMarketingAgree(next)
    if (isMinor) setGuardianAgree(next)
  }

  const handleConfirm = () => {
    if (!priAgree) { alert('개인정보 수집 및 이용에 동의해 주세요.'); return }
    if (!thirdAgree) { alert('개인정보 제3자 제공에 동의해 주세요.'); return }
    if (isMinor && !guardianAgree) { alert('만 14세 미만은 보호자(법정대리인) 동의가 필요합니다.'); return }
    onConfirm({ marketing: marketingAgree })
    onClose()
  }

  const handleClose = () => setShowAlert(true)

  // 모달이 열려 있는 동안 배경 스크롤을 잠근다(모바일에서 뒤 페이지가 밀리는 문제).
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // ESC로 닫기 — 이탈 경고가 떠 있으면 경고만 닫는다.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (showAlert) setShowAlert(false)
      else setShowAlert(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showAlert])

  return (
    <>
      <div role="dialog" aria-modal="true" aria-label="개인정보 동의" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 580, maxHeight: '85dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', position: 'relative' }}>

          {/* 헤더 */}
          <div style={{ padding: '32px 32px 20px', position: 'relative' }}>
            <button type="button" onClick={handleClose} aria-label="닫기" style={{ position: 'absolute', top: 24, right: 24, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f5', border: 'none', borderRadius: '50%', cursor: 'pointer', color: '#71717a', fontSize: 18 }}>✕</button>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 8, lineHeight: 1.3 }}>
              안전한 상담을 위한<br />
              <span style={{ color: primary }}>개인정보 동의</span>
            </h2>
            <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.7, margin: 0 }}>
              소중한 정보는 상담 목적 외에는 절대 사용되지 않으며, 안전하게 보호됩니다.
            </p>
          </div>

          {/* 스크롤 영역 */}
          <div style={{ overflowY: 'auto', padding: '0 32px 120px', flex: 1 }}>

            {/* 전체 동의 */}
            <button
              type="button"
              onClick={handleAllAgree}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '16px 20px', borderRadius: 16, marginBottom: 20,
                border: allChecked ? `2px solid ${primary}` : '2px solid #e4e4e7',
                background: allChecked ? 'rgba(217,72,110,0.05)' : '#fafafa',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: allChecked ? primary : '#d4d4d8', flexShrink: 0 }}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: allChecked ? primary : '#3f3f46', textAlign: 'left' }}>
                전체 동의 <span style={{ fontSize: 12, fontWeight: 500, color: '#a1a1aa' }}>(선택 항목 포함)</span>
              </span>
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ContentBox checked={priAgree} onChange={setPriAgree} label="개인정보 수집 및 이용 동의" primary={primary}>
                수집 주체 : {OPERATOR.company}<br />
                수집 목적 : 미용입시 학원비 견적 안내, 지원 가능 대학 진단, 입시 상담 응대<br />
                수집 항목 : 성명, 휴대폰 번호, 생년월일, 성별, 거주 지역, 희망 학과<br />
                <span style={{ color: '#52525b' }}>진단 폼을 이용하신 경우 추가 : 전형 유형, 내신 등급대(선택 입력)</span><br />
                <span style={{ color: '#52525b' }}>만 14세 미만인 경우 추가 : 법정대리인 성명, 법정대리인 휴대폰 번호</span><br />
                보유 기간 : 수집일로부터 1년. 삭제를 요청하시면 즉시 파기합니다.<br />
                동의 거부 권리 : 거부하실 수 있습니다. 다만 이 항목은 상담 진행에 반드시 필요하여, 거부하시면 상담 신청이 되지 않습니다.
              </ContentBox>

              <ContentBox checked={thirdAgree} onChange={setThirdAgree} label="개인정보 제3자 제공 동의" primary={primary}>
                제공받는 자 :<br />
                ① {OPERATOR.partner} 입시 멘토(상담 담당자)<br />
                ② 신청하신 지역·학과에 해당하는 <b>제휴 미용입시학원</b><br />
                ③ 그 밖에 회사와 제휴한 <b>미용·뷰티 계열 교육기관 및 입시 상담 사업자</b><br />
                <span style={{ color: '#52525b' }}>제휴처는 지역·학과·시기에 따라 달라지고 수시로 바뀝니다. 신청하신 정보가 어디에 제공되었는지는 문의하시면 개별로 확인해 알려드립니다.</span><br />
                제공 목적 : 학원비 견적 산출, 지원 가능 대학 안내, 1:1 입시 상담 진행<br />
                제공 항목 : 성명, 휴대폰 번호, 생년월일, 성별, 거주 지역, 희망 학과 (진단 폼 이용 시 전형 유형·내신 등급대 포함)<br />
                보유·이용 기간 : 제공받은 날로부터 1년, 또는 상담 목적 달성 시 즉시 파기<br />
                <span style={{ color: '#52525b' }}>회사는 이 제공에 대해 제휴처로부터 대가를 받습니다. 이용자에게는 비용을 청구하지 않습니다.</span><br />
                동의 거부 권리 : 거부하실 수 있습니다. 다만 상담은 위 제휴처를 통해 이루어져, 거부하시면 상담 신청이 되지 않습니다.
              </ContentBox>

              {isMinor && (
                <ContentBox checked={guardianAgree} onChange={setGuardianAgree} label="만 14세 미만 법정대리인(보호자) 동의" primary={primary}>
                  만 14세가 되지 않은 경우에는 부모님이나 보호자가 동의해 주셔야 개인정보를 받을 수 있어요. (개인정보보호법 제22조의2)<br /><br />
                  이 항목에 체크하면, 위에 적은 보호자 연락처로 <b>확인 문자</b>를 보내 보호자가 동의했는지 확인한 뒤에 상담을 시작합니다. 확인이 되지 않으면 입력한 정보는 바로 지웁니다.<br /><br />
                  보호자는 언제든지 동의를 취소하고 정보를 지워달라고 요청할 수 있어요.
                </ContentBox>
              )}

              <ContentBox checked={marketingAgree} onChange={setMarketingAgree} label="광고성 정보 수신 동의" primary={primary} optional>
                수신 내용 : 입시 설명회·모의실기 일정, 학원 할인·이벤트 등 광고성 정보<br />
                수신 방법 : 문자메시지(SMS/LMS), 카카오 알림톡<br />
                발송 시간 : 오전 8시부터 오후 9시까지만 발송합니다.<br />
                보유 기간 : 수신 동의를 철회하실 때까지<br />
                <b style={{ color: '#3f3f46' }}>이 항목은 선택입니다. 동의하지 않으셔도 학원비 견적과 입시 상담은 그대로 받으실 수 있습니다.</b><br />
                수신 거부 : 문자 하단의 무료 수신거부 번호 또는 고객문의 이메일로 언제든 철회하실 수 있습니다.
              </ContentBox>
            </div>

            <div style={{ marginTop: 20, background: '#fafafa', borderRadius: 12, padding: '16px', fontSize: 12, color: '#a1a1aa', lineHeight: 1.8 }}>
              <p>• 필수 항목은 상담 응대에 꼭 필요한 정보이며, 거부하시면 상담 신청이 제한됩니다.</p>
              <p>• 선택 항목(광고성 정보 수신)에 동의하지 않아도 상담 서비스는 동일하게 제공됩니다.</p>
              <p>• 수집한 정보는 위에 적은 목적 외의 용도로 사용하지 않습니다.</p>
              <p>• 언제든지 동의를 철회할 수 있고, 철회하시면 수집된 개인정보를 지체 없이 파기합니다.</p>
              {isMinor && <p>• 만 14세 미만은 보호자 연락처로 확인 문자를 보낸 뒤 동의가 확인되어야 상담이 진행됩니다.</p>}
              {isTeen && <p>• 미성년자는 개인정보 제공에 본인이 동의할 수 있지만, 학원 수강 계약은 보호자(법정대리인) 동의가 필요합니다.</p>}
            </div>
          </div>

          {/* 하단 고정 버튼 */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '0 32px 32px', background: 'linear-gradient(to top, white 70%, transparent)', paddingTop: 48, boxSizing: 'border-box' }}>
            <button
              type="button"
              onClick={handleConfirm}
              style={{
                width: '100%', padding: '18px', fontSize: 16, fontWeight: 700,
                borderRadius: 16, border: 'none', cursor: allRequired ? 'pointer' : 'not-allowed',
                background: allRequired ? primary : '#d4d4d8',
                color: allRequired ? 'white' : '#a1a1aa',
                transition: 'all 0.2s',
              }}
            >
              동의하고 상담 신청하기
            </button>
          </div>
        </div>
      </div>

      {/* 이탈 경고 모달 */}
      {showAlert && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 340, padding: '36px', textAlign: 'center', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 64, height: 64, background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: primary }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <h5 style={{ fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 8 }}>정말 나가시겠습니까?</h5>
            <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.7, marginBottom: 28 }}>지금 나가시면 작성하신 내용이<br/>모두 사라집니다.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={() => { setShowAlert(false); onClose() }} style={{ flex: 1, padding: '14px', background: '#f4f4f5', color: '#3f3f46', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>나가기</button>
              {/* 동의 화면으로 되돌아가기만 한다. 여기서 바로 제출하면 미동의 상태에서 경고창이 뜬다. */}
              <button type="button" onClick={() => setShowAlert(false)} style={{ flex: 1, padding: '14px', background: primary, color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>계속 쓰기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ContentBox({ checked, onChange, label, primary, optional = false, children }: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  primary: string
  /** 선택 동의 항목 — 거부해도 서비스 제공에 영향 없음(개인정보보호법 제22조 제5항) */
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div style={{ background: 'white', border: checked ? `1.5px solid ${primary}` : '1.5px solid #e4e4e7', borderRadius: 16, overflow: 'hidden' }}>
      <div onClick={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', background: '#fafafa' }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, background: checked ? primary : 'white', border: checked ? 'none' : '2px solid #d4d4d8', flexShrink: 0 }}>
          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111', flex: 1 }}>{label}</span>
        {optional ? (
          <span style={{ fontSize: 12, fontWeight: 600, color: '#71717a', background: '#f4f4f5', padding: '2px 10px', borderRadius: 50 }}>선택</span>
        ) : (
          <span style={{ fontSize: 12, fontWeight: 700, color: primary, background: 'var(--primary-light)', padding: '2px 10px', borderRadius: 50 }}>필수</span>
        )}
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid #f4f4f5' }}>
        <div style={{ height: 80, overflowY: 'auto', fontSize: 12, color: '#71717a', lineHeight: 1.8 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
