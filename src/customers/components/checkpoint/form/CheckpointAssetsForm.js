import CheckboxGroup from "../../../../globals/components/dataEntry_v2/CheckboxGroup";
import { WAREHOUSE_TOOLS } from "../../../../globals/libs/constants";

// Helper function
const handleToggleAssetas = (value, selectedAssets, dispatch) => {
  const newList = selectedAssets.includes(value)
    ? selectedAssets.filter(sv => sv !== value)
    : selectedAssets.concat(value);

  dispatch({ type: "change_checkpoint", value: newList, name: "tools" });
}

// Main component
const CheckpointAssetsForm = ({ checkpoint, dispatch, className = "" }) => (
  <section className={className}>
    <h4 className="title-4">Asset richiesti al vettore</h4>
    <CheckboxGroup
      label="Scegli tra i mezzi operativi"
      optionsType="object"
      options={WAREHOUSE_TOOLS}
      values={checkpoint?.tools || []}
      onChange={(value) => handleToggleAssetas(value, checkpoint?.tools || [], dispatch)}
      styles="mt-1"
      optionStyle="text-lg"
    />
  </section>
)

export default CheckpointAssetsForm;