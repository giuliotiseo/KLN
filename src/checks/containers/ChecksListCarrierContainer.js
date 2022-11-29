import {
  useState
} from "react"
import { useCheckByCarrierQuery } from "../api/checks-api-slice"
import InlineSpinner from "../../globals/components/spinners/InlineSpinner"
import ListItem from "../../globals/components/lists/ListItem"
import CheckListItemContent from "../components/list/CheckListItemContent"
import CheckListItemDoc from "../components/list/CheckListItemDoc"
import CheckListItemDropdown from "../components/list/CheckListItemDropdown"
import CheckListItemConfirmationModal from "../components/list/CheckListItemConfirmationModal"
import ChecksListQueryOptions from "../components/list/ChecksListOptions"

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------
function ChecksListCarrier({ checks, isFetching }) {
  const [ modal, setModal ] = useState(false);
  if(isFetching) return <InlineSpinner />
  if(!checks?.ids || checks?.ids?.length === 0) return <p className="mx-4 mt-6 opacity-50 text-center">Nessun assegno registrato</p>

  return (
    <ul className="mt-4">
      { checks.ids.map(id => (
        <ListItem
          key={id}
          title={`Assegno ${checks.entities[id].stamp.split("-")[1]}`}
          item={checks.entities[id]}
          aside={<CheckListItemDoc docsRef={checks.entities[id].docsRef} keyDocNum={checks.entities[id].keyDocNum} />}
          path={`/checks/details?from=carrier&id=${checks.entities[id].id}`}
          dropdown={<CheckListItemDropdown id={checks.entities[id].id} queryFrom="carrier" showDeleteModal={() => setModal(id)} />}
          confirmationModal={(
            <CheckListItemConfirmationModal
              check={checks.entities[id]}
              name={`assegno ${checks.entities[id].stamp.split("-")[1]}`}
              modal={modal === id}
              operation={"delete"}
              setModal={setModal}
            />
          )}
        >
          {/* Content */}
          <CheckListItemContent
            check={checks.entities[id]}
          />
        </ListItem>
      ))}
    </ul>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ChecksListCarrierContainer({
  tenantCarrier,
  sortKey,
  orderCreationDate,
  limit,
  filters,
  nextToken
}) {
  const [ multiSelect, setMultiSelect ] = useState(false);
  const { data = [], isLoading, isFetching: isFetchingList, refetch } = useCheckByCarrierQuery({
    tenantCarrier,
    sortKey,
    limit,
    filters,
    nextToken
  });
  
  return <section id="checks-list-carrier">
    {/* Options */}
    <ChecksListQueryOptions
      queryFrom={"carrier"}
      type={"TRANSPORT"}
      multiselect={multiSelect}
      setMultiselect={setMultiSelect}
      limit={limit}
      refresh={refetch}
      nextToken={data?.nextToken}
      createdAtFrom={new Date(orderCreationDate[0])}
      createdAtTo={new Date(orderCreationDate[1])}
    />
    
    {/* List */}
    <ChecksListCarrier
      checks={data}
      isFetching={isLoading || isFetchingList}
    />
  </section>
}