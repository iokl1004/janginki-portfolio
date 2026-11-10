export type PersonalProject = {
  title: string
  period: string
  tag: string // 성격: 강의 실습 / 개인 학습 등
  description: string
  live?: string
  repo?: string
}

// 최신순. 접속이 안 되는 링크는 live 줄을 지우면 버튼이 사라집니다.
export const personalProjects: PersonalProject[] = [
  {
    title: 'React Hooks 학습',
    period: '2024.12',
    tag: '유튜브 강의 실습',
    description: '별코딩 React Hooks 시리즈를 따라 개발 공부한 내용',
    repo: 'https://github.com/iokl1004/star_coding-react_hook_master',
  },
  {
    title: '유튜브 사이트 만들기 (React & Node.js)',
    period: '2024.09 ~ 2024.10',
    tag: '인프런 강의 실습',
    description: '따라하며 배우는 노드, 리액트 시리즈의 유튜브 사이트 프로젝트',
    repo: 'https://github.com/iokl1004/John_Ahn_Youtube_React',
  },
  {
    title: 'React 기본 (노드, 리액트 시리즈)',
    period: '2024.09',
    tag: '인프런 강의 실습',
    description: '따라하며 배우는 노드, 리액트 시리즈의 기본 강의(React) 실습',
    repo: 'https://github.com/iokl1004/John_Ahn_Basic_React',
  },
  {
    title: '미니 블로그',
    period: '2024.08 ~ 2024.09',
    tag: '인프런 강의 실습',
    description: '처음 만난 리액트 강의의 미니 블로그 프로젝트',
    live: 'https://iokl1004.github.io/first_met-mini-blog/',
  },
  {
    title: '쇼핑몰',
    period: '2024.08',
    tag: '코딩애플 강의 실습',
    description: '코딩애플 강의의 쇼핑몰 프로젝트',
    live: 'https://iokl1004.github.io/coding-apple-shop/',
  },
  {
    title: '블로그 제작 & 기초 문법',
    period: '2024.08',
    tag: '코딩애플 강의 실습',
    description: '코딩애플 강의의 블로그 제작과 React 기초 문법',
    live: 'https://iokl1004.github.io/coding-apple-blog/',
  },
  {
    title: '한입 크기로 잘라 먹는 리액트',
    period: '2024.06 ~ 2024.07',
    tag: 'Udemy 강의 실습',
    description: '[2024 리뉴얼] 한입 크기로 잘라 먹는 리액트(React.js) 강의 실습',
    repo: 'https://github.com/iokl1004/ONEBITE_REACT',
  },
  {
    title: '영화 소개 Movie App',
    period: '2022.02',
    tag: '개인 학습',
    description: '영화 소개 데이터를 크롤링해 만든 Movie App 홈페이지',
    live: 'https://iokl1004.github.io/react-movie/',
  },
  {
    title: '간단한 게시판 블로그',
    period: '2022.02',
    tag: '개인 학습',
    description: 'React.js로 만든 간단한 게시판 블로그 페이지',
    repo: 'https://github.com/iokl1004/react-simple-blog',
  },
  {
    title: 'ToDoList',
    period: '2022.02',
    tag: '개인 학습',
    description: 'React.js로 만든 간단한 ToDoList 홈페이지',
    live: 'https://iokl1004.github.io/mashup-todolist',
  },
]
