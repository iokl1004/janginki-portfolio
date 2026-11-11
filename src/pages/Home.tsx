import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import FeaturedProject from '../components/FeaturedProject'
import PersonalProjects from '../components/PersonalProjects'
import TechStack from '../components/TechStack'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import SectionHeading from '../components/SectionHeading'
import StackDiagram from '../components/StackDiagram'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { scrollToId } from '../utils/scroll'
import SideNav from '../components/SideNav'
import TopButton from '../components/TopButton'
import Credentials from '../components/Credentials'
import { useLayoutEffect } from 'react'
import { restoreHomeScroll } from '../utils/scrollMemory'
import { useReveal } from '../hooks/useReveal'

export default function Home() {
  useLayoutEffect(() => {
    restoreHomeScroll()
  }, [])
  useReveal()

  const featured = projects
    .filter((p) => p.featured !== undefined)
    .sort((a, b) => a.featured! - b.featured!)
  const others = projects.filter((p) => p.featured === undefined)

  const companyCount = projects.filter((p) => p.kind !== 'personal').length
  const stats = [
    { value: '약 3년', label: '실무 경력' },
    { value: `${companyCount}건`, label: '실무 프로젝트' },
    { value: '100여 개', label: 'SQL 프로시저 개발' },
  ]

  return (
    <>
      <Header />
      <SideNav />
      <TopButton />

      <section id="top" className="relative scroll-mt-16 overflow-hidden">
        <div aria-hidden className="hero-backdrop absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <p className="font-medium text-blue-600">
              {profile.name} · {profile.label}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">
              <span className="text-blue-600">{profile.headline[0]}</span>
              <br />
              {profile.headline[1]}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">{profile.intro}</p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-2xl font-bold tracking-tight">{s.value}</dd>
                  <dt className="mt-0.5 text-sm text-gray-500">{s.label}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToId('projects')}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                프로젝트 보기
              </button>
              <button
                onClick={() => scrollToId('contact')}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium transition hover:border-blue-500"
              >
                연락하기
              </button>
              <div className="ml-2 flex gap-4 font-mono text-sm text-gray-500">
                <a href={`mailto:${profile.email}`} className="transition hover:text-blue-600">
                  email ↗
                </a>
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-blue-600"
                  >
                    github ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          <StackDiagram />
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6">
        <section id="projects" data-reveal className="scroll-mt-16 py-20">
          <SectionHeading
            eyebrow="Projects"
            title="대표 프로젝트"
            description="문제에서 시작해 결과로 끝나는 작업들"
          />

          <div className="mt-10 space-y-6">
            {featured.map((p, i) => (
              <FeaturedProject key={p.id} project={p} reverse={i % 2 === 1} />
            ))}
          </div>

          <h3 className="mt-16 text-xl font-semibold">다른 프로젝트</h3>
          {/* 마지막 줄에 카드가 하나만 남으면 그 줄을 꽉 채웁니다 */}
          <div className="mt-4 grid gap-4 md:grid-cols-2 md:max-lg:[&>:last-child:nth-child(odd)]:col-span-2 lg:grid-cols-3 lg:[&>:last-child:nth-child(3n+1)]:col-span-3">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          <PersonalProjects />
        </section>

        <TechStack />
        <Experience />
        <Credentials />
        <Contact />
      </main>
    </>
  )
}
