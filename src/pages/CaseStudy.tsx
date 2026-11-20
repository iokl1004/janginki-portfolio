import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import './case.css'

export default function CaseStudy() {
  const { id } = useParams()
  const index = projects.findIndex((p) => p.id === id)
  const project = projects[index]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <main id="top" className="case">
        <div className="wrap case__head">
          <h1>프로젝트를 찾을 수 없습니다</h1>
          <Link className="link" to="/">홈으로 돌아가기</Link>
        </div>
      </main>
    )
  }

  const next = projects[(index + 1) % projects.length]
  const [mainShot, ...moreShots] = project.screenshots ?? []
  const answered = project.qna?.filter((i) => i.a.trim()) ?? []
  const story = [
    { label: '문제', body: project.problem },
    { label: '접근', body: project.approach },
    ...(project.why ? [{ label: '이렇게 고른 이유', body: project.why }] : []),
  ]

  return (
    <main id="top" className="case" tabIndex={-1}>
      <section className="case__head" data-enter aria-labelledby="case-h">
        <div className="wrap">
          <Link className="case__back" to="/">프로젝트 목록으로</Link>
          <h1 id="case-h">{project.title}</h1>
          <p className="case__lead">{project.summary}</p>
          <dl className="case__facts">
            <div><dt>기간</dt><dd>{project.period}</dd></div>
            <div><dt>구분</dt><dd>{project.kind === 'personal' ? '개인 프로젝트' : project.company}</dd></div>
            <div className="case__facts-wide"><dt>역할</dt><dd>{project.role}</dd></div>
            {project.headline && <div><dt>{project.headline.label}</dt><dd className="case__fact-hi">{project.headline.value}</dd></div>}
          </dl>
          {project.links && project.links.length > 0 && (
            <div className="btn-row">
              {project.links.map((l, i) => (
                <a key={l.url} className={`btn ${i === 0 ? 'btn--primary' : 'btn--secondary'}`} href={l.url} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          )}
          {(project.note || project.isPrivate) && (
            <p className="case__note muted">{project.note ?? '회사 프로젝트라 코드와 화면은 공개하지 않습니다.'}</p>
          )}
        </div>
      </section>

      {(mainShot || project.flow) && (
        <section className="case__media" aria-label="화면과 흐름">
          <div className="wrap">
            {mainShot && (
              <div className="case__shots">
                {[mainShot, ...moreShots].map((s, i) => (
                  <figure key={s.src} className={`case__fig${i === 0 ? ' case__fig--main' : ''}`}>
                    <img className="case__shot" src={s.src} width={s.width} height={s.height} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            {project.flow && (
              <ol className="case__flow" aria-label="처리 흐름">
                {project.flow.map((step, i) => (
                  <li key={step}><span className="case__step">{String(i + 1).padStart(2, '0')}</span>{step}</li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      <section className="case__body" aria-label="문제와 접근, 결과">
        <div className="wrap">
          {story.map((s) => (
            <div className="case__row" key={s.label}>
              <h2>{s.label}</h2>
              <p>{s.body}</p>
            </div>
          ))}
          <div className="case__row">
            <h2>결과</h2>
            <ul className="rows">
              {project.result.map((r) => (
                <li key={r}><p>{r}</p></li>
              ))}
            </ul>
          </div>
          {answered.length > 0 && (
            <div className="case__row">
              <h2>자주 받는 질문</h2>
              <div className="faq">
                {answered.map((q) => (
                  <div className="faq__item" key={q.q}>
                    <h3>{q.q}</h3>
                    <p>{q.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="case__row">
            <h2>사용 기술</h2>
            <p className="case__chips">
              {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </p>
          </div>
        </div>
      </section>

      <section className="case__next" aria-label="다음 프로젝트">
        <div className="wrap">
          <Link className="case__next-link" to={`/projects/${next.id}`}>
            <span className="muted">다음 프로젝트</span>
            <span className="case__next-title">{next.title}</span>
            <span className="muted">{next.period}</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
