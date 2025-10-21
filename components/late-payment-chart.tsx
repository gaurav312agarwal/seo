"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"

interface LatePaymentChartProps {
  period: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-background border rounded-lg shadow-lg p-2 md:p-3 min-w-[180px] md:min-w-[200px] max-w-[280px]">
        <p className="font-semibold text-foreground mb-2 text-sm md:text-base">{`${label} 2024`}</p>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">Late Amount:</span>
            <span className="font-medium text-red-600 text-xs md:text-sm">€{data.lateAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">Total Revenue:</span>
            <span className="font-medium text-xs md:text-sm">€{data.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">Late Percentage:</span>
            <span className="font-bold text-red-600 text-xs md:text-sm">{data.percentage}%</span>
          </div>
          <div className="border-t pt-1 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm font-semibold">Avg Delay:</span>
              <span className="font-bold text-xs md:text-sm">{data.avgDelay} days</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function LatePaymentChart({ period }: LatePaymentChartProps) {
  const allData = {
    "3months": [
      { month: "Oct", lateAmount: 9200, totalRevenue: 51800, percentage: 17.8, avgDelay: 38 },
      { month: "Nov", lateAmount: 7100, totalRevenue: 52100, percentage: 13.6, avgDelay: 31 },
      { month: "Dec", lateAmount: 11300, totalRevenue: 58300, percentage: 19.4, avgDelay: 34 },
    ],
    "6months": [
      { month: "Jul", lateAmount: 8400, totalRevenue: 35000, percentage: 24.0, avgDelay: 42 },
      { month: "Aug", lateAmount: 5200, totalRevenue: 48400, percentage: 10.7, avgDelay: 28 },
      { month: "Sep", lateAmount: 6800, totalRevenue: 46900, percentage: 14.5, avgDelay: 35 },
      { month: "Oct", lateAmount: 9200, totalRevenue: 51800, percentage: 17.8, avgDelay: 38 },
      { month: "Nov", lateAmount: 7100, totalRevenue: 52100, percentage: 13.6, avgDelay: 31 },
      { month: "Dec", lateAmount: 11300, totalRevenue: 58300, percentage: 19.4, avgDelay: 34 },
    ],
    "12months": [
      { month: "Jan", lateAmount: 6200, totalRevenue: 35600, percentage: 17.4, avgDelay: 29 },
      { month: "Feb", lateAmount: 4800, totalRevenue: 35700, percentage: 13.4, avgDelay: 25 },
      { month: "Mar", lateAmount: 7100, totalRevenue: 38200, percentage: 18.6, avgDelay: 33 },
      { month: "Apr", lateAmount: 8900, totalRevenue: 39800, percentage: 22.4, avgDelay: 41 },
      { month: "May", lateAmount: 9800, totalRevenue: 43400, percentage: 22.6, avgDelay: 39 },
      { month: "Jun", lateAmount: 6400, totalRevenue: 40600, percentage: 15.8, avgDelay: 27 },
      { month: "Jul", lateAmount: 8400, totalRevenue: 35000, percentage: 24.0, avgDelay: 42 },
      { month: "Aug", lateAmount: 5200, totalRevenue: 48400, percentage: 10.7, avgDelay: 28 },
      { month: "Sep", lateAmount: 6800, totalRevenue: 46900, percentage: 14.5, avgDelay: 35 },
      { month: "Oct", lateAmount: 9200, totalRevenue: 51800, percentage: 17.8, avgDelay: 38 },
      { month: "Nov", lateAmount: 7100, totalRevenue: 52100, percentage: 13.6, avgDelay: 31 },
      { month: "Dec", lateAmount: 11300, totalRevenue: 58300, percentage: 19.4, avgDelay: 34 },
    ],
  }

  const data = allData[period as keyof typeof allData] || allData["6months"]

  const getBarColor = (percentage: number) => {
    if (percentage > 20) return "hsl(var(--destructive))"
    if (percentage > 15) return "hsl(var(--chart-3))"
    return "hsl(var(--chart-2))"
  }

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <span className="text-destructive">⚠️</span>
            Late Payment Analysis
          </CardTitle>
          <CardDescription className="text-sm">Percentage of revenue received late each month</CardDescription>
        </CardHeader>
        <CardContent className="px-2 md:px-6">
          <ChartContainer
            config={{
              percentage: {
                label: "Late Payment %",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[250px] md:h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Late Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-destructive">€11,300</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Badge variant="destructive" className="text-xs">
                <span className="mr-1">📉</span>
                19.4%
              </Badge>
              <span>of December revenue</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Payment Delay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">34 days</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="text-sm">🕐</span>
              <span>+5 days vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clients with Late Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground mt-1">out of 29 active clients</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
