import Dialog, { DialogActions, DialogContent } from "../../../globals/components/layout/Dialog";

export default function DeleteCheckDialog({
  check,
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
          <p className="text-lg text-center mb-2">Stai cancellando {check.stamp}</p>
          <p className="alert-warn px-4">Cancellando questo assegno perderei tutti i dati e non sarà più rintracciabile nel tuo archivio e in quello dei tuoi clienti o fornitori</p>
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}