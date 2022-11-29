import { useSelector } from 'react-redux';
// Components
import WarehouseListItem from './item/WarehouseListItem';
import { Paragraph } from "../../globals/components/typography/paragraphs";
import InlineSpinner from '../../globals/components/spinners/InlineSpinner';
import ReactTooltip from 'react-tooltip';
import ActionButton from '../../globals/components/buttons/ActionButton';
// Selectors & thunks
import { selectWarehousesList, selectWarehousesListIds, selectWarehousesNextToken } from '../slices/warehousesListSlice';
// Icons
import { FiArrowDownCircle } from 'react-icons/fi';

export default function WarehousesList({ loading, handleTrackingLocation, next }) {
  const warehousesIds = useSelector(selectWarehousesListIds);
  const nextToken = useSelector(selectWarehousesNextToken);
  const warehouses = useSelector(selectWarehousesList);

  if(loading) {
    return (
      <div className="h-full m-4">
        <InlineSpinner color="#158084" loading={loading} />
      </div>
    )
  }

  return (
    <div id="warehouses-list" className="h-full">
      { !warehouses || warehousesIds.length <= 0
        ? <Paragraph styles="mx-4 mt-6 opacity-50">Nessun punto di carico o scarico registrato</Paragraph>
        : <ul>
          { warehousesIds.map(w_id => {
              return (
              <WarehouseListItem 
                key={w_id} 
                item={warehouses[w_id]} 
                handleTrackingLocation={handleTrackingLocation}
              />
            )}
          )}
          </ul>
        }

        { nextToken ? (
          <ActionButton
            text="Mostra altri"
            loading={nextToken === "loading"}
            icon={() => <FiArrowDownCircle />}
            styles="btn-ghost ml-4"
            onClick={next}
          />
        ) : <Paragraph styles="opacity-50 px-4 my-4">Non ci sono altri risultati da mostrare</Paragraph>}

      <ReactTooltip />
    </div>
  )
}