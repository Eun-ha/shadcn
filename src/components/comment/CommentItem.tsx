import { useState } from "react"
import { tv } from "tailwind-variants"
import { ChevronDown, CornerDownRight, Paperclip } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommentDivider } from "./CommentDivider"
import { CommentForm } from "./CommentForm"
import { COMMENT_INDENT_STEP } from "./constants"
import type { CommentData } from "./types"

const commentItem = tv({
  slots: {
    root: "flex gap-3 py-4",
    avatar: "h-[30px] w-[30px] shrink-0",
    body: "flex flex-1 flex-col gap-1",
    header: "flex items-center gap-2",
    author: "text-sm font-semibold text-foreground",
    date: "text-xs text-muted-foreground",
    content: "text-sm leading-relaxed text-foreground whitespace-pre-wrap",
    attachment: "flex w-fit items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1 text-xs text-muted-foreground",
    actions: "flex items-center gap-3 pt-1",
    actionButton: "flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
    toggleChevron: "transition-transform duration-200",
    replyForm: "pt-2",
    replies: "flex flex-col",
  },
})

type CommentItemProps = {
  comment: CommentData
  depth?: number
  onReply: (commentId: string, content: string, file?: File) => void | Promise<void>
}

function CommentItem({ comment, depth = 0, onReply }: CommentItemProps) {
  const [replying, setReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)
  const s = commentItem()

  const hasReplies = !!comment.replies?.length

  async function handleReplySubmit(content: string, file?: File) {
    setIsSubmittingReply(true)
    try {
      await onReply(comment.id, content, file)
      setReplying(false)
      setShowReplies(true)
    } finally {
      setIsSubmittingReply(false)
    }
  }

  return (
    <div className={s.root()} style={depth > 0 ? { paddingLeft: depth * COMMENT_INDENT_STEP } : undefined}>
      <Avatar className={s.avatar()}>
        <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
        <AvatarFallback className="text-xs">{comment.author.name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className={s.body()}>
        <div className={s.header()}>
          <span className={s.author()}>{comment.author.name}</span>
          <span className={s.date()}>{comment.date}</span>
        </div>

        <p className={s.content()}>{comment.content}</p>

        {comment.attachmentName && (
          <div className={s.attachment()}>
            <Paperclip size={12} />
            <span className="max-w-[200px] truncate">{comment.attachmentName}</span>
          </div>
        )}

        <div className={s.actions()}>
          <button type="button" className={s.actionButton()} onClick={() => setReplying((v) => !v)}>
            <CornerDownRight size={12} />
            답글 달기
          </button>
          {hasReplies && (
            <button type="button" className={s.actionButton()} onClick={() => setShowReplies((v) => !v)}>
              <ChevronDown size={12} className={s.toggleChevron({ class: showReplies ? "rotate-180" : "" })} />
              {showReplies ? "답글 숨기기" : `답글 ${comment.replies!.length}개 보기`}
            </button>
          )}
        </div>

        {replying && (
          <div className={s.replyForm()}>
            <CommentForm
              autoFocus
              placeholder="답글을 입력하세요"
              submitLabel="답글 달기"
              onSubmit={handleReplySubmit}
              onCancel={() => setReplying(false)}
              isSubmitting={isSubmittingReply}
            />
          </div>
        )}

        {hasReplies && showReplies && (
          <div className={s.replies()}>
            {comment.replies!.map((reply, index) => (
              <div key={reply.id}>
                {index > 0 && <CommentDivider depth={depth + 1} />}
                <CommentItem comment={reply} depth={depth + 1} onReply={onReply} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { CommentItem }
export type { CommentItemProps }
