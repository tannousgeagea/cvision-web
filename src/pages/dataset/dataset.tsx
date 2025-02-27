import { useState, FC } from "react";
import useFetchData from "@/hooks/use-fetch-data";
import ImageCard2 from "@/components/ui/card/image-card2";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Spinner from '@/components/ui/animation/spinner';
import PaginationControls from "@/components/ui/actions/pagination-control";
import DatasetActions from "@/components/ui/actions/dataset-actions";
import FiltersDataset from "@/components/ui/filter/filter-dataset";
import "./dataset.css";


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
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const [selectedFilter, setSelectedFilter] = useState<string>(query.get("filter") || "");
  const [currentPage, setCurrentPage] = useState<number>(parseInt(query.get("page") || "1", 10));
  const itemsPerPage: number = 50;

  const updateURL = (filter: string, page: number) => {
    console.log(filter)
    navigate({
      pathname: location.pathname,
      search: `?filter=${filter}&page=${page}`,
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURL(selectedFilter, newPage);
  };
  
  const { data, loading, error, refetch }: 
    { data?: DataResponse; loading: boolean; error?: Error | null; refetch: () => void } = useFetchData(
    `/api/v1/projects/${projectId}/images?status=dataset&user_filters=${selectedFilter}&items_per_page=${itemsPerPage}&page=${currentPage}`
  );

  const handleImageClick = (index:number): void => {
    navigate(
      `/projects/${projectId}/images/annotate`,
      { state: { images: data, currentIndex: index } });
  };


  const totalRecord: number = data?.total_record || 0;
  const pages = data?.pages || 0
  const imageData = data?.data || [];
  if (error) return <p>Error loading images: {error.message}</p>;

  return (
    <div className="dataset">
      <h1>Dataset</h1>
      <div className="dataset-top">
        <FiltersDataset 
          onSearch={(value) => {
            setSelectedFilter(value);
            updateURL(value, currentPage);
          }}
        />
        
        <DatasetActions 
          projectId={projectId || ""}
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
            <ImageCard2 key={index} image={image} index={index} onClick={handleImageClick} />
          ))}
        </div>
      )}

      {totalRecord > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={pages}
          onNext={() => handlePageChange(currentPage + 1)}
          onPrevious={() => setCurrentPage((prev) => prev - 1)}
        />
      )}
    </div>
   );
};

export default Dataset;