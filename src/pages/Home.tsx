/*
  type: service (사람을 채용하는 페이지)
  deal: hero split, nav nav-split, close close-photo → close-word 머리줄(사진 없음, 이름 없이),
        footer footer-dark, rhythm space, buttons arrow, mark: 고유 로고(favicon.svg)
  palette white-link-blue: 흰 바탕에 링크 파랑, 코드 에디터와 문서의 색. type red-hat (+ Pretendard)
  moments: picture-develops (#work 의 책있나 화면)
*/
import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/projects'
import { profile } from '../data/profile'
import { personalProjects } from '../data/personalProjects'
import { restoreHomeScroll, saveHomeScroll } from '../utils/scrollMemory'
import SideNav from '../components/SideNav'
import HeroSlides from '../components/HeroSlides'
import CopyButton from '../components/CopyButton'
import { sections } from '../data/sections'
import './home.css'

const base = import.meta.env.BASE_URL
const icon = (id: string) => `${base}kit/icons/${id}.svg`

const arrow = (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
)

const stackGroups = [
  {
    name: '서버와 업무 로직',
    icons: [['java', 'Java'], ['spring', 'Spring'], ['nodejs', 'Node.js'], ['supabase', 'Supabase']],
    line: '업무 규칙이 많은 ERP와 작은 서비스의 서버를 모두 만들었습니다.',
    used: [['해광 인사 ERP', 'Java 11, Spring'], ['책있나', 'Vercel 함수'], ['memoir', 'Edge Functions']],
  },
  {
    name: '데이터',
    icons: [['postgresql', 'PostgreSQL'], ['oracle', 'Oracle'], ['mongodb', 'MongoDB'], ['redis', 'Redis']],
    line: '프로시저 100여 개를 짰고, 권한은 DB 규칙(RLS)으로 지킵니다.',
    used: [['한미엔택 ERP', '급여 마감 프로시저'], ['대한축구협회', 'Oracle 11g'], ['책있나', 'Redis 캐시']],
  },
  {
    name: '화면',
    icons: [['react', 'React'], ['typescript', 'TypeScript']],
    line: '업무 화면은 JSP와 Nexacro로, 서비스 화면은 React로 만듭니다.',
    used: [['대한축구협회', 'Nexacro 화면 설계'], ['해광 인사 ERP', 'IBSheet 그리드'], ['책있나', 'TanStack Query']],
  },
  {
    name: '검증과 배포',
    icons: [['github-actions', 'GitHub Actions'], ['vitest', 'Vitest'], ['playwright', 'Playwright'], ['git', 'Git'], ['subversion', 'SVN']],
    line: '실무 형상관리는 SVN, 지금은 Git과 GitHub Actions를 씁니다.',
    used: [['책있나', '단위 테스트 186개'], ['책있나', '화면 테스트 8개'], ['memoir', '통합 테스트 13개']],
  },
  {
    name: 'AI 도구',
    icons: [['openai', 'ChatGPT'], ['gemini', 'Gemini'], ['claude', 'Claude Code']],
    line: '오류 분석, 학습, 코드 검토에 AI를 쓰고, 결과는 직접 확인합니다.',
    used: [['ChatGPT', '오류 원인 분석, SQL 검토'], ['Gemini', '새 기술 학습'], ['Claude Code', '코드 작성과 검토']],
  },
]

const career = [
  { company: '사람누리', role: '급여팀 책임', period: '2025.12 ~ 2026.06', line: '인사·급여·평가 ERP를 Java 11, Spring, JPA와 MyBatis로 개발', more: '약 1,000건 인사 데이터 그리드와 급여 출력물 개발' },
  { company: '개인 학습', role: '풀스택 독학', period: '2024.07 ~ 2025.11', line: 'React, Node.js, MongoDB로 영화 정보 서비스 개발', more: '강의에 없던 회원 탈퇴, 중복 이메일 처리를 직접 추가' },
  { company: '지인 회사', role: '아르바이트 (비개발)', period: '2024.07 ~ 2024.11', line: '교통신호제어기 유지보수 지원', more: '개인 학습과 병행' },
  { company: '티에이케이정보시스템', role: 'SM2팀 주임', period: '2022.04 ~ 2024.07', line: '인사·급여·근태·구매·물류 ERP 구축과 유지보수', more: 'MS-SQL, Oracle 프로시저 100여 개와 SAP ABAP 수출 모듈' },
]

const credentials = [
  { name: 'SQL 개발자 (SQLD)', where: '데이터자격검정', when: '2022.09' },
  { name: '정보처리기사', where: '한국산업인력공단', when: '2019.08' },
  { name: '컴퓨터정보공학 학사', where: '인하공업전문대학 전공심화', when: '2020.02' },
  { name: '컴퓨터정보과 전문학사', where: '인하공업전문대학', when: '2019.02' },
]

function WorkTile({ p }: { p: Project }) {
  const shot = p.screenshots?.[0]
  return (
    <Link className="tile span-6" to={`/projects/${p.id}`} onClick={saveHomeScroll}>
      {shot && (
        <div className="tile__media shot">
          <img src={shot.src} srcSet={shot.small && `${shot.small} 720w, ${shot.src} 1280w`} sizes="(max-width: 1023px) 100vw, 640px" alt={`${p.title} 화면`} width={shot.width} height={shot.height} loading="lazy" />
        </div>
      )}
      <div className="tile__head">
        <h3>{p.title}</h3>
        <span className="tile__price muted">{p.period}</span>
      </div>
      <p>{p.summary}</p>
    </Link>
  )
}

export default function Home() {
  useLayoutEffect(() => {
    restoreHomeScroll()
  }, [])

  const [lead, ...rest] = projects
    .filter((p) => p.kind === 'personal' && p.featured !== undefined)
    .sort((a, b) => a.featured! - b.featured!)
  const company = projects.filter((p) => p.kind !== 'personal')

  return (
    <>
      <SideNav />
      <main id="top" tabIndex={-1}>
        <section className="hero hero--split" data-enter aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text grid hero__grid">
              <div className="hero__text span-5">
                <h1 id="hero-h">업무 시스템부터 서비스까지 만드는 개발자</h1>
                <p className="hero__lead">
                  인사·급여 ERP를 Java/Spring과 SQL로 3년간 만들었고, 지금은 직접 기획한 서비스를 React로 만들어 운영합니다.
                </p>
                <ul className="hero-contact">
                  <li>
                    <span className="hero-contact__label">Email</span>
                    <a className="hero-contact__value" href={`mailto:${profile.email}`}>{profile.email}</a>
                    <CopyButton value={profile.email} label="이메일 주소" />
                  </li>
                  <li>
                    <span className="hero-contact__label">GitHub</span>
                    <a className="hero-contact__value" href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace('https://', '')}</a>
                    <CopyButton value={profile.github} label="GitHub 주소" />
                  </li>
                </ul>
                <a className="link hero-more" href="#work">프로젝트 보기</a>
                <dl className="hero__facts">
                  <div><dt>실무 경력</dt><dd>약 3년</dd></div>
                  <div><dt>실무 프로젝트</dt><dd>{company.length}건</dd></div>
                  <div><dt>SQL 프로시저</dt><dd>100여 개</dd></div>
                </dl>
              </div>
              <HeroSlides items={[lead, ...rest]} />
            </div>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-h">
          <div className="wrap">
            <div className="group">
              <div className="section-head">
                <h2 id="work-h">직접 만든 서비스 <span className="muted">기획부터 배포까지 혼자 했습니다.</span></h2>
              </div>
              <div className="grid grid--top">
                <div className="span-5 stack-4 lead-text">
                  <p className="t-label muted">{lead.period} · 1인 개발</p>
                  <h3 className="t-h3">{lead.title}</h3>
                  <p>{lead.summary}</p>
                  {lead.headline && <p className="muted">{lead.headline.label} <strong className="lead-fact">{lead.headline.value}</strong></p>}
                  <Link className="link" to={`/projects/${lead.id}`} onClick={saveHomeScroll}>케이스 스터디 읽기</Link>
                </div>
                <figure className="develop span-6 start-7" data-moment="picture-develops">
                  <Link to={`/projects/${lead.id}`} onClick={saveHomeScroll} aria-label={`${lead.title} 케이스 스터디 읽기`}>
                    <img src={lead.screenshots![1].src} srcSet={lead.screenshots![1].small && `${lead.screenshots![1].small} 720w, ${lead.screenshots![1].src} 1280w`} sizes="(max-width: 1023px) 100vw, 640px" alt="" width={1280} height={800} loading="lazy" />
                  </Link>
                </figure>
              </div>
            </div>
            <div className="grid grid--top">
              {rest.map((p) => (
                <WorkTile key={p.id} p={p} />
              ))}
            </div>
            <div className="practice">
              <h3 className="practice__head">강의와 독학으로 만든 실습 <span className="muted">{personalProjects.length}개</span></h3>
              <ul className="rows practice__list">
                {personalProjects.map((pp) => (
                  <li key={pp.title}>
                    <span className="rows__name">{pp.title}</span>
                    <span className="rows__value practice__links">
                      {pp.live && <a className="link" href={pp.live} target="_blank" rel="noreferrer">사이트</a>}
                      {pp.repo && <a className="link" href={pp.repo} target="_blank" rel="noreferrer">GitHub</a>}
                    </span>
                    <p className="muted">{pp.tag} · {pp.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="erp" aria-labelledby="erp-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="erp-h">실무 ERP 프로젝트 <span className="muted">인사, 급여, 근태를 맡았습니다.</span></h2>
            </div>
            <div className="grid grid--top">
              <ul className="rows span-6">
                {company.map((p) => (
                  <li key={p.id}>
                    <Link className="rows__name row-link" to={`/projects/${p.id}`} onClick={saveHomeScroll}>{p.title}</Link>
                    <span className="rows__value muted">{p.period.split(' ~ ')[0]}</span>
                  </li>
                ))}
              </ul>
              <figure className="layers span-6 start-7" role="img" aria-label="화면, API, 데이터베이스 세 계층에서 실무와 학습으로 다룬 기술">
                {profile.layers.map((l) => (
                  <div className="layers__row" key={l.name}>
                    <span className="layers__badge">{l.badge}</span>
                    <div>
                      <p className="layers__name">{l.name} <span className="muted">{l.caption}</span></p>
                      <p className="layers__chips">
                        {l.work.map((s) => <span key={s} className="chip chip--work">{s}</span>)}
                        {l.study.map((s) => <span key={s} className="chip">{s}</span>)}
                      </p>
                    </div>
                  </div>
                ))}
                <p className="layers__key muted"><span className="chip chip--work">실무</span><span className="chip">학습·개인 프로젝트</span></p>
              </figure>
            </div>
          </div>
        </section>

        <section className="section" id="stack" aria-labelledby="stack-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="stack-h">언어보다 문제에 맞춰 고르는 도구</h2>
            </div>
            <div className="stack-grid">
              {stackGroups.map((g) => (
                <div className="stack-col" key={g.name}>
                  <div className="icon-panel" role="img" aria-label={g.icons.map(([, n]) => n).join(', ')}>
                    {g.icons.map(([id, name]) => (
                      <img key={id} className="ic" data-icon={id} src={icon(id)} alt="" title={name} width={40} height={40} loading="lazy" />
                    ))}
                  </div>
                  <h3>{g.name}</h3>
                  <p>{g.line}</p>
                  <ul className="rows rows--spec">
                    {g.used.map(([where, what]) => (
                      <li key={where + what}><span className="rows__name">{where}</span><span className="rows__value">{what}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="career" aria-labelledby="career-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="career-h">경력과 자격</h2>
            </div>
            {/* 두 열이 같은 행 높이를 나눠 써서(subgrid) 왼쪽 경력과 오른쪽 자격의 줄이 맞습니다 */}
            <div className="cv">
              <div className="cv__col">
                <h3 className="cv__label">경력</h3>
                <ul className="rows">
                  {career.map((c) => (
                    <li key={c.company}>
                      <span className="rows__name">{c.company} <span className="muted">· {c.role}</span></span>
                      <span className="rows__value muted">{c.period}</span>
                      <p>{c.line}<br />{c.more}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cv__col">
                <h3 className="cv__label">자격과 학력</h3>
                <ul className="rows">
                  {credentials.map((c) => (
                    <li key={c.name}>
                      <span className="rows__name">{c.name}</span>
                      <span className="rows__value muted">{c.when}</span>
                      <p>{c.where}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer closing footer--dark ground-inverse" id="contact" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--word">
            <div className="section-head--split">
              <div>
                <h2 id="close-h">함께 풀 문제가 있다면 메일 주세요</h2>
                <p className="t-lead">채용 제안과 협업 문의 모두 {profile.email}로 받습니다.</p>
              </div>
              <a className="btn btn--primary" href={`mailto:${profile.email}`}>이메일 보내기{arrow}</a>
            </div>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <a className="nav__logo" href="#top">
                  <img src={`${base}favicon.svg`} alt="" width={26} height={26} className="logo-img" loading="lazy" />
                  {profile.name}
                </a>
                <p className="footer__lede">업무 시스템과 서비스를 만드는 소프트웨어 개발자</p>
              </div>
              <div className="span-2 start-9 footer__col">
                <h3>바로가기</h3>
                <ul>{sections.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}</ul>
              </div>
              <div className="span-2 footer__col">
                <h3>연락</h3>
                <ul>
                  <li><a href={`mailto:${profile.email}`}>이메일</a></li>
                  <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="footer__legal">
              <span>&copy; 2026 {profile.name}</span>
              <span>제품 이름과 로고는 각 소유자의 상표입니다</span>
            </div>
          </div>
        </div>
      </footer>
      <nav className="actionbar" aria-label="빠른 연락">
        <a className="btn btn--primary" href={`mailto:${profile.email}`}>이메일 보내기</a>
      </nav>
    </>
  )
}
