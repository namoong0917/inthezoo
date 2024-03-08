# InTheZoo, 동물 자랑 사이트

![inthezoo loginpage](https://github.com/namoong0917/inthezoo/assets/103318401/27c66f6a-890b-47f5-9b60-1af4bc867d73)

> View Site : https://inthezoo-f1fc8.web.app

## 🛠 사용 스택

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)
![firebase](https://img.shields.io/badge/firebase-fff?style=for-the-badge&logo=firebase&logoColor=FFCA28)

## Installation

```Bash
$ npm create vite@lastest
  create-vite@5.2.0
  Project name: inthezoo
  Select a framework: React
  Select a variant: TypeScript + SWC

$ npm i react-router0dom@6.14.2
$ npm i styled-reset
$ npm i styled-components@6.07
$ npm i @types/styled-components -D

$ npm i firebase@10.1.0

```

## Firebase Hosting, Firebase CLI, Firebase 초기화 작업

```Bash
$ npm install -g firebase-tools
$ firebase login
$ firebase init

$ Hosting: configure files for Firebase Hosting
$ Use an existing project
$ [project이름]

$ npm run build

$ dist
$ single-page app? Y
$ File dist/index.html already exists. overwrite? Y

```

## 💡 기능 구현

1. 로그인 페이지
   ![inthezoo loginpage](https://github.com/namoong0917/inthezoo/assets/103318401/27c66f6a-890b-47f5-9b60-1af4bc867d73)

2. HOME 화면, 게시글 업로드
   ![inthezoo hosting](https://github.com/namoong0917/inthezoo/assets/103318401/075dfcb0-4400-4b90-8d79-57a743616cef)

3. 게시물 삭제
   ![inthezoo Delete post](https://github.com/namoong0917/inthezoo/assets/103318401/b027ddd1-6a51-44b2-b2e6-f49b05c67a70)

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
