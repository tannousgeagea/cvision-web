import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { TrendingUp, Users, CheckCircle, Clock } from "lucide-react";
import { AnalyticsKPIs } from "@/types/analytics";

interface KPICardsProps {
  kpis: AnalyticsKPIs;
  isLoading?: boolean;
}

export const KPICards = ({ kpis, isLoading }: KPICardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-1"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpiData = [
    {
      title: "Annotations This Week",
      value: kpis.totalAnnotationsThisWeek.toLocaleString(),
      description: "Total images annotated",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Reviews Completed",
      value: kpis.totalReviewsThisWeek.toLocaleString(),
      description: "Reviews completed this week",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Jobs Completed",
      value: kpis.totalCompletionsThisWeek.toLocaleString(),
      description: "Total jobs completed",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Avg. Completion Time",
      value: `${Math.round(kpis.averageCompletionTimeMinutes / 60 * 10) / 10}h`,
      description: `Top: ${kpis.topPerformer.userName}`,
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {kpi.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {kpi.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};