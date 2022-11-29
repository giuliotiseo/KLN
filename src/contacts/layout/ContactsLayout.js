import { Outlet } from 'react-router-dom';
import SafeArea from '../../globals/components/layout/SafeArea';
import SectionTop from '../../globals/components/layout/SectionTop';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import { FiUsers } from "react-icons/fi";

export default function ContactsLayout() {
  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={"Rubrica del personale"}
        titleStyle="medium"
        icon={<FiUsers className="mr-2 text-2xl" />}
        className="header"
        dropdown={null}
      />
      
      <SafeArea className="flex flex-col lg:flex-row">
        <Outlet />
      </SafeArea>
    </SectionWrap>
  )
}