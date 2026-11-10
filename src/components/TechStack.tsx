import { techStack } from '../data/techStack'

export default function TechStack() {
  return (
    <section id="stack" className="scroll-mt-16 py-16">
      <h2 className="text-3xl font-bold">기술 스택</h2>
      <p className="mt-2 text-gray-600">
        숙련도 대신, 실제로 어디에 썼는지를 적었습니다. 실무는 회사 프로젝트에서 쓴 기술이고, 학습은 개인 프로젝트로 익힌 기술입니다.
      </p>
      <div className="mt-8 space-y-8">
        {techStack.map((g) => (
          <div key={g.group}>
            <h3 className="text-sm font-semibold text-blue-600">{g.group}</h3>
            <ul className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">
              {g.items.map((i) => (
                <li key={i.name} className="flex flex-col gap-1 p-4 md:flex-row md:gap-6">
                  <span className="flex w-64 shrink-0 items-center gap-2 font-medium">
                  {i.level && (
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-normal ${
                          i.level === 'work'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {i.level === 'work' ? '실무' : '학습'}
                      </span>
                    )}
                    {i.name}
                    </span>
                  <span className="text-gray-600">{i.usage}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
