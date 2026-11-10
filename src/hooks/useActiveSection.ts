import { useEffect, useState } from 'react'

// 지금 화면에서 읽고 있는 섹션의 id를 알려 줍니다.
// ids는 컴포넌트 밖에 상수로 선언해서 넘겨 주세요 (렌더링마다 새로 만들어지지 않도록).
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const update = () => {
      // 페이지 맨 아래에 닿으면 짧은 마지막 섹션(연락처)도 선택되도록 처리
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }

      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = id
        }
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return active
}
