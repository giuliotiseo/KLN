import { Outlet, useLocation } from 'react-router-dom';
import SafeArea from '../../globals/components/layout/SafeArea';
import SectionTop from '../../globals/components/layout/SectionTop';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import CheckDropdownList from '../components/list/CheckDropdownList';
import { FiLayers } from "react-icons/fi";

export default function ChecksLayout() {
  const { pathname } = useLocation();
  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={"Assegni"}
        titleStyle="medium"
        icon={<FiLayers className="mr-2 text-2xl" />}
        className="header"
        dropdown={null}
      >
        { !pathname.includes("new") && !pathname.includes("edit") && !pathname.includes("view") 
          ? <CheckDropdownList />
          : null
        }
      </SectionTop>
      
      <SafeArea className="flex flex-col lg:flex-row">
        <Outlet />
      </SafeArea>
    </SectionWrap>
  )
}