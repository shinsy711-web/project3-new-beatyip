export type FormData = {
  customer_name: string
  customer_birth: string
  mobile1: string
  mobile2: string
  customer_sex: string
  region: string
  privacy: boolean
}

export type ParsedPhone = {
  mobile1: string
  mobile2: string
}

export const SPECIAL_CHAR_REG = /[ \{\}\[\]\/.,;:|\)*~`^\-_+┼<>\%\'\"\\\(\=]/i

export function validateForm(data: FormData): string | null {
  if (!data.customer_name) return '이름을 입력해 주세요.'
  if (SPECIAL_CHAR_REG.test(data.customer_name)) return '이름에 특수문자는 입력하실 수 없습니다.'
  if (data.customer_name.length > 8) return '이름을 다시 입력해 주세요.'

  if (!data.customer_birth) return '생년월일을 입력해 주세요.'
  if (!/^\d{6}$/.test(data.customer_birth)) return '생년월일 6자리 숫자만 입력해 주세요.'
  const month = parseInt(data.customer_birth.slice(2, 4))
  const day = parseInt(data.customer_birth.slice(4, 6))
  if (month < 1 || month > 12) return '생년월일을 다시 확인해 주세요.'
  if (day < 1 || day > 31) return '생년월일을 다시 확인해 주세요.'

  if (!data.customer_sex) return '성별을 선택해 주세요.'

  if (!data.mobile2) return '전화번호를 다시 입력해 주세요.'
  if (!/^\d+$/.test(data.mobile2)) return '전화번호는 숫자만 입력해 주세요.'
  if (data.mobile2.length < 8) return '전화번호 8자리를 입력해 주세요.'

  if (!data.privacy) return '개인정보수집 및 활용에 동의해 주세요.'

  return null
}

export function parsePhone(mobile1: string, mobile2: string): ParsedPhone | string {
  const isValidPrefix = /^(010|011|016|017|018|019)/.test(mobile2.slice(0, 3))

  if (mobile2.length === 8) {
    if (isValidPrefix) return '전화번호를 다시 입력해주세요.'
    return { mobile1, mobile2 }
  }

  if (mobile2.length === 11) {
    if (isValidPrefix) {
      return { mobile1: mobile2.slice(0, 3), mobile2: mobile2.slice(3) }
    }
    return '전화번호를 다시 입력해주세요.'
  }

  return '전화번호를 다시 입력해주세요.'
}

/**
 * 만 14세 미만 신청 처리 정책.
 *
 *  'block'           — 접수를 막고 보호자가 대신 신청하도록 안내한다. (기본값)
 *  'guardian-verify' — 보호자 정보를 받아 접수하되, 보호자 연락처로 확인 문자를 보내
 *                      동의를 확인한 뒤에만 상담을 진행한다.
 *
 * 개인정보보호법 제22조의2는 법정대리인 동의를 "받고" 그 동의 여부를 "확인"하는 것까지 요구하며,
 * 위반은 제71조 형사처벌(5년 이하 징역 또는 5천만원 이하 벌금) 대상이다.
 * 확인 문자 발송·검증이 백엔드에 실제로 붙기 전까지는 'block'을 유지할 것.
 */
export const UNDER14_POLICY: 'block' | 'guardian-verify' = 'block';

/** 생년월일 6자리(YYMMDD)로 만 나이 계산. 형식이 틀리면 null */
export function ageFromBirth(birth: string): number | null {
  if (!/^\d{6}$/.test(birth)) return null
  const yy = parseInt(birth.slice(0, 2))
  const mm = parseInt(birth.slice(2, 4))
  const dd = parseInt(birth.slice(4, 6))
  const nowYY = new Date().getFullYear() % 100
  const fullYear = yy > nowYY ? 1900 + yy : 2000 + yy
  const today = new Date()
  let age = today.getFullYear() - fullYear
  if (today.getMonth() + 1 < mm || (today.getMonth() + 1 === mm && today.getDate() < dd)) age--
  return age
}

/**
 * 만 14세 미만 — 법정대리인 동의가 필수(개인정보보호법 제22조의2).
 * 위반 시 과태료가 아니라 형사처벌(제71조) 대상이라 판정을 느슨하게 두지 않는다.
 */
export function isUnder14(birth: string): boolean {
  const age = ageFromBirth(birth)
  return age !== null && age < 14
}

/**
 * 만 14세 이상 19세 미만 — 개인정보 동의는 본인이 할 수 있지만(법정대리인 동의 의무 없음),
 * 학원 수강 계약은 민법 제5조상 법정대리인 동의가 필요해 그 사실을 안내한다.
 */
export function isTeen(birth: string): boolean {
  const age = ageFromBirth(birth)
  return age !== null && age >= 14 && age < 19
}
