import { FC } from "react";
import UserProgressSection from "@/components/jobs/UserProgressSection";

const TeamProgress: FC = () => {

  const handleUserClick = (userId: string) => {
    console.log(`Navigating to user detail page: ${userId}`);
    // In a real app, you'd navigate to the user detail page:
    // navigate(`/users/${userId}`);
  };

    return (
        <div className="space-y-6 p-8 w-full">
            <UserProgressSection onUserClick={handleUserClick} />
        </div>
    )
}

export default TeamProgress