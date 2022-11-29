import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import FullSpinner from "../../../globals/components/spinners/FullSpinner";
import CheckDocsRefViewer from "./CheckDocsRefViewer";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { LargeTitle, SmallTitle } from "../../../globals/components/typography/titles";
import { formatDate, priceFormatter } from "../../../globals/libs/helpers";

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckOrderCardDetailsHeader = ({ stamp }) => <h4 className="title-3">
  Ordine {stamp.split("-")[1]}
</h4>

const CheckOrderCardDetailsFooter = ({ createdAt }) => <SmallParagraph styles="opacity-50">
  Data di invio ordine: {formatDate(new Date(createdAt))}
</SmallParagraph>

// Main component -------------------------------------------------------------------------------------------------------------------
const CheckOrderRefViewer = ({
  order,
  showAttachments,
  queryFrom,
}) => {
  if(!queryFrom) return <FullSpinner />;

  // If order is selected, show details with docs selector
  return (
    <section>
      <header>
        <h3 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
          Riferimenti ordine
        </h3>
      </header>

      {/* Order details */}
      <CardDetails
        header={<CheckOrderCardDetailsHeader stamp={order.stamp} />}
        footer={<CheckOrderCardDetailsFooter createdAt={order.createdAt} />}
        className={`mb-4`}
        clear={false}
      >
        <Paragraph>Consegna assegno a: <span className="text-secondary-200 dark:text-secondary-300 font-bold">{order.senderName}</span></Paragraph>
        <Paragraph>Assegno emesso da: <span className="text-secondary-200 dark:text-secondary-300 font-bold">{order.receiverName}</span></Paragraph>
        <Paragraph>Gestione assegno di: <span className="text-secondary-200 dark:text-secondary-300 font-bold">{order.carrierName}</span></Paragraph>

        { order?.checksAmount && (
          <div className="mt-4">
            <Paragraph>
              Totale importo assegno:
            </Paragraph>
            <LargeTitle styles="text-primary-200 dark:text-primary-300">
              {priceFormatter(order.checksAmount)}
            </LargeTitle>
          </div>
        )}
      </CardDetails>

      {/* Docs Viewer */}
      <CheckDocsRefViewer
        order={order}
        showAttachments={showAttachments}
      />
    </section>
  )
}

export default CheckOrderRefViewer;