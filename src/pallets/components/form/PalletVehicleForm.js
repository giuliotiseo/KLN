import InputText from "../../../globals/components/dataEntry/InputText";
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
import { FiCheck } from "react-icons/fi";

export default function PalletVehicleForm({
  licensePlate,
  vehicleName,
  changePalletLicensePlate,
  changePalletVehicleName,
}) {
  if(!licensePlate || !vehicleName) {
    return (
      <section id="pallet-vehicle-form" className="mt-4">
        <SmallTitle styles="mb-2">Info mezzo di trasporto</SmallTitle>
        <div className="bg-base-100 p-4 rounded-md text-gray-500 italic">
          Info trasporto non disponibili per la modifica
        </div>
      </section>
    )
  }

  return (
    <section id="pallet-vehicle-form" className="mt-4">
      <SmallTitle styles="mb-2">Info mezzo di trasporto</SmallTitle>
      <div className="bg-base-100 p-4 rounded-md">
        <TinyTitle styles="mb-2">Targhe</TinyTitle>
        { licensePlate.split("+").map((lp, index) => (
            <InputText
              key={lp}
              id={index}
              label={`Targa mezzo ${index + 1}`}
              selected={lp}
              callback={(value) => changePalletLicensePlate({...value, licensePlate })}
              className="mb-2"
              iconButton={() => <FiCheck />}
              contentClassName="flex-1"
              labelClassName="mr-2 w-auto"
              forceUpperCase={true}
              onBlurCallback={false}
            />
          ))
        }

        <TinyTitle styles="mt-4 mb-2">Modelli</TinyTitle>
        { vehicleName.split(";").map((vn, index) => (
            <InputText
              key={vn}
              id={index}
              label={`Nome mezzo ${index + 1}`}
              selected={vn}
              callback={(value) => changePalletVehicleName({...value, vehicleName })}
              className="mb-2"
              iconButton={() => <FiCheck />}
              contentClassName="flex-1"
              labelClassName="mr-2 w-auto"
              forceUpperCase={true}
              onBlurCallback={false}
            />
          ))
        }


      </div>

    {/* <section className="mt-4">
      <SmallTitle styles="mb-2">Info mezzo di trasporto</SmallTitle>
      <div className="bg-base-100 p-4 rounded-md">
        <LargeParagraph>{ vehicle.licensePlate }</LargeParagraph>
        <SmallParagraph styles="text-gray-400 dark:text-gray-500">{vehicle.vehicleName}</SmallParagraph>
      </div>
    </section> */}

    </section>
  )
}