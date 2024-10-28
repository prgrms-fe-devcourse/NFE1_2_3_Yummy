export interface Post {
  category: string
  title: string
  content: string
  image_url: string
  createdAt: string
  updatedAt: string
  _id: string
}

export interface Comment {
  _id: string
  postId: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}
