import Dialog, { DialogActions, DialogContent } from "../../../globals/components/layout/Dialog";

export default function DeleteCustomerDialog({
  customer,
  close,
  open,
  topMessage = "",
  bottomMessage = "",
  buttons= [], /* const buttons = [{ text:"", disabled, onClick }]; */
  loading,
}) {
  return (
    <Dialog open={open} close={close}>
      <DialogContent
        title={"Intendi davvero procedere?"}
        topMessage={topMessage}
        topMessageClassName="mt-4"
        bottomMessage={bottomMessage}
      >
        <div className="text-left my-6">
          <p className="text-lg text-center mb-2">Stai cancellando {customer.name}, {customer.vatNumber}</p>
          <p className="alert-warn px-4">Cancellando questo cliente, non potrai più associarlo a pre-ordini, ordini, assegni, interscambio pallet, ecc.</p>
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}