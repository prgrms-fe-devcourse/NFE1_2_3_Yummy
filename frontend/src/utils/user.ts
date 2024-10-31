export const USER_ID = () => localStorage.getItem('userId')
export const checkAuthor = (authorId: string) => {
  return USER_ID() === authorId
}
