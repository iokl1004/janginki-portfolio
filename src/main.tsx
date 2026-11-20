import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// 디자인 키트(system.js 등)가 그려진 DOM을 읽도록 첫 렌더를 동기로 끝냅니다
const root = createRoot(document.getElementById('root')!)
flushSync(() =>
  root.render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  ),
)
