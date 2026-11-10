import { useEffect, useState } from 'react'

export default function TopButton() {
  const [visible, setVisible] = useState(false)

  // 어느 정도 내려왔을 때만 버튼 표시
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로 이동"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-5 z-10 flex h-12 items-center gap-1.5 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <span aria-hidden className="text-base leading-none">↑</span>
      TOP
    </button>
  )
}