import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '@/components/ui/card/project-card';
import useFetchData from '@/hooks/use-fetch-data';
import Header from '@/components/ui/header/Header';
import Spinner from '@/components/ui/animation/spinner';
import { SidebarProvider, SidebarInset } from "@/components/ui/ui/sidebar";
import { NotificationSidebar } from "@/components/jobs/NotificationSidebar";

interface Project {
    name: string;
    lastEdited: string;
    images: number;
    thumbnail: string;
    // Add other project properties as needed
}

const Projects: FC = () => {
    const { data: projects, loading: loadingProjects, error: errorProjects } = useFetchData('/api/v1/projects');
    const navigate = useNavigate();
    
    const handleViewProject = (projectId: string): void => {
        navigate(`/projects/${projectId}/dataset`, { state: { projects } });
    };

    const projectsData: Project[] = projects?.data || [];
    if (errorProjects) return <p>Error loading data: {errorProjects.message}</p>;

    return (
        <div className="p-6 w-full min-h-screen bg-slate-50">
            <Header
            title="Projects"
            description="Organize and manage your visual data"
            />

            {loadingProjects ? (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Spinner />
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {projectsData.map((project) => (
                <ProjectCard
                    key={project.name}
                    project={project}
                    onView={handleViewProject}
                />
                ))}
            </div>
            )}

            <NotificationSidebar />
        </div>
    );
};

export default Projects;