import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],

  /** NOTE rulse
   * - Level: 0 비활성, 1 경고, 2 에러
   * - Applicable: always | never
   * - 기본 룰: /home/minhee/workspace/personal/template-next-tailwind/node_modules/@commitlint/config-conventional/README.md
   */
  rules: {
    "header-max-length": [2, "always", 150],
    "subject-case": [0],
    "type-enum": [0],
    "commit-type": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "commit-type": ({ type }) => {
          const types = new Set([
            "feat",
            "fix",
            "refactor",
            "style",
            "docs",
            "test",
            "chore",
            "revert",
          ]);
          return [
            !!(type != null && types.has(type)),
            `커밋 타입이 맞지 않습니다
     [허용 커밋 타입]
     - feat: 새로운 기능 추가
     - fix: 버그 수정
     - refactor: 기능을 추가하지 않는 코드 수정, 코드 리팩토링
     - style: 코드 의미에 영향을 주지 않는 변경사항(코드 포맷팅, 세미 콜론 누락, 코드 수정이 없는 경우 등)
     - docs: 문서 수정
     - test: 테스트 코드 추가
     - chore: 빌드 부분 혹은 패키지 매니저 수정사항, 설정 변경 등
     - revert: 이전 버전으로 되돌림
    `,
          ];
        },
      },
    },
  ],
};

export default config;
