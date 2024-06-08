// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2020: true, // 최신 ECMAScript 표준 사용
    node: true, // Node.js 환경 추가
  },
  extends: [
    "eslint:recommended", // ESLint 권장 규칙 사용
    "plugin:react/recommended", // React 권장 규칙 사용
    "plugin:react/jsx-runtime", // JSX 런타임 관련 규칙 사용
    "plugin:react-hooks/recommended", // React Hooks 권장 규칙 사용
  ],
  parserOptions: {
    ecmaVersion: "latest", // 최신 ECMAScript 버전 사용
    sourceType: "module", // 모듈 사용
  },
  settings: {
    react: {
      version: "18.2", // React 버전 설정
    },
  },
  plugins: ["react-refresh"], // React Fast Refresh 플러그인 사용
  rules: {
    "react-refresh/only-export-components": "warn", // 컴포넌트만 export 하도록 경고
  },
};
