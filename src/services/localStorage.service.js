const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USER_NAME = "user-local-name";
const USER_POINTS = "jwt-token";

export function setTokens(userName, points, expiresIn = 3600) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;

  localStorage.setItem(USER_NAME, userName);
  localStorage.setItem(USER_POINTS, points);
  //   localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getUserPoints() {
  return localStorage.getItem(USER_POINTS);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USER_NAME);
  localStorage.removeItem(USER_POINTS);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserName() {
  return localStorage.getItem(USER_NAME);
}

const localStorageService = {
  setTokens,
  getUserPoints,
  getRefreshToken,
  getTokenExpiresDate,
  getUserName,
  removeAuthData,
};
export default localStorageService;
