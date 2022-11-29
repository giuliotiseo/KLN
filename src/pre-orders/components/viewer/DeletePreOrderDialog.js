import Dialog, { DialogActions, DialogContent } from "../../../globals/components/layout/Dialog";

export default function DeletePreOrderDialog({
  preOrder,
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
          <p className="text-lg text-center mb-2">Stai cancellando {preOrder.name}</p>
          <p className="alert-warn px-4">Cancellando questo pre-ordine, non potrai più associarlo agli ordini e perderai per sempre i dati contenuti all'interno</p>
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}