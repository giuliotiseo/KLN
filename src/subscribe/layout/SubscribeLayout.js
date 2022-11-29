// import { useEffect } from 'react'
import { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import SafeCol from '../../globals/components/layout/SafeCol'
import SubscribeHeader from '../components/SubscribeHeader'
import SubscribeNav from '../components/SubscribeNav'
import { useSubscribeCompany } from '../hooks'

function SubscribeLayout() {
  const mapScrollbarRef = useRef();
  const { subscribe, loading, companyErrors, warehousesErrors } = useSubscribeCompany();

  // useEffect(() => {
  //   if(mapScrollbarRef?.current?.contentEl) {
  //     mapScrollbarRef.current.contentEl.className = "simplebar-content h-full";
  //   }
  // }, [mapScrollbarRef?.current?.contentEl]);

  return (
    <div className='p-4 flex flex-col h-screen'>
      <SubscribeHeader />
      <div className='pb-20 lg:pb-0 relative flex-1 container mx-auto'>
        <SafeCol ref={mapScrollbarRef}>
          <Outlet
            companyErrors={companyErrors}
            warehousesErrors={warehousesErrors}
            loading={loading}
          />
        </SafeCol>
        {/* <div className='absolute bottom-0 h-[50px] w-full bg-gradient-to-t from-white'></div> */}
      </div>

      <SubscribeNav
        subscribe={subscribe}
        loading={loading}
      />
    </div>
  )
}

export default SubscribeLayout
