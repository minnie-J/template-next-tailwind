import axios, { AxiosError, AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
// import { JWT } from "next-auth/jwt";

type ApiHandler<K> = AxiosRequestConfig<K> & {
  url: string;
  apiVersion?: string;
  token?: string;
  logTitle?: string;
  desc?: string;
};

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// NOTE axios 인스턴스
const request = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * NOTE
 * @type {unknown} T success일 때 response data의 타입
 * @type {unknown} K property중 body(AxiosRequestConfig에서는 data에 해당)의 타입
 * @param {string} url 필수 프로퍼티
 * @param {string} apiVersion API 버전 (기본값: v1)
 * @param {boolean} useToken 토큰 유무 판단 (기본값: true)
 * @param {string} logTitle API 호출 시 개발 환경에서 출력되는 콘솔 로그 타이틀. 내용이 없으면 상대 url이 출력됨
 * @param {AxiosRequestConfig} AxiosRequestConfig https://axios-http.com/kr/docs/req_config 참고
 * @returns {Promise<T>} 응답 status가 200일 때 data
 */
export const handler = async <T, K = undefined>({
  url: path,
  apiVersion,
  token,
  logTitle,
  desc,
  ...props
}: ApiHandler<K>) => {
  // if (useToken) {
  //   const accessToken = await getToken();
  //   accessToken && setToken(accessToken);
  // }

  if (token) setToken(token);

  const url = apiVersion ? `/${apiVersion}${path}` : `/v1${path}`;

  const log = logTitle ?? url;

  return request<T>({ ...props, url })
    .then(({ data, request }) => {
      // NOTE 콘솔 로그 그룹 출력
      console.groupCollapsed(
        `%c[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}] %c${log} %c${
          desc ?? ""
        }`,
        "color: gray",
        "color: #ffce08",
        "color: #BDBDBD"
      );

      // NOTE 응답 내용
      console.group("response");
      console.log(data);
      console.groupEnd();

      // NOTE 요청 내용
      console.groupCollapsed("request");

      console.group("%cfull url", "color: gray");
      console.log(request.responseURL);
      console.groupEnd();

      if (props.params) {
        console.group("%cparams", "color: gray");
        console.log(props.params);
        console.groupEnd();
      }

      if (props.data) {
        console.group("%cbody", "color: gray");
        console.log(props.data);
        console.groupEnd();
      }

      console.groupEnd();

      // NOTE API 호출 추적
      console.groupCollapsed("trace");
      console.trace(`%c${log}`, "color: #ffce08");
      console.groupEnd();

      console.groupEnd();

      return data;
    })
    .catch((error: AxiosError<T, K> | TypeError | unknown) => {
      if (error instanceof TypeError)
        // NOTE 런타임 에러
        throw { error, log, messages: error.message };
      else if (error instanceof AxiosError) {
        // NOTE 응답 에러
        console.group(
          `%c[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}] %c${log}`,
          "color: gray",
          "color: red"
        );

        // NOTE 에러 메시지
        console.group("error messages");
        // 에러 형태에 따라 달라질 수 있음
        // error.response.errors?.length &&
        //   error.response.errors.map(({ message }) =>
        //     console.log(
        //       `%c${message}`,
        //       "color: #d66d78; font-size: 14px; font-weight: bold"
        //     )
        //   );
        // 단문일 경우
        console.log(
          `%c${error.message}`,
          "color: #d66d78; font-size: 14px; font-weight: bold"
        );
        console.groupEnd();

        // NOTE 요청 내용
        console.groupCollapsed("request");
        console.dir(error.request);
        console.log(error.code);
        console.groupEnd();

        // NOTE 응답 내용
        console.groupCollapsed("response");
        console.log(error.response);
        console.groupEnd();

        // NOTE API 호출 추적
        console.groupCollapsed("trace");
        console.trace(`%c${log}`, "color: red");
        console.groupEnd();

        console.groupEnd();

        // 에러 형태에 따라 달라질 수 있음
        // const { status, errors } = error;

        // const messages = errors?.reduce(
        //   (
        //     list: Array<{ code?: string; message: string }>,
        //     { extensions, message }
        //   ) => {
        //     list.push({
        //       code: extensions ? `${extensions?.code}` : undefined,
        //       message,
        //     });
        //     return list;
        //   },
        //   []
        // );

        throw { error, log, status: error.status, messages: error.message };
      } else throw { error, messages: null };
    });
};

/**
 * NOTE
 * - request header에 토큰 추가하는 함수
 * @param token
 * @returns void
 */
export const setToken = (token: string) =>
  (request.defaults.headers["Authorization"] = `Bearer ${token}`);

/**
 * NOTE
 * - jwt에 저장된 accessToken 리턴
 * @returns {Promise<string>} accessToken
 */
// export const getToken = async () =>
//   await axios<JWT>(`${window.location.origin}/api/auth/jwt`).then(
//     ({ data }) => data.accessToken
//   );

export const listMain = () =>
  fetch(`${API_BASE_URL}/mains`)
    .then((res) => res.json())
    .catch((error) => console.log("error: ", error));

export const listSub = ({ id, tab }: { id?: string; tab: string }) => {
  const cat = tab === "sub1" ? "subs1" : "subs2";

  return fetch(`${API_BASE_URL}/mains/${id}/${cat}`)
    .then((res) => res.json())
    .catch((error) => console.log("error: ", error));
};

interface User {
  id: number;
  name: string;
  email: string;
}
export interface Article {
  id: number;
  user: Omit<User, "email">;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Page {
  totalpages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

type Articles = { pagination: Page; data: Array<Article> };

export const articles = async ({
  page = 1,
  limit = 10,
  ...props
}: {
  page?: number;
  limit?: number;
} & Omit<ApiHandler<undefined>, "url">) => {
  const url = "/articles";
  return await handler<Articles>({ ...props, url, params: { page, limit } });
};

// export interface APIRequest {
//   key: string | Array<string>;
//   query: RequestDocument;
//   variables?: Variables;
//   returnRawData?: boolean;
//   token?: string;
//   traceDesc?: string;
//   cancelSignal?: AbortSignal;
// }

// /**
//  * NOTE
//  * @param {string} host (optional) host (기본값: process.env.NEXT_PUBLIC_DEV_MAIN_HOST)
//  * @param {string} apiVersion (optional) API Version (기본값: v1)
//  */
// export const changeEndpoint = ({
//   host = MAIN_HOST,
//   apiVersion = "v1",
// }: {
//   host?: string;
//   apiVersion?: string;
// }) => {
//   const newHost = CUSTOM_PORT ? `${host}:${CUSTOM_PORT}` : host;

//   client.setEndpoint(`${PROTOCOL}://${newHost}/api/${apiVersion}/query`);
// };

// /**
//  * NOTE
//  * - GraphQL Client를 이용하여 호출한 API의 Response를 Promise로 리턴
//  * @param {string | Array<string>} key graphql 응답으로 들어온 JSON에서 실 데이터에 해당하는 속성의 key 또는 로그 출력 구분 역할
//  * @param {RequestDocument} query graphql 쿼리
//  * @param {object} variables graphql 파라미터
//  * @typedef {any} T success일 때 리턴되는 response data의 타입
//  * @param {boolean} returnRawData 응답 데이터 그대로 넘길 때 사용
//  * @param {string} token (optional) access token
//  * @param {string} traceDesc (optional) console에 API key가 들어가는 자리에 부가 설명 추가 필요 시
//  * @param {AbortSignal} cancelSignal (optional) API 호출 취소 시그널
//  * @returns {Promise<T>} T타입의 response data
//  */
// export const gqlRequest = <T>({
//   key,
//   query,
//   variables,
//   returnRawData = false,
//   token,
//   traceDesc,
//   cancelSignal,
// }: APIRequest) => {
//   token && client.setHeader("authorization", `Bearer ${token}`);

//   return client
//     .request<{ [key: string]: T } | T>({
//       document: query,
//       variables,
//       signal: cancelSignal,
//     })
//     .then((res) => {
//       const response: T =
//         returnRawData || typeof key !== "string"
//           ? (res as T)
//           : (res as { [key: string]: T })[`${key}`];

//       const desc = traceDesc ? `(${traceDesc})` : "";

//       console.groupCollapsed(
//         `%c[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}] %c${key} %c${desc}`,
//         "color: gray",
//         "color: #ffce08",
//         "color: #BDBDBD"
//       );

//       console.group("response");
//       console.log(response);
//       console.groupEnd();

//       console.groupCollapsed("request");

//       console.group("%cquery", "color: gray");
//       console.log(query);
//       console.groupEnd();

//       console.group("%cvariables", "color: gray");
//       console.log(variables);
//       console.groupEnd();

//       console.groupEnd();

//       console.groupCollapsed("trace");
//       console.trace(`%c${traceDesc ?? key}`, "color: #ffce08");
//       console.groupEnd();

//       console.groupEnd();

//       return response;
//     })
//     .catch((error: ClientError | TypeError | unknown) => {
//       if (error instanceof TypeError)
//         throw { error, key, messages: error.message };
//       else if (error instanceof ClientError) {
//         console.group(
//           `%c[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}] %c${key}`,
//           "color: gray",
//           "color: red"
//         );

//         console.group("error messages");
//         error.response.errors?.length &&
//           error.response.errors.map(({ message }) =>
//             console.log(
//               `%c${message}`,
//               "color: #d66d78; font-size: 14px; font-weight: bold"
//             )
//           );
//         console.groupEnd();

//         console.groupCollapsed("request");
//         console.dir(error.request);
//         console.groupEnd();

//         console.groupCollapsed("response");
//         console.log(error.response);
//         console.groupEnd();

//         console.groupCollapsed("trace");
//         console.trace(`%c${traceDesc ?? key}`, "color: red");
//         console.groupEnd();

//         console.groupEnd();

//         const { status, errors } = error.response;

//         const messages = errors?.reduce(
//           (
//             list: Array<{ code?: string; message: string }>,
//             { extensions, message }
//           ) => {
//             list.push({
//               code: extensions ? `${extensions?.code}` : undefined,
//               message,
//             });
//             return list;
//           },
//           []
//         );

//         throw { error, key, status, messages };
//       } else throw { error, messages: null };
//     });
// };

/**
 * TODO
 * - api util 정리
 * - loading/error 처리 화면
 * - storybook
 * - 테스트 코드
 * - shadcn ui
 * - dark mode
 * - 모달 팝업
 * - nextauth
 * - 로그인 예제
 * - 기능 정리
 */
