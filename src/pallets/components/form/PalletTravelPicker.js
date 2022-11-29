import ActionButtonLink from "../../../globals/components/buttons/ActionButtonLink";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { useTravelsByStampQuery } from "../../../travels/api/travels-api-slice";
import PalletTravelContent from './PalletTravelContent';

// Sub components ---------------------------------------------------------------------------------------------------
const PalletTravelPickerItem = ({ travel }) => {
  if(!travel) return null;
  return (
    <div className="py-2">
      <PalletTravelContent travel={travel} />
      <ActionButtonLink
        to={`/pallets/create?travel_id=${travel.id}`}
        text="Seleziona"
        styles="btn-primary mt-4 text-sm inline-flex"
      />
    </div>
  )
}

// Main component ---------------------------------------------------------------------------------------------------
export default function PalletTravelPicker({
  stamp,
  limit = 1,
  nextToken,
}) {
  const { data = [], isFetching: isFetchingList } = useTravelsByStampQuery({
    stamp: `TRV-${stamp.toUpperCase()}`,
    limit,
    nextToken
  });

  return (
    <section>
      { data?.ids?.length > 0 && <TinyTitle styles="mt-4 py-2">Viaggio trovato: </TinyTitle> }
      { isFetchingList  
        ? <InlineSpinner /> 
        : data?.ids?.length > 0
          ? data.ids.map(travelId => (
              <PalletTravelPickerItem
                key={travelId}
                travel={data.entities[travelId]}
              />
            ))
          : <SmallParagraph styles="opacity-50 mt-4">Nessun risultato ottenuto presente</SmallParagraph>
      }
    </section>
  )
}