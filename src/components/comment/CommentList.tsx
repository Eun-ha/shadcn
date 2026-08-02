import { useState } from "react"
import { tv } from "tailwind-variants"
import { CommentDivider } from "./CommentDivider"
import { CommentForm } from "./CommentForm"
import { CommentItem } from "./CommentItem"
import type { CommentData } from "./types"

const commentList = tv({
  slots: {
    root: "flex flex-col gap-4",
    count: "text-sm font-semibold text-foreground",
    items: "flex flex-col",
  },
})

function countComments(comments: CommentData[]): number {
  return comments.reduce((acc, c) => acc + 1 + (c.replies ? countComments(c.replies) : 0), 0)
}

type CommentListProps = {
  comments: CommentData[]
  onAddComment: (content: string, file?: File) => void | Promise<void>
  onAddReply: (commentId: string, content: string, file?: File) => void | Promise<void>
  className?: string
}

function CommentList({ comments, onAddComment, onAddReply, className }: CommentListProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const s = commentList()

  async function handleSubmit(content: string, file?: File) {
    setIsSubmitting(true)
    try {
      await onAddComment(content, file)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={s.root({ class: className })}>
      <p className={s.count()}>댓글 {countComments(comments)}개</p>
      <CommentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <div className={s.items()}>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            {index > 0 && <CommentDivider depth={0} />}
            <CommentItem comment={comment} onReply={onAddReply} />
          </div>
        ))}
      </div>
    </div>
  )
}

export { CommentList }
export type { CommentListProps }
