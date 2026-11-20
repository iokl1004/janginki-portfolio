import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import ThemeToggle from './ThemeToggle'
import { sections } from '../data/sections'


const base = import.meta.env.BASE_URL

// 홈과 상세 페이지가 함께 쓰는 상단 바. App에서 한 번만 그려서 키트(system.js)의 메뉴 동작이 끊기지 않게 합니다
export default function SiteHeader() {
  return (
    <header className="nav nav--split">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">본문으로 건너뛰기</a>
        <Link className="nav__logo" to="/">
          <img src={`${base}favicon.svg`} alt="" width={26} height={26} className="logo-img" />
          {profile.name}
        </Link>
        <nav className="nav__links" aria-label="주 메뉴">
          {sections.map((n) => (
            <div className="nav__item" key={n.id}>
              <a className="nav__link" href={`#${n.id}`}>{n.label}</a>
            </div>
          ))}
        </nav>
        <div className="nav__actions">
          <ThemeToggle />
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>이메일 보내기</a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="메뉴">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>
    </header>
  )
}
