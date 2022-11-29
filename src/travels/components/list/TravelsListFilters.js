import { useDispatch, useSelector } from "react-redux";
import FloatingFilterBox from "../../../globals/components/lists/FloatingFilterBox"
import FloatingFiltersButton from "../../../globals/components/lists/FloatingFiltersButton"
import InputCurrency from "../../../globals/components/dataEntry/InputCurrency";
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
import { FiSearch } from "react-icons/fi";
import { changeTravelsListCostsFrom, changeTravelsListCostsTo, selectTravelsListEstimatedCosts, selectTravelsListFilters } from "../../slices/travelsListSlice";

export default function TravelsListFilters ({
  isOpenFilters,
  setIsOpenFilters,
}) {
  const estimatedTransportCosts = useSelector(selectTravelsListEstimatedCosts);
  const dispatch = useDispatch();
  return (
    <aside>
      <FloatingFilterBox
        isOpenFilters={isOpenFilters}
      >
        <SmallTitle styles="mb-4">Filtra elenco corrente</SmallTitle>
        <div className="w-full">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Costi stimati
          </TinyTitle>
          <InputCurrency
            id="costFrom"
            label="A partire da:"
            selected={estimatedTransportCosts[0]}
            iconButton={() => <FiSearch />}
            className="mb-2"
            callback={(costFrom) => dispatch(changeTravelsListCostsFrom(costFrom))}
          />

          <InputCurrency
            id="costTo"
            label="Fino a:"
            selected={estimatedTransportCosts[1]}
            iconButton={() => <FiSearch />}
            className="mb-2"
            callback={(costTo) => dispatch(changeTravelsListCostsTo(costTo))}
          />
        </div>
      </FloatingFilterBox>

      <FloatingFiltersButton
        isOpenFilters={isOpenFilters}
        setIsOpenFilters={setIsOpenFilters}
      />
    </aside>
  )
}