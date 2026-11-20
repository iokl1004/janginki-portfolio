import { useActiveSection } from '../hooks/useActiveSection'

const items = [
  { id: 'top', label: '소개' },
  { id: 'work', label: '프로젝트' },
  { id: 'erp', label: '실무' },
  { id: 'stack', label: '기술' },
  { id: 'career', label: '경력' },
  { id: 'contact', label: '연락' },
]
const ids = items.map((i) => i.id)

// 오른쪽 여백에 세로로 놓인 메뉴. 지금 읽는 섹션은 파랗게, 점이 길어집니다
export default function SideNav() {
  const active = useActiveSection(ids)
  return (
    <nav className="side-nav" aria-label="섹션 바로가기">
      <ul>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
              <span className="side-nav__label">{label}</span>
              <span className="side-nav__dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
