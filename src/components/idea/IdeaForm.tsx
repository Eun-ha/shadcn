import { tv } from "tailwind-variants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ideaForm = tv({
  slots: {
    root: "w-full",
    header: "pb-4",
    title: "text-base font-semibold",
    description: "text-sm text-muted-foreground",
    body: "flex flex-col gap-4",
    field: "flex flex-col gap-1.5",
    actions: "flex justify-end gap-2 pt-2",
    charCount: "ml-auto text-xs text-muted-foreground",
  },
})

const CATEGORIES = [
  { value: "service",    label: "서비스/제��" },
  { value: "process",   label: "업무 프로세스" },
  { value: "culture",   label: "조직문화" },
  { value: "cost",      label: "비용절���" },
  { value: "welfare",   label: "복지/환경" },
  { value: "other",     label: "기타" },
]

type IdeaFormProps = {
  onCancel?: () => void
  onSubmit?: () => void
  className?: string
}

function IdeaForm({ onCancel, onSubmit, className }: IdeaFormProps) {
  const s = ideaForm()

  return (
    <Card className={s.root({ class: className })}>
      <CardHeader className={s.header()}>
        <p className={s.title()}>아이디어 등록</p>
        <p className={s.description()}>
          좋은 아이디어를 자유롭게 제안해주세요. 채택 시 포인트가 지급됩니다.
        </p>
      </CardHeader>

      <CardContent className={s.body()}>
        <div className={s.field()}>
          <Label htmlFor="idea-title">제목 <span className="text-destructive">*</span></Label>
          <Input
            id="idea-title"
            placeholder="아이디어를 한 줄로 요약해주세요"
            maxLength={60}
          />
        </div>

        <div className={s.field()}>
          <Label htmlFor="idea-category">카테고리 <span className="text-destructive">*</span></Label>
          <Select>
            <SelectTrigger id="idea-category">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={s.field()}>
          <div className="flex items-center">
            <Label htmlFor="idea-content">내용 <span className="text-destructive">*</span></Label>
            <span className={s.charCount()}>0 / 500</span>
          </div>
          <Textarea
            id="idea-content"
            placeholder="현재 문제점과 개선 방향, 기대 효과를 구체적으로 작성해주세요"
            className="min-h-32 resize-none"
            maxLength={500}
          />
        </div>

        <div className={s.field()}>
          <Label htmlFor="idea-effect">기대 효과</Label>
          <Input
            id="idea-effect"
            placeholder="예) 월 OO만원 절감, 처리 시간 OO% 단축"
          />
        </div>

        <div className={s.actions()}>
          <Button variant="ghost" onClick={onCancel}>
            취소
          </Button>
          <Button onClick={onSubmit}>
            등록하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { IdeaForm, CATEGORIES }
