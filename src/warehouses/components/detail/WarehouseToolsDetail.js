import { VscTools } from "react-icons/vsc";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { WAREHOUSE_TOOLS } from "../../libs/helpers";

const WarehouseToolsDetail = ({ tools }) => (
  <div className="flex">
    <VscTools className="text-3xl m-2 text-secondary-100 dark:text-secondary-300" />
    <div className="flex flex-col">
      <SmallTitle>Mezzi operativi richiesti</SmallTitle>
      <p className="label mb-2 max-w-full whitespace-normal">Il magazzino selezionato ha bisogno all'occorrenza di: </p>

      { tools?.length > 0 
        ? <ul className="pl-2">
            { tools.map(t => 
              <li key={t} className="items-center list-item list-disc list-inside">
                {WAREHOUSE_TOOLS[t]}
              </li>
            )}
          </ul>
        : <Paragraph styles="opacity-50">Nessun mezzo operativo dichiarato</Paragraph>
      }
    </div>
  </div>
)

export default WarehouseToolsDetail;