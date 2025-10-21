"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"

interface RevenueChartProps {
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
            <span className="text-xs md:text-sm text-muted-foreground">Monthly Subscriptions:</span>
            <span className="font-medium text-emerald-600 text-xs md:text-sm">
              €{data.subscriptions.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">One-Shot Services:</span>
            <span className="font-medium text-blue-600 text-xs md:text-sm">€{data.oneShot.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-muted-foreground">Late Payments:</span>
            <span className="font-medium text-orange-600 text-xs md:text-sm">
              €{data.latePayments.toLocaleString()}
            </span>
          </div>
          <div className="border-t pt-1 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm font-semibold">Total Revenue:</span>
              <span className="font-bold text-xs md:text-sm">€{data.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function RevenueChart({ period }: RevenueChartProps) {
  const allData = {
    "3months": [
      { month: "Oct", subscriptions: 43500, oneShot: 5100, latePayments: 3200, total: 51800 },
      { month: "Nov", subscriptions: 45800, oneShot: 4200, latePayments: 2100, total: 52100 },
      { month: "Dec", subscriptions: 47200, oneShot: 6800, latePayments: 4300, total: 58300 },
    ],
    "6months": [
      { month: "Jul", subscriptions: 35000, oneShot: 6200, latePayments: 2800, total: 44000 },
      { month: "Aug", subscriptions: 38500, oneShot: 4700, latePayments: 5200, total: 48400 },
      { month: "Sep", subscriptions: 41200, oneShot: 3800, latePayments: 1900, total: 46900 },
      { month: "Oct", subscriptions: 43500, oneShot: 5100, latePayments: 3200, total: 51800 },
      { month: "Nov", subscriptions: 45800, oneShot: 4200, latePayments: 2100, total: 52100 },
      { month: "Dec", subscriptions: 47200, oneShot: 6800, latePayments: 4300, total: 58300 },
    ],
    "12months": [
      { month: "Jan", subscriptions: 28000, oneShot: 4500, latePayments: 3100, total: 35600 },
      { month: "Feb", subscriptions: 29500, oneShot: 3800, latePayments: 2400, total: 35700 },
      { month: "Mar", subscriptions: 31200, oneShot: 5200, latePayments: 1800, total: 38200 },
      { month: "Apr", subscriptions: 32800, oneShot: 4100, latePayments: 2900, total: 39800 },
      { month: "May", subscriptions: 34100, oneShot: 5800, latePayments: 3500, total: 43400 },
      { month: "Jun", subscriptions: 33500, oneShot: 4900, latePayments: 2200, total: 40600 },
      { month: "Jul", subscriptions: 35000, oneShot: 6200, latePayments: 2800, total: 44000 },
      { month: "Aug", subscriptions: 38500, oneShot: 4700, latePayments: 5200, total: 48400 },
      { month: "Sep", subscriptions: 41200, oneShot: 3800, latePayments: 1900, total: 46900 },
      { month: "Oct", subscriptions: 43500, oneShot: 5100, latePayments: 3200, total: 51800 },
      { month: "Nov", subscriptions: 45800, oneShot: 4200, latePayments: 2100, total: 52100 },
      { month: "Dec", subscriptions: 47200, oneShot: 6800, latePayments: 4300, total: 58300 },
    ],
  }

  const data = allData[period as keyof typeof allData] || allData["6months"]

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">Revenue Breakdown</CardTitle>
        <CardDescription className="text-sm">
          Monthly subscriptions vs one-shot services vs late payments
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <ChartContainer
          config={{
            subscriptions: {
              label: "Monthly Subscriptions",
              color: "hsl(160, 84%, 39%)",
            },
            oneShot: {
              label: "One-Shot Services",
              color: "hsl(217, 91%, 60%)",
            },
            latePayments: {
              label: "Late Payments",
              color: "hsl(25, 95%, 53%)",
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
              <Bar dataKey="subscriptions" stackId="a" fill="hsl(160, 84%, 39%)" name="Monthly Subscriptions" />
              <Bar dataKey="oneShot" stackId="a" fill="hsl(217, 91%, 60%)" name="One-Shot Services" />
              <Bar dataKey="latePayments" stackId="a" fill="hsl(25, 95%, 53%)" name="Late Payments" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
