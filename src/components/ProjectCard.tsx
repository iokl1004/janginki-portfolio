import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { saveHomeScroll } from '../utils/scrollMemory'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      onClick={saveHomeScroll}
      className="flex flex-col rounded-xl border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md"
    >
      <p className="text-sm text-gray-500">
        {project.period}
        {project.company && ` · ${project.company}`}
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{project.summary}</p>

      {project.headline && (
        <p className="mt-4 text-sm text-gray-500">
          {project.headline.label}{' '}
          <span className="text-lg font-bold text-blue-600">{project.headline.value}</span>
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="rounded bg-gray-100 px-2 py-1 text-xs">
            {s}
          </span>
        ))}
      </div>
      <p className="mt-auto pt-4 text-sm text-blue-600">케이스 스터디 보기 →</p>
    </Link>
  )
}