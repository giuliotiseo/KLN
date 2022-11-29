import { Outlet, useLocation } from 'react-router-dom';
import SafeArea from '../../globals/components/layout/SafeArea';
import SectionTop from '../../globals/components/layout/SectionTop';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import PreOrderDropdownList from '../components/list/PreOrderDropdownList';
import { FiSend } from "react-icons/fi";

export default function PreOrdersLayout() {
  const { pathname } = useLocation();
  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={"Pre-ordini"}
        titleStyle="medium"
        icon={<FiSend className="mr-2 text-2xl" />}
        className="header"
        dropdown={null}
      >
        { !pathname.includes("new") && !pathname.includes("edit") && !pathname.includes("view") 
          ? <PreOrderDropdownList />
          : null
        }
      </SectionTop>
      
      <SafeArea className="flex flex-col lg:flex-row">
        <Outlet />
      </SafeArea>
    </SectionWrap>
  )
}