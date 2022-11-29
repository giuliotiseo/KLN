import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { formatDate, removeDuplicates } from "../../../globals/libs/helpers";
import { FiHelpCircle } from "react-icons/fi";

export default function PalletCompaniesTrialBalance({
  customers,
  setDrawer,
}) {
  if(!customers || (customers.length === 1 && customers.includes("NO_COMPANY"))) return null;

  return (
    <CardDetails
      className="bg-base-100 my-4 rounded-md"
      header={<TinyTitle styles="py-2">Situazione contabile</TinyTitle>}
      footer={<p className="text-sm text-gray-500">Aggiornata al {formatDate(new Date(), "Pp")}</p>}
    >
      { customers?.length > 0
        ? <ul>
          { removeDuplicates(customers).map((customer, index) => {
            return (
              <li key={customer + index} className="border-b border-light-100 dark:border-dark-200 last:border-none">
                <button
                  className={`flex items-center justify-between text-secondary-100 opacity-80 hover:opacity-100 py-3 w-full`}
                  onClick={() => setDrawer(customer)}
                >
                  <span className="flex flex-1 items-center">
                    <FiHelpCircle className="mr-1" />
                    {customer?.name}
                  </span>
                  <span>
                    Vedi
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        : <p className="italic">Errore: non è stato possibile leggere le informazioni delle aziende coinvolte nella movimentazione</p>
      }
    </CardDetails>
  )
} 