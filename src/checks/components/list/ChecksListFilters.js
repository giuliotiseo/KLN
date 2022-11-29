import { useDispatch } from "react-redux";
import InputText from "../../../globals/components/dataEntry/InputText";
import FloatingFilterBox from "../../../globals/components/lists/FloatingFilterBox"
import FloatingFiltersButton from "../../../globals/components/lists/FloatingFiltersButton"
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
import { FiSearch } from "react-icons/fi";
import { changeChecksListAmountFrom, changeChecksListAmountTo, changeChecksListDocNum, changeChecksListOrderStamp, } from "../../slices/checksListSlice";
import InputCurrency from "../../../globals/components/dataEntry/InputCurrency";

function ChecksListFilters ({ isOpenFilters, setIsOpenFilters, filters }) {
  const dispatch = useDispatch();
  return (
    <aside>
      <FloatingFilterBox
        isOpenFilters={isOpenFilters}
      >
        <SmallTitle styles="mb-4">Filtra elenco corrente</SmallTitle>
        <div className="w-full">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Importo
          </TinyTitle>
          <InputCurrency
            id="amountFrom"
            label="A partire da:"
            selected={filters.amountRange[0]}
            iconButton={() => <FiSearch />}
            className="mb-2"
            callback={(amountFrom) => dispatch(changeChecksListAmountFrom(amountFrom))}
          />

          <InputCurrency
            id="amountTo"
            label="Fino a:"
            selected={filters.amountRange[1]}
            iconButton={() => <FiSearch />}
            className="mb-2"
            callback={(amountTo) => dispatch(changeChecksListAmountTo(amountTo))}
          />
        </div>

        <div className="w-full">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Numero documento
          </TinyTitle>
          <InputText
            id="docNum"
            statusLabel={false}
            selected={filters.docNum}
            iconButton={() => <FiSearch />}
            callback={(docNum) => dispatch(changeChecksListDocNum(docNum))}
            contentClassName="w-full"
          />
        </div>

        <div className="w-full">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Marca ordine
          </TinyTitle>
          <InputText
            id="orderStamp"
            statusLabel={false}
            selected={filters.orderStamp}
            iconButton={() => <FiSearch />}
            callback={(orderStamp) => dispatch(changeChecksListOrderStamp(orderStamp))}
            contentClassName="w-full"
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

export default ChecksListFilters;