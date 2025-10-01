import { useState } from "react";
import { AnalyticsFilters } from "@/types/analytics";
// import { useTeamAnalytics } from "@/hooks/useTeamAnalyticsMock";
import { useTeamAnalytics} from '@/hooks/useTeamAnalytics';
import { AnalyticsFiltersComponent } from "./AnalyticsFilter";
import { KPICards } from "./KPICards";
import { PerformanceCharts } from "./PerformanceCharts";
import { AnalyticsTable } from "./AnalyticsTable";
import { Card, CardContent } from "@/components/ui/ui/card";
import { Loader2 } from "lucide-react";

export const TeamAnalyticsSection = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    timeFrame: 'day',
  });

  const { data: analyticsResponse, isLoading, error } = useTeamAnalytics(filters);

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-destructive">
            Error loading analytics data. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Team Analytics</h2>
        <p className="text-muted-foreground">
          Track team performance and productivity across annotation tasks
        </p>
      </div>

      {/* Filters */}
      <AnalyticsFiltersComponent 
        filters={filters} 
        onFiltersChange={setFilters}
        availableUsers={analyticsResponse ? [...new Set(analyticsResponse.data.map(entry => entry.userName))] : []}
      />

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-muted-foreground">Loading analytics data...</span>
          </CardContent>
        </Card>
      )}

      {/* Analytics Content */}
      {analyticsResponse && (
        <>
          {/* KPI Cards */}
          <KPICards kpis={analyticsResponse.kpis} isLoading={isLoading} />

          {/* Performance Charts */}
          <PerformanceCharts 
            data={analyticsResponse.data} 
            timeFrame={filters.timeFrame}
            isLoading={isLoading}
            selectedUsers={filters.selectedUsers}
            showTopPerformersOnly={filters.showTopPerformersOnly}
          />

          {/* Analytics Table */}
          <AnalyticsTable 
            data={analyticsResponse.data} 
            timeFrame={filters.timeFrame}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default TeamAnalyticsSection;