import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
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
  { name: "제출", value: 47 },
  { name: "채택", value: 21 },
  { name: "반려",  value: 9 },
]

const COLORS = ["hsl(var(--primary))", "#22c55e", "#ef4444"]

export function IdeaPieChart() {
  return (
    <div className={root()}>
      <p className={title()}>아이디어 현황 비율</p>
      <p className={description()}>2025년 상반기 누계</p>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {DATA.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              fontSize: "12px",
              border: "1px solid hsl(var(--border))",
              backgroundColor: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
