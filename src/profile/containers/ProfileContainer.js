import SafeContent from "../../globals/components/layout/SafeContent";
import { useGetProfile } from "../hooks";
import ProfileCard from "../components/ProfileCard";
import PageSpinner from "../../globals/components/layout/PageSpinner";

// Slices
export default function ProfileContainer() {
  const { profile, isLoading, isFetching } = useGetProfile();

  if(isLoading || isFetching) return <PageSpinner />

  return (
    <div className="mt-2">
      <SafeContent styles="mx-4">
        <ProfileCard  profile={profile} />
      </SafeContent>
    </div>
  )
};