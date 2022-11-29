import { Outlet, useLocation } from 'react-router-dom';
import SafeArea from '../../globals/components/layout/SafeArea';
import SectionTop from '../../globals/components/layout/SectionTop';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import { FiGitPullRequest } from "react-icons/fi";
import PalletDropdownList from '../components/list/PalletDropdownList';

export default function PalletsLayout() {
  const { pathname } = useLocation();
  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={"Gestione pallet"}
        titleStyle="medium"
        icon={<FiGitPullRequest className="mr-2 text-2xl" />}
        className="header"
        dropdown={null}
      >
        { !pathname.includes("create") && !pathname.includes("edit") && !pathname.includes("details") 
          ? <PalletDropdownList />
          : null
        }
      </SectionTop>
      
      <SafeArea className="flex flex-col lg:flex-row">
        <Outlet />
      </SafeArea>
    </SectionWrap>
  )
}