# 하나캐피탈 자산관리시스템 구축

## 목차

- [기술스택](#기술스택)
- [설치](#설치)
- [실행](#실행)
- [폴더구조](#폴더구조)
- [이슈사항](#이슈사항)

## 기술스택

Gulp5 : [https://gulpjs.com/](https://gulpjs.com/)<br/>
EJS : [https://ejs.co/](https://ejs.co/)<br/>
Sass : [https://sass-lang.com/](https://sass-lang.com/)<br/>
AG Grid : [https://www.ag-grid.com/](https://www.ag-grid.com/)

## 설치

```bash
npm install gulp -g
npm install gulp-cli -g
npm install
```

## 실행

```bash
gulp
```

- output 전달 전, 반드시 gulp를 재실행시켜서 불필요한 파일을 삭제

## 폴더구조

src<br/>
 ┣ error - 에러 페이지<br/>
 ┣ fonts<br/>
 ┣ img<br/>
 ┃ ┣ bg - 배경 이미지<br/>
 ┃ ┣ dummy - 더미 이미지<br/>
 ┃ ┣ icon - 아이콘 이미지<br/>
 ┃ ┗ image - 일반 이미지<br/>
 ┣ js<br/>
 ┃ ┣ libs<br/>
 ┃ ┃ ┣ ag-grid-community.js - AG Grid<br/>
 ┃ ┃ ┣ jquery-3.7.1.js<br/>
 ┃ ┃ ┣ jquery-ui.js<br/>
 ┃ ┃ ┣ jquery-viewer.js - 이미지 뷰어<br/>
 ┃ ┃ ┣ jquery.twbsPagination.min.js - pageination 라이브러리<br/>
 ┃ ┃ ┣ jquery.ui.monthpicker.js - monthpicker<br/>
 ┃ ┃ ┗ swiper-bundle.js<br/>
 ┃ ┗ ui.js - 컴포넌트 동작 정의<br/>
 ┣ page<br/>
 ┃ ┣ _inc<br/>
 ┃ ┃ ┣ head.ejs<br/>
 ┃ ┃ ┣ header.ejs - 헤더<br/>
 ┃ ┃ ┣ page_title.ejs - 페이지 제목<br/>
 ┃ ┃ ┗ tail.ejs<br/>
 ┃ ┣ guide.html - 컴포넌트 가이드<br/>
 ┃ ┣ prototype_grid.html - 그리드 페이지<br/>
 ┃ ┣ prototype_page.html - 일반 페이지<br/>
 ┃ ┣ prototype_popup.html - 팝업 페이지<br/>
 ┣ sass<br/>
 ┃ ┣ base<br/>
 ┃ ┃ ┣ _fonts.scss<br/>
 ┃ ┃ ┗ _reset.scss<br/>
 ┃ ┣ components<br/>
 ┃ ┃ ┣ _ag_grid.scss - AG Grid 스타일 정의<br/>
 ┃ ┃ ┣ _buttons.scss<br/>
 ┃ ┃ ┣ _colors.scss - 단일 항목 색상 정의<br/>
 ┃ ┃ ┣ _externals.scss - 외부 라이브러리 스타일 정의<br/>
 ┃ ┃ ┣ _inputs.scss<br/>
 ┃ ┃ ┣ _modals.scss - 모달(레이어 팝업) 스타일 정의<br/>
 ┃ ┃ ┣ _page_title.scss<br/>
 ┃ ┃ ┗ _popups.scss - 팝업(시스템 팝업) 스타일 정의<br/>
 ┃ ┣ helpers<br/>
 ┃ ┃ ┣ _functions.scss<br/>
 ┃ ┃ ┣ _mixins.scss<br/>
 ┃ ┃ ┗ _variables.scss<br/>
 ┃ ┣ layout<br/>
 ┃ ┃ ┣ _contents.scss - 페이지 내부 컴포넌트 스타일 정의<br/>
 ┃ ┃ ┣ _grid.scss - 페이지 wrapper 스타일 정의<br/>
 ┃ ┃ ┣ _header.scss<br/>
 ┃ ┃ ┗ _login.scss<br/>
 ┃ ┗ ui.scss<br/>
 ┗ index.html - 페이지 목록

## 이슈사항

- gulp-cli 전역 설치시 file already exists 에러 출력될 경우, --force으로 강제 설치 후 진행