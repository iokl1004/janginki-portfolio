import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import ThemeToggle from '../components/ThemeToggle'

export default function CaseStudy() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p>프로젝트를 찾을 수 없습니다.</p>
        <Link to="/" className="text-blue-600">← 홈으로</Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-sm text-blue-600">← 프로젝트 목록</Link>
        <ThemeToggle />
      </div>

      <p className="mt-6 text-sm text-gray-500">
        {project.period}
        {project.company && ` · ${project.company}`} · {project.role}
      </p>
      <h1 className="mt-2 text-4xl font-bold">{project.title}</h1>
      <p className="mt-4 text-lg text-gray-600">{project.summary}</p>
      <p className="mt-2 text-sm text-gray-500">
        {project.kind === 'personal' ? '개인 프로젝트' : '회사 프로젝트'} ·{' '}
        {project.isPrivate ? '코드 비공개' : '코드 공개'}
      </p>

      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm hover:border-blue-500"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      {project.note && (
        <p className="mt-4 rounded-lg border border-gray-200 bg-gray-100 p-3 text-sm text-gray-600">
          {project.note}
        </p>
      )}

      {project.flow && (
        <ol className="mt-8 flex flex-col gap-2 md:flex-row md:items-stretch">
          {project.flow.map((step, i) => (
            <li key={step} className="flex-1 rounded-lg border border-gray-200 p-3 text-sm">
              <span className="block text-xs text-blue-600">STEP {i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      )}

      <Section label="01 Problem" body={project.problem} />
      <Section label="02 Approach" body={project.approach} />

      <section className="mt-10">
        <h2 className="text-sm font-semibold text-blue-600">03 Result</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {project.result.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      {project.why && <Section label="Why this choice" body={project.why} />}

      {project.qna && project.qna.some((i) => i.a.trim()) && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-blue-600">자주 받는 질문</h2>
          <div className="mt-3 space-y-2">
            {project.qna
              .filter((i) => i.a.trim())
              .map((i) => (
                <details key={i.q} className="rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer font-medium">{i.q}</summary>
                  <p className="mt-2 leading-relaxed text-gray-700">{i.a}</p>
                </details>
              ))}
          </div>
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="rounded bg-gray-100 px-2 py-1 text-xs">{s}</span>
        ))}
      </div>
    </main>
  )
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold text-blue-600">{label}</h2>
      <p className="mt-2 leading-relaxed">{body}</p>
    </section>
  )
}
