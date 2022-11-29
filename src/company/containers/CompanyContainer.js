import { useSelector } from "react-redux";
// Components
import SectionTop from "../../globals/components/layout/SectionTop";
import CopyTagOnClipboard from "../components/CopyTagOnClipboard";
import CompanyInfoCard from "../components/CompanyInfoCard";
// Selectors
import { selectEmployersLogs } from "../slices/employersListSlice";
import { selectCompanyInfo } from "../slices/companyInfoSlice";
// Icons
import { FiBriefcase } from "react-icons/fi";
import EmployersListContainer from "./EmployersListContainer";
import LogsDispayList from "../../globals/components/layout/LogsDispayList";
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import { selectWarehousesLogs } from "../../warehouses/slices/allWarehousesSlice";
import { selectVehiclesLogs } from "../../vehicles/slices/allVehiclesSlice";

// Main component
function CompanyContainer () {
  const company = useSelector(selectCompanyInfo);
  const { log } = company;
  const contactsLogs = useSelector(selectEmployersLogs);
  const warehusesLogs = useSelector(selectWarehousesLogs);
  const vehiclesLogs = useSelector(selectVehiclesLogs);

  const main_logs = log ? log : [];
  const c_logs = contactsLogs.length > 0 ? contactsLogs : [];
  const w_logs = warehusesLogs.length > 0 ? warehusesLogs : [];
  const v_logs = vehiclesLogs.length > 0 ? vehiclesLogs : [];

  return (
    <div className="relative flex flex-col flex-1 my-2 mx-4 rounded-md">
      <SectionTop
        title={`Gestisci ${company.name}`}
        icon={() => <FiBriefcase className="w-8 h-auto mr-4"/>}
        stylesLink="hidden md:flex"
        customHeaderRight={() => <CopyTagOnClipboard  />}
      />
      <div className="grid grid-cols-6 gap-4 h-full">
        <section className="flex flex-col col-span-6 lg:col-span-3 xl:col-span-2">
          <CompanyInfoCard company={company} />

          <SafeArea className="mt-4 ml-2 lg:ml-0 rounded-md overflow-hidden">
            <div style={{ height: '100%', minHeight: 300 }}>
              <SafeCol>
                <LogsDispayList
                  JSONLogs={
                    []
                      .concat(...main_logs)
                      .concat(...c_logs)
                      .concat(...w_logs)
                      .concat(...v_logs)
                    }
                  title="Attività recenti"
                />
              </SafeCol>
            </div>
          </SafeArea>
        </section>

        <section style={{ minHeight: 500 }} className="col-span-6 lg:col-span-3 xl:col-span-4 rounded-md overflow-hidden">
          <EmployersListContainer />
        </section>
      </div>
    </div>
  )
}

export default CompanyContainer;