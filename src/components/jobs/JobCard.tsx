import { Eye, UserPlus, UserX, FileText } from "lucide-react";
import { Job, JobStatus } from "@/types/jobs";
import { Button } from "@/components/ui/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/ui/card";
import { Badge } from "@/components/ui/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/ui/tooltip";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
  onAssignJob: (job: Job) => void;
}

const JobCard = ({ job, onAssignJob }: JobCardProps) => {
  // Status badge mapping
  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case JobStatus.UNASSIGNED:
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Unassigned</Badge>;
      case JobStatus.ASSIGNED:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Assigned</Badge>;
      case JobStatus.IN_REVIEW:
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Review</Badge>;
      case JobStatus.COMPLETED:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    }
  };

  return (
    <Card className="h-full animate-fade-in bg-white hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-slate-800">{job.name}</h3>
            <p className="text-xs text-slate-500">ID: {job.id}</p>
          </div>
          <div>{getStatusBadge(job.status)}</div>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Images:</span>
            <span className="text-sm font-medium">{job.imageCount}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Created:</span>
            <span className="text-sm">{formatDistanceToNow(job.createdAt, { addSuffix: true })}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Assigned to:</span>
            {job.assignedUser ? (
              <span className="text-sm font-medium">{job.assignedUser.username}</span>
            ) : (
              <span className="text-sm italic text-slate-400">None</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between gap-2 border-t border-slate-100">
        <TooltipProvider>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Eye size={16} className="text-slate-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Images</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <FileText size={16} className="text-slate-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Details</p>
              </TooltipContent>
            </Tooltip>
          </div>
        
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={() => onAssignJob(job)}
                >
                  {job.assignedUser ? (
                    <>
                      <UserX size={15} className="mr-1" />
                      <span>Reassign</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={15} className="mr-1" />
                      <span>Assign</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{job.assignedUser ? "Reassign Job" : "Assign Job"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default JobCard;