import React, { useState, useEffect } from 'react';
import ProjectOverviewPanel from '@/components/analytics/ProjectOverviewPanel';
import ImageAnalyticsPanel from '@/components/analytics/ImageAnalyticsPanel';
import AnnotationAnalyticsPanel from '@/components/analytics/AnnotationAnalyticsPanel';
import VersioningPanel from '@/components/analytics/VersioningPanel';
import AugmentationPanel from '@/components/analytics/AugmentationPanel';
import AnnotationGroupPanel from '@/components/analytics/AnnotationGroupPanel';
import FilterPanel from '@/components/analytics/FilterPanel';
import { Filters } from '@/types/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/ui/tabs';
import { BarChart3, Image, Tag, GitBranch, RefreshCw, Layers } from 'lucide-react';

const INITIAL_PROJECT_ID = 1; // Normally this would come from a route parameter

const AnalyticsPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: { start: null, end: null },
    annotationSource: 'all',
    version: null,
    annotationGroup: null,
    annotationClass: null
  });

  const handleFilterChange = (newFilters: Filters) => {
    console.log('Filters updated:', newFilters);
    setFilters(newFilters);
    // In a real app, this would trigger data refetching with the new filters
  };

  return (
    <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Computer Vision Analytics</h1>
            <p className="text-muted-foreground">
              Visualization and analytics for your computer vision datasets
            </p>
          </div>
          
          <FilterPanel onFilterChange={handleFilterChange} />
          
          <div className="space-y-6">
            <ProjectOverviewPanel projectId={INITIAL_PROJECT_ID} />
            
            <Tabs defaultValue="images" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="images" className="flex items-center gap-1">
                  <Image className="h-4 w-4" />
                  <span>Images</span>
                </TabsTrigger>
                <TabsTrigger value="annotations" className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>Annotations</span>
                </TabsTrigger>
                <TabsTrigger value="versions" className="flex items-center gap-1">
                  <GitBranch className="h-4 w-4" />
                  <span>Versions</span>
                </TabsTrigger>
                <TabsTrigger value="augmentations" className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Augmentations</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-1">
                  <Layers className="h-4 w-4" />
                  <span>Groups</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="images">
                <div className="mt-4 mb-8">
                  <ImageAnalyticsPanel projectId={INITIAL_PROJECT_ID} />
                </div>
              </TabsContent>
              
              <TabsContent value="annotations">
                <div className="mt-4 mb-8">
                  <AnnotationAnalyticsPanel projectId={INITIAL_PROJECT_ID} />
                </div>
              </TabsContent>
              
              <TabsContent value="versions">
                <div className="mt-4 mb-8">
                  <VersioningPanel projectId={INITIAL_PROJECT_ID} />
                </div>
              </TabsContent>
              
              <TabsContent value="augmentations">
                <div className="mt-4 mb-8">
                  <AugmentationPanel projectId={INITIAL_PROJECT_ID} />
                </div>
              </TabsContent>
              
              <TabsContent value="groups">
                <div className="mt-4 mb-8">
                  <AnnotationGroupPanel projectId={INITIAL_PROJECT_ID} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
    </div>
  );
};

export default AnalyticsPage;