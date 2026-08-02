import { Separator } from "@/components/ui/separator"
import { COMMENT_CONTENT_OFFSET, COMMENT_INDENT_STEP } from "./constants"

type CommentDividerProps = {
  depth: number
}

function CommentDivider({ depth }: CommentDividerProps) {
  return (
    <div style={{ paddingLeft: depth * COMMENT_INDENT_STEP + COMMENT_CONTENT_OFFSET }}>
      <Separator />
    </div>
  )
}

export { CommentDivider }
export type { CommentDividerProps }
