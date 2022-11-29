import { useState } from "react";
import { Link } from "react-router-dom";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs"
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles"
import PalletOrderSummary from "../../../pallets/components/form/PalletOrderSummary";
import { TRAVEL_TYPE_DESCRIPTION } from "../../libs/helpers";

export default function OrdersData ({ orders, travelType }) {
  const [ search, setSearch ] = useState("");

  if(!orders?.items) return <SmallParagraph styles="my-4">Non sono stati trovati ordini in questo viaggio</SmallParagraph>

  const aggregateOrders = orders.items.reduce((acc, val) => {
    return ({
      ...acc,
      [val.orderId]: val.order
    })
  }, {});

  const aggregateOrdersList = Object.keys(aggregateOrders).map(agOr => ({
    ...aggregateOrders[agOr],
    searchable: [
      aggregateOrders[agOr].carrierName,
      aggregateOrders[agOr].senderName,
      aggregateOrders[agOr].receiverName,
      aggregateOrders[agOr].name
    ].join(" - ").toUpperCase()
  }));

  return (
    <section className="mt-8">
      <SmallTitle styles="flex justify-between">
        <span>Ordini trasportati</span>
        <span>N. {aggregateOrdersList.length}</span>
      </SmallTitle>
      <Paragraph styles="mb-4">Tipo viaggio: {TRAVEL_TYPE_DESCRIPTION[travelType]}</Paragraph>

      <div className="bg-base-100 sticky top-0 p-4 mb-2 rounded-b-md shadow-md">
        <label htmlFor="search-order" className="label">Filtra ordini trasporati</label>
        <input type="text"
          id="search-order"
          value={search}
          onChange={({ target: { value }}) => setSearch(value)}
          placeholder="Cliente o codice ordine"
          className="input w-full mb-4"
        />
      </div>

      { aggregateOrdersList
        .filter(data => data.searchable.includes(search.toUpperCase()))
        .map(orderData => (
        <div key={orderData.id} className="mb-2 bg-base-100 p-2 rounded-md">
          <TinyTitle>
            <Link to={`/orders/view?id=${orderData.id}`} className="inline-block mb-2 text-primary-200 dark:text-primary-300 hover:text-primary-100 hover:dark:text-primary-200">
              {orderData.name}
            </Link>
          </TinyTitle>
          <PalletOrderSummary order={orderData} />
        </div>
      ))}
    </section>
  )
}