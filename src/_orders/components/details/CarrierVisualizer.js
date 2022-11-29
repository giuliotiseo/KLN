import { SmallTitle } from "../../../globals/components/typography/titles"
import CopyTagOnClipboard from "../../../company/components/CopyTagOnClipboard"
import { FiTruck } from "react-icons/fi"
import DepotVisualizer from "./DepotVisualizer";

export default ({ order }) => {
  /* Questa sezione dovrà essere estesa aggiungendo eventualmente il nome dell'autista che
  effettuerà la consegna e la targa del mezzo
  Inoltre si potrebbe provare a sviluppare un'area di comunicazione con il vettore
  (sia con l'autista che con la sede centrale)
  */
  const name = order.carrierName;
  const tag = order.tenantCarrier;


  return (
    <>
      { order?.depotCheckpoint?.name
        ? ( <DepotVisualizer order={order} /> )
        : <section className="mt-2">
            <SmallTitle styles="flex items-center"><FiTruck className="mr-2" /> Dati trasportatore</SmallTitle>
            <div className="flex justify-between items-start">
              <p className="inline-block px-2">Trasportato da: {name}</p>
              { !tag.includes("local") && (
                <div className="mt-4">
                  <CopyTagOnClipboard inputTag={tag} />
                </div>
              )}
            </div>
          </section>
        }
    </>
  )
}