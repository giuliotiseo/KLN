import Dialog, { DialogActions, DialogContent } from "../../../globals/components/layout/Dialog";

export default function DeleteWarehouseDialog({
  warehouse,
  close,
  open,
  topMessage = "",
  bottomMessage = "",
  buttons= [], /* const buttons = [{ text:"", disabled, onClick }]; */
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
          <p className="text-lg mb-2 text-left">Stai cancellando {warehouse.name} in {warehouse.location.address}</p>
          <p className="alert-warn px-4 text-left">Cancellando questo magazzino, non potrai più associarlo a ordini, viaggi, ecc,</p>
          <p className="alert-danger px-4 mt-2">Si consiglia di procedere con la disattivazione del magazzino usando l'aggiornamento di stato</p>
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}