import ImageAnalysis from "@/components/analysis/ImageAnalysis";
import './Index.css'

const AnalysisPage = () => {
  return (
    <div className="analysis-container">
      <div className="header">
        <h1 className="title">AI Image Analysis</h1>
        <p className="subtitle">
          Upload an image to analyze it with our AI model
        </p>
      </div>
      <ImageAnalysis />
    </div>
  );
};

export default AnalysisPage;