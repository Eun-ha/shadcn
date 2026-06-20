import { useState, type ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { IdeaCard } from "@/components/idea/IdeaCard"
import { IdeaForm } from "@/components/idea/IdeaForm"
import { StatusBadge } from "@/components/idea/StatusBadge"
import { PointChip } from "@/components/idea/PointChip"
import { CategoryTag } from "@/components/idea/CategoryTag"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Calendar } from "./components/ui/Calendar"
import { IdeaBarChart } from "@/components/charts/IdeaBarChart"
import { IdeaLineChart } from "@/components/charts/IdeaLineChart"
import { IdeaPieChart } from "@/components/charts/IdeaPieChart"
import SvgrExample from "@/components/SvgrExample"

const MOCK_IDEAS = [
  {
    id: "1",
    title: "사내 카페테리아 운영 시간 연장 제안",
    description:
      "현재 카페테리아는 오후 2시에 마감되어 오후 늦게 근무하는 직원들이 식사를 해결하기 어렵습니다. 오후 6시까지 연장 운영하면 야근 직원의 만족도가 크게 오를 것으로 기대됩니다.",
    status: "adopted" as const,
    category: { label: "복지/환경", color: "teal" as const },
    author: { name: "김민준" },
    date: "2025.05.10",
    points: 5000,
  },
  {
    id: "2",
    title: "고객 응대 매뉴얼 자동화 툴 도입",
    description:
      "반복적인 고객 문의에 대해 FAQ 기반의 챗봇을 도입하면 CS팀의 업무 부담을 줄이고 응답 속도를 높일 수 있습니다.",
    status: "reviewing" as const,
    category: { label: "서비스/제품", color: "blue" as const },
    author: { name: "이서연" },
    date: "2025.05.18",
  },
  {
    id: "3",
    title: "월간 사내 해커톤 정례화",
    description:
      "분기별 해커톤을 월 1회 소규모로 전환하면 팀 간 협업 문화가 활성화되고 아이디어 실험 비용도 낮아집니다.",
    status: "draft" as const,
    category: { label: "조직문화", color: "purple" as const },
    author: { name: "박지훈" },
    date: "2025.05.22",
  },
  {
    id: "4",
    title: "인쇄용지 전면 재생지 전환",
    description:
      "일반 복사용지 대신 재생지로 전환하면 연간 약 15%의 용지 비용을 절감하고 ESG 목표에도 기여할 수 있습니다.",
    status: "rejected" as const,
    category: { label: "비용절감", color: "yellow" as const },
    author: { name: "최수아" },
    date: "2025.04.30",
  },
]



function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h2>
      {children}
    </section>
  )
}

function DialogGuide() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Dialog 열기</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>아이디어 채택 안내</DialogTitle>
            <DialogDescription>
              채택된 아이디어는 검토 후 포인트가 지급됩니다. 포인트는 사내 복지몰에서 사용할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>닫기</Button>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}



export default function App() {
  const [tab, setTab] = useState("list")
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <h1 className="text-lg font-bold">💡 사내 아이디어 공모</h1>
        <p className="text-sm text-muted-foreground">좋은 아이디어가 채택되면 포인트를 드립니다</p>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8 flex flex-col gap-10">

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />

        

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="list">아이디어 목록</TabsTrigger>
            <TabsTrigger value="submit">아이디어 등록</TabsTrigger>
            <TabsTrigger value="tokens">컴포넌트 가이드</TabsTrigger>
          </TabsList>

          {/* 목록 탭 */}
          <TabsContent value="list">
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {MOCK_IDEAS.map(({ id, ...idea }) => (
                <IdeaCard key={id} {...idea} />
              ))}
            </div>
          </TabsContent>

          {/* 등록 탭 */}
          <TabsContent value="submit">
            <div className="mt-4 max-w-lg">
              <IdeaForm onCancel={() => setTab("list")} onSubmit={() => setTab("list")} />
            </div>
          </TabsContent>

          {/* 컴포넌트 가이드 탭 */}
          <TabsContent value="tokens">
            <div className="mt-6 flex flex-col gap-8">

              <Section title="StatusBadge">
                <div className="flex flex-wrap gap-3">
                  <StatusBadge status="draft" />
                  <StatusBadge status="reviewing" />
                  <StatusBadge status="adopted" />
                  <StatusBadge status="rejected" />
                </div>
              </Section>

              <Separator />

              <Section title="PointChip">
                <div className="flex flex-wrap items-center gap-3">
                  <PointChip points={500} size="sm" />
                  <PointChip points={1000} size="md" />
                  <PointChip points={5000} size="lg" variant="gold" />
                  <PointChip points={300} variant="muted" />
                </div>
              </Section>

              <Separator />

              <Section title="CategoryTag">
                <div className="flex flex-wrap gap-2">
                  {(["gray","blue","green","yellow","purple","pink","orange","teal"] as const).map((color) => (
                    <CategoryTag key={color} label={color} color={color} />
                  ))}
                </div>
              </Section>

              <Separator />

              <Section title="IdeaCard (단일 카드)">
                <div className="max-w-sm">
                  <IdeaCard {...MOCK_IDEAS[0]} />
                </div>
              </Section>

              <Separator />

              <Section title="Dialog">
                <DialogGuide />
              </Section>

              <Separator />

              <Section title="BarChart (Recharts)">
                <IdeaBarChart />
              </Section>

              <Separator />

              <Section title="LineChart (Recharts)">
                <IdeaLineChart />
              </Section>

              <Separator />

              <Section title="PieChart (Recharts)">
                <IdeaPieChart />
              </Section>

              <Separator />

              <Section title="SVG (vite-plugin-svgr)">
                <SvgrExample />
              </Section>

              <Separator />

              <Section title="Input">
                <div className="flex flex-col gap-4 max-w-sm">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="input-default">기본 (Default)</Label>
                    <Input id="input-default" placeholder="텍스트를 입력하세요" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="input-disabled">비활성화 (Disabled)</Label>
                    <Input id="input-disabled" placeholder="입력 불가" disabled />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="input-error">오류 (Error)</Label>
                    <Input
                      id="input-error"
                      placeholder="이메일을 입력하세요"
                      error
                      errorMessage="올바른 이메일 형식이 아닙니다."
                      defaultValue="invalid-email"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="input-error-empty">오류 + 빈 값</Label>
                    <Input
                      id="input-error-empty"
                      placeholder="필수 항목입니다"
                      error
                      errorMessage="이 항목은 필수입니다."
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="input-password">비밀번호 (Password)</Label>
                    <Input id="input-password" type="password" placeholder="비밀번호 입력" />
                  </div>
                </div>
              </Section>

            </div>
          </TabsContent>
        </Tabs>

      </main>
    </div>
  )
}
