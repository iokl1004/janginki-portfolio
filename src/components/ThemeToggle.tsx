import { useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // 저장 실패 시 무시
    }
    setDark(next)
  }

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'} aria-pressed={dark}>
      {dark ? (
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      ) : (
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
      )}
    </button>
  )
}
