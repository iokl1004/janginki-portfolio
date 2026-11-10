import { useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )

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
    <button
      onClick={toggle}
      aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="rounded-lg border border-gray-200 px-2 py-1 text-sm"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}