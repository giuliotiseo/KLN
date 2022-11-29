import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import Button from "../../../globals/components/buttons_v2/Button";
import SafeCol from "../../../globals/components/layout/SafeCol";
import InputText from "../../../globals/components/dataEntry_v2/InputText";
import CustomerSearchContent from "./CustomerSearchContent";
import CustomerCompanyPicker from "./CustomerCompanyPicker";
import { getCompaniesByVatThunk } from "../../api/thunks/getCompaniesByVatThunk";
import { clearSelectedCustomer, selectCustomerCreatorCompanies, selectCustomerCreatorSelectedCustomer, selectCustomerCreatorStatus, selectedCustomerCreatorSearched } from "../../slices/customerCreatorSlice";

// Main component -----------------------------------------------------------------------------------------------------------------------------
export default function CustomerSearchVatNumber({
  vatNumber,
  updateForm,
  showForm,
}) {
  const companies = useSelector(selectCustomerCreatorCompanies);
  const searchedVatNumber = useSelector(selectedCustomerCreatorSearched);
  const selectedCustomer = useSelector(selectCustomerCreatorSelectedCustomer);
  const status = useSelector(selectCustomerCreatorStatus);
  const dispatch = useDispatch();

  return (
    <SafeCol id="CustomerSearchVatNumber">
      <div className="bg-buildings  p-8 rounded-md h-[200px] relative" />
      {/* Form */}
      <div className="text-center -translate-y-16 l-0 p-4 bg-base-100 w-5/6 mx-auto rounded-lg border border-light-50 dark:border-dark-300">
        <p className="text-center text-2xl md:text-3xl my-2">Cerca il cliente in piattaforma</p>
        <div className="flex items-center justify-center max-w-[400px] mx-auto">
          <InputText
            id="vatNumber"
            className="flex-col mt-4 mb-2 w-full"
            contentClassName="w-full text-xl md:text-2xl"
            inputClassName='bg-light-100 dark:bg-dark-100 p-2 text-center tracking-tight md:tracking-wide'
            placeholder="Partita IVA cliente"
            labelClassName="block"
            value={vatNumber}
            forceUpperCase={true}
            callback={updateForm}
            onPressEnter={({ value }) => dispatch(getCompaniesByVatThunk(value))}
            disabled={status === "loading"}
          />
          <Button
            text="Cerca"
            className="btn-primary ml-2 mt-2"
            icon={<FiSearch />}
            onClick={() => dispatch(getCompaniesByVatThunk(vatNumber))}
            loading={status === "loading"}
          />
        </div>
      </div>

      {/*  Content */}
      <CustomerSearchContent />

      {/* Results */}
      <CustomerCompanyPicker
        selectedCustomer={selectedCustomer}
        vatNumber={searchedVatNumber}
        companies={companies}
        open={companies || companies?.length > 0}
        showForm={showForm}
        close={() => dispatch(clearSelectedCustomer())}
      />
    </SafeCol>
  )
}