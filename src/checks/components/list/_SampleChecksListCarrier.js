import { useState } from "react";
import { v4 } from "uuid"
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner"
import { useAddCheckByCarrierMutation, useCheckByCarrierQuery, useGetCheckQuery, useRemoveCheckMutation, useUpdateCheckByCarrierMutation } from "../../api/checks-api-slice"
import { SmallTitle } from "../../../globals/components/typography/titles";
import { LargeParagraph } from "../../../globals/components/typography/paragraphs";
import { formatDistance } from "date-fns";

const CHECK_SAMPLE_CREATE = {
  id: "id-prova-assegno",
  orderCreationDate: "2022-03-18T15:48:06.249Z",
  orderId: "T1JEXzlRMk1HVTZPXzE4MzkxMDIzMjEyK0NMSUVOVEVTUkxAMzE3N18xMjMwOTE4MjczNitMVFNTUkxANDAzMF8wMDk2OTQ3MDg4NCs0OGE0OWIzYS1kODViLTQ3ZGQtYjM1Ny1mNmI3ZTIxZWJmYjRfMTY0NzYxODQ4NTUwMw==",
  entryTravelId: v4(),
  exitTravelId: v4(),
  keyDocNum: 1234,
  docsRef: [],
  tenantReceiver: "LTSSRL@4030",
  tenantSender: "CLIENTESRL@3177",
  tenantCarrier: "LTSSRL@4030",
  receiverName: "LTS SRL",
  senderName: "CLIENTE SRL",
  carrierName: "LTS SRL",
  // beneficiary: "",
  // issuingDate: getDate(new Date()),
  checkInDate: new Date(),
  // expiration: getDate(new Date()),
  checkNum: "32198321982831",
  amount: 1234.43,
  iban: "IT23489928483280432020",
  status: "PENDING",
  note: "Nessuna nota"
}

const CHECK_SAMPLE_UPDATE = {
  orderCreationDate: "2022-03-18T15:48:06.249Z",
  orderId: "T1JEXzlRMk1HVTZPXzE4MzkxMDIzMjEyK0NMSUVOVEVTUkxAMzE3N18xMjMwOTE4MjczNitMVFNTUkxANDAzMF8wMDk2OTQ3MDg4NCs0OGE0OWIzYS1kODViLTQ3ZGQtYjM1Ny1mNmI3ZTIxZWJmYjRfMTY0NzYxODQ4NTUwMw==",
  tenantReceiver: "48a49b3a-d85b-47dd-b357-f6b7e21ebfb4",
  tenantSender: "CLIENTESRL@3177",
  tenantCarrier: "LTSSRL@4030",
  status: "PENDING"
}

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

export default function ChecksListCarrier(props) {
  const [ searchId, setSearchId ] = useState("id-prova-assegno");
  const { data = [], isFetching: isFetchingList } = useCheckByCarrierQuery(props)
  const { data: dataItem = {}, isFetching: isFetchingItem } = useGetCheckQuery(searchId);
  const [ createCheck, { isLoading: isCreating } ] = useAddCheckByCarrierMutation()
  const [ updateCheck, { isLoading: isUpdating } ] = useUpdateCheckByCarrierMutation()
  const [ removeCheck, { isLoading: isDeleting } ] = useRemoveCheckMutation()

  console.groupCollapsed("Lettura dati");
  console.log("Data checks: ", data);
  console.log("Data fetching list: ", isFetchingList);
  console.log("Data check item: ", dataItem);
  console.log("Data fetching item: ", isFetchingItem);
  console.log("Is creating check: ", isCreating);
  console.log("Is updating check: ", isUpdating);
  console.log("Is deleting check: ", isDeleting);
  console.groupEnd();

  if(isFetchingList) return <InlineSpinner />
  if(isCreating) return <InlineSpinner />

  return <div>
    <button className="btn btn-primary" onClick={() => createCheck({...CHECK_SAMPLE_CREATE, id: v4()})}>Crea assegno</button>    
    { dataItem && (
      <div className="border-2 p-2 m-2 bg-base-100">
        { isFetchingItem
          ? <InlineSpinner />
          : <>
            <p>Hai cercato:</p>
            <SmallTitle>id: {dataItem.id}</SmallTitle>
            <p>ammontare assegno: {dataItem.amount}</p>
          </>
        }
      </div>
    )}
    
    
    { data.ids.map(id => ( <div key={id} className="mt-5 p-2 border">
      <button onClick={() => setSearchId(id)}>{id}</button>
      <SmallTitle>Valore Assegno: {data.entities[id].amount}</SmallTitle>
      <LargeParagraph>Destinatario: {data.entities[id].tenantReceiver}</LargeParagraph>
      <LargeParagraph>creato {formatDistance(new Date(data.entities[id].createdAt), new Date())}</LargeParagraph>

      { !isUpdating && !isDeleting
        ? <button className="btn btn-primary mt-2" onClick={() => updateCheck({ ...CHECK_SAMPLE_UPDATE, id, amount: getRandomFloat(1.5, 100.5, 2)})}>Aggiorna assegno</button>
        : <InlineSpinner />
      }

      { !isDeleting && !isUpdating 
         ?  <button className="btn btn-primary mt-2" onClick={() => removeCheck(id)}>Elimina assegno</button>
         : <InlineSpinner />
      }
      </div>))}
  </div>
}