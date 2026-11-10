import { useState } from 'react'
import { profile } from '../data/profile'

type Row = { key: string; label: string; display: string; href: string; copy: string }

export default function Contact() {
  const [copied, setCopied] = useState('')

  const rows: Row[] = [
    {
      key: 'mail',
      label: 'mail',
      display: profile.email,
      href: `mailto:${profile.email}`,
      copy: profile.email,
    },
    ...(profile.github
      ? [
          {
            key: 'git',
            label: 'git',
            display: profile.github.replace(/^https?:\/\//, ''),
            href: profile.github,
            copy: profile.github,
          },
        ]
      : []),
  ]

  const copy = async (row: Row) => {
    try {
      await navigator.clipboard.writeText(row.copy)
      setCopied(row.key)
      setTimeout(() => setCopied(''), 1500)
    } catch {
      // 복사 실패 시 무시
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 py-16">
      <p className="font-mono text-xs text-blue-600">// contact</p>
      <h2 className="mt-1 text-3xl font-bold">함께 일해요</h2>
      <p className="mt-2 text-gray-600">채용과 협업 제안 모두 편하게 연락 주세요.</p>

      <ul className="mt-6 max-w-lg divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 font-mono text-sm">
        {rows.map((r) => (
          <li
            key={r.key}
            className="relative flex items-center gap-3 px-4 py-4 transition hover:bg-gray-100 md:gap-4 md:px-5"
          >
            <span className="text-blue-600">$</span>
            <span className="w-12 shrink-0 text-gray-500">{r.label}</span>
            <span className="min-w-0 flex-1 truncate">{r.display}</span>
            <button
              onClick={() => copy(r)}
              aria-label={`${r.label} 복사`}
              className="relative z-10 shrink-0 rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 transition hover:border-blue-500 hover:text-blue-600"
            >
              {copied === r.key ? '복사됨 ✓' : '복사'}
            </button>
            <a
              href={r.href}
              target={r.key === 'git' ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={`${r.label} 열기`}
              className="shrink-0 text-gray-500 transition after:absolute after:inset-0 hover:text-blue-600"
            >
              ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
