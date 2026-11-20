import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { saveHomeScroll } from '../utils/scrollMemory'

const DELAY = 4000

// 개인 프로젝트 화면을 4초마다 바꿔 보여 줍니다. 마우스를 올리거나 포커스하면 멈추고, 움직임 줄이기 설정이면 넘기지 않습니다
export default function HeroSlides({ items }: { items: Project[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (paused || hold || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), DELAY)
    return () => clearTimeout(t)
  }, [index, paused, hold, items.length])

  const p = items[index]

  return (
    <div
      className="hero__media hero-shot hero-slides span-6 start-7"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      aria-roledescription="carousel"
      aria-label="개인 프로젝트 화면"
    >
      {items.map((it, i) => {
        const shot = it.screenshots![0]
        return (
          <Link
            key={it.id}
            to={`/projects/${it.id}`}
            onClick={saveHomeScroll}
            className={`hero-slide${i === index ? ' is-on' : ''}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
          >
            <img src={shot.src} alt={`${it.title} 화면`} width={shot.width} height={shot.height} fetchPriority={i === 0 ? 'high' : 'auto'} loading={i === 0 ? 'eager' : 'lazy'} />
          </Link>
        )
      })}
      <div className="ly-float">
        <div className="ly-float__row"><span className="ly-live">{p.title.split(' (')[0]}</span><span>{p.period}</span></div>
        <div className="ly-float__title">{p.headline ? <><span className="hero-slides__fact">{p.headline.label}</span> {p.headline.value}</> : p.stack.slice(0, 3).join(' · ')}</div>
        <div className="hero-slides__ctrl">
          {items.map((it, i) => (
            <button key={it.id} type="button" className="hero-slides__dot" aria-label={`${it.title.split(' (')[0]} 보기`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />
          ))}
          <button type="button" className="hero-slides__pause" onClick={() => setPaused(!paused)} aria-label={paused ? '슬라이드 재생' : '슬라이드 멈춤'}>
            {paused ? (
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M3 2v8l7-4z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M3 2h2v8H3zM7 2h2v8H7z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
