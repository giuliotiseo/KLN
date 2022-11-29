import { useSelector } from "react-redux";
import SafeContent from "../../globals/components/layout/SafeContent";
import ProfileCard from "../components/ProfileCard";
// Slices
import { selectProfile } from '../state/userSlice';

export default function ProfileContainer({ user }) {
  const profile = useSelector(selectProfile);

  return (
    <div className="mt-2">
      <SafeContent styles="mx-4">
        <ProfileCard 
          profile={profile} 
        />
      </SafeContent>
    </div>
  )
};