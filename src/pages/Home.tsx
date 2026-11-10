import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import PersonalProjects from '../components/PersonalProjects'
import TechStack from '../components/TechStack'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { scrollToId } from '../utils/scroll'
import SideNav from '../components/SideNav'
import TopButton from '../components/TopButton'
import Credentials from '../components/Credentials'
import { useLayoutEffect } from 'react'
import { restoreHomeScroll } from '../utils/scrollMemory'

export default function Home() {
  useLayoutEffect(() => {
    restoreHomeScroll()
  }, [])
  
  const companyProjects = projects.filter((p) => p.kind !== 'personal')
  const personal = projects.filter((p) => p.kind === 'personal')

  return (
    <>
      <Header />
      <SideNav />
      <TopButton />
      <main className="mx-auto max-w-4xl px-6">
        <section id="top" className="scroll-mt-16 py-24">
          <p className="text-sm text-gray-500">{profile.label}</p>
          <h1 className="mt-2 text-5xl font-bold">{profile.name}</h1>
          <p className="mt-4 text-xl text-gray-600">{profile.tagline}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.work.map((s) => (
              <span key={s} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:bg-blue-950">
                {s}
              </span>
            ))}
            {profile.skills.study.map((s) => (
              <span key={s} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
                {s} <span className="text-xs">(학습)</span>
              </span>
            ))}
          </div>
          
          <p className="mt-3 text-sm text-gray-500">{profile.domain}</p>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => scrollToId('projects')}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
              프로젝트 보기
            </button>
            <button
              onClick={() => scrollToId('contact')}
              className="rounded-lg border border-gray-300 px-5 py-2"
            >
              연락하기
            </button>
          </div>
          <div className="mt-5 flex gap-4 font-mono text-sm text-gray-500">
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
        </section>

        <section id="projects" className="scroll-mt-16 py-16">
          <h2 className="text-3xl font-bold">프로젝트</h2>
          <p className="mt-2 text-gray-600">문제에서 시작해 결과로 끝나는 작업들</p>

          <h3 className="mt-8 text-xl font-semibold">회사 프로젝트</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {companyProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {personal.length > 0 && (
            <>
              <h3 className="mt-12 text-xl font-semibold">개인 프로젝트</h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {personal.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </>
          )}

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
