import { useSelector } from "react-redux";
import { selectCurrentProfileId } from "../../auth-profile/slices/authProfileSlice";
import { useGetProfileQuery } from "../api/profile-api-slice";

export default function useGetProfile() {
  const id = useSelector(selectCurrentProfileId);
  const { data, isLoading, isFetching, refetch } = useGetProfileQuery(id);
  return {
    profile: data,
    isLoading,
    isFetching,
    refetch
  }
}