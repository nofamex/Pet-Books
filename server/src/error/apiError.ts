import { INTERNAL_SERVER_ERROR } from "http-status";

const DEFAULT_API_ERROR_TITLE = "Internal server error";
const DEFAULT_API_ERROR_MESSAGE =
  "Something is not working in the back-end. Please contact back-end team to resolve this issue.";

export default class ApiError {
  private title: string;
  private statusCode: number;
  private message: string;

  constructor(statusCode: number, title: string, message?: string) {
    this.title = title || DEFAULT_API_ERROR_TITLE;
    this.statusCode = statusCode || INTERNAL_SERVER_ERROR;
    this.message = message || DEFAULT_API_ERROR_MESSAGE;
  }
}
