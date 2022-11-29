import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TravelsListRedirection from "../components/TravelsListRedirection";
import TravelsListContainer from "../containers/TravelsListContainer";
import {
  changeTravelsListStatus,
} from "../slices/travelsListSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function TravelsListPage({ queryStatus }) {
  // Action
  const dispatch = useDispatch();

  // Initialize list status parameter 
  useEffect(() => {
    if(queryStatus) {
      dispatch(changeTravelsListStatus(queryStatus));
    }
  }, [queryStatus]);

  // Complete queryString by get the information from company type
  if(!queryStatus) return <TravelsListRedirection />

  // Good to go
  return <TravelsListContainer />
}
