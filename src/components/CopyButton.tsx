import { useState } from 'react'

// 클립보드 API가 막힌 환경(포커스 없음, http 등)을 위한 예전 방식 복사
function legacyCopy(text: string) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
  document.body.appendChild(ta)
  ta.select()
  let ok: boolean
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  ta.remove()
  return ok
}

// 값을 클립보드에 복사하고 1.5초 동안 결과를 보여 줍니다
export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'fail'>('idle')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setState('done')
    } catch {
      setState(legacyCopy(value) ? 'done' : 'fail')
    }
    setTimeout(() => setState('idle'), 1500)
  }

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`${label} 복사`}>
      <span aria-live="polite">{state === 'done' ? '복사됨' : state === 'fail' ? '복사 실패' : '복사'}</span>
    </button>
  )
}
