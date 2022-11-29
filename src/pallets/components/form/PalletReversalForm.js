import { TinyTitle } from "../../../globals/components/typography/titles";
import PalletInputItem from "./PalletInputItem";

export default function PalletReversalForm({
  title,
  reversal,
  companiesPalletInfo = null,
  onChangeReversalValue,
  onChangeReversalNote,
  isBadge = true,
}) {
  if(reversal?.length <= 0) return null;
  return (
    <section>
      <TinyTitle styles="uppercase mt-4">{title}</TinyTitle>
      { reversal.map((rev, index) => {
        return (
          <div key={index} className="mt-2">
            <PalletInputItem
              type="REVERSAL"
              balance={companiesPalletInfo ? companiesPalletInfo[rev.id].value - rev.value : rev.value }
              showBadge={isBadge}
              title={`${rev?.name 
                ? `Pallet stornati dal conto di ${rev.name}`
                : 'Pallet stornati'
              }`}
              value={rev.value}
              note={""}
              onChangeValue={(value) => onChangeReversalValue({ value, index })}
              onChangeNote={(value) => onChangeReversalNote({ value, index })}
              showText="Dettagli storno"
              company={{ name: rev.name, tenant: rev.tenant, id: rev.id }}
              onChangeCompany={null}
              // onChangeCompany={() => console.log("Change reverse company")}
            />
          </div>
        )}
      )}

    </section>
  )
}