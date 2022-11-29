import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import SafeArea from '../../globals/components/layout/SafeArea';
import SectionTop from '../../globals/components/layout/SectionTop';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import WarehouseOwnerPropertyToggler from '../components/form/WarehouseOwnerPropertyToggler';
import { FiMapPin } from "react-icons/fi";
import { changeWarehouseCreatorIsLinked } from '../slices/warehouseCreatorSlice';

export default function WarehousesLayout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={"Magazzini o despositi gestiti"}
        titleStyle="medium"
        icon={<FiMapPin className="mr-2 text-2xl" />}
        className="header"
        dropdown={null}
      >
        { pathname.includes("new") 
          ? <WarehouseOwnerPropertyToggler callback={(value) => dispatch(changeWarehouseCreatorIsLinked(value))} />
          : null
        }
      </SectionTop>
      
      <SafeArea className="flex flex-col lg:flex-row">
        <Outlet />
      </SafeArea>
    </SectionWrap>
  )
}