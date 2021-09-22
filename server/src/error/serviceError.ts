import { CONFLICT, NOT_ACCEPTABLE, NOT_FOUND } from "http-status";
import ApiError from "./apiError";

export const usernameAlreadyExistError = (): ApiError => {
  return new ApiError(
    CONFLICT,
    "Register Error",
    "There is already exist user with given username."
  );
};

export const noUsernameFoundError = (): ApiError => {
  return new ApiError(
    NOT_FOUND,
    "Login Error",
    "There is no user with given username."
  );
};

export const wrongPasswordError = (): ApiError => {
  return new ApiError(
    NOT_ACCEPTABLE,
    "Login Error",
    "The given password doesnt match."
  );
};
