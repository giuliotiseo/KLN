import React from 'react'

const CheckpointThirdCompany = ({
  checkpoint,
  className = ""
}) => {
  return (
    <section className={className}>
      <h4 className="mb-2 title-4">Gestito da terze parti</h4>
      <p>Rif. <span className="font-bold text-wide text-secondary-200 dark:text-secondary-300">{checkpoint?.thirdCompany?.name || checkpoint.thirdCompanyName}</span></p>
    </section>
  )
}

export default CheckpointThirdCompany
