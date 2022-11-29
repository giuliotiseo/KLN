import { useDispatch } from "react-redux";
import PalletsListBoundles from "../components/bundles/PalletsListBundles";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import SafeCol from "../../globals/components/layout/SafeCol";
import ReversalCreatorForm from "../components/form/ReversalCreatorForm";
import Button from "../../globals/components/buttons_v2/Button";
import CustomerFinder from "../../globals/components/dataEntry_v2/CustomerFinder";
import { SmallTitle } from "../../globals/components/typography/titles";
import { FiTerminal } from "react-icons/fi";
import { BiReset } from "react-icons/bi";

// Main component -----------------------------------------------------------------------------------------------
export default function ReversalCreatorLayout({
  // basic info
  companyId, palletHandlingRef, isLoading, 
  // Operations
  reversal, operationDate,
  // Validations
  adminValidation,
  // Additional data
  files, image, note,
  // Callbacks
  changeReversal, save,  onChangeReversalValue, onChangeReversalNote
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="relative mr-2 rounded-lg flex-1 min-w-[350px]">
          <SafeCol>
            <div className="mr-4">
              <SmallTitle styles="my-4">Ricerca cliente</SmallTitle>
              <section className="bg-base-100 p-4 rounded-md">
                <CustomerFinder
                  callback={(value) => changeReversal(value)}
                  selectedCustomer={reversal?.[0]}
                  clear={() => changeReversal(null)}
                />
              </section>

              { (reversal && reversal?.length > 0) && (
                <section>
                  <SmallTitle styles="my-4">Dati cliente selezionato</SmallTitle>
                  <ul className="bg-base-100 p-4 rounded-md">
                    <li className="flex justify-between py-2 border-b border-light-100 dark:border-dark-100"><span className="uppercase">Nome</span> <b>{reversal[0].name}</b></li>
                    <li className="flex justify-between py-2"><span className="uppercase">Partita IVA</span> <b>{reversal[0].vatNumber}</b></li>
                  </ul>
                </section>
              )}

              { reversal && reversal?.[0]?.name && ( 
                <section className="mt-6">
                  <SmallTitle styles="mb-4">Situazione contabile con {reversal[0].name}</SmallTitle>
                  <PalletsListBoundles
                    listType={"search"}
                    companyKeyToQuery={"carrierId"}
                    companyId={companyId}
                    customerName={reversal[0].name}
                    hideInput={true}
                    classNameQuantityResult="relative mx-6 mt-8"
                  />
                </section>
              )}
            </div>
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-2">
          { isLoading && <FullSpinner /> }
          { reversal?.length > 0 && !isLoading && (
            <div className="mt-4">
              <SafeCol>
                <ReversalCreatorForm
                  title="Storno"
                  reversal={reversal}
                  onChangeReversalValue={onChangeReversalValue}
                  onChangeReversalNote={onChangeReversalNote}
                  note={note}
                  operationDate={operationDate}
                  companyId={companyId}
                  adminValidation={adminValidation}
                  files={files}
                  image={image}
                  palletHandlingRef={palletHandlingRef}
                />
              </SafeCol>
            </div>
          )}
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Registrazione storno pallet</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(changeReversal(null))}
          />
          
          { save
            ? <Button
                className="btn-primary ml-auto"
                icon={save.icon}
                text={save.text}
                loading={save.isLoading}
                onClick={save.onClick}
              />
            : null
          }
        </div>
      </footer>

    </div>
  )
}