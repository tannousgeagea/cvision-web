import './App.css';
import Datalake from './pages/datalake/datalake';
import Projects from './pages/project/projects';
import Layout from './components/ui/common/layout';
import Dataset from './pages/dataset/dataset';
import Versions from './pages/versions/versions';
import LoginPage from './pages/login/login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProjectLayout from './components/ui/common/project-layout';
import Index from './pages/annotate-tool/annotate-tool';
import ProtectedRoute from './pages/login/ProtectedRoute';
import AnalysisPage from './pages/analysis/Index';
import Annotate from './pages/annotate/annotate';
import UploadIndex from './pages/upload/Index';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/ui/toaster';

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
            <Route path='projects/:projectId' element={<ProjectLayout />}>
              <Route path='upload' element={<UploadIndex />} />
              <Route path='dataset' element={<Dataset />} />
              <Route path='annotate' element={<Annotate />} />
              <Route path='versions' element={<Versions mode="view" />} />
              <Route path='versions/:versionID' element={<Versions mode="view" />} />
              <Route path="versions/generate" element={<Versions mode="generate" />} />
              <Route path="analysis" element={<AnalysisPage/>} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path='/projects/:projectId/images/annotate' element={<Index />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;