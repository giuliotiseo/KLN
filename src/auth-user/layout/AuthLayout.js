import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import { ReactComponent as LogoImg } from '../../globals/assets/kln-logo.svg';
import { ReactComponent as CamionImg } from '../../globals/assets/camion-form.svg';
import SectionWrap from "../../globals/components/layout/SectionWrap";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-screen relative bg-light-300 dark:bg-dark-300">
      <div className="absolute bg-gradient-to-r from-secondary-100  to-secondary-300 -left-1/3 h-full w-full z-0" style={{ clipPath: 'polygon(0 0,28% 0,100% 100%,0 100%)' }} />
      <div className="absolute hidden md:flex items-center left-4 top-4">
        <LogoImg width={95} height={95} style={{ marginRight: 10 }} />
      <div>
        <h2 className="text-lg font-bold text-dark-300 dark:text-light-100">Key Logistic Network</h2>
        <p className="text-dark-300 dark:text-light-100">La chiave della logistica</p>
      </div>
    </div>
    <div className="flex h-full flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-full w-full gap-4 relative z-10">
        <div className="max-h-screen overflow-hidden hidden md:flex justify-center flex-col col-span-2 md:col-span-1 items-center">
          <CamionImg className="hidden md:block max-w-4xl h-auto" />
        </div>
        
        <SectionWrap className="bg-transparent h-full">
          <SafeArea className="flex">
            <SafeCol>
              <div className="bg-base-100 shadow-2xl max-w-[720px] ml-auto px-8 py-4 min-h-screen flex flex-col justify-center">
                <Outlet />
              </div>
            </SafeCol>
          </SafeArea>
        </SectionWrap>
      </div>
    </div>
  </div>
  )
}