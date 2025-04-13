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
import ClassesManagement from './pages/class_management/ClassManagement';
import AnalyticsPage from './pages/analytics/analytics';
import { Toaster } from './components/ui/ui/toaster';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrganizationPage from './pages/organiation/OrganizationPage';
import OrganizationMembersPage from './pages/organiation/OrganizationMembersPage';
import ProjectMembersPage from './pages/organiation/ProjectMembersPage';
import JobPage from './pages/jobs/JobsPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/projects" replace />} />
              <Route path='/organizations/:orgId' element={<OrganizationPage />} />
              <Route path="/organizations/:orgId/members" element={<OrganizationMembersPage />} />
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
                <Route path='classes' element={<ClassesManagement/>} />
                <Route path='analytics' element={<AnalyticsPage/>} />
                <Route path='members' element={<ProjectMembersPage/>} />
                <Route path='jobs' element={<JobPage/>} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path='/projects/:projectId/images/annotate' element={<Index />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;