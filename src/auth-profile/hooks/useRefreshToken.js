import { useDispatch } from 'react-redux';
import { useRefreshTokenMutation } from '../api/auth-profile-api-slice';
import { setProfileCredentials } from '../slices/authProfileSlice';

const useRefreshToken = (companyId) => {
  const [ refresh, { isLoading }] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const handleRefresh = async () => {
    try {
      const credentials = { companyId: companyId };
      const result = await refresh(credentials);
      console.log(`Refresh token regenerated:`, result);
      dispatch(setProfileCredentials({
        id: result.data?.profileId,
        roleIds: result.data?.roleIds,
        token: result.data?.accessToken
      }));
    } catch(err) {
      console.error('Error during refresh token action', err);
    }
  }
  
  return [handleRefresh, { loading: isLoading }]
};

export default useRefreshToken;