import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { tv } from "tailwind-variants"

const chart = tv({
  slots: {
    root:        "w-full rounded-xl border bg-card p-6 shadow-sm",
    title:       "mb-1 text-sm font-semibold text-foreground",
    description: "mb-4 text-xs text-muted-foreground",
  },
})

const { root, title, description } = chart()

const DATA = [
  { month: "1월", 제출: 4, 채택: 1, 반려: 1 },
  { month: "2월", 제출: 7, 채택: 2, 반려: 2 },
  { month: "3월", 제출: 5, 채택: 3, 반려: 0 },
  { month: "4월", 제출: 10, 채택: 4, 반려: 3 },
  { month: "5월", 제출: 8, 채택: 5, 반려: 1 },
  { month: "6월", 제출: 13, 채택: 6, 반려: 2 },
]

export function IdeaBarChart() {
  return (
    <div className={root()}>
      <p className={title()}>월별 아이디어 현황</p>
      <p className={description()}>2025년 상반기</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              fontSize: "12px",
              border: "1px solid hsl(var(--border))",
              backgroundColor: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))",
            }}
            cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
          <Bar dataKey="제출" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="채택" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="반려" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
