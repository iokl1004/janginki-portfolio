export type TechItem = {
  name: string
  usage: string
  level?: 'work' | 'study' // work: 실무 / study: 학습, 개인 프로젝트
}

export const techStack: { group: string; items: TechItem[] }[] = [
  {
    group: 'Backend',
    items: [
      { name: 'Java 1.8 / 11', level: 'work', usage: '티에이케이정보시스템 ERP 전 프로젝트(1.8), 사람누리 해광 인사 ERP(11)' },
      { name: 'Spring Framework', level: 'work', usage: '코스모신소재, 한미엔택, 자사 차세대 ERP, 해광 인사 ERP 백엔드. 차세대 ERP에서는 Spring Boot 기반 인사 모듈 개발' },
      { name: 'JPA / MyBatis', level: 'work', usage: '해광 인사 ERP의 JPA/MyBatis 혼용 구조에서 간단한 쿼리는 JPA, 복잡한 쿼리는 MyBatis로 구분해 조회 성능과 유지보수성 개선' },
      { name: 'RESTful API', level: 'work', usage: '자사 차세대 ERP에서 다른 시스템과 연동하는 API 설계' },
      { name: 'SAP S/4HANA ABAP', level: 'work', usage: '도레이첨단소재 수출(CBO) 모듈 유지보수, 수출 서류 자동 생성 기능 최적화' },
      { name: 'Node.js', level: 'study', usage: '영화 정보 웹 서비스 개인 프로젝트 백엔드' },
    ],
  },
  {
    group: 'Database',
    items: [
      { name: 'MS-SQL', level: 'work', usage: '코스모신소재, 한미엔택, 차세대 ERP, 플랜티팜. 한미엔택 급여 마감 스토어드 프로시저 개발' },
      { name: 'Oracle 11g', level: 'work', usage: '대한축구협회 인사평가 시스템' },
      { name: 'PostgreSQL', level: 'work', usage: '사람누리 해광 인사 ERP, DBeaver로 쿼리 작성 및 조회 성능 개선' },
      { name: 'SQL / 스토어드 프로시저', level: 'work', usage: '티에이케이정보시스템 재직 중 MS-SQL, Oracle에서 인사 모듈 프로시저 100여 개 개발 (한미엔택 급여 마감 프로시저 포함)' },
      { name: 'MongoDB', level: 'study', usage: '영화 정보 웹 서비스 개인 프로젝트 (회원/댓글/즐겨찾기 데이터)' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'JavaScript (ES6) / HTML / JSP', level: 'work', usage: 'ERP 화면 개발 전반' },
      { name: 'NEXACRO', level: 'work', usage: '대한축구협회 인사평가 시스템 프론트엔드 화면 설계 주도' },
      { name: 'IBSheet 7.0 / jsViews', level: 'work', usage: '해광 인사 ERP의 약 1,000건 규모 인사 데이터 그리드 화면 개발' },
      { name: 'Crownix Report 7.0', level: 'work', usage: '해광 인사 ERP 인사/급여 출력물 리포트 자동화' },
      { name: 'React.js', level: 'study', usage: '영화 정보 웹 서비스(로그인, 댓글/대댓글, 좋아요/싫어요, 즐겨찾기)와 이 포트폴리오 사이트' },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'STS4 / Eclipse', level: 'work', usage: 'Spring 기반 ERP 개발 IDE' },
      { name: 'MyBuilder / K-Studio', level: 'work', usage: '코스모신소재, 한미엔택 개발(MyBuilder), 플랜티팜 구매/물류/영업 모듈 개발(K-Studio)' },
      { name: 'SVN / Git', level: 'work', usage: '프로젝트 버전 관리 (SVN 중심, 차세대 ERP는 Git)' },
    ],
  },
  {
    group: 'AI Tools',
    items: [
      { name: 'Claude', usage: '포트폴리오 사이트 개발, 코드 작성과 검토, 문구 정리' },
      { name: 'ChatGPT / Gemini', usage: '개발 중 오류 원인 분석, SQL 쿼리 검토, 새 기술 학습 보조' },
    ],
  },
]
