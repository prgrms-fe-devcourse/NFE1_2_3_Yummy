export class CommentForm {
  content: string
  postId: string

  constructor(content: string, postId: string) {
    this.content = content
    this.postId = postId
  }
}

export class CommentUpdateForm {
  content: string
  postId: string
  commentId: string

  constructor(content: string, postId: string, commentId: string) {
    this.content = content
    this.postId = postId
    this.commentId = commentId
  }
}
