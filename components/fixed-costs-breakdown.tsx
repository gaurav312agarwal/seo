"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Progress } from "@/components/ui/progress"

interface FixedCostsBreakdownProps {
  period: string
}

const COLORS = ["#E74C3C", "#3498DB", "#2ECC71", "#F39C12"]

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const total = 21200 // Total fixed costs
    const percentage = ((data.value / total) * 100).toFixed(1)

    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-semibold text-sm mb-2">{data.name}</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-semibold">€{data.value.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Percentage:</span>
            <span className="font-semibold">{percentage}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Per Consultant:</span>
            <span className="font-medium">€{Math.round(data.value / 6).toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function FixedCostsBreakdown({ period }: FixedCostsBreakdownProps) {
  const allData = {
    "3months": {
      pieData: [
        { name: "Salaries", value: 21500 },
        { name: "Tools & Software", value: 3200 },
        { name: "Office & Admin", value: 1800 },
        { name: "Marketing", value: 1200 },
      ],
      monthlyData: [
        { category: "Salaries", amount: 21500, percentage: 77.6 },
        { category: "Tools & Software", amount: 3200, percentage: 11.6 },
        { category: "Office & Admin", amount: 1800, percentage: 6.5 },
        { category: "Marketing", amount: 1200, percentage: 4.3 },
      ],
    },
    "6months": {
      pieData: [
        { name: "Salaries", value: 19800 },
        { name: "Tools & Software", value: 2800 },
        { name: "Office & Admin", value: 1500 },
        { name: "Marketing", value: 1000 },
      ],
      monthlyData: [
        { category: "Salaries", amount: 19800, percentage: 79.2 },
        { category: "Tools & Software", amount: 2800, percentage: 11.2 },
        { category: "Office & Admin", amount: 1500, percentage: 6.0 },
        { category: "Marketing", amount: 1000, percentage: 4.0 },
      ],
    },
    "12months": {
      pieData: [
        { name: "Salaries", value: 17200 },
        { name: "Tools & Software", value: 2200 },
        { name: "Office & Admin", value: 1100 },
        { name: "Marketing", value: 700 },
      ],
      monthlyData: [
        { category: "Salaries", amount: 17200, percentage: 81.0 },
        { category: "Tools & Software", amount: 2200, percentage: 10.4 },
        { category: "Office & Admin", amount: 1100, percentage: 5.2 },
        { category: "Marketing", amount: 700, percentage: 3.3 },
      ],
    },
  }

  const currentData = allData[period as keyof typeof allData] || allData["3months"]
  const { pieData, monthlyData } = currentData
  const totalFixedCosts = pieData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Fixed Costs Distribution</CardTitle>
          <CardDescription>
            Monthly fixed expenses breakdown - Total: €{totalFixedCosts.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown Details</CardTitle>
          <CardDescription>Detailed view of fixed monthly expenses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {monthlyData.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span className="text-muted-foreground">€{item.amount.toLocaleString()}</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-right">{item.percentage}% of total fixed costs</div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between font-semibold">
              <span>Total Fixed Costs</span>
              <span>€{totalFixedCosts.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Per consultant: €{Math.round(totalFixedCosts / 6).toLocaleString()} (6 consultants)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
