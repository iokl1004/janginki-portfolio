import { useState } from 'react'
import { profile } from '../data/profile'
import { scrollToId } from '../utils/scroll'
import { useActiveSection } from '../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'

const menu = [
  { id: 'projects', label: '프로젝트' },
  { id: 'stack', label: '기술 스택' },
  { id: 'experience', label: '경력' },
  { id: 'credentials', label: '학력/자격' },
  { id: 'contact', label: '연락처' },
]
const sectionIds = ['top', ...menu.map((m) => m.id)]

export default function Header() {
  const [open, setOpen] = useState(false)

  const current = useActiveSection(sectionIds)
  const active = current === 'top' ? '' : current

  const go = (id: string) => {
    scrollToId(id)
    setOpen(false)
  }

  const itemClass = (id: string) =>
    active === id
      ? 'font-medium text-blue-600'
      : 'text-gray-600 hover:text-blue-600'

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <button onClick={() => go('top')} className="font-semibold">
          {profile.name}
        </button>

        {/* 데스크톱 메뉴 */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex gap-6 text-sm">
            {menu.map((m) => (
              <li key={m.id}>
                <button onClick={() => go(m.id)} className={itemClass(m.id)}>
                  {m.label}
                </button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* 모바일 버튼 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="메뉴 열기"
            aria-expanded={open}
            className="rounded-lg border border-gray-200 px-2 py-1 text-sm"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* 모바일 드롭다운 */}
      {open && (
        <ul className="border-t border-gray-200 px-6 py-2 text-sm md:hidden">
          {menu.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => go(m.id)}
                className={`w-full py-2 text-left ${itemClass(m.id)}`}
              >
                {m.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
