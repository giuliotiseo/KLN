// Components
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import SectionTop from "../../globals/components/layout/SectionTop";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import WarehouseDetail from "../components/WarehouseDetail";
import { Navigate } from "react-router-dom";
// Hooks
import { useDataFinder, useQueryStringId } from "../../globals/libs/hooks";
// Slices
import { selectWarehouseFromAllLists } from "../slices/warehousesListSlice";
// Icons
import { FiEdit, FiMapPin } from "react-icons/fi";
// Api
import { fetchWarehouse } from "../api/fetch";
import FullSpinner from "../../globals/components/spinners/FullSpinner";

export default function DetailWarehouseContainer() {
  const [ warehouse, getWarehouseStatus ] = useDataFinder({
    queryStringKey: "id", 
    selector: selectWarehouseFromAllLists, 
    primaryKey: "id",
    query: fetchWarehouse,
  }) 

  const warehouseId = useQueryStringId();
  const cta_link = warehouseId && {
    text: `Modifica`,
    icon: () => <FiEdit />,
    to: `/warehouses/edit?id=${warehouseId}`
  }

  if(getWarehouseStatus === 'loading') return <FullSpinner />
  if(getWarehouseStatus === 'success' && !warehouse) return <Navigate to="/warehouses" replace />

  return (
    <SectionWrap>      
      <SectionTop
        title={`${warehouse.name}`}
        icon={() => <FiMapPin className="w-8 h-auto mr-4"/>}
        backPath="/warehouses"
        link={cta_link}
      />

      <SafeArea className="grid grid-cols-2 grid-rows-3">
        <div className="col-span-2 row-span-1 md:row-span-3 md:col-span-1">
          <div className="relative w-full h-full">
            <SimpleMap
              lat={warehouse.location?.coordinate[0]}
              lng={warehouse.location?.coordinate[1]}
            />
          </div>
        </div>
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="warehouse-detail" className="py-4">
            <WarehouseDetail warehouse={warehouse} />
          </SafeCol>
        </div>
      </SafeArea>
    </SectionWrap>
  )
}