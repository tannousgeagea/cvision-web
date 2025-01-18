import React, { FC } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import "./project-card.css";

interface Project {
    name: string;
    thumbnail?: string;
    lastEdited: string;
    images: number;
}

interface ProjectCardProps {
    project: Project;
    onView: (name: string) => void;
}

const formatEditedTime = (isoDateString: string): string => {
    const date = parseISO(isoDateString);
    return `Edited ${formatDistanceToNow(date, { addSuffix: true })}`;
};

const ProjectCard: FC<ProjectCardProps> = ({ project, onView }) => {
    return (
        <div className="styled-project-card">
            <div className="card-thumbnail">
                <img
                    src={project.thumbnail || "https://via.placeholder.com/150"}
                    alt={`${project.name} Thumbnail`}
                />
            </div>
            <div className="card-content">
                <div className="card-header">
                    <span className="card-tag">Object Detection</span>
                    <div className="card-title">
                        <span className="private-icon">🔒</span>
                        <div className="card-title-h3">{project.name}</div>
                    </div>

                </div>
                <div className="card-meta">{formatEditedTime(project.lastEdited)}</div>
                <div className="card-details">
                    Private • {project.images} Images • 0 Models
                </div>
            </div>
            <div className="card-actions">
                <button onClick={() => onView(project.name)}>•••</button>
            </div>
        </div>
    );
};

export default ProjectCard;