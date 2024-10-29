export class CommentForm {
  content: string
  author: string
  postId: string

  constructor(content: string, author: string, postId: string) {
    this.content = content
    this.author = author
    this.postId = postId
  }
}
