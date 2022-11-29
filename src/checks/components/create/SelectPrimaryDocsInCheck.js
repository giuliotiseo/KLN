import ControlledSelector from "../../../globals/components/dataEntry/ControlledSelector";

const SelectPrimaryDocsInCheck = ({ value, options, onSelect }) => {
  return (
    <ControlledSelector
      id="primary-docs-in-check-selector"
      label="Assegna il documento principale: "
      labelStyle="whitespace-normal"
      value={value}
      onChange={onSelect}
    >
      { options.map(option => (
        <option key={option.id} value={option.number}>N. {option.number} / {option.type}</option>
      ))}
    </ControlledSelector>
  )
}

export default SelectPrimaryDocsInCheck;