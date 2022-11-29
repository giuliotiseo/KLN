import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import CopyOnClipboard from "../../globals/components/buttons_v2/CopyOnClipboard";
import SafeCol from "../../globals/components/layout/SafeCol";

export default function DashboardSide() {
  const company = useSelector(selectCurrentCompany);
  return (
    <SafeCol id="DashboardSide">
      <div className="max-w-full relative my-4 mx-2">
        <h4 className="title-4">Info azienda</h4>
        <section>
          <div className="bg-base-100 rounded-lg shadow-lg mt-2 p-4">
            <div className="flex justify-between">
              <p className="text-base lg:text-xl">{company.name}</p>
              <p className="text-gray-400 dark:text-gray-500 tracking-wider">{company.vatNumber}</p>
            </div>

            <CopyOnClipboard
              inputData={company.companyCode}
              className="mt-1 text-base text-secondary-200 dark:text-secondary-300 px-0 opacity-80 hover:opacity-100"
            />
          </div>
        </section>

      </div>
    </SafeCol>
  )
}