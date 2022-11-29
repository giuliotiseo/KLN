import { FiMapPin } from "react-icons/fi";
import MultipleMarkersMap from "../../../globals/components/layout/MultipleMarkersMap";
import SafeArea from "../../../globals/components/layout/SafeArea";
import SafeCol from "../../../globals/components/layout/SafeCol";
import { formatLocationCoords } from "../../../globals/libs/helpers";
import CustomerCheckpointCompiler from "../checkpoint/CustomerCheckpointCompiler";
import CustomerWarehouseItem from "../checkpoint/summary/CustomerWarehouseItem";
import CustomerCreatorEmailField from "./CustomerCreatorEmailField";
import CustomerCreatorPhoneField from "./CustomerCreatorPhoneField";

export default function CustomerDetailsFields({
  customer,
  updateForm,
  warehouses
}) {
  const { emails, phones } = customer;
  let locations_coordinates = customer.customCheckpoints.map(data => formatLocationCoords(data.location.coordinate));
  if(warehouses?.length > 0) {
    for(let warehouse of warehouses) {
      locations_coordinates.push(formatLocationCoords(warehouse.location.coordinate))
    }
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-2 h-full">
      <div className="col-span-1 md:col-span-3 lg:col-span-2 py-4">
        <SafeArea>
          <SafeCol>
            <div className="mb-2 mr-4">
              <CustomerCreatorEmailField
                emails={emails}
                addField={() => updateForm({ type:"custom", name: "add-email", value: customer })}
                onChange={(value) => updateForm({ type: "custom", name: "change-email", value })} // value: { index, val, target }
                remove={(index) => updateForm({ type: "custom", name: "remove-email", value: index })}
              />

              <CustomerCreatorPhoneField
                phones={phones}
                addField={() => updateForm({ type:"custom", name: "add-phone", value: customer })}
                onChange={(value) => updateForm({ type: "custom", name: "change-phone", value })} // value: { index, val, target }
                remove={(index) => updateForm({ type: "custom", name: "remove-phone", value: index })}
              />
            </div>

            <div className="mt-4 mr-4">
              { warehouses?.length > 0 
                ? <section className="flex flex-col gap-2">
                    { warehouses?.length > 0 
                      ? warehouses?.map(wh => ( 
                        <CustomerWarehouseItem
                          key={wh.id}
                          warehouse={wh}
                        />
                      ))
                      : null
                    }
                  </section>
                : null
              }

              <CustomerCheckpointCompiler
                checkpoints={customer.customCheckpoints}
                updateForm={updateForm}
                editEnabled={true}
                hideTitle={false}
                hideMap={true}
              />
            </div>
          </SafeCol>
        </SafeArea>
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-2 py-4">
        <MultipleMarkersMap
          coordinate={locations_coordinates}
          onClick={value => console.log("Value", value)}
        />
      </div>
    </div>
  )
}