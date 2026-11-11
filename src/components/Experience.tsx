import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { saveHomeScroll } from '../utils/scrollMemory'
import SectionHeading from './SectionHeading'

const experiences = [
  {
    company: '사람누리',
    role: '급여팀 / 책임',
    period: '2025.12 ~ 2026.06 (7개월)',
    summary: '클라우드/구축형 HR 플랫폼 전문기업에서 인사/급여/평가 모듈을 개발했습니다.',
    points: [
      'Java 11, Spring Framework, JPA/MyBatis 기반 인사 ERP 개발',
      'IBSheet 7.0과 jsViews로 약 1,000건 규모의 인사 데이터 화면을, Crownix Report 7.0으로 인사/급여 출력물을 개발',
      'PostgreSQL 환경에서 JPA/MyBatis 혼용 구조의 조회 성능과 유지보수성 개선',
    ],
  },
  {
    company: '개인 학습',
    role: '프론트엔드/풀스택 독학',
    period: '2024.07 ~ 2025.11',
    summary: '퇴사 후 React.js를 독학하고 개인 프로젝트로 직접 만들었습니다.',
    points: [
      'React / Node.js / MongoDB로 영화 정보 웹 서비스 개발 (로그인, 좋아요/싫어요, 댓글/대댓글, 즐겨찾기)',
      '회원탈퇴, 중복 이메일 예외처리, 회원정보 수정 등 강의에 없는 기능을 직접 추가하고 기능별 릴리즈 노트 작성',
      'React 토이 프로젝트를 GitHub에 배포하고 호스팅까지 완료',
    ],
  },
  {
    company: '지인 회사 (교통신호제어기 유지보수)',
    role: '아르바이트 (비개발직)',
    period: '2024.07 ~ 2024.11',
    summary: '퇴사 후 일손이 부족했던 지인 회사에서 업무를 지원했습니다.',
    points: ['교통신호제어기 유지보수 업무 지원 (개인 학습 병행)'],
  },
  {
    company: '티에이케이정보시스템',
    role: 'SM2팀 / 주임',
    period: '2022.04 ~ 2024.07 (2년 4개월)',
    summary: '도레이첨단소재 IT 계열사에서 ERP 구축과 유지보수를 맡았습니다.',
    points: [
      '인사/급여/근태/평가/채용/구매/물류/영업 모듈 개발 및 유지보수',
      'Java 1.8, Spring Framework, JPA/MyBatis 기반 백엔드와 NEXACRO, MyBuilder, K-Studio 기반 화면 개발',
      'MS-SQL, Oracle에서 인사 모듈 프로시저 100여 개 개발',
      'SAP S/4HANA ABAP으로 수출(CBO) 모듈 유지보수',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" data-reveal className="scroll-mt-16 py-20">
      <SectionHeading eyebrow="Experience" title="경력" />
      <div className="mt-8 space-y-10">
        {experiences.map((e) => {
          const related = projects.filter((p) => p.company === e.company)
          return (
            <div key={e.company} className="border-l-2 border-blue-600 pl-5">
              <p className="text-sm text-gray-500">{e.period}</p>
              <h3 className="text-xl font-semibold">
                {e.company}{' '}
                <span className="text-base font-normal text-gray-600">/ {e.role}</span>
              </h3>
              <p className="mt-1 text-gray-600">{e.summary}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {related.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-blue-600">참여 프로젝트</p>
                  <ul className="mt-1 space-y-1 text-sm">
                    {related.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/projects/${p.id}`}
                          className="hover:text-blue-600"
                          onClick={saveHomeScroll}
                        >
                          {p.title} <span className="text-gray-500">({p.period})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
