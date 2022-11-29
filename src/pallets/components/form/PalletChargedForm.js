import { TinyTitle } from "../../../globals/components/typography/titles";
import PalletInputItem from "./PalletInputItem";

export default function PalletChargedForm({
  title = "Stornati",
  chargedValue = 0,
  chargedNote = "",
  onChangeChargedValue = () => console.log("Default change charged value in <PalletChargedForm />"),
  onChangeChargedNote = () => console.log("Default change charged note in <PalletChargedForm />"),
  onChangeCharger = () => console.log("Default change charger in <PalletChargedForm />"),
  charger = null,
}) {
  return (
    <div className="p-4">
      <div>
        <TinyTitle styles="uppercase">{title}</TinyTitle>
        <div className="mt-2">
          <PalletInputItem
            type="CHARGED"
            title={`${charger 
              ? `Pallet stornati dal conto di ${charger.name}`
              : 'Pallet stornati'
            }`}
            value={chargedValue}
            note={chargedNote}
            onChangeValue={onChangeChargedValue}
            onChangeNote={onChangeChargedNote}
            showText="Collega azienda"
            company={charger}
            onChangeCompany={onChangeCharger}
          />
        </div>
      </div>
    </div>
  )
}