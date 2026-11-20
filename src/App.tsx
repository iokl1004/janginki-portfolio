import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import SiteHeader from './components/SiteHeader'

const smooth = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth')

// HashRouter에서 #id 링크가 경로로 읽히지 않도록, 같은 페이지 앵커는 부드러운 스크롤로 처리합니다.
// 상세 페이지에서 누르면 홈으로 돌아간 뒤 그 섹션으로 갑니다
function useAnchorScroll() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]')
      const href = a?.getAttribute('href')
      if (!href || href.startsWith('#/')) return
      e.preventDefault()
      const id = href.slice(1)
      const go = () => {
        const el = document.getElementById(id)
        if (!el) return
        el.scrollIntoView({ behavior: smooth() })
        if (id === 'top') (document.querySelector('main') as HTMLElement | null)?.focus({ preventScroll: true })
      }
      if (pathname === '/') return go()
      navigate('/')
      setTimeout(go, 60)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate, pathname])
}

export default function App() {
  useAnchorScroll()
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<CaseStudy />} />
      </Routes>
    </>
  )
}
