// Sub components -----------------------------------------------------------------------------------------------------------------------------
const CustomerSearchCopy = ({
  title,
  imgSrc,
  label,
  subTitle,
  children,
  className
}) => (
  <article className={`w-5/6 mx-auto border-b pb-8 ${className}`}>
    <h3 className="title-3 text-center mb-8">{ title }</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
      <div className="col-span-1">
        <img
          src={imgSrc}
          alt={title}
          className="max-h-[300px] ml-auto mr-2"
        />
      </div>
      <div className="col-span-1">
        <div className="max-w-[400px] mr-auto ml-2">
          <p className="uppercase mb-4 mt-4">{label}</p>
          <p className="text-2xl my-4">{subTitle}</p>
          <div className="text-base">{children}</div>
        </div>
      </div>
    </div>
  </article>
)

// Main component -----------------------------------------------------------------------------------------------------------------------------
const CustomerSearchContent = () => <>
  <CustomerSearchCopy
    title="Arricchisci la piattaforma"
    imgSrc="/images/mockup-1.png"
    label="Gestisci"
    subTitle="Lavora in sinergia con i tuoi clienti"
  >
    Grazie alla rubrica di Logistics Transport Services puoi connetterti al profilo dei tuoi clienti per comunicare con loro, monitorare le attività, inviare, gestire, ricevere ordini e tanto altro.
  </CustomerSearchCopy>

  <CustomerSearchCopy
    title="Arricchisci la piattaforma"
    imgSrc="/images/mockup-1.png"
    label="Gestisci"
    subTitle="Lavora in sinergia con i tuoi clienti"
    className="mt-8"
  >
    Grazie alla rubrica di Logistics Transport Services puoi connetterti al profilo dei tuoi clienti per comunicare con loro, monitorare le attività, inviare, gestire, ricevere ordini e tanto altro.
  </CustomerSearchCopy>
</> 

export default CustomerSearchContent;