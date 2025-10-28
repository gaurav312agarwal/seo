"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/revenue-chart"
import { LatePaymentChart } from "@/components/late-payment-chart"
import { MarginAnalysis } from "@/components/margin-analysis"
import { ExpectedVsActualChart } from "@/components/expected-vs-actual-chart"
import { FixedCostsBreakdown } from "@/components/fixed-costs-breakdown"
import { KPICards } from "@/components/kpi-cards"
import { useState } from "react"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
              SEO Agency Financial Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground text-pretty">
              Track revenue, manage late payments, and analyze business margins
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <a href="https://neat-pane-view.vercel.app/" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">← Back</Button>
            </a>
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <KPICards />

        {/* Main Dashboard Content */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <div className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50">
              <TabsTrigger
                value="revenue"
                className="flex flex-col items-center justify-center gap-1 p-3 h-auto text-center data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <span className="text-lg">📈</span>
                <span className="text-xs font-medium leading-tight">
                  Revenue
                  <br className="md:hidden" />
                  Analysis
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="flex flex-col items-center justify-center gap-1 p-3 h-auto text-center data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <span className="text-lg">⚠️</span>
                <span className="text-xs font-medium leading-tight">
                  Late
                  <br className="md:hidden" />
                  Payments
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="margins"
                className="flex flex-col items-center justify-center gap-1 p-3 h-auto text-center data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <span className="text-lg">💰</span>
                <span className="text-xs font-medium leading-tight">
                  Margin
                  <br className="md:hidden" />
                  Analysis
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="costs"
                className="flex flex-col items-center justify-center gap-1 p-3 h-auto text-center data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <span className="text-lg">👥</span>
                <span className="text-xs font-medium leading-tight">
                  Fixed
                  <br className="md:hidden" />
                  Costs
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <RevenueChart period={selectedPeriod} />
              <ExpectedVsActualChart period={selectedPeriod} />
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <LatePaymentChart period={selectedPeriod} />
          </TabsContent>

          <TabsContent value="margins" className="space-y-6">
            <MarginAnalysis period={selectedPeriod} />
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <FixedCostsBreakdown period={selectedPeriod} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
