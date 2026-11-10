const KEY = 'homeScrollY'

// 상세 페이지로 가기 직전 스크롤 위치 저장
export function saveHomeScroll() {
  try {
    sessionStorage.setItem(KEY, String(window.scrollY))
  } catch {
    // 저장 실패 시 무시
  }
}

// 홈으로 돌아왔을 때 저장된 위치로 복원 (한 번 쓰고 지움)
export function restoreHomeScroll() {
  try {
    const y = sessionStorage.getItem(KEY)
    if (y !== null) {
      sessionStorage.removeItem(KEY)
      window.scrollTo(0, Number(y))
    }
  } catch {
    // 복원 실패 시 무시
  }
}