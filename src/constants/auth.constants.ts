export const passwordRegex: RegExp = /^(?=.*[A-Za-z\u0400-\u04FF])(?=.*\d).+$/;

export const passwordMessage: string =
  "password must be at least 8 characters long and contain at least 2 uppercase, 2 lowecase letters, 1 number and 1 special character";

export const emailRegex: RegExp =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

export const usernameRegex = /^[A-Za-z\u0400-\u04FF\u0401\u04510-9_-]{3,20}$/;
