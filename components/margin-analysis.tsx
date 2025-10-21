"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"

interface MarginAnalysisProps {
  period: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-background border rounded-lg shadow-lg p-2 md:p-3 min-w-[180px] md:min-w-[200px] max-w-[280px]">
        <p className="font-semibold text-sm md:text-base mb-2">{`${label} 2024`}</p>
        <div className="space-y-1 text-xs md:text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Total Revenue:</span>
            <span className="font-medium">€{data.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Backlink Revenue:</span>
            <span className="font-medium">€{data.backlinkRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Consulting Revenue:</span>
            <span className="font-medium text-chart-1">€{data.consultingRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Fixed Costs:</span>
            <span className="font-medium">€{data.fixedCosts.toLocaleString()}</span>
          </div>
          <div className="border-t pt-1 mt-1">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Net Margin:</span>
              <span className="font-semibold text-chart-5">€{data.margin.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Margin Rate:</span>
              <span className="font-semibold text-chart-5">{data.marginPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function MarginAnalysis({ period }: MarginAnalysisProps) {
  const allData = {
    "3months": [
      {
        month: "Oct",
        totalRevenue: 51800,
        backlinkRevenue: 15600,
        consultingRevenue: 36200,
        fixedCosts: 20100,
        margin: 16100,
        marginPercentage: 44.5,
      },
      {
        month: "Nov",
        totalRevenue: 52100,
        backlinkRevenue: 13900,
        consultingRevenue: 38200,
        fixedCosts: 20500,
        margin: 17700,
        marginPercentage: 46.3,
      },
      {
        month: "Dec",
        totalRevenue: 58300,
        backlinkRevenue: 16800,
        consultingRevenue: 41500,
        fixedCosts: 21200,
        margin: 20300,
        marginPercentage: 48.9,
      },
    ],
    "6months": [
      {
        month: "Jul",
        totalRevenue: 39000,
        backlinkRevenue: 8000,
        consultingRevenue: 31000,
        fixedCosts: 17500,
        margin: 13500,
        marginPercentage: 43.5,
      },
      {
        month: "Aug",
        totalRevenue: 42400,
        backlinkRevenue: 9200,
        consultingRevenue: 33200,
        fixedCosts: 18200,
        margin: 15000,
        marginPercentage: 45.2,
      },
      {
        month: "Sep",
        totalRevenue: 45900,
        backlinkRevenue: 10800,
        consultingRevenue: 35100,
        fixedCosts: 18800,
        margin: 16300,
        marginPercentage: 46.4,
      },
      {
        month: "Oct",
        totalRevenue: 48800,
        backlinkRevenue: 12600,
        consultingRevenue: 36200,
        fixedCosts: 19100,
        margin: 17100,
        marginPercentage: 47.2,
      },
      {
        month: "Nov",
        totalRevenue: 51100,
        backlinkRevenue: 12900,
        consultingRevenue: 38200,
        fixedCosts: 19500,
        margin: 18700,
        marginPercentage: 48.9,
      },
      {
        month: "Dec",
        totalRevenue: 55300,
        backlinkRevenue: 13800,
        consultingRevenue: 41500,
        fixedCosts: 20200,
        margin: 21300,
        marginPercentage: 51.3,
      },
    ],
    "12months": [
      {
        month: "Jan",
        totalRevenue: 28500,
        backlinkRevenue: 5200,
        consultingRevenue: 23300,
        fixedCosts: 15800,
        margin: 7500,
        marginPercentage: 32.2,
      },
      {
        month: "Feb",
        totalRevenue: 31200,
        backlinkRevenue: 6800,
        consultingRevenue: 24400,
        fixedCosts: 16000,
        margin: 8400,
        marginPercentage: 34.4,
      },
      {
        month: "Mar",
        totalRevenue: 33800,
        backlinkRevenue: 7600,
        consultingRevenue: 26200,
        fixedCosts: 16200,
        margin: 10000,
        marginPercentage: 38.2,
      },
      {
        month: "Apr",
        totalRevenue: 36100,
        backlinkRevenue: 8400,
        consultingRevenue: 27700,
        fixedCosts: 16300,
        margin: 11400,
        marginPercentage: 41.2,
      },
      {
        month: "May",
        totalRevenue: 38600,
        backlinkRevenue: 9200,
        consultingRevenue: 29400,
        fixedCosts: 16400,
        margin: 13000,
        marginPercentage: 44.2,
      },
      {
        month: "Jun",
        totalRevenue: 41300,
        backlinkRevenue: 10100,
        consultingRevenue: 31200,
        fixedCosts: 16500,
        margin: 14700,
        marginPercentage: 47.1,
      },
      {
        month: "Jul",
        totalRevenue: 39000,
        backlinkRevenue: 8000,
        consultingRevenue: 31000,
        fixedCosts: 17500,
        margin: 13500,
        marginPercentage: 43.5,
      },
      {
        month: "Aug",
        totalRevenue: 42400,
        backlinkRevenue: 9200,
        consultingRevenue: 33200,
        fixedCosts: 18200,
        margin: 15000,
        marginPercentage: 45.2,
      },
      {
        month: "Sep",
        totalRevenue: 45900,
        backlinkRevenue: 10800,
        consultingRevenue: 35100,
        fixedCosts: 18800,
        margin: 16300,
        marginPercentage: 46.4,
      },
      {
        month: "Oct",
        totalRevenue: 48800,
        backlinkRevenue: 12600,
        consultingRevenue: 36200,
        fixedCosts: 19100,
        margin: 17100,
        marginPercentage: 47.2,
      },
      {
        month: "Nov",
        totalRevenue: 51100,
        backlinkRevenue: 12900,
        consultingRevenue: 38200,
        fixedCosts: 19500,
        margin: 18700,
        marginPercentage: 48.9,
      },
      {
        month: "Dec",
        totalRevenue: 55300,
        backlinkRevenue: 13800,
        consultingRevenue: 41500,
        fixedCosts: 20200,
        margin: 21300,
        marginPercentage: 51.3,
      },
    ],
  }

  const data = allData[period as keyof typeof allData] || allData["3months"]
  const currentMonth = data[data.length - 1]

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Revenue vs Margin Analysis</CardTitle>
          <CardDescription className="text-sm">
            Consulting revenue (excluding backlink pass-through) vs actual margin after fixed costs
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 md:px-6">
          <ChartContainer
            config={{
              consultingRevenue: {
                label: "Consulting Revenue",
                color: "hsl(var(--chart-1))",
              },
              margin: {
                label: "Net Margin",
                color: "hsl(var(--chart-5))",
              },
            }}
            className="h-[250px] md:h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="consultingRevenue" fill="var(--color-chart-1)" name="Consulting Revenue" />
                <Bar dataKey="margin" fill="var(--color-chart-5)" name="Net Margin" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Month Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-chart-5">€{currentMonth.margin.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Badge variant="default" className="text-xs">
                <span className="mr-1">📈</span>
                {currentMonth.marginPercentage}%
              </Badge>
              <span>margin rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Consulting Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">€{currentMonth.consultingRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Excluding €{currentMonth.backlinkRevenue.toLocaleString()} backlink pass-through
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fixed Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">€{currentMonth.fixedCosts.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="text-sm">💰</span>
              <span>Salaries + Tools</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
