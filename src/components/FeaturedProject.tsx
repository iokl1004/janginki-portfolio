import { Link } from 'react-router-dom'
import type { Project, Screenshot } from '../data/projects'
import { saveHomeScroll } from '../utils/scrollMemory'

export default function FeaturedProject({ project, reverse }: { project: Project; reverse?: boolean }) {
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-gray-200 transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-xl hover:shadow-black/5 md:grid-cols-2">
      <div className="flex flex-col p-7 md:p-9">
        <p className="text-sm text-gray-500">
          {project.kind === 'personal' ? '개인 프로젝트' : project.company} · {project.period}
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-gray-600">{project.summary}</p>
        {project.headline && (
          <p className="mt-4 text-sm text-gray-500">
            {project.headline.label}{' '}
            <span className="text-lg font-bold text-blue-600">{project.headline.value}</span>
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <span key={s} className="rounded bg-gray-100 px-2 py-1 text-xs">
              {s}
            </span>
          ))}
        </div>

        {/* 카드 전체가 케이스 스터디 링크이고, 외부 링크만 그 위에 올라옵니다 */}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-6 text-sm font-medium">
          <Link
            to={`/projects/${project.id}`}
            onClick={saveHomeScroll}
            className="text-blue-600 after:absolute after:inset-0"
          >
            케이스 스터디 보기 <span className="inline-block transition group-hover:translate-x-1">→</span>
          </Link>
          {project.links?.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 text-gray-600 transition hover:text-blue-600"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className={`flex items-center justify-center bg-blue-50 p-7 md:p-9 dark:bg-blue-950/40 ${reverse ? 'md:order-first' : ''}`}
      >
        {project.screenshots ? (
          <ScreenshotPreview shots={project.screenshots} />
        ) : (
          project.flow && <FlowPreview steps={project.flow} />
        )}
      </div>
    </article>
  )
}

function FlowPreview({ steps }: { steps: string[] }) {
  return (
    <ol className="w-full max-w-xs space-y-2">
      {steps.map((step, i) => (
        <li
          key={step}
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm dark:bg-slate-900"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 font-mono text-xs text-white">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  )
}

function ScreenshotPreview({ shots }: { shots: Screenshot[] }) {
  const [main, sub] = shots

  return (
    <div className="relative w-full pb-14">
      <img
        src={main.src}
        width={main.width}
        height={main.height}
        alt=""
        loading="lazy"
        className="w-[92%] rounded-lg border border-gray-200 shadow-md"
      />
      {sub && (
        <img
          src={sub.src}
          width={sub.width}
          height={sub.height}
          alt=""
          loading="lazy"
          className="absolute bottom-0 right-0 w-3/5 rounded-lg border border-gray-200 shadow-xl transition duration-300 group-hover:-translate-y-1"
        />
      )}
    </div>
  )
}
