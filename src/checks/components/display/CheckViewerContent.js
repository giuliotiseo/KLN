import CardDetails from "../../../globals/components/dataDisplay/CardDetails"

const CONTENT_DESCRIPTIONS = {
  status: "Stato attuale",
  beneficiary: "Beneficiario",
  checkNum: "Numero assegno",
  amount: "Importo",
  iban: "IBAN",
}

export default ({ data = null }) => data && (
  <CardDetails
    header={<h3 className="title-3">Contenuto</h3>}
    footer={null}
    className={`mb-4`}
    clear={false}
  >
    <ul>
      { Object.keys(data).map((item) => (
        data[item] && (
          <li key={item} className="flex items-center justify-between py-2 my-1 first:mt-0 first:pt-0 border-b border-light-50 dark:border-dark-200 last:border-0 last:pb-0">
            <span>
              { CONTENT_DESCRIPTIONS[item]}
            </span>
            <span>
              { data[item] }
            </span>
          </li>
      )))}
    </ul>
  </CardDetails>
)