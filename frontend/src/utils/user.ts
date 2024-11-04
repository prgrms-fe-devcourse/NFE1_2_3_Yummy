export const USER_ID = () => localStorage.getItem('userId')
export const USER_LOGIN_STATUS = () => localStorage.getItem('isLoggedIn')
export const checkAuthor = (authorId: string) => {
  return USER_ID() === authorId
}
export const checkLogin = () => {
  return USER_LOGIN_STATUS() === 'true'
}
