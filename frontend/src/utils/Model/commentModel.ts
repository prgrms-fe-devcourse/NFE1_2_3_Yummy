import { User } from '@/typings/db'

export class CommentForm {
  content: string
  postId: string

  constructor(content: string, postId: string) {
    this.content = content
    this.postId = postId
  }
}

export class CommentCreateForm {
  content: string
  postId: string
  user: User
  createdAt: string

  constructor(content: string, postId: string, user: User) {
    this.content = content
    this.postId = postId
    this.user = user
    this.createdAt = new Date().toISOString()
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
