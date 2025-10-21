"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"

interface ExpectedVsActualChartProps {
  period: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const difference = data.actual - data.expected
    const isPositive = difference >= 0

    return (
      <div className="bg-background border rounded-lg shadow-lg p-3 min-w-[220px]">
        <p className="font-semibold text-foreground mb-2">{`${label} 2024`}</p>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Expected Revenue:</span>
            <span className="font-medium text-purple-600">€{data.expected.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Actual Revenue:</span>
            <span className="font-medium text-teal-600">€{data.actual.toLocaleString()}</span>
          </div>
          <div className="border-t pt-1 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Difference:</span>
              <span className={`font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}€{difference.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {isPositive ? "Above" : "Below"} expected by {Math.abs((difference / data.expected) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function ExpectedVsActualChart({ period }: ExpectedVsActualChartProps) {
  const allData = {
    "3months": [
      { month: "Oct", expected: 46700, actual: 51800, difference: 5100 },
      { month: "Nov", expected: 50000, actual: 52100, difference: 2100 },
      { month: "Dec", expected: 54000, actual: 58300, difference: 4300 },
    ],
    "6months": [
      { month: "Jul", expected: 41200, actual: 35000, difference: -6200 },
      { month: "Aug", expected: 43200, actual: 48400, difference: 5200 },
      { month: "Sep", expected: 45000, actual: 46900, difference: 1900 },
      { month: "Oct", expected: 46700, actual: 51800, difference: 5100 },
      { month: "Nov", expected: 50000, actual: 52100, difference: 2100 },
      { month: "Dec", expected: 54000, actual: 58300, difference: 4300 },
    ],
    "12months": [
      { month: "Jan", expected: 32000, actual: 35600, difference: 3600 },
      { month: "Feb", expected: 34000, actual: 35700, difference: 1700 },
      { month: "Mar", expected: 36000, actual: 38200, difference: 2200 },
      { month: "Apr", expected: 37500, actual: 39800, difference: 2300 },
      { month: "May", expected: 40000, actual: 43400, difference: 3400 },
      { month: "Jun", expected: 39000, actual: 40600, difference: 1600 },
      { month: "Jul", expected: 41200, actual: 35000, difference: -6200 },
      { month: "Aug", expected: 43200, actual: 48400, difference: 5200 },
      { month: "Sep", expected: 45000, actual: 46900, difference: 1900 },
      { month: "Oct", expected: 46700, actual: 51800, difference: 5100 },
      { month: "Nov", expected: 50000, actual: 52100, difference: 2100 },
      { month: "Dec", expected: 54000, actual: 58300, difference: 4300 },
    ],
  }

  const data = allData[period as keyof typeof allData] || allData["6months"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expected vs Actual Revenue</CardTitle>
        <CardDescription>Compare expected revenue (based on invoices) vs actual cash received</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            expected: {
              label: "Expected Revenue",
              color: "hsl(262, 83%, 58%)",
            },
            actual: {
              label: "Actual Revenue",
              color: "hsl(173, 58%, 39%)",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="expected"
                stroke="hsl(262, 83%, 58%)"
                strokeWidth={3}
                name="Expected Revenue"
                strokeDasharray="5 5"
                dot={{ fill: "hsl(262, 83%, 58%)", strokeWidth: 2, r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(173, 58%, 39%)"
                strokeWidth={3}
                name="Actual Revenue"
                dot={{ fill: "hsl(173, 58%, 39%)", strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
