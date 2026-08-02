type CommentAuthor = {
  name: string
  avatarUrl?: string
}

type CommentData = {
  id: string
  author: CommentAuthor
  content: string
  date: string
  attachmentName?: string
  replies?: CommentData[]
}

export type { CommentAuthor, CommentData }
