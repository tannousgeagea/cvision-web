import React, { FC } from 'react';
import SideBar from './sidebar';
import { Outlet } from 'react-router-dom';
import './project-layout.css';

const ProjectLayout: FC = () => {
  return (
    <div className="project-layout">
      <div className='project-layout-sidebar'>
        <SideBar />
      </div>
      <div className="project-layout-main">          
          <div className='project-layout-content'>
            <Outlet />
          </div>
        </div>
    </div>
  );
};

export default ProjectLayout;