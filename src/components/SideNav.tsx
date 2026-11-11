import { scrollToId } from '../utils/scroll'
import { useActiveSection } from '../hooks/useActiveSection'

const items = [
  { id: 'top', label: '소개' },
  { id: 'projects', label: '프로젝트' },
  { id: 'stack', label: '기술 스택' },
  { id: 'experience', label: '경력' },
  { id: 'credentials', label: '학력/자격' },
  { id: 'contact', label: '연락처' },
]
const ids = items.map((i) => i.id)

export default function SideNav() {
  const active = useActiveSection(ids)

  return (
    <nav
      aria-label="섹션 바로가기"
      className="fixed right-6 top-1/2 z-10 hidden w-36 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white/90 p-2 shadow-sm backdrop-blur dark:bg-slate-900/90 2xl:block"
    >
      <p className="px-3 pb-1 pt-1 text-xs font-medium text-gray-500">바로가기</p>
      <ul className="flex flex-col gap-0.5">
        {items.map(({ id, label }) => {
          const on = active === id
          return (
            <li key={id}>
              <button
                onClick={() => scrollToId(id)}
                aria-current={on ? 'true' : undefined}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                  on
                    ? 'bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    on ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
