import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/ui/input";
import JobsSection from "@/components/jobs/JobSection";
import AssignUserModal from "@/components/jobs/AssignUserModel";
import { Job, JobStatus } from "@/types/jobs";
import { useProjectJobs } from "@/hooks/useProjectJobs";
import { useProjectMembers } from "@/hooks/useProjectMembers";
import { useAssignUserToJob } from "@/hooks/useAssignUserToJob";
import { toast } from '@/hooks/use-toast';

const JobPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { data: users } = useProjectMembers(projectId || '')
  const { data: jobs, isLoading, error } = useProjectJobs(projectId || '');
  const assignUserToJob = useAssignUserToJob(projectId || '');

  if (isLoading || !jobs) {
    return <div className="flex items-center justify-center h-64">Loading Project Jobs...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red">Error Loading Project jobs</div>;
  }

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.assignedUser?.username.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  // Group jobs by status
  const jobsByStatus = {
    unassigned: filteredJobs.filter((job) => job.status === JobStatus.UNASSIGNED),
    assigned: filteredJobs.filter((job) => job.status === JobStatus.ASSIGNED),
    inReview: filteredJobs.filter((job) => job.status === JobStatus.IN_REVIEW),
    completed: filteredJobs.filter((job) => job.status === JobStatus.COMPLETED),
  };

  // Open the assign modal
  const handleOpenAssignModal = (job: Job) => {
    setSelectedJob(job);
    setIsAssignModalOpen(true);
  };

  const handleAssignUser = async (job: Job, userId: string | null) => {
    try {
      await assignUserToJob(job.id, userId);
      toast({
        title: "User assignment updated!",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to assign user.")
      toast({
        title: "Failed to assign user.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 p-6 w-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Pre-Annotation Management</h1>
              <p className="text-slate-500">Manage and assign jobs before annotation</p>
            </div>
            
            {/* Search bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search jobs, users..."
                className="pl-9 bg-slate-100 border-slate-200 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-8">
          {/* Job Sections */}
          <div className="flex flex-col gap-8">
            <JobsSection
              title="Unassigned"
              description={`${jobsByStatus.unassigned.length} jobs waiting for assignment`}
              jobs={jobsByStatus.unassigned}
              status={JobStatus.UNASSIGNED}
              onAssignJob={handleOpenAssignModal}
            />
            
            <JobsSection
              title="Assigned"
              description={`${jobsByStatus.assigned.length} jobs in progress`}
              jobs={jobsByStatus.assigned}
              status={JobStatus.ASSIGNED}
              onAssignJob={handleOpenAssignModal}
            />
            
            <JobsSection
              title="In Review"
              description={`${jobsByStatus.inReview.length} jobs waiting for review`}
              jobs={jobsByStatus.inReview}
              status={JobStatus.IN_REVIEW}
              onAssignJob={handleOpenAssignModal}
            />
            
            <JobsSection
              title="Completed"
              description={`${jobsByStatus.completed.length} jobs completed`}
              jobs={jobsByStatus.completed}
              status={JobStatus.COMPLETED}
              onAssignJob={handleOpenAssignModal}
            />
          </div>
        </div>
      </main>

      {/* Assign User Modal */}
      {selectedJob && (
        <AssignUserModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          job={selectedJob}
          users={users || []}
          onAssign={handleAssignUser}
        />
      )}
    </div>
  );
};

export default JobPage;