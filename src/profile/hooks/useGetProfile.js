import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../auth-profile/slices/authProfileSlice";
import { useGetProfileQuery } from "../api/profile-api-slice";

export default function useGetProfile() {
  const id = useSelector(selectCurrentProfile);
  const { data, isLoading, isFetching, refetch } = useGetProfileQuery(id);
  return {
    profile: data,
    isLoading,
    isFetching,
    refetch
  }
}