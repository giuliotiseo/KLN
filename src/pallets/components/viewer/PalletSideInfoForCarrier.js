import PalletSiblingsInTravel from "./PalletSiblingsInTravel";
import PalletCompanyReport from "./PalletCompanyReport";

// Main component ---------------------------------------------------------------------------------------------------
export default function PalletSideInfoForCarrier({
  queryFrom,
  palletHandling,
}) {
  if(!palletHandling?.travel) {
    return (
      <PalletCompanyReport
        companyName={palletHandling?.reversalName || null}
      />
    )
  }

  return (
    <section>
      <PalletSiblingsInTravel
        queryFrom={queryFrom}
        currentHandlingId={palletHandling.id}
        palletHandlings={palletHandling.travel.palletHandlings.items}
        travelStamp={palletHandling.travel.stamp}
      />
    </section>
  )
}