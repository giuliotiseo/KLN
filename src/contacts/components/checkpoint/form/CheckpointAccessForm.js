// import CheckboxGroup from "../../../../globals/components/dataEntry/CheckboxGroup";
import RangeSlider from "../../../../globals/components/dataEntry/RangeSlider";
// import { SmallTitle } from "../../../../globals/components/typography/titles";
// import { COMPLEX_VEHICLE_TYPE_DESCRIPTION } from "../../../../vehicles/libs/helpers";

export default ({ checkpoint, dispatch, styles = "" }) => (
  <section className={styles}>      
    <SmallTitle>Proprietà di accesso al punto di interesse</SmallTitle>

    {/* <CheckboxGroup
      label="Scegli mezzi consentiti"
      optionsType="object"
      options={COMPLEX_VEHICLE_TYPE_DESCRIPTION}
      values={checkpoint?.enabledVehicles || []}
      onChange={(vals) => dispatch({ type: "change_checkpoint", name: "enabledVehicles", value: vals })}
      optionStyle="text-lg mr-2 mb-2"
      capitalizeText={true}
      checkboxContainerStyles="flex flex-wrap"
    /> */}

    <RangeSlider
      label="Massimale metraggio transito mezzi"
      min={1}
      max={20}
      step={0.50}
      value={checkpoint?.maxLength ? parseFloat(checkpoint?.maxLength) : 1}
      onChange={value => dispatch({ type: "change_checkpoint", name: "maxLength", value: value })}
      styles="mt-4"
      descriptor={checkpoint?.maxLength ? `${parseFloat(checkpoint.maxLength).toFixed(1)}m` : `${parseFloat(1).toFixed(1)}m`}
    />
  </section>
)