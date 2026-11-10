# 장인기 웹 개발자 포트폴리오

Java/Spring 실무 약 3년, React 화면까지 영역을 넓혀 가는 웹 개발자 장인기의 포트폴리오 사이트입니다.

**사이트**: https://iokl1004.github.io/janginki-portfolio/

## 소개

인사/급여/근태 모듈 중심의 ERP 구축과 유지보수 경험을 프로젝트별 케이스 스터디로 정리했습니다.
각 케이스는 문제, 접근, 결과 순서로 구성했고, 회사 프로젝트는 코드를 공개할 수 없어 설계와 처리 흐름 중심으로 설명합니다.
개인 프로젝트는 라이브 주소와 GitHub 저장소를 함께 연결했습니다.

## 주요 기능

- 회사 프로젝트 8개와 개인 프로젝트의 케이스 스터디 상세 페이지
- 기술 스택을 사용처 기준으로 정리하고 실무/학습 경험을 구분해 표시
- 라이트/다크 모드 (시스템 설정을 따르고 직접 전환 가능)
- 스크롤 위치에 따라 강조되는 상단 메뉴와 오른쪽 바로가기 메뉴
- 상세 페이지에서 돌아왔을 때 보던 위치로 복원
- 이메일/GitHub 주소 복사 버튼, 맨 위로 이동 버튼
- 모바일 화면 대응

## 기술 스택

| 구분       | 사용 기술                    |
| ---------- | ---------------------------- |
| 프론트엔드 | React, TypeScript            |
| 빌드       | Vite                         |
| 스타일     | Tailwind CSS v4              |
| 라우팅     | React Router (HashRouter)    |
| 배포       | GitHub Pages, GitHub Actions |

HashRouter를 쓴 이유는 GitHub Pages가 정적 호스팅이라 `/projects/...` 같은 주소에서 새로고침하면 404에러가 발생하기 때문입니다.

## 폴더 구조

```
src/
├─ components/   화면 구성 요소 (Header, SideNav, ProjectCard, TechStack, Experience, Credentials, Contact 등)
├─ data/         프로필, 프로젝트, 기술 스택 데이터 (이 파일들만 고치면 내용이 바뀝니다)
├─ hooks/        스크롤 위치에 따른 활성 섹션 감지
├─ pages/        Home, CaseStudy
└─ utils/        스크롤 이동, 스크롤 위치 복원
```

## 실행 방법

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 배포용 빌드
```

Node.js 20.19 이상(또는 22.12 이상)이 필요합니다.

## 배포

`main` 브랜치에 push하면 GitHub Actions가 빌드해서 GitHub Pages에 자동 배포합니다. (`.github/workflows/deploy.yml`)

## 개발 방식

이 사이트는 Claude(Anthropic)와 대화하며 개발했습니다.
프로젝트 내용과 성과는 제 경력기술서에 근거해 직접 확인하고 작성했고, 화면 구성과 기능 방향은 제가 정한 뒤 AI가 제안한 코드를 직접 실행하며 검토했습니다.
