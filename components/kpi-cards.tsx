"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function KPICards() {
  const kpis = [
    {
      title: "Monthly Revenue",
      value: "€43,200",
      change: "+18.2%",
      trend: "up",
      icon: "💰",
      description: "vs last month",
    },
    {
      title: "Active Subscriptions",
      value: "29",
      change: "+3",
      trend: "up",
      icon: "👥",
      description: "monthly clients",
    },
    {
      title: "Late Payments",
      value: "€8,400",
      change: "19.4%",
      trend: "warning",
      icon: "⚠️",
      description: "of total revenue",
    },
    {
      title: "Avg Payment Delay",
      value: "34 days",
      change: "+5 days",
      trend: "down",
      icon: "🕐",
      description: "vs last month",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <span className="text-lg">{kpi.icon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge
                variant={kpi.trend === "up" ? "default" : kpi.trend === "warning" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {kpi.trend === "up" && <span className="mr-1">📈</span>}
                {kpi.trend === "down" && <span className="mr-1">📉</span>}
                {kpi.trend === "warning" && <span className="mr-1">⚠️</span>}
                {kpi.change}
              </Badge>
              <span className="hidden sm:inline">{kpi.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
