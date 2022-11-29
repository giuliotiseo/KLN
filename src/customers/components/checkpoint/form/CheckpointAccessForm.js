import RangeSlider from "../../../../globals/components/dataEntry_v2/RangeSlider";

// Main component
const CheckpointAccessForm = ({
  checkpoint,
  dispatch,
  className = ""
}) => {
  return (
    <section className={className}>      
      <h4 className="title-4">Proprietà di accesso al punto di interesse</h4>
      <RangeSlider
        label="Massimale metraggio transito mezzi"
        min={1}
        max={20}
        step={0.50}
        value={checkpoint?.maxLength ? parseFloat(checkpoint?.maxLength) : 1}
        onChange={value => dispatch({ type: "change_checkpoint", name: "maxLength", value: value })}
        className="mt-4"
        descriptor={checkpoint?.maxLength ? `${parseFloat(checkpoint.maxLength).toFixed(1)}m` : `${parseFloat(1).toFixed(1)}m`}
      />
    </section>
  )
}

export default CheckpointAccessForm;