import { FC } from "react";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./version-card.css";

interface Version {
    version_number: string;
    created_at: string;
    name: string;
    count_images: number;
}

interface VersionCardProps {
    version: Version;
    onView: (versionNumber: string) => void;
}

const formatEditedTime = (isoDateString: string): string => {
    const date = parseISO(isoDateString);
    return `${formatDistanceToNow(date, { addSuffix: true })}`;
};

const formatCreatedTime = (isoDateString: string): string => {
    const date = parseISO(isoDateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleString("en-US", options);
}

const VersionCard: FC<VersionCardProps> = ({ version, onView }) => {
    const location = useLocation();
    const { versionID }: { versionID?: string } = location.state || {};

    return (
        <div className={`version-card ${location.pathname.includes(version.version_number) ? "selected" : ""}`} onClick={() => onView(version.version_number)}>
            <div className="version-card-content">
                <div className="version-top">
                    {formatCreatedTime(version.created_at)}
                </div>

                <div className="version-info">
                    {version.name} • {formatEditedTime(version.created_at)}
                </div>
                <div className="version-child">
                    Images • {version.count_images}
                </div>
            </div>
        </div>
    );
};

export default VersionCard;