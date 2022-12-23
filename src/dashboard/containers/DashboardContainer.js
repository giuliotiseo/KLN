import SafeArea from "../../globals/components/layout/SafeArea";
import SectionTop from "../../globals/components/layout/SectionTop";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import DashboardSide from "../components/DashboardSide";
import MainDashboard from "../components/MainDashboard";
import { MdOutlineSpaceDashboard } from "react-icons/md";
// import { useState } from "react";
// import { Storage } from "aws-amplify";

export default function DashboardContainer() {
  // const [ signedUrl, setSignedUrl ] = useState();

  // const openTestImage = () => {
  //   // Get file from S3 Storage
  //   Storage.get('PROVA.jpg').then(url => {
  //     setSignedUrl(url);
  //   }).catch(e => {
  //     console.error('Error during Storege.get hook', e);
  //   });
  // }

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
          {/* { signedUrl && (
            <img src={signedUrl} alt="test" />
          )} */}
        </section>

        {/* <button onClick={openTestImage}>Apri prova</button> */}
      </SafeArea>
    </SectionWrap>
  )
}