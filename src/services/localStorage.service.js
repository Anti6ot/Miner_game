const EXPIRES_KEY = "jwt-expires";
const USER_NAME = "user-local-name";
const USER_POINTS = "jwt-token";

export function setTokens(userName, points, expiresIn = 3600) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USER_NAME, userName);
  localStorage.setItem(USER_POINTS, points);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getUserPoints() {
  return localStorage.getItem(USER_POINTS);
}
//  удаление и localStorage
export function removeAuthData() {
  localStorage.removeItem(USER_NAME);
  localStorage.removeItem(USER_POINTS);
  localStorage.removeItem(EXPIRES_KEY);
}

export function getUserName() {
  return localStorage.getItem(USER_NAME);
}

const localStorageService = {
  setTokens,
  getUserPoints,
  getUserName,
  removeAuthData,
};
export default localStorageService;
