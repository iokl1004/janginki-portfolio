import movieHome from '../assets/projects/movie-home.jpg'
import movieHover from '../assets/projects/movie-hover.jpg'
import movieDetail from '../assets/projects/movie-detail.jpg'
import bookHome from '../assets/projects/booknearby-home.jpg'
import bookSearch from '../assets/projects/booknearby-search.jpg'
import bookDetail from '../assets/projects/booknearby-detail.jpg'
import memoirHome from '../assets/projects/memoir-home.jpg'
import memoirSearch from '../assets/projects/memoir-search.jpg'
// 휴대폰과 작은 카드용 720px 사본 (홈 화면에서 srcset으로 사용)
import movieHomeSm from '../assets/projects/movie-home-720.jpg'
import bookSearchSm from '../assets/projects/booknearby-search-720.jpg'
import bookDetailSm from '../assets/projects/booknearby-detail-720.jpg'
import memoirHomeSm from '../assets/projects/memoir-home-720.jpg'

export type Screenshot = {
  src: string
  caption: string
  small?: string // 720px 사본
  width: number
  height: number
}

export type Project = {
  id: string
  kind?: 'company' | 'personal' // 생략하면 회사 프로젝트
  featured?: number // 값이 있으면 대표 프로젝트로 크게 표시. 작을수록 앞에 나옴
  title: string
  company?: string
  period: string
  role: string
  summary: string
  headline?: { label: string; value: string }
  flow?: string[]
  screenshots?: Screenshot[] // 첫 두 장은 대표 카드에도 표시
  problem: string
  approach: string
  result: string[]
  why?: string
  qna?: { q: string; a: string }[]
  note?: string // 주의사항 (예: 배포본 제한)
  stack: string[]
  links?: { label: string; url: string }[]
  isPrivate: boolean
}

// 최신순 정렬. 순서를 바꾸고 싶으면 배열 안의 항목 위치만 옮기면 됩니다.
// why(설계 선택 이유)는 문서에 근거가 없어 전부 비워 두었습니다. 기억나는 항목부터 채워 주세요.

export const projects: Project[] = [
  {
    id: 'book-nearby',
    kind: 'personal',
    featured: 1,
    title: '책있나 (BookNearby)',
    period: '2026.11',
    role: '1인 개발 / 기획·디자인·프론트엔드·서버 함수·배포',
    summary:
      '책을 검색하면 근처 도서관 중 그 책을 가진 곳과 지금 빌릴 수 있는지, 오늘 문을 여는지를 지도로 보여주는 웹 서비스',
    headline: { label: 'Lighthouse 접근성·권장 사항·SEO', value: '100점' },
    flow: [
      '책 검색 (카카오 책 검색)',
      '소장 도서관 조회 (정보나루)',
      '대출 가능 여부 확인',
      '운영시간·공휴일 휴관 판단',
      '지도에 표시 (카카오맵)',
    ],
    screenshots: [
      { src: bookDetail, small: bookDetailSm, caption: '소장 도서관 목록과 지도: 동네 검색, 오늘 여는 곳만, 대출 정보 확인 시각, 지도 정보 카드', width: 1280, height: 800 },
      { src: bookSearch, small: bookSearchSm, caption: '검색 결과: 제목·저자 동시 검색, 20권씩 더 보기', width: 1280, height: 800 },
      { src: bookHome, caption: '첫 화면: 요즘 많이 빌리는 책, 찜한 책', width: 1280, height: 800 },
    ],
    problem:
      '보고 싶은 책이 있어도 어느 도서관에 있는지, 지금 빌릴 수 있는지, 오늘 문을 여는지를 알려면 도서관 사이트를 하나씩 찾아봐야 했습니다. 필요한 데이터는 도서관 정보나루, 카카오, 공공데이터포털에 흩어져 있었고, 정보나루는 하루 호출 한도가 있고 일부 기능은 등록된 IP에서만, 해외에서는 아예 접속되지 않는 제약이 있었습니다.',
    approach:
      'React 화면과 Vercel 서버 함수(서울 리전)를 나누어, 서버 함수가 API 키를 숨기고 여러 API를 하나의 응답으로 합치도록 했습니다. 검색은 IP 제한이 없는 카카오 책 검색으로, 소장 도서관과 대출 여부는 정보나루로 가져와 ISBN으로 이었습니다. 호출 한도를 지키기 위해 메모리 → 공용 Redis(Upstash) → CDN 3단계 캐시를 두고, 대출 여부는 가까운 3곳만 먼저 확인한 뒤 "더 보기"로 이어 받습니다. 운영시간은 전국도서관표준데이터를 미리 수집해 좌표와 이름으로 정보나루 도서관과 짝을 찾고, 정해진 형식이 없는 휴관일 표기("셋째 주 월", "일요일을 제외한 법정공휴일")를 해석해 공휴일까지 반영한 "오늘 운영 상태"를 보여줍니다.',
    result: [
      '검색 → 소장 도서관 → 대출 가능 여부 → 오늘 운영 여부 → 지도까지 한 화면에서 확인',
      '3단계 캐시와 "가까운 3곳 먼저" 조회로 상세 화면 1번당 정보나루 호출 5건 → 3건, 이름·동네 필터와 "오늘 여는 곳만"도 호출 수 증가 없이 구현',
      '휴관일 원문 해석 + 공휴일(특일 정보 API) 반영으로 "오늘 휴관 · 추석"처럼 이유까지 표시',
      '지역·검색어·필터를 주소에 담아 공유 링크와 카카오톡 미리보기 카드(책 제목·표지)에서 같은 화면이 열리도록 구현',
      'Vitest 단위 테스트 186개, Playwright 화면 클릭 테스트 8개를 GitHub Actions로 푸시마다 자동 실행',
      'Lighthouse(모바일) 성능 68 → 80, 접근성·권장 사항·SEO 100점',
    ],
    why:
      '서버를 따로 두지 않고 Vercel 서버 함수를 쓴 이유는, 이 서비스에 필요한 서버 역할이 "API 키 숨기기와 응답 합치기·캐시"뿐이었기 때문입니다. 함수 리전을 서울(icn1)로 둔 것은 정보나루가 해외 접속을 받지 않아서이고, 시간에 따라 바뀌는 "지금 운영 중" 판단은 CDN에 저장되지 않도록 브라우저에서 계산했습니다.',
    qna: [
      { q: '검색을 정보나루가 아니라 카카오로 바꾼 이유는 무엇인가요?', a: '정보나루의 도서 검색 기능만 등록된 IP에서 호출해야 했는데, Vercel 서버는 IP가 고정되어 있지 않아 배포 환경에서 "인증정보 불일치"로 거절됐습니다. 기능별로 호출해 원인을 좁힌 뒤, 검색은 IP 제한이 없는 카카오 책 검색으로 바꾸고 소장 도서관·대출 여부는 정보나루를 유지했습니다. 두 API를 ISBN으로 이어 붙였습니다.' },
      { q: '정보나루 하루 호출 한도는 어떻게 지켰나요?', a: '메모리 → 공용 Redis → CDN 순서의 캐시를 두고, 동시에 들어온 같은 요청은 한 번만 호출합니다. 대출 여부는 가까운 3곳만 먼저 묻고, 다른 지역 소장 현황(17건 호출)은 버튼을 눌렀을 때만 조회합니다. 위치는 약 1km 단위로 반올림해 근처 사용자끼리 캐시를 함께 쓰게 했습니다.' },
      { q: '캐시 때문에 오래된 대출 정보를 보여줄 수 있지 않나요?', a: '그래서 대출 여부만 저장 시간을 1시간으로 짧게 두고, 정보나루가 실패해도 지난 대출 정보는 대신 쓰지 않습니다. 화면에는 "대출 정보는 12분 전에 확인했어요"처럼 실제로 확인한 시각을 보여줍니다.' },
      { q: '테스트는 어떻게 구성했나요?', a: '휴관일 해석, 공휴일 판단, 캐시, 검색 결과 정리 같은 로직은 Vitest 단위 테스트로, 검색 → 상세 → 필터 → 찜 같은 사용자 흐름은 Playwright로 검증합니다. 화면 클릭 테스트는 API를 가짜 응답으로 바꿔 호출 한도를 쓰지 않고, GitHub Actions에서 푸시마다 자동으로 돌아갑니다.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Vercel Functions', 'Upstash Redis', '카카오맵 API', '도서관 정보나루 API', 'Vitest', 'Playwright', 'GitHub Actions'],
    links: [
      { label: 'Live', url: 'https://book-nearby.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/iokl1004/book-nearby' },
    ],
    isPrivate: false,
  },
  {
    id: 'memoir',
    kind: 'personal',
    featured: 2,
    title: 'memoir (섹션별 메모 웹앱)',
    period: '2026.11',
    role: '1인 개발 / 기획·디자인·프론트엔드·DB 설계·배포',
    summary:
      '섹션을 트리로 나눠 메모를 쓰고 키워드와 작성일로 다시 찾는 메모 웹앱. Spring Boot로 만든 뒤, 무료 배포 문제로 배포 직전에 백엔드를 Supabase + Vercel로 옮겼습니다.',
    headline: { label: '배포 직전 백엔드 전환', value: 'Spring Boot → Supabase' },
    flow: [
      'Spring Boot + MySQL로 개발',
      'Oracle 한국 리전 무료 VM 없음',
      '배포 방법 4가지 비교',
      'Supabase(서울) + Vercel 선택',
      '권한·규칙을 DB(RLS·트리거·함수)로 이전',
    ],
    screenshots: [
      { src: memoirHome, small: memoirHomeSm, caption: '섹션 트리, 메모 목록, 글과 그림을 함께 쓰는 편집기', width: 1280, height: 800 },
      { src: memoirSearch, caption: '입력하는 동안 검색 결과 미리보기: 섹션 경로와 작성일 표시', width: 1280, height: 800 },
    ],
    problem:
      '조건은 완전 무료 배포였습니다. Spring Boot 버전은 JVM과 MySQL이 늘 켜져 있어야 해서 사실상 Oracle Cloud Always Free만 가능했고, Docker 배포 묶음과 로컬 리허설까지 마쳤습니다. 그런데 Oracle 한국 리전에서 무료 VM을 받을 수 없었고, 일본 리전은 한 번 고른 홈 리전을 나중에 바꿀 수 없어 한국 리전이 열려도 옮길 수 없었습니다.',
    approach:
      'Oracle 일본 리전, Render, Cloudflare(Workers + D1), Supabase + Vercel을 장단점으로 비교해, 서울 리전이 있고 로그인·메일·캡차·파일 저장을 기본으로 주는 Supabase를 골랐습니다. 화면이 DB에 직접 붙게 되므로 서비스 계층의 주인 확인은 모든 테이블의 RLS로, 미분류 보호·순환 금지 같은 규칙은 트리거로, 여러 줄을 함께 바꾸는 일은 PL/pgSQL 함수 하나(트랜잭션 하나)로 옮겼습니다. 그림은 비공개 Storage에 두고 보여 줄 때만 서명 주소로 바꾸며, 형식·용량 확인과 계정 삭제는 Edge Function에서 처리했습니다. 무료 플랜의 약점(7일 일시 정지, 자동 백업 없음)은 매일 도는 GitHub Actions 하나로 함께 막았습니다.',
    result: [
      '섹션 트리(단계 제한 없음, 끌어서 옮기기), 여러 단어·섹션·기간 검색과 입력 중 미리보기, 글·그림 편집기, 휴대폰 화면까지 구현',
      '기능과 화면은 그대로 둔 채 백엔드를 Spring Boot에서 Supabase(서울)로 전환하고, 이전 이유와 설계 대응표를 문서로 정리',
      'RLS와 트리거로 화면이 표를 직접 고쳐도 남의 데이터는 보이지 않고 규칙이 지켜지도록 설계',
      '그림은 올리기 전 브라우저에서 줄이고 서명 주소를 재사용해 무료 저장소(1GB)·전송량을 아끼고, 1인 50MB 한도와 사용량 막대 표시',
      'GitHub Actions가 매일 고아 그림 청소와 DB·그림 암호화 백업을 하며 일시 정지도 방지',
      'Vitest 단위 테스트 9개와 로컬 Supabase에 대고 도는 통합 테스트 13개(RLS, DB 함수, Edge Function)를 푸시마다 자동 실행',
    ],
    why:
      '일본 리전은 "한 번 고르면 영영 못 바꾸는" 선택이라 부담이 컸습니다. Supabase는 Spring이 하던 일(로그인, 세션, 메일, 캡차, 파일 저장)을 대부분 기본 기능으로 줘서 보안 패치·인증서·백업 같은 서버 운영이 사라지고, 권한 검사가 DB에 있어 기능을 늘려도 주인 확인을 빼먹을 일이 줄어듭니다.',
    qna: [
      { q: '화면이 DB에 직접 붙으면 보안은 어떻게 지키나요?', a: '모든 테이블에 RLS(user_id = auth.uid())를 걸고, 새 테이블은 자동으로 공개되지 않게 둔 뒤 필요한 권한만 마이그레이션에서 열었습니다. 메모와 섹션은 (section_id, user_id) 복합 FK로 묶어 다른 사람의 섹션에 메모가 들어갈 수 없고, 한 사람당 메모·섹션 개수도 트리거로 제한했습니다. 화면에는 CSP 헤더를 둬 스크립트와 연결 대상을 이 사이트, Supabase, 캡차로만 한정했습니다.' },
      { q: 'Spring 버전에서 잃은 것은 무엇인가요?', a: 'Java 코드와 JUnit 테스트 91개, Docker 배포 묶음입니다. git 기록에는 남겨 두었습니다. "5번 틀린 뒤에만 캡차" 같은 세밀한 로그인 제한도 Supabase가 지원하지 않아, 사용자 눈에 보이지 않는 Invisible 캡차를 항상 켜는 방식으로 바꿨습니다.' },
      { q: '검색 성능은 어떻게 확인했나요?', a: 'Spring 버전에서 50만 건으로 MySQL LIKE와 FULLTEXT ngram을 비교했습니다. FULLTEXT는 드문 단어에서 15배 빨랐지만 흔한 단어나 섹션·기간 조건에서는 6~66배 느려서, 건수를 1,000건까지만 세고 방식을 자동으로 고르게 해 가장 느린 검색을 1,337ms에서 27ms로 줄였습니다. Supabase로 옮긴 뒤에는 개인 메모 규모에 맞게 ILIKE를 쓰고, 느려지면 pg_trgm 인덱스를 붙일 계획입니다.' },
      { q: '그림 한도 50MB는 어떻게 정했나요?', a: '무료 저장소는 모든 사용자가 함께 쓰는 1GB입니다. 캡처 한 장을 넉넉히 500KB로 잡으면 약 2,000장이라, 한 사람 한도를 약 100장인 50MB로 정하고 계정 창에서 얼마나 썼는지 보여줍니다. 올리기는 Edge Function만 할 수 있어 한도를 서버에서 확인합니다.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TipTap', 'Supabase', 'PostgreSQL (RLS·PL/pgSQL)', 'Edge Functions (Deno)', 'Vercel', 'Cloudflare Turnstile', 'Vitest', 'GitHub Actions'],
    links: [
      { label: 'Live', url: 'https://memoir-note.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/iokl1004/memoir' },
      { label: '이전 기록', url: 'https://github.com/iokl1004/memoir/blob/main/docs/migration-to-supabase.md' },
    ],
    isPrivate: false,
  },
  {
    id: 'haegwang-hr',
    title: '㈜해광 인사/평가/급여 ERP 개발',
    company: '사람누리',
    period: '2025.12 ~ 2026.04',
    role: 'ERP 개발자 / 기여도 15%',
    summary:
      'JPA/MyBatis 혼용 레거시 구조와 약 1,000건 규모의 그리드 화면 환경에서 인사/평가/급여 모듈을 개발한 프로젝트',
    problem:
      '데이터 접근 구조가 JPA와 MyBatis가 섞인 레거시 형태였고, 화면은 약 1,000건 규모의 인사 데이터를 IBSheet 그리드로 처리해야 했습니다. 기존에 수작업으로 진행되던 인사 프로세스를 ERP로 옮기는 프로젝트이기도 했습니다.',
    approach:
      'JPA/MyBatis 혼용 구조 안에서 데이터 처리 로직을 최적화해 조회 성능과 유지보수성을 개선했고, 화면은 IBSheet와 JavaScript로 개발해 약 1,000건 규모의 데이터 처리와 사용 편의성을 높였습니다. 출력 업무는 Crownix Report로 리포트 자동화 기능을 구현했습니다.',
    result: [
      '인사/평가/급여 모듈 개발에 참여해 HR ERP 핵심 기능 구현 및 시스템 안정성 확보',
      '데이터 처리 로직 최적화로 조회 성능 및 유지보수성 개선',
      'IBSheet + JavaScript 화면 개발로 약 1,000건 규모의 인사 데이터 처리 및 사용자 편의성 향상',
      'Crownix Report 리포트 자동화로 인사/급여 출력 업무 효율 개선',
      '수작업 프로세스의 시스템화에 기여',
    ],
    stack: [
      'Java 11',
      'Spring Framework',
      'JPA',
      'MyBatis',
      'JavaScript (ES6)',
      'jsViews',
      'IBSheet',
      'Crownix Report',
      'PostgreSQL',
      'SVN',
    ],
    qna: [
      { q: 'JPA와 MyBatis를 어떤 기준으로 나눠 사용했나요?', a: '간단한 쿼리는 JPA로, 복잡한 쿼리는 SQL을 직접 작성할 수 있는 MyBatis로 구분해 사용했습니다.' },
      { q: '약 1,000건 규모의 인사 데이터는 어떻게 다뤘나요?', a: '화면은 IBSheet와 JavaScript로 개발했고, 데이터 처리 로직을 최적화해 조회 성능과 유지보수성을 개선했습니다.' },
      { q: '맡은 범위는 어디까지였나요?', a: '㈜해광 인사/평가/급여 모듈 개발에 참여했고 기여도는 15%입니다. 인사/급여 출력물은 Crownix Report로 리포트 자동화까지 구현했습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'toray-sap-export',
    title: '도레이첨단소재 SAP 수출(CBO) 모듈 유지보수',
    company: '티에이케이정보시스템',
    period: '2024.03 ~ 2024.07',
    role: 'SAP 수출(CBO) 모듈 개발/운영',
    summary:
      '수출 프로세스의 데이터 처리 오류와 인터페이스 문제를 분석해 수정하고, 수출 서류 자동 생성 기능을 최적화한 유지보수',
    problem:
      '기존 SAP 수출 모듈에서 데이터 처리 오류와 인터페이스 문제가 발생하고 있었고, 거래처 정보와 출력폼에도 오류가 있었습니다.',
    approach:
      '오류 원인을 분석해 ABAP 코드를 수정했고, 수출 서류 자동 생성 기능을 최적화했습니다. 거래처 정보와 출력폼 오류를 정비하고 커스터마이징 요청에 대응했습니다.',
    result: [
      '수출 프로세스 개선 및 오류 감소',
      '수출 서류 자동 생성 기능 최적화로 업무 시간 단축 및 오류 발생률 감소',
      '거래처 정보 및 출력폼 오류 정비',
    ],
    stack: ['SAP S/4HANA', 'ABAP'],
    qna: [
      { q: '어떤 문제를 다뤘나요?', a: '수출 모듈에서 발생하던 데이터 처리 오류와 인터페이스 문제를 분석해 수정했고, 거래처 정보와 출력폼 오류를 정비했습니다.' },
      { q: '수출 서류 자동 생성은 어떻게 개선했나요?', a: '자동 생성 기능을 최적화해 서류 작업 시간을 줄이고 오류 발생률을 낮췄습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'hanmi-payroll',
    featured: 4,
    headline: { label: '급여 계산 대상', value: '사원 약 200명' },
    title: '한미엔택 인사/급여/근태 ERP 구축',
    company: '티에이케이정보시스템',
    period: '2023.11 ~ 2024.02',
    role: 'ERP 개발자 / 기여도 20%',
    summary:
      '근태 마감부터 급여 생성까지 한 흐름으로 이어지는 급여 자동 계산 구조를 만든 프로젝트',
    flow: [
      '근태 마감 (인사담당자)',
      '급여 마스터 기준 반영',
      '"급여 마감하기" 실행',
      '급여 마감 프로시저 계산',
      '사원별 전월 급여 생성',
    ],
    problem:
      '기존에는 인사, 급여, 근태 데이터가 개별적으로 운영되어 데이터 불일치와 중복 입력 문제가 있었고, 급여 지급도 수작업으로 진행되었습니다. 급여는 한 달치 근태 데이터, 직책/직무/직종에 따라 달라지는 통상시급, 인사담당자가 조정하는 성과금 같은 기준이 맞물려야 계산되므로 근태에서 급여까지 이어지는 계산 구조가 필요했습니다.',
    approach:
      '근태 마감, 급여 마스터, 급여 마감 화면을 순서대로 연결하고 계산은 MS-SQL의 급여 마감 스토어드 프로시저에 모았습니다. 인사담당자가 급여 마스터에서 직책/직무/직종별 성과금 등을 조정하면, 프로시저가 근태 데이터와 직책/직무/직종별 통상시급에 이 기준을 합쳐 산식을 계산하며, 근태 마감을 마친 뒤 급여 마감 화면에서 "급여 마감하기"를 누르면 사원별 전월 급여가 생성됩니다. 급여 마감 화면은 마감 전에는 마감취소 버튼을 비활성화하고 마감 후에 활성화하도록 마감 상태에 따라 버튼을 전환해, 마감하지 않은 상태에서 취소가 실행되는 일을 막았습니다.',
    result: [
      '인사/급여/근태 데이터를 ERP로 통합해 데이터 불일치와 중복 입력 문제 해결',
      '근태 데이터를 연동한 급여 자동 계산 기능으로 사원 약 200명의 수작업 급여 지급 프로세스를 시스템화하고 처리 시간 단축',
      '마감 상태에 따른 버튼 활성/비활성 제어로 마감/마감취소 오조작 방지',
      '출퇴근 기록, 연차, 휴가 신청 기능 개선으로 사용자 편의성 향상',
      '관리자용 리포트를 추가해 직원 근태 현황을 한눈에 파악 가능',
    ],
    stack: [
      'Java 1.8',
      'Spring Framework',
      'JPA',
      'MyBatis',
      'JavaScript (ES6)',
      'MS-SQL',
      '스토어드 프로시저',
      'MyBuilder',
      'SVN',
    ],
    qna: [
      { q: '급여 산식을 Java가 아닌 DB 프로시저에 둔 이유는 무엇인가요?', a: '급여 계산에는 한 달치 근태 데이터, 직책/직무/직종별 통상시급, 급여 마스터에서 조정한 성과금 등이 모두 필요합니다. 이 데이터를 DB에서 종합해 한 번에 계산하도록 MS-SQL 프로시저에 모았고, "급여 마감하기" 한 번으로 사원들의 전월 급여가 생성되도록 했습니다.' },
      { q: '급여 마감은 어떤 순서로 진행되나요?', a: '인사담당자가 근태 마감을 진행한 뒤 급여 마감 화면에서 "급여 마감하기"를 누르면 급여 마감 프로시저가 실행됩니다. 마감 전에는 마감취소 버튼이 비활성화되고, 마감 후에 활성화됩니다.' },
      { q: '인사담당자는 급여 기준을 어디서 조정하나요?', a: '급여 마스터 화면에서 직책/직무/직종별 성과금 등의 금액을 조정할 수 있습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'kfa-evaluation',
    title: '대한축구협회 인사평가 시스템 구축',
    company: '티에이케이정보시스템',
    period: '2023.10 ~ 2024.02',
    role: 'ERP 개발자 / 기여도 30% / Nexacro 화면 설계 주도',
    summary:
      '수작업으로 하던 인사평가를 다면 평가와 점수 산정, 보고서 출력까지 시스템 안에서 처리하도록 전산화한 프로젝트',
    flow: [
      '평가 데이터 입력',
      '평가 지표/점수 산정 (다면 평가)',
      '보고서 출력',
      '분석 리포트',
    ],
    problem:
      '인사평가가 수작업으로 이루어져 업무 부담이 컸고, 협회의 인사 정책에 맞는 평가 지표와 상사/동료/자기 평가를 아우르는 체계가 필요했습니다.',
    approach:
      '평가 데이터 입력, 계산, 보고서 출력까지 전 과정을 ERP 시스템 안에서 처리하도록 구성했습니다. 대한축구협회의 인사 정책을 반영한 맞춤형 평가 지표와 점수 산정 알고리즘을 개발하고, 상사/동료/자기 평가를 포함한 다면 평가를 구현했습니다. 프론트엔드는 Nexacro로 화면 설계를 주도했습니다.',
    result: [
      '인사평가 프로세스 전산화 및 자동화로 업무 효율성 향상',
      '입력, 계산, 보고서 출력까지 시스템화해 업무 부담 감소',
      '다면 평가를 포함한 공정하고 체계적인 평가 시스템 구축',
      '분석 리포트로 조직 내 성과 트렌드를 분석해 의사결정 지원',
      '사용자 맞춤형 평가 로직 구현 및 관리자 기능 고도화',
    ],
    stack: [
      'Java 1.8',
      'JavaScript (ES6)',
      'MyBatis',
      'NEXACRO',
      'Oracle 11g',
      'SVN',
    ],
    qna: [
      { q: '다면 평가는 어떻게 구성했나요?', a: '상사/동료/자기 평가를 포함한 다면 평가로 구성했고, 협회의 인사 정책을 반영한 맞춤형 평가 지표와 점수 산정 알고리즘을 개발했습니다.' },
      { q: '맡은 역할은 무엇이었나요?', a: '기여도 30%로 개발에 참여했고, Nexacro를 이용한 프론트엔드 화면 설계를 주도했습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'cosmo-hr',
    title: '코스모신소재 인사 모듈 유지보수',
    company: '티에이케이정보시스템',
    period: '2023.05 ~ 2024.02',
    role: '인사(HR) 모듈 유지보수 및 기능 개선',
    summary:
      '반복 업무를 자동화해 업무 처리 속도를 개선하고 연말정산/급여 기준 변경에 대응한 유지보수',
    headline: { label: '반복 업무 처리 속도', value: '평균 20% 이상 개선' },
    problem:
      '반복적으로 수행되던 업무가 많아 처리 속도에 한계가 있었고, 데이터 입력 오류도 발생하고 있었습니다.',
    approach:
      '반복 업무를 자동화하고 데이터 입력 오류를 줄이는 방향으로 기능을 개선했으며, 연말정산 로직 개선과 급여 계산 기준 변경에도 대응했습니다. 대사우 홈페이지 개발과 유지보수도 함께 수행했습니다.',
    result: [
      '반복 업무 자동화로 업무 처리 속도 평균 20% 이상 개선 (사용자 설문 기준)',
      '기존 대비 데이터 입력 오류를 줄이고 신뢰성 높은 데이터 관리 환경 구축',
      '연말정산 로직 개선, 급여 계산 기준 변경 대응',
      '대사우 홈페이지 개발 및 유지보수 수행',
    ],
    stack: [
      'Java 1.8',
      'Spring Framework',
      'JPA',
      'MyBatis',
      'JavaScript (ES6)',
      'MS-SQL',
      'MyBuilder',
      'SVN',
    ],
    qna: [
      { q: '"평균 20% 이상 개선"은 어떻게 확인했나요?', a: '사용자 설문을 통해 업무 처리 속도 개선 정도를 확인했습니다.' },
      { q: '유지보수에서 어떤 업무를 맡았나요?', a: '반복 업무 자동화, 연말정산 로직 개선, 급여 계산 기준 변경 대응을 맡았고, 대사우 홈페이지도 개발/유지보수했습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'nextgen-erp',
    note: '정식 오픈 전 프로젝트입니다.',
    title: '자사 차세대 ERP 인사/급여/근태 모듈 개발',
    company: '티에이케이정보시스템',
    period: '2023.05 ~ 2023.12',
    role: 'ERP 개발자 / 기여도 30%',
    summary:
      'Spring Boot와 JPA 기반의 차세대 ERP에서 인사 모듈을 개발하고 다른 시스템과 연동한 프로젝트 (정식 오픈 전)',
    problem:
      '자사 ERP를 차세대 구조로 새로 구축하면서 인사/급여/근태 모듈을 신규 인프라 위에서 안정적으로 전환해야 했고, 다른 시스템과의 연동도 필요했습니다.',
    approach:
      '사내 R&D팀이 구성한 Spring Boot/JPA 기반 구조 위에서 인사 모듈을 개발하고 RESTful API를 설계해 다른 시스템과 연동했습니다. 직원 정보 등록/수정/조회와 출퇴근 기록, 연차/휴가 신청, 근태 승인 프로세스를 개선했고, 급여와 성과 평가 모듈을 연계해 자동 급여 계산과 성과 평가 반영 구조를 만들었습니다.',
    result: [
      '신규 ERP 인프라 위에 인사 모듈 개발 (정식 오픈 전)',
      'RESTful API 설계로 다른 시스템과의 연동 구현',
      '직원 정보 등록/수정/조회 기능 개발',
      '근태 승인 프로세스 개선',
      '급여 및 성과 평가 모듈 연계로 자동 급여 계산과 성과 평가 반영 구축',
    ],
    stack: [
      'Java 1.8',
      'Spring Framework',
      'JPA',
      'MyBatis',
      'RESTful API',
      'JavaScript (ES6)',
      'MS-SQL',
      'Git',
    ],
    qna: [
      { q: 'Spring Boot와 JPA는 직접 선택한 기술인가요?', a: '아닙니다. 사내 R&D팀이 구성한 차세대 ERP 기반 구조(Spring Boot/JPA)를 따랐고, 저는 그 위에서 인사/급여/근태 모듈 개발을 담당했습니다.' },
      { q: '맡은 기능은 무엇이었나요?', a: '인사/급여/근태 모듈 개발을 담당했고(기여도 30%), 직원 정보 등록/수정/조회와 출퇴근 기록, 연차/휴가 신청, 근태 승인 프로세스를 개선했습니다. 급여와 성과 평가 모듈을 연계해 자동 급여 계산과 평가 반영도 구현했습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'plantyfarm-erp',
    title: '플랜티팜 구매/물류/영업 ERP 구축',
    company: '티에이케이정보시스템',
    period: '2022.11 ~ 2023.02',
    role: 'ERP 개발자 / 기여도 20%',
    summary:
      '실시간 재고 추적부터 고객 주문-출고까지 하나의 흐름으로 묶은 구매/물류/영업 모듈 구축',
    problem:
      '구매/물류/영업 모듈을 새로 구축하면서 부서별 수불 관리, 재고 추적, 고객 주문부터 출고까지의 흐름을 하나의 시스템으로 묶어야 했습니다.',
    approach:
      'K-Studio와 MS-SQL로 구매/물류/영업 모듈을 개발했습니다. 실시간 재고 추적 시스템을 만들고 물류 흐름을 시각화했으며, 고객 주문부터 출고까지 일원화된 시스템을 도입하고 매출 데이터 분석 기능을 추가했습니다.',
    result: [
      '실시간 재고 추적 시스템 구축',
      '물류 흐름 시각화로 운영 효율 향상',
      '고객 주문부터 출고까지 일원화된 시스템 도입',
      '매출 데이터 분석 기능 추가로 영업 전략 강화',
      '부서별 수불 관리 및 판매 흐름 자동화 구현',
    ],
    stack: ['K-Studio', 'MS-SQL'],
    qna: [
      { q: '맡은 범위는 어디까지였나요?', a: '구매/물류/영업 모듈 개발에 참여했고(기여도 20%), 실시간 재고 추적, 고객 주문부터 출고까지의 흐름 일원화, 매출 데이터 분석 기능을 구현했습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'cosmo-hr-build',
    headline: { label: '적용 규모', value: '직원 약 300명' },
    title: '코스모신소재 인사/급여/근태/평가/채용 모듈 구축',
    company: '티에이케이정보시스템',
    period: '2022.07 ~ 2023.04',
    role: 'ERP 개발자 / 기여도 30%',
    summary:
      '10개월 동안 기획부터 개발, 테스트, 운영 안정화까지 참여한 인사/급여 통합 구축 프로젝트',
    flow: [
      '기획',
      '개발',
      '테스트',
      '운영 안정화',
      '사용자 교육 및 피드백 반영',
    ],
    problem:
      '인사, 급여, 근태, 평가, 채용 데이터를 통합 관리하는 시스템이 필요했고, 급여는 공제 항목 반영과 연말정산, 상여금 지급 프로세스까지 자동화해야 했습니다.',
    approach:
      '직원 정보, 근태, 평가 데이터를 통합 관리하는 시스템을 구축하고 조직도 및 직급별 권한 관리 기능을 추가했습니다. 급여 계산을 자동화하면서 공제 항목을 반영했고, 연말정산과 상여금 지급 프로세스를 개선했으며, 직원 이력과 급여 등 HR 데이터 분석 기능과 맞춤형 리포트 생성 기능을 더했습니다. 기능 테스트와 사용자 피드백을 바탕으로 개선을 주도했습니다.',
    result: [
      '10개월 내 구축을 완료하고 안정적으로 운영',
      '직원 약 300명의 HR 데이터 통합 관리(실사용자 10명 이내) 및 직급별 권한 관리로 운영 효율성 강화',
      '급여 계산 자동화 및 공제 항목 반영으로 오류 최소화',
      '연말정산, 상여금 지급 프로세스 개선으로 업무 부담 경감',
      '데이터 분석 및 맞춤형 리포트 기능으로 의사결정 지원',
      '기획부터 개발, 테스트, 운영 안정화까지 체계적으로 진행하고 사용자 교육 및 피드백 반영으로 최적화 완료',
    ],
    stack: [
      'Java 1.8',
      'Spring Framework',
      'JPA',
      'MyBatis',
      'JavaScript (ES6)',
      'MS-SQL',
      'MyBuilder',
      'SVN',
    ],
    qna: [
      { q: '구축 과정에서 어떤 역할을 했나요?', a: '기여도 30%로 인사/급여/근태/평가/채용 모듈 개발에 참여했고, 기획부터 개발, 테스트, 운영 안정화까지 전 과정에 함께했습니다. 기능 테스트와 사용자 피드백을 바탕으로 한 개선을 주도했습니다.' },
      { q: '권한 관리는 어떻게 구성했나요?', a: '조직도와 직급별로 권한을 나누는 관리 기능을 추가했습니다.' },
    ],
    isPrivate: true,
  },
  {
    id: 'movie-web-service',
    kind: 'personal',
    featured: 3,
    title: '영화 정보 웹 서비스',
    period: '2024.10 ~ 2024.11',
    role: '1인 개발 / 인프런 강의 수강 후 직접 확장',
    summary:
      'TMDB API로 영화 정보를 보여주는 웹 서비스를 강의로 익힌 뒤, 강의에 없던 기능과 예외 처리를 직접 추가한 개인 프로젝트',
    problem:
      '인프런 John Ahn 강사님의 Movie_React 강의 내용만으로는 회원탈퇴, 중복 가입, 탈퇴한 회원의 댓글처럼 실제 서비스에서 생기는 예외 상황이 다뤄지지 않았습니다.',
    approach:
      'React 클라이언트와 Node.js/MongoDB 서버를 구성하고 RESTful API로 TMDB의 영화 정보를 불러왔습니다. 강의에 없던 회원탈퇴, 회원가입 시 중복 이메일 예외처리, 회원정보 수정, 댓글 삭제와 탈퇴한 회원의 댓글 삭제 예외처리, 영화 카드에 마우스를 올리면 제목/평점/소개글을 보여주는 기능, 유효하지 않은 페이지 예외처리를 직접 개발했습니다. 기능을 추가할 때마다 릴리즈 노트를 작성해 언제 어떤 기능을 개발했는지 기록했습니다.',
    result: [
      '로그인, 회원가입, 회원정보 수정, 회원탈퇴 구현',
      '좋아요/싫어요, 댓글/대댓글, 영화 즐겨찾기 기능 구현',
      '중복 이메일, 삭제된 댓글, 탈퇴한 회원의 댓글, 잘못된 페이지 주소에 대한 예외 처리',
      '기능별 릴리즈 노트 작성 및 GitHub 코드 공개',
    ],
    note:
      '배포본은 GitHub Pages(정적 호스팅)에 올라가 있어서, 로그인/댓글/좋아요처럼 서버가 필요한 기능은 로컬 개발 환경에서만 동작합니다.',
    screenshots: [
      { src: movieHome, small: movieHomeSm, caption: '메인 화면', width: 1280, height: 608 },
      { src: movieHover, caption: '영화 카드에 마우스를 올리면 제목, 평점, 소개글 표시', width: 1280, height: 594 },
      { src: movieDetail, caption: '영화 상세 정보 화면', width: 1280, height: 608 },
    ],
    stack: ['React', 'React Router', 'Node.js', 'MongoDB', 'RESTful API', 'TMDB API'],
    links: [
      { label: 'Live', url: 'https://iokl1004.github.io/John_Ahn_POP_Movie_React/' },
      { label: 'GitHub', url: 'https://github.com/iokl1004/John_Ahn_POP_Movie_React' },
    ],
    isPrivate: false,
  },
]
