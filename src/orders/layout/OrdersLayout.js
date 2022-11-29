import { Outlet, useLocation } from 'react-router-dom';
import SafeArea from '../../globals/components/layout/SafeArea';
import SectionTop from '../../globals/components/layout/SectionTop';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import OrderDropdownList from '../components/list/OrderDropdownList';
import { FiPackage } from "react-icons/fi";

export default function OrdersLayout() {
  const { pathname } = useLocation();
  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={"Ordini"}
        titleStyle="medium"
        icon={<FiPackage className="mr-2 text-2xl" />}
        className="header"
        dropdown={null}
      >
        { !pathname.includes("new") && !pathname.includes("edit") && !pathname.includes("view") 
          ? <OrderDropdownList />
          : null
        }
      </SectionTop>
      
      <SafeArea className="flex flex-col lg:flex-row">
        <Outlet />
      </SafeArea>
    </SectionWrap>
  )
}