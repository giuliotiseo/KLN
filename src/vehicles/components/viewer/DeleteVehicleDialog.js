import Dialog, { DialogActions, DialogContent } from "../../../globals/components/layout/Dialog";

export default function DeleteVehicleDialog({
  vehicle,
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
          <p className="text-lg text-center mb-2">Stai cancellando il veicolo targato {vehicle.licensePlate}</p>
          <p className="alert-warn px-4">Cancellando questo veicolo, non potrai più associarlo ai viaggi</p>
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}