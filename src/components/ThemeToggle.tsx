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
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-sm"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}