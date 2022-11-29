import { useDispatch } from "react-redux";
import BasicSelector from "../../../globals/components/dataEntry/BasicSelector";
import FormBoundNumber from "../../../globals/components/dataEntry/FormBoundNumber";
import FloatingFilterBox from "../../../globals/components/lists/FloatingFilterBox"
import FloatingFiltersButton from "../../../globals/components/lists/FloatingFiltersButton"
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
import { changeLoadQuantityFrom, changeLoadQuantityTo, changeUnloadQuantityFrom, changeUnloadQuantityTo, changeCarrierValidationFilter, clearLoadQuantityFilter, clearReversalQuantityFilter, clearUnloadQuantityFilter, changeCustomerValidationFilter, selectPalletsListFilters } from "../../slices/palletsListSlice";
import { FiFilter, FiDelete } from "react-icons/fi";
import { statusOptions, STATUS_DESCRIPTIONS } from "../../libs/helpers";
import { useSelector } from "react-redux";

export default function PalletsListFilters ({ isOpenFilters, setIsOpenFilters }) {
  const filters = useSelector(selectPalletsListFilters);
  const dispatch = useDispatch();
  return (
    <aside>
      <FloatingFilterBox
        isOpenFilters={isOpenFilters}
      >
        <SmallTitle styles="mb-4">Filtra elenco corrente</SmallTitle>
        <div className="w-full">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Stato della validazione (vettore)
          </TinyTitle>
          <BasicSelector
            id="pallet-status-validation-carrier"
            icon={() => <FiFilter className="label-icon" />}
            label="Scegli stato validazione vettore"
            value={filters?.carrierValidation || ""}
            onChange={value => dispatch(changeCarrierValidationFilter(value))}
            styles="mr-2 w-full"
          >
            <option value="">Scegli un valore</option>
            { statusOptions.map(option => (
              <option key={option} value={option}>
                {STATUS_DESCRIPTIONS[option]}
              </option>
            ))}
          </BasicSelector>
        </div>

        <div className="w-full mt-4">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Stato della validazione (cliente)
          </TinyTitle>
          <BasicSelector
            id="pallet-status-validation-customer"
            icon={() => <FiFilter className="label-icon" />}
            label="Scegli stato validazione cliente"
            value={filters?.customerValidation || ""}
            onChange={value => dispatch(changeCustomerValidationFilter(value))}
            styles="mr-2 w-full"
          >
            <option value="">Scegli un valore</option>
            { statusOptions.map(option => (
              <option key={option} value={option}>
                {STATUS_DESCRIPTIONS[option]}
              </option>
            ))}
          </BasicSelector>
        </div>

        <div className="w-full mt-4">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Quantità pallet caricati
          </TinyTitle>
          <div className="flex items-center">
            <div className="mr-2">
              <FormBoundNumber
                error={null}
                min={0}
                max={filters.loadTo || 99}
                onChange={val => dispatch(changeLoadQuantityFrom(val))}
                inputValue={filters.loadFrom}
                placeholder="da:"
              />
            </div>
            <div className="mr-2">
              <FormBoundNumber
                error={null}
                min={filters.loadFrom || 2}
                max={999}
                onChange={val => dispatch(changeLoadQuantityTo(val))}
                inputValue={filters.loadTo}
                placeholder="a:"
              />
            </div>
            <button className="btn btn-primary" onClick={() => dispatch(clearLoadQuantityFilter())}>
              <FiDelete />
            </button>
          </div>
        </div>

        <div className="w-full mt-4">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Quantità pallet scaricati
          </TinyTitle>
          <div className="flex items-center">
            <div className="mr-2">
              <FormBoundNumber
                error={null}
                min={0}
                max={filters.unloadTo || 99}
                onChange={val => dispatch(changeUnloadQuantityFrom(val))}
                inputValue={filters.unloadFrom}
                placeholder="da:"
              />
            </div>
            <div className="mr-2">
              <FormBoundNumber
                error={null}
                min={filters.unloadFrom || 2}
                max={999}
                onChange={val => dispatch(changeUnloadQuantityTo(val))}
                inputValue={filters.unloadTo}
                placeholder="a:"
              />
            </div>
            <button className="btn btn-primary" onClick={() => dispatch(clearUnloadQuantityFilter())}>
              <FiDelete />
            </button>
          </div>
        </div>

        <div className="w-full mt-4">
          <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2 w-full">
            Quantità pallet stornati
          </TinyTitle>
          <div className="flex items-center">
            <div className="mr-2">
              <FormBoundNumber
                error={null}
                min={0}
                max={filters.reversalTo || 99}
                onChange={val => dispatch(changeUnloadQuantityFrom(val))}
                inputValue={filters.reversalFrom}
                placeholder="da:"
              />
            </div>
            <div className="mr-2">
              <FormBoundNumber
                error={null}
                min={filters.reversalFrom || 2}
                max={999}
                onChange={val => dispatch(changeUnloadQuantityTo(val))}
                inputValue={filters.reversalTo}
                placeholder="a:"
              />
            </div>
            <button className="btn btn-primary" onClick={() => dispatch(clearReversalQuantityFilter())}>
              <FiDelete />
            </button>
          </div>
        </div>
      </FloatingFilterBox>

      <FloatingFiltersButton
        isOpenFilters={isOpenFilters}
        setIsOpenFilters={setIsOpenFilters}
      />
    </aside>
  )
}