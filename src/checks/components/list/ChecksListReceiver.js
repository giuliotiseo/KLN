import InlineSpinner from "../../../globals/components/spinners/InlineSpinner"
import { useCheckByReceiverQuery } from "../../api/checks-api-slice"
import ListItem from "../../../globals/components/lists/ListItem"

export default function ChecksListReceiver(props) {
  const { data = [], isFetching: isFetchingList } = useCheckByReceiverQuery(props)

  if(isFetchingList) return <InlineSpinner />
  if(data?.ids?.length === 0) return <p className="mx-4 mt-6 opacity-50 text-center">Nessun assegno registrato</p>
  
  return <section id="checks-list-carrier">
    <ul>
      { data.ids.map(id => <ListItem key={id} content={data.entities[id]} /> )}
    </ul>
  </section>
}