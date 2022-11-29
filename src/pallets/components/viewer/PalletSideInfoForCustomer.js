import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PalletsListCarrierNameModule from "../list/modules/PalletsListCarrierNameModule";
import Spinner from "../../../globals/components/layout/Spinner";
import { changePalletsListCompany, resetPalletsList } from "../../slices/palletsListSlice";

export default function PalletSideInfoForCustomer({ palletHandling }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePalletsListCompany({
      key: "carrier",
      value: {
        name: palletHandling.carrierName,
        company: {
          id: palletHandling.carrierId,
          name: palletHandling.carrierName,
          owner: palletHandling.tenantCarrier
        }
      }
    }))

    return () => dispatch(resetPalletsList());
  }, [palletHandling]);

  return (
    <section>
      <h3 className="title-4 mt-4 mb-2">Rapporti con il vettore</h3>
      { palletHandling?.carrierId 
        ? <PalletsListCarrierNameModule
            customerId={palletHandling.carrierId}
            isShowReversals={true}
            resultOnTop={true}
            hideInput={true}
            classNameQuantityResult="relative my-4" 
          />
        : <Spinner />
      }
    </section>
  )
}