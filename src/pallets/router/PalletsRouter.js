import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentCompany } from "../../company/slices/companySlice";
// Components
import PalletsLayout from "../layout/PalletsLayout";
import PalletsSearchListPage from "../pages/PalletsSearchListPage";
import PalletsTypeListPage from "../pages/PalletsTypeListPage";
import PalletsTravelListPage from "../pages/PalletsTravelListPage";
import PalletCreatorPage from "../pages/PalletCreatorPage";
import ReversalCreatorPage from "../pages/ReversalCreatorPage";
import PalletViewerPage from "../pages/PalletViewerPage";
import PalletEditorPage from "../pages/PalletEditorPage";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import PalletsLatestListPage from "../pages/PalletsLatestListPage";
import PalletsReportListPage from "../pages/PalletsReportListPage";

export default function PalletsRouter() {
  const [ queryFrom, setQueryFrom ] = useState(null);
  const myCompany = useSelector(selectCurrentCompany);
  const companyType = myCompany.type;
  const companyId = myCompany.id;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(pathname === "/pallets") {
      navigate(`/pallets/latest`);
    }
  }, [companyType]);

  useEffect(() => {
    if(companyType) {
      if(companyType === "TRANSPORT") {
        setQueryFrom("carrier");
      } else {
        setQueryFrom("customer");
      }
    }
  }, [companyType]);

  // Escape
  if(!companyType || !queryFrom) return <PageSpinner message="Ricerca info aziendali" />;

  return (
    <Routes>
      <Route element={<PalletsLayout />}>        
        {/* List pages (latest, company, type, travel) */}
        {/* /pallets/latest */}
        <Route index path='latest/*' element={<PalletsLatestListPage queryFrom={queryFrom} companyType={companyType} companyId={companyId} />} />
        <Route index path='report/*' element={<PalletsReportListPage queryFrom={queryFrom} companyType={companyType} companyId={companyId} />} />
        {/* /pallets/search?from=carrier */}
        <Route path='search/*' element={<PalletsSearchListPage queryFrom={queryFrom} companyType={companyType} companyId={companyId} />} /> 
        {/* /pallets/type?from=carrier */}
        <Route path='type/*' element={<PalletsTypeListPage queryFrom={queryFrom} companyType={companyType} companyId={companyId} />} />
        {/* /pallets/travel?from=carrier */}
        <Route path='travel/*' element={<PalletsTravelListPage queryFrom={queryFrom} companyType={companyType} companyId={companyId} />} /> 
        {/* Create page */}
        <Route path='create/*' element={<PalletCreatorPage myCompany={myCompany} companyId={companyId} />} />
        <Route path='create_reversal/*' element={<ReversalCreatorPage myCompany={myCompany} queryFrom={queryFrom} companyId={companyId} />} />
        {/* Details page */}
        <Route path='details/*' element={<PalletViewerPage queryFrom={queryFrom} companyId={companyId} />} />
        {/* Edit page */}
        <Route path='edit/*' element={<PalletEditorPage queryFrom={queryFrom} companyId={companyId} />} />
      </Route>
    </Routes>
  )
}