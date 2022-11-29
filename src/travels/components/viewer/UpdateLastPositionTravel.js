import { useState } from "react"
import { FiX } from "react-icons/fi"
import { MdGpsFixed } from "react-icons/md"
import ActionButton from "../../../globals/components/buttons/ActionButton"
import SearchPlaces from "../../../globals/components/dataEntry/SearchPlaces"
import LocationItem from "../../../globals/components/layout/LocationItem"
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner"
import { Paragraph } from "../../../globals/components/typography/paragraphs"
import { TinyTitle } from "../../../globals/components/typography/titles"
import { useUpdateLastPositionTravelMutation } from "../../api/travels-api-slice"

// Sub components -----------------------------------------------------------------------------------------------------------------------
const LastPositionTravelContent = ({ inputVisibility, lastPosition, updateLastPosition, setInputVisibility }) => {
  return (
    !inputVisibility ? (
      !lastPosition
        ? <Paragraph styles="italic opacity-80">Informazioni tracking non presenti</Paragraph>
        : <LocationItem location={lastPosition} clearLocation={() => setInputVisibility(true)} styles="mt-2" />
    )
    : <SearchPlaces
        label="Cerca un luogo" 
        labelWeight="bold" 
        onClick={(data) => updateLastPosition(data)} 
        inputAddress={lastPosition?.address}
      />
  )
}


// Main component -----------------------------------------------------------------------------------------------------------------------
export default function UpdateLastPositionTravel({
  lastPosition,
  updateLastPosition
}) {
  const [ inputVisibility, setInputVisibility ] = useState(false);
  const [{ isLoading }] = useUpdateLastPositionTravelMutation();
  return (
    <div className="mt-4 border-t py-4">
      <header className="flex items-center justify-between">
        <TinyTitle>Ultima posizione rilevata</TinyTitle>
        <ActionButton
          styles="text-primary-200 dark:text-primary-300 hover:text-primary-100 hover:dark:text-primary-200"
          icon={() => !inputVisibility ? <MdGpsFixed className="text-lg" /> : <FiX className="text-lg" />}
          onClick={() => setInputVisibility(prev => !prev)}
        />
      </header>
      { isLoading
        ? <InlineSpinner />
        : <LastPositionTravelContent
            inputVisibility={inputVisibility}
            lastPosition={lastPosition}
            updateLastPosition={updateLastPosition}
            setInputVisibility={setInputVisibility}
          />
      }
    </div>
  )
}