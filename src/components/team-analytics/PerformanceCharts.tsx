import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { UserAnalytics, ChartDataPoint } from "@/types/analytics";
import { format, parseISO } from "date-fns";

interface PerformanceChartsProps {
  data: UserAnalytics[];
  timeFrame: 'day' | 'week' | 'month';
  isLoading?: boolean;
  selectedUsers?: string[];
  showTopPerformersOnly?: boolean;
}

export const PerformanceCharts = ({ data, timeFrame, isLoading, selectedUsers, showTopPerformersOnly }: PerformanceChartsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="col-span-1">
            <CardHeader>
              <div className="h-5 bg-muted rounded w-48"></div>
            </CardHeader>
            <CardContent className="animate-pulse">
              <div className="h-64 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Transform data for charts
  const transformDataForChart = (metricKey: keyof Pick<UserAnalytics, 'annotatedCount' | 'reviewedCount' | 'completedCount'>) => {
    const dateGroups = data.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) {
        acc[date] = { date };
      }
      acc[date][entry.userName] = entry[metricKey];
      return acc;
    }, {} as Record<string, ChartDataPoint>);

    return Object.values(dateGroups).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ).map(item => ({
      ...item,
      date: format(parseISO(item.date), timeFrame === 'day' ? 'MMM dd' : timeFrame === 'week' ? 'MMM dd' : 'MMM yyyy')
    }));
  };

  const annotationData = transformDataForChart('annotatedCount');
  const reviewData = transformDataForChart('reviewedCount');
  const completionData = transformDataForChart('completedCount');

  // Get unique users and filter based on selection and top performers
  let allUsers = [...new Set(data.map(entry => entry.userName))];
  
  // Filter by selected users if any
  if (selectedUsers && selectedUsers.length > 0) {
    allUsers = allUsers.filter(user => selectedUsers.includes(user));
  }
  
  // Filter by top performers if enabled
  if (showTopPerformersOnly) {
    const userTotals = data.reduce((acc, entry) => {
      if (!acc[entry.userName]) {
        acc[entry.userName] = 0;
      }
      acc[entry.userName] += entry.annotatedCount + entry.reviewedCount + entry.completedCount;
      return acc;
    }, {} as Record<string, number>);
    
    allUsers = allUsers
      .sort((a, b) => userTotals[b] - userTotals[a])
      .slice(0, 5);
  }
  
  const users = allUsers;
  
  // Generate more colors for better visualization
  const userColors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))', 
    'hsl(var(--accent))',
    'hsl(220, 70%, 50%)',   // Blue
    'hsl(140, 70%, 45%)',   // Green
    'hsl(280, 70%, 55%)',   // Purple
    'hsl(30, 80%, 55%)',    // Orange
    'hsl(350, 70%, 55%)',   // Red
    'hsl(190, 70%, 50%)',   // Cyan
    'hsl(60, 70%, 50%)',    // Yellow
    'hsl(160, 60%, 45%)',   // Teal
    'hsl(320, 65%, 55%)',   // Magenta
  ];

  const chartConfig = users.reduce((acc, user, index) => {
    acc[user] = {
      label: user,
      color: userColors[index % userColors.length],
    };
    return acc;
  }, {} as any);

  return (
    <div className="space-y-6">
      {/* Annotations Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Daily Annotations per User</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <LineChart data={annotationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {users.map((user, index) => (
                  <Line
                    key={user}
                    type="monotone"
                    dataKey={user}
                    stroke={userColors[index % userColors.length]}
                    strokeWidth={2}
                    dot={{ fill: userColors[index % userColors.length], strokeWidth: 2, r: 4 }}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Reviews and Completions Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reviews per User</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={reviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                {users.map((user, index) => (
                  <Bar
                    key={user}
                    dataKey={user}
                    fill={userColors[index % userColors.length]}
                  />
                ))}
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                {users.map((user, index) => (
                  <Bar
                    key={user}
                    dataKey={user}
                    fill={userColors[index % userColors.length]}
                  />
                ))}
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};