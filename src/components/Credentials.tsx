import SectionHeading from './SectionHeading'

const education = [
  {
    period: '2019.03 ~ 2020.02',
    school: '인하공업전문대학',
    degree: '학사',
    detail: '컴퓨터정보공학과 (전공심화 1년 과정) · 정보처리기사 자격 취득 · 졸업',
  },
  {
    period: '2014.03 ~ 2019.02',
    school: '인하공업전문대학',
    degree: '전문학사',
    detail: '컴퓨터정보과 · 제33대 컴퓨터정보과 학회장직 수행 · 졸업',
  },
  {
    period: '2011.03 ~ 2014.02',
    school: '강서공업고등학교',
    degree: '고등학교',
    detail: '공업계열 · 졸업',
  },
]

const certificates: { name: string; issuer: string; date?: string }[] = [
  { name: 'SQL 개발자 (SQLD)', issuer: '데이터자격검정', date: '2022.09.30' },
  { name: '정보처리기사', issuer: '한국산업인력공단', date: '2019.08.16' },
  { name: '자동차운전면허 1종 보통', issuer: '경찰청', date: '2014.09.20' },
]

export default function Credentials() {
  return (
    <section id="credentials" data-reveal className="scroll-mt-16 py-20">
      <SectionHeading eyebrow="Credentials" title="학력 / 자격" />

      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-blue-600">학력</h3>
          <ul className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">
            {education.map((e) => (
              <li key={e.period} className="flex flex-col gap-1 p-4 md:flex-row md:gap-6">
                <span className="w-44 shrink-0 text-sm text-gray-500">{e.period}</span>
                <div>
                  <p className="font-medium">
                    {e.school} <span className="font-normal text-gray-600">/ {e.degree}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-gray-600">{e.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-blue-600">자격증</h3>
          <ul className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">
            {certificates.map((c) => (
              <li key={c.name} className="flex flex-col gap-1 p-4 md:flex-row md:gap-6">
                <span className="w-44 shrink-0 text-sm text-gray-500">{c.date ?? ''}</span>
                <p className="font-medium">
                  {c.name} <span className="font-normal text-gray-600">/ {c.issuer}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
