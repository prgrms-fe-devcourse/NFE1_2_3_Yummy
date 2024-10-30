export interface Post {
  category: string
  title: string
  user: User
  content: string
  image_url: string
  createdAt: string
  updatedAt: string
  _id: string
}

export interface Posts {
  posts: Post[]
  totalCount: number
}

export interface Comment {
  _id: string
  postId: string
  user: User
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface User {
  _id?: string
  profileImageUrl?: string
  nickname: string
  bio: string
}

export interface PostForm {
  title: string
  image_url: string
  content: string
  category: string
}
