import Dialog, { DialogActions, DialogContent } from "../../../globals/components/layout/Dialog";

export default function DeleteContactDialog({
  contact,
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
          <p className="text-lg text-center mb-2">Stai cancellando {contact.name} {contact.surname}</p>
          <p className="alert-warn px-4">Cancellando questo contatto, non potrai più associarlo a magazzini, mezzi di trasporto, ecc.</p>
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}