import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const DATA = [
  { month: "1월", 제출: 4, 채택: 1, 반려: 1 },
  { month: "2월", 제출: 7, 채택: 2, 반려: 2 },
  { month: "3월", 제출: 5, 채택: 3, 반려: 0 },
  { month: "4월", 제출: 10, 채택: 4, 반려: 3 },
  { month: "5월", 제출: 8, 채택: 5, 반려: 1 },
  { month: "6월", 제출: 13, 채택: 6, 반려: 2 },
]

export function IdeaLineChart() {
  return (
    <div className="w-full rounded-xl border bg-card p-6 shadow-sm">
      <p className="mb-1 text-sm font-semibold text-foreground">월별 아이디어 현황</p>
      <p className="mb-4 text-xs text-muted-foreground">2025년 상반기</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
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
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
          <Line type="monotone" dataKey="제출" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="채택" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="반려" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
