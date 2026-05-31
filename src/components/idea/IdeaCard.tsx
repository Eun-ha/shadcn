import { tv } from "tailwind-variants"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusBadge } from "./StatusBadge"
import { PointChip } from "./PointChip"
import { CategoryTag } from "./CategoryTag"
import type { StatusBadgeProps } from "./StatusBadge"
import type { CategoryTagProps } from "./CategoryTag"

const ideaCard = tv({
  slots: {
    root: "group/card flex flex-col gap-0 transition-shadow hover:shadow-md cursor-pointer",
    header: "flex items-start justify-between gap-2 pb-2",
    title: "line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover/card:text-primary transition-colors",
    meta: "flex shrink-0 flex-col items-end gap-1",
    body: "flex flex-col gap-2 py-0",
    description: "line-clamp-3 text-xs text-muted-foreground leading-relaxed",
    tags: "flex flex-wrap gap-1",
    footer: "flex items-center justify-between pt-3",
    author: "flex items-center gap-1.5",
    authorName: "text-xs text-muted-foreground",
    date: "text-xs text-muted-foreground",
  },
  variants: {
    adopted: {
      true: {
        root: "border-emerald-200 dark:border-emerald-900/50",
      },
    },
  },
})

type IdeaCardProps = {
  title: string
  description: string
  status: StatusBadgeProps["status"]
  category: { label: string; color?: CategoryTagProps["color"] }
  author: { name: string; avatarUrl?: string }
  date: string
  points?: number
  className?: string
}

function IdeaCard({
  title,
  description,
  status,
  category,
  author,
  date,
  points,
  className,
}: IdeaCardProps) {
  const adopted = status === "adopted"
  const s = ideaCard({ adopted })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={s.root({ class: className })}
          role="button"
          tabIndex={0}
        >
          <CardHeader className={s.header()}>
            <p className={s.title()}>{title}</p>
            <div className={s.meta()}>
              <StatusBadge status={status} />
              {adopted && points !== undefined && (
                <PointChip points={points} variant="gold" />
              )}
            </div>
          </CardHeader>

          <CardContent className={s.body()}>
            <p className={s.description()}>{description}</p>
            <div className={s.tags()}>
              <CategoryTag label={category.label} color={category.color} />
            </div>
          </CardContent>

          <CardFooter className={s.footer()}>
            <div className={s.author()}>
              <Avatar className="size-5">
                <AvatarImage src={author.avatarUrl} alt={author.name} />
                <AvatarFallback className="text-[10px]">
                  {author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className={s.authorName()}>{author.name}</span>
            </div>
            <span className={s.date()}>{date}</span>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-2 pr-6">
            <div className="flex-1">
              <DialogTitle className="text-base leading-snug">{title}</DialogTitle>
            </div>
            <StatusBadge status={status} />
          </div>
        </DialogHeader>

        <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </DialogDescription>

        <div className="flex flex-wrap gap-2">
          <CategoryTag label={category.label} color={category.color} />
          {adopted && points !== undefined && (
            <PointChip points={points} variant="gold" size="sm" />
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="text-[10px]">
                {author.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{author.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { IdeaCard, ideaCard }
export type { IdeaCardProps }
