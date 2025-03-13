# 하나캐피탈 자산관리시스템 구축

## 목차

- [기술스택](#기술스택)
- [설치](#설치)
- [실행](#실행)
- [폴더구조](#폴더구조)
- [이슈사항](#이슈사항)

## 기술스택

Gulp5 : [https://gulpjs.com/](https://gulpjs.com/){:target="_blank"}
EJS : [https://ejs.co/](https://ejs.co/){:target="_blank"}
Sass : [https://sass-lang.com/](https://sass-lang.com/){:target="_blank"}
AG Grid : [https://www.ag-grid.com/](https://www.ag-grid.com/){:target="_blank"}

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

## 폴더구조

src
 ┣ error - 에러 페이지
 ┣ fonts
 ┣ img
 ┃ ┣ bg - 배경 이미지
 ┃ ┣ dummy - 더미 이미지
 ┃ ┣ icon - 아이콘 이미지
 ┃ ┗ image - 일반 이미지
  ┣ js
 ┃ ┣ libs
 ┃ ┃ ┣ ag-grid-community.js - AG Grid
 ┃ ┃ ┣ jquery-3.7.1.js
 ┃ ┃ ┣ jquery-ui.js
 ┃ ┃ ┣ jquery-viewer.js - 이미지 뷰어
 ┃ ┃ ┣ jquery.ui.monthpicker.js - monthpicker
 ┃ ┃ ┗ swiper-bundle.js
 ┃ ┗ ui.js - 컴포넌트 동작 정의
 ┣ page
 ┃ ┣ _inc
 ┃ ┃ ┣ head.ejs
 ┃ ┃ ┣ header.ejs - 헤더
 ┃ ┃ ┣ page_title.ejs - 페이지 제목
 ┃ ┃ ┗ tail.ejs
 ┃ ┣ guide.html - 컴포넌트 가이드
 ┃ ┣ prototype_grid.html - 그리드 페이지
 ┃ ┣ prototype_page.html - 일반 페이지
 ┃ ┣ prototype_popup.html - 팝업 페이지
 ┣ sass
 ┃ ┣ base
 ┃ ┃ ┣ _fonts.scss
 ┃ ┃ ┗ _reset.scss
 ┃ ┣ components
 ┃ ┃ ┣ _ag_grid.scss - AG Grid 스타일 정의
 ┃ ┃ ┣ _buttons.scss
 ┃ ┃ ┣ _externals.scss - 외부 라이브러리 스타일 정의
 ┃ ┃ ┣ _inputs.scss
 ┃ ┃ ┣ _modals.scss - 모달(레이어 팝업) 스타일 정의
 ┃ ┃ ┣ _page_title.scss
 ┃ ┃ ┗ _popups.scss - 팝업(시스템 팝업) 스타일 정의
 ┃ ┣ helpers
 ┃ ┃ ┣ _functions.scss
 ┃ ┃ ┣ _mixins.scss
 ┃ ┃ ┗ _variables.scss
 ┃ ┣ layout
 ┃ ┃ ┣ _contents.scss
 ┃ ┃ ┣ _grid.scss
 ┃ ┃ ┗ _header.scss
 ┃ ┗ ui.scss
 ┗ index.html - 페이지 목록

## 이슈사항

- 파일 수정 시, 전체 파일을 생성하는 현상(추후 수정)
- gulp-cli 전역 설치시 file already exists 에러 출력될 경우, --force으로 강제 설치 후 진행