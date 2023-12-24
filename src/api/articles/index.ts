import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { ApiHandler, apiHandler, request } from "@/api/utils";
import { Page } from "@/api/types";

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

export type Articles = { pagination: Page; data: Array<Article> };

export const articles = async ({
  page,
  limit = 10,
  ...props
}: {
  page: number;
  limit?: number;
} & ApiHandler) => {
  const url = "/articles";

  const req = request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.params.page != null) {
        config.params = { ...config.params, page: config.params.page + 1 };
      }
      return config;
    },
    (error) => {
      // 요청 오류가 있는 작업 수행
      return Promise.reject(error);
    }
  );

  const res = request.interceptors.response.use(
    (response: AxiosResponse) => {
      const { headers, data } = response;

      const pagination: Page = headers["link"].split(", ").reduce(
        (acc: Page, str: string) => {
          const arr = str.split("; ") as [string, string];
          const key = arr[1].split("=")[1];
          const value = arr[0]
            .split("?")[1]
            .split("&")
            .find((str) => str.includes("_page"))!
            .split("=")[1];

          if (key.includes("prev")) return { ...acc, hasPrev: true };
          if (key.includes("next")) return { ...acc, hasNext: true };
          if (key.includes("last"))
            return { ...acc, totalPages: Number(value) };

          return acc;
        },
        {
          hasPrev: false,
          hasNext: false,
          totalPages: 0,
        }
      );
      return { ...response, data: { pagination, data } };
    },
    (error) => {
      // 요청 오류가 있는 작업 수행
      return Promise.reject(error);
    }
  );

  return await apiHandler<Articles>({
    ...props,
    url,
    params: { page, limit },
  }).finally(() => {
    request.interceptors.request.eject(req);
    request.interceptors.response.eject(res);
  });
};
