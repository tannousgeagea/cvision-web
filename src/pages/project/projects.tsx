import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '@/components/ui/card/project-card';
import NewProjectButton from '@/components/ui/button/create-project-button';
import useFetchData from '@/hooks/use-fetch-data';
import Header from '@/components/ui/header/Header';
import Spinner from '@/components/ui/animation/spinner';
import './projects.css';

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

    const handleCreateProject = (): void => {
        console.log('do nothing')
    }

    const projectsData: Project[] = projects?.data || [];
    if (errorProjects) return <p>Error loading data: {errorProjects.message}</p>;

    return (
        <div className="projects-container">
            <div className="projects-header">
                <Header
                    title="Projects"
                    description={``}
                />
                <div className="create-project">
                    <NewProjectButton onClick={() => handleCreateProject()}/>
                </div>
            </div>

            {loadingProjects ? (
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
                    <Spinner />
                </div>
            ) : (
                <div className="project-list">
                    {projectsData.map((project) => (
                        <ProjectCard key={project.name} project={project} onView={handleViewProject} />
                    ))}
            </div>
            )}
        </div>
    );
};

export default Projects;