// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { IHttpResponse } from "presentation/protocols/http";

export const badRequest = (message: string, statusCode: number) => ({
  message,
  statusCode,
});

export const sucessCreatedRequest = (message: string, response: any) => ({
  message,
  data: {
    ...response,
  },
  statusCode: 201,
});

export const getSuccessRequest = (message: string, response: any) => ({
  message,
  data: {
    ...response,
  },
  statusCode: 200,
});
