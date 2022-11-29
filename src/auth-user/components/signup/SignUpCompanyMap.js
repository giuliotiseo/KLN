import React from 'react'
import SimpleMap from '../../../globals/components/layout/SimpleMap'

function SignUpCompanyMap({
  lat,
  lng,
  onClick,
  className = "mt-2"
}) {
  return (
    <>
      <div className={`h-[200px] mt-2 drounded-md overflow-hidden rounded-md ${className}`}>
        <SimpleMap
          lat={lat}
          lng={lng}
          onClick={onClick}
        />
      </div>
      <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">Fai click sulla mappa per specificare un punto manualmente</p>
    </>
  )
}

export default SignUpCompanyMap
