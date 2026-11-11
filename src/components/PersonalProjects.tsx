import { useState } from 'react'
import { personalProjects } from '../data/personalProjects'

export default function PersonalProjects() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-12">
      <h3>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="learning-projects"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <span aria-hidden className={`text-base transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-90' : ''}`}>
            ▸
          </span>
          그 외 학습 프로젝트
          <span className="text-base font-normal text-gray-500">{personalProjects.length}개</span>
        </button>
      </h3>

      {/* invisible: 닫혀 있을 때 안쪽 링크로 키보드 포커스가 가지 않게 함 */}
      <div
        id="learning-projects"
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-2 text-sm text-gray-600">
            React를 익히며 만든 실습 프로젝트입니다. 강의 실습은 강의명을 함께 표기했습니다.
          </p>
          <ul className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-200">
            {personalProjects.map((p) => (
              <li key={p.title} className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">
                    <span className="ml-1 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-normal text-gray-500">
                      {p.tag}
                    </span>
                    {' '}{p.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {p.period} · {p.description}
                  </p>
                </div>
                <div className="flex shrink-0 gap-3 text-sm">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="text-blue-600">
                      Live ↗
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="text-blue-600">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
