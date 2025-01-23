import './App.css';
import Datalake from './pages/datalake/datalake';
import Projects from './pages/project/projects';
import UploadPage from './pages/upload/upload-page';
import Layout from './components/ui/common/layout';
import Dataset from './pages/dataset/dataset';
import Versions from './pages/versions/versions';
import LoginPage from './pages/login/login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProjectLayout from './components/ui/common/project-layout';
import Index from './pages/annotate/annotate-page';
import ProtectedRoute from './pages/login/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path='/datalake' element={<Datalake />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='projects/:projectId' element={<ProjectLayout />}>
              <Route path='dataset' element={<Dataset />} />
              <Route path='versions' element={<Versions mode="view" />} />
              <Route path='versions/:versionID' element={<Versions mode="view" />} />
              <Route path="versions/generate" element={<Versions mode="generate" />} />
            </Route>
          </Route>
          <Route path='/projects/:projectId/dataset/:annotate' element={<Index />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;