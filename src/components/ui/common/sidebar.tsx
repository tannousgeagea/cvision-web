import { FC, ReactNode } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./sidebar.css";

import {
  Upload,
  Pencil,
  BarChart,
  Layers,
  LineChart,
  Images,
  Tags,
  Briefcase
} from "lucide-react";

interface SideBarProps {}

interface Item {
  item: string;
  ref: string;
  icon: ReactNode;
}

const SideBar: FC<SideBarProps> = () => {
  const { projectId } = useParams<string>();
  const location = useLocation();

  const items: Item[] = [
    { item: "Upload Data", ref: `/projects/${projectId}/upload`, icon: <Upload size={20} /> },
    { item: "Annotate", ref: `/projects/${projectId}/annotate`, icon: <Pencil size={20} /> },
    { item: "Analysis", ref: `/projects/${projectId}/analysis`, icon: <BarChart size={20} /> },
    { item: "Dataset", ref: `/projects/${projectId}/dataset`, icon: <Images size={20} /> },
    { item: "Version", ref: `/projects/${projectId}/versions`, icon: <Layers size={20} /> },
    { item: "Analytics", ref: `/projects/${projectId}/analytics`, icon: <LineChart size={20} /> },
    { item: "Classes", ref: `/projects/${projectId}/classes`, icon: <Tags size={20} /> },
    
  ];

  return (
    <div className="sidebar">
      <div className="top-info">
        <div className="project-thumbnail">
          <img 
            src="https://wacoreblob.blob.core.windows.net/cvisionops/media/images/AMK_gate03_front_2024-12-20_07-03-35_78e6ac1e-59ca-4771-97f2-95d5662f396b.jpg?se=2025-01-21T13%3A15%3A41Z&sp=r&sv=2025-01-05&sr=b&sig=X3/hpnffG7ApioooYobFiaL%2BYj1REBZzRHlYlj0vB%2Bg%3D" 
            alt="project-thumbnail">
          </img>
        </div>
        <div className="project-name">
          <h2>{projectId}</h2>
        </div>
      </div>

      <div className="sidebar-content">
        <h3>Data</h3>
        {items.map((item, index) => (
          <div
            className={`sidebar-item ${
              location.pathname.includes(item.ref) ? "active" : ""
            }`}
            key={index}
          >
            <Link to={item.ref}>
              {item.icon}
              <span>{item.item}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;