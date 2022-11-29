import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from '../hooks';
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../slices/authProfileSlice";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import { Auth } from "aws-amplify";

const PersistProfileLogin = ({ company }) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ refresh ] = useRefreshToken(company?.id);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    // Auth.signOut();

    if(company?.id) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch(err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
  
      !token ? verifyRefreshToken() : setIsLoading(false);
    }
  }, [company?.id]);

  // useEffect(() => {
  //   console.log(`is loading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(token)}`);
  // }, [isLoading]);


  return (
    <>
      { isLoading
        ? <PageSpinner />
        : <Outlet />
      }
    </>
  )
}

export default PersistProfileLogin;