import SafeArea from "../../globals/components/layout/SafeArea";
import SectionTop from "../../globals/components/layout/SectionTop";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import DashboardSide from "../components/DashboardSide";
import MainDashboard from "../components/MainDashboard";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default function DashboardContainer() {
  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">      
      <SectionTop
        title={"Dashboard aziendale"}
        titleStyle="medium"
        icon={<MdOutlineSpaceDashboard className="mr-2 text-2xl" />}
        className="border-t border-b border-light-50 dark:border-dark-300"
        dropdown={null}
      />
      
      <SafeArea className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="relative mr-2 rounded-lg lg:flex-1 xl:flex-1 h-full">
          <DashboardSide />
        </aside>

        {/* Content */}
        <section className="relative lg:flex-2 xl:flex-3 h-full">
          <MainDashboard />
        </section>
      </SafeArea>
    </SectionWrap>
  )
}