import FormText from "../../../../globals/components/dataEntry/FormText";
import SearchPlaces from "../../../../globals/components/dataEntry/SearchPlaces";
import SimpleMap from "../../../../globals/components/layout/SimpleMap";
import { TinyTitle } from "../../../../globals/components/typography/titles";
import { FiDelete } from "react-icons/fi";
import { getStandardCoordinatesByCheckpoint } from "../../../../globals/libs/helpers";

export default ({ checkpoint, dispatch }) => {
  const standard_coordinate = getStandardCoordinatesByCheckpoint(checkpoint);

  console.log('Checkpoint', checkpoint);
  return (
    <section>
      <div className="flex">
        <FormText
          label="Nome punto di interesse" 
          value={checkpoint.name} 
          onChange={({ target: { value }}) => dispatch({ type: "change_checkpoint", name: "name", value })}
          styles="flex-1 mr-2"
        />
      </div>

      <div className="flex flex-col">
        { checkpoint?.location?.address
          ? <div className="text-base mt-2 chip-neutral">
              <TinyTitle className="mx-4 my-2 block">Indirizzo selezionato:</TinyTitle>
              <div className="flex items-start ">
              <button
                className="rotate-180 mx-1 mt-1 text-primary-200 dark:text-primary-300 hover:text-danger-200 dark:hover:text-danger-300 text-base" 
                onClick={() => dispatch({ type: "reset", name: "location" })}
              >
                <FiDelete />
              </button>
              { checkpoint.location.address}
              </div>
            </div>
          : <SearchPlaces
              label={"Cerca l'indirizzo"}
              onClick={value => dispatch({ type: "change_checkpoint", name: "location", value })}
              clearAfterClick={true}
              styles="mt-2 w-full text-base"
            />
        }
      </div>

      <div className="h-[400px] mt-2 rounded-md overflow-hidden">
        <SimpleMap
          lat={standard_coordinate.lat}
          lng={standard_coordinate.lng}
          onClick={value => dispatch({ type: "change_checkpoint", name: "location", value })}
        />
      </div>
    </section>
  )
}