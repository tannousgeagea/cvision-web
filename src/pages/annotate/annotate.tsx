import { useState, FC } from "react";
import useFetchData from "@/hooks/use-fetch-data";
import ImageCard2 from "../../components/ui/card/image-card2";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import FilterTabs from "@/components/ui/filter/filter-tabs";
import Spinner from '@/components/ui/animation/spinner';
import PaginationControls from "@/components/ui/actions/pagination-control";
import AnnotateActions from "../../components/ui/actions/annotate-actions";
import Header from "@/components/ui/header/Header";
import "./annotate.css";


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

const Annotate: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const [selectedFilter, setSelectedFilter] = useState<string>(query.get("filter") || "unannotated");
  const [currentPage, setCurrentPage] = useState<number>(parseInt(query.get("page") || "1", 10));
  const itemsPerPage: number = 100;

  const updateURL = (filter: string, page: number) => {
    navigate({
      pathname: location.pathname,
      search: `?filter=${filter}&page=${page}`,
    });
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    updateURL(filter, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURL(selectedFilter, newPage);
  };
  
  const { data, loading, error, refetch }: 
    { data?: DataResponse; loading: boolean; error?: Error | null; refetch: () => void } = useFetchData(
    `/api/v1/projects/${projectId}/images?status=${selectedFilter}&items_per_page=${itemsPerPage}&page=${currentPage}`
  );

  const handleImageClick = (index:number): void => {
    navigate(
      `/projects/${projectId}/images/annotate`,
      { state: { images: data, currentIndex: index } });
  };

  const filters: Filter[] = [
    { key: "unannotated", label: "Unannotated", count: data?.unannotated || 0 },
    { key: "annotated", label: "Annotated", count: data?.annotated || 0 },
    { key: "reviewed", label: "Reviewed", count: data?.reviewed || 0 },
  ];

  const totalRecord: number = data?.total_record || 0;
  const pages = data?.pages || 0
  const imageData = data?.data || [];
  const totalReviewed = data?.reviewed || 0
  
  if (error) return <p>Error loading images: {error.message}</p>;

  return (
    <div className="space-y-6 p-6 w-full">
      <Header
        title="Annotate"
        description={`Annotate your images.`}
      />
      <div className="tabs">
        <FilterTabs 
          filters={filters}
          selectedFilter={selectedFilter}
          onSelectFilter={handleFilterChange}
        />

        <AnnotateActions 
          projectId={projectId || ''}
          totalRecord={totalReviewed}
          onSuccess={refetch}
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

export default Annotate;