import { FC } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import uploadIcon from "../../../assets/icons/sidebar/upload.png";
import datasetIcon from "../../../assets/icons/sidebar/dataset.png";
import annotateIcon from "../../../assets/icons/sidebar/annotate.png";
import analysisIcon from "../../../assets/icons/sidebar/analysis.png";
import versionIcon from "../../../assets/icons/sidebar/version.png";
import analyticsIcon from "../../../assets/icons/sidebar/analytics.png";
import "./sidebar.css";

interface SideBarProps {}

interface Item {
  item: string;
  ref: string;
  icon: string;
}

const SideBar: FC<SideBarProps> = () => {
  const { projectId } = useParams<string>();
  const location = useLocation();

  const items: Item[] = [
    { item: "Upload Data", ref: `/projects/${projectId}/upload`, icon: uploadIcon },
    { item: "Annotate", ref: `/projects/${projectId}/annotate`, icon: annotateIcon },
    { item: "Analysis", ref: `/projects/${projectId}/analysis`, icon: analysisIcon },
    { item: "Dataset", ref: `/projects/${projectId}/dataset`, icon: datasetIcon },
    { item: "Version", ref: `/projects/${projectId}/versions`, icon: versionIcon },
    { item: "Analytics", ref: `/projects/${projectId}/analytics`, icon: analyticsIcon },
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
              <img src={item.icon} alt={item.item}></img>
              <span>{item.item}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;