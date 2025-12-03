export const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d).+$/;

export const passwordMessage: string =
  "Password must be at least 8 characters long, contain at least one letter and one number";

export const emailRegex: RegExp =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export const usernameRegex = /^[A-Za-z\u0400-\u04FF\u0401\u04510-9_-]{3,20}$/;
