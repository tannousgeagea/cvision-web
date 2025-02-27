import { FC, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import Logo from '../../../assets/icons/nav/vision.png'
import HamburgerIcon from '../../../assets/icons/nav/menu.png'; 
import CloseIcon from '../../../assets/icons//nav/close.png';
import ProjectIcon from '../../../assets/icons//nav/projects.png'
import DatalakeIcon from '../../../assets/icons//nav/datalake.png'
import UploadIcon from '../../../assets/icons//nav/upload.png'
import ModelsIcon from '../../../assets/icons/nav/ai-model.png'
import DeployIcon from '../../../assets/icons/nav/shuttle.png'
import logoutIcon from '../../../assets/icons/nav/logout.png'

import './navbar.css';

interface NavbarItem {
  item: string;
  ref: string;
  icon: string;
}

const Navbar: FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const items: NavbarItem[] = [
    { item: 'Projects', ref: '/projects', icon: ProjectIcon },
    { item: 'Datalake', ref: '/datalake', icon: DatalakeIcon },
    { item: 'Upload', ref: '/upload', icon: UploadIcon },
    { item: 'Models', ref: '/models', icon: ModelsIcon },
    { item: 'Deploy', ref: '/deploy', icon: DeployIcon },
  ];

  const toggleNavbar = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname.includes('/projects/')) {
      setIsExpanded(false);
    }
  }, [location.pathname]);

  return (
    <div className={`navbar ${isExpanded ? 'expand' : 'collapsed'}`}>
      <div>
        <div className="navbar-header">
          <button className="toggle-button" onClick={toggleNavbar}>
            <img src={isExpanded ? CloseIcon : HamburgerIcon} alt="Toggle" />
          </button>
          <div className='navbar-title'>
            <img src={Logo} alt="Logo"></img>
            {isExpanded && <h2>VisionNest</h2>}
          </div>
        </div>

        <div className="navbar-content">
          {items.map((item, index) => (
            <div className={`navbar-item ${isExpanded ? 'expand' : 'collapsed'}`} key={index}>
              <Link to={item.ref}>
                <img src={item.icon} alt={item.item}></img>
                {isExpanded && <span>{item.item}</span>}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="navbar-bottom">
          <button className="logout-button" onClick={handleLogout}>
            {/* <FaUser className="icon" /> */}
            <img src={logoutIcon} alt="logout"></img>
            {isExpanded && <p>Logout</p>}
          </button>
        </div>
    </div>
  );
};

export default Navbar;