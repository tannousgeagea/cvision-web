import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/ui/card";
import { Button } from "@/components/ui/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/ui/table";
import { Badge } from "@/components/ui/ui/badge";
import { Download, ArrowUpDown } from "lucide-react";
import { UserAnalytics } from "@/types/analytics";
import { format, parseISO } from "date-fns";

interface AnalyticsTableProps {
  data: UserAnalytics[];
  timeFrame: 'day' | 'week' | 'month';
  isLoading?: boolean;
}

type SortField = 'userName' | 'annotatedCount' | 'reviewedCount' | 'completedCount' | 'totalTime';
type SortDirection = 'asc' | 'desc';

export const AnalyticsTable = ({ data, timeFrame, isLoading }: AnalyticsTableProps) => {
  const [sortField, setSortField] = useState<SortField>('annotatedCount');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-48"></div>
        </CardHeader>
        <CardContent className="animate-pulse">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Aggregate data by user
  const aggregatedData = data.reduce((acc, entry) => {
    if (!acc[entry.userId]) {
      acc[entry.userId] = {
        userId: entry.userId,
        userName: entry.userName,
        userRole: entry.userRole,
        annotatedCount: 0,
        reviewedCount: 0,
        completedCount: 0,
        totalTime: 0,
        entries: []
      };
    }
    
    acc[entry.userId].annotatedCount += entry.annotatedCount;
    acc[entry.userId].reviewedCount += entry.reviewedCount;
    acc[entry.userId].completedCount += entry.completedCount;
    acc[entry.userId].totalTime += entry.totalTime || 0;
    acc[entry.userId].entries.push(entry);
    
    return acc;
  }, {} as Record<string, {
    userId: string;
    userName: string;
    userRole: string;
    annotatedCount: number;
    reviewedCount: number;
    completedCount: number;
    totalTime: number;
    entries: UserAnalytics[];
  }>);

  const tableData = Object.values(aggregatedData);

  // Sort data
  const sortedData = [...tableData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportToCSV = () => {
    const headers = ['User Name', 'Role', 'Annotations', 'Reviews', 'Completions', 'Total Time (hrs)'];
    const csvData = [
      headers.join(','),
      ...sortedData.map(row => [
        `"${row.userName}"`,
        `"${row.userRole}"`,
        row.annotatedCount,
        row.reviewedCount,
        row.completedCount,
        Math.round(row.totalTime / 60 * 10) / 10
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `team-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort(field)}>
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <ArrowUpDown className="h-3 w-3" />
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">User Performance Summary</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader field="userName">User</SortableHeader>
                <TableHead>Role</TableHead>
                <SortableHeader field="annotatedCount">Annotations</SortableHeader>
                <SortableHeader field="reviewedCount">Reviews</SortableHeader>
                <SortableHeader field="completedCount">Completions</SortableHeader>
                <SortableHeader field="totalTime">Time (hrs)</SortableHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.userId} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{row.userName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {row.userRole}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {row.annotatedCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {row.reviewedCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {row.completedCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {Math.round(row.totalTime / 60 * 10) / 10}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {sortedData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No data available for the selected filters
          </div>
        )}
      </CardContent>
    </Card>
  );
};