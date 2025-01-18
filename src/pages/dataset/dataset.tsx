import React, { useState, FC } from "react";
import useFetchData from "@/hooks/use-fetch-data";
import ImageCard from "@/components/ui/card/image-card";
import { useParams } from "react-router-dom";
import FilterTabs from "@/components/ui/filter/filter-tabs";
import Spinner from '@/components/ui/animation/spinner';
import PaginationControls from "@/components/ui/actions/pagination-control";
import DatasetActions from "@/components/ui/actions/dataset-actions";

import "./dataset.css";
import { da } from "date-fns/locale";

interface Filter {
  key: string;
  label: string;
  count: number;
}

interface DataResponse {
  unannotated?: number;
  annotated?: number;
  reviewed?: number;
  total_record?: number;
  data?: Array<{ image_id: string, image_url: string, image_name: string }>;
  pages?: number;
}

const Dataset: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedFilter, setSelectedFilter] = useState<string>("unannotated");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 50;

  const getFilterParams = (): { annotated: boolean; reviewed: boolean } => {
    switch (selectedFilter) {
      case "annotated":
        return { annotated: true, reviewed: false };
      case "reviewed":
        return { annotated: false, reviewed: true };
      default:
        return { annotated: false, reviewed: false };
    }
  };

  const filterParams = getFilterParams();
  
  const { data, loading, error, refetch }: 
    { data?: DataResponse; loading: boolean; error?: Error | null; refetch: () => void } = useFetchData(
    `/api/v1/projects/${projectId}/images?annotated=${filterParams.annotated}&reviewed=${filterParams.reviewed}&items_per_page=${itemsPerPage}&page=${currentPage}`
  );

  const filters: Filter[] = [
    { key: "unannotated", label: "Unannotated", count: data?.unannotated || 0 },
    { key: "annotated", label: "Annotated", count: data?.annotated || 0 },
    { key: "reviewed", label: "Reviewed", count: data?.reviewed || 0 },
  ];

  const totalRecord: number = data?.total_record || 0;
  const pages = data?.pages || 0
  const imageData = data?.data || [];
  
  if (error) return <p>Error loading images: {error.message}</p>;

  return (
    <div className="dataset">
      <h1>Dataset</h1>
      <div className="tabs">
        <FilterTabs 
          filters={filters}
          selectedFilter={selectedFilter}
          onSelectFilter={(filter) => {
            setSelectedFilter(filter);
            setCurrentPage(1);
          }}
        />

        <DatasetActions
          projectId={projectId  || ''}
          refetch={refetch}
          onFeedbackSuccess={() => setCurrentPage(1)}
        />
      </div>

      {loading ? (
        <div className="image-grid">
          <Spinner />
        </div>
      ) : totalRecord === 0 ? (
        <div className="no-results">
          <i className="info-icon">ℹ️</i>
          <span>The search returned 0 results.</span>
        </div>
      ) : (
        <div className="image-grid">
          {imageData.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      )}

      {totalRecord > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={pages}
          onNext={() => setCurrentPage((prev) => prev + 1)}
          onPrevious={() => setCurrentPage((prev) => prev - 1)}
        />
      )}
    </div>
   );
};

export default Dataset;