import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import { LargeParagraph } from "../../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../../globals/components/typography/titles";

export default function VehicleData({ licensePlate, vehicleName }) {
  const ids = licensePlate.split("+");
  const vehicles = vehicleName.split(';');

  return (
    <CardDetails
      className="bg-base-100 my-4 rounded-md"
      header={<TinyTitle styles="py-2">Mezzo di trasporto</TinyTitle>}
    >
      <div className="grid grid-cols-3 gap-4">
        <section className="col-span-3 md:col-span-1">
          <TinyTitle styles="uppercase">Targhe</TinyTitle>
          <div className="border-l border-light-50 dark:border-dark-100">
            { ids.map((id, index) => (
              <LargeParagraph key={id} styles="ml-4 mt-2">{id}</LargeParagraph>
            ))}
          </div>
        </section>

        <section className="mt-4 col-span-3 md:col-span-2 md:mt-0">
          <TinyTitle styles="uppercase">Mezzi di trasporto</TinyTitle>
          <div className="border-l border-light-50 dark:border-dark-100">
            { vehicles.map((vehicle, index) => (
              <LargeParagraph key={index} styles="ml-4 mt-2">
                {vehicle}
              </LargeParagraph>
            ))}
          </div>
        </section>
      </div>
    </CardDetails>
  )
}