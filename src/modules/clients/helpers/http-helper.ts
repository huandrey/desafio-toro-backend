// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { IHttpResponse } from "presentation/protocols/http";

export const badRequest = (message: string) => ({
  message,
  statusCode: 400,
});

export const sucessCreatedRequest = (message: string, response: any) => ({
  message,
  data: {
    response,
  },
  statusCode: 201,
});
