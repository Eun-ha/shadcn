import { useRef, useState, type FormEvent } from "react"
import { tv } from "tailwind-variants"
import { Loader2, Paperclip, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const commentForm = tv({
  slots: {
    root: "flex flex-col gap-2",
    attachment: "flex w-fit items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1 text-xs text-muted-foreground",
    attachmentName: "max-w-[200px] truncate",
    attachmentRemove: "text-muted-foreground hover:text-foreground",
    actions: "flex items-center justify-between gap-2",
    attachButton: "text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50",
    submitActions: "flex justify-end gap-2",
  },
})

type CommentFormProps = {
  onSubmit: (content: string, file?: File) => void | Promise<void>
  onCancel?: () => void
  placeholder?: string
  submitLabel?: string
  autoFocus?: boolean
  isSubmitting?: boolean
  className?: string
}

function CommentForm({
  onSubmit,
  onCancel,
  placeholder = "댓글을 입력하세요",
  submitLabel = "등록",
  autoFocus,
  isSubmitting = false,
  className,
}: CommentFormProps) {
  const [value, setValue] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const s = commentForm()

  const canSubmit = value.trim().length > 0 || file !== null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit || isSubmitting) return
    try {
      await onSubmit(value.trim(), file ?? undefined)
      setValue("")
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch {
      // 제출 실패 시 입력 내용을 유지해 재시도할 수 있게 둠 (에러 알림은 호출부에서 처리)
    }
  }

  function handleRemoveFile() {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <form className={s.root({ class: className })} onSubmit={handleSubmit}>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={isSubmitting}
        className="min-h-[60px] text-sm"
      />

      {file && (
        <div className={s.attachment()}>
          <Paperclip size={12} />
          <span className={s.attachmentName()}>{file.name}</span>
          <button
            type="button"
            className={s.attachmentRemove()}
            onClick={handleRemoveFile}
            disabled={isSubmitting}
            aria-label="첨부파일 제거"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div className={s.actions()}>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          className={s.attachButton()}
          onClick={() => fileInputRef.current?.click()}
          disabled={isSubmitting}
          aria-label="파일 첨부"
        >
          <Paperclip size={16} />
        </button>

        <div className={s.submitActions()}>
          {onCancel && (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isSubmitting}>
              취소
            </Button>
          )}
          <Button type="submit" size="sm" disabled={!canSubmit || isSubmitting}>
            {isSubmitting && <Loader2 size={14} className="animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}

export { CommentForm }
export type { CommentFormProps }
