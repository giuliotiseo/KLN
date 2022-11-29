import InputDate from "../../../globals/components/dataEntry/InputDate";

export default ({
  label,
  placeholder,
  value,
  callback,
  className
}) => (
  <InputDate
    id="departureDate"
    label={label}
    selected={value}
    placeholder={placeholder}
    callback={callback}
    className={className}
    maxDate={null}
    showTimeInput={true}
    timeInputLabel="Orario: "
    dateFormat="Pp"
    nowButton={false}
    isError={false}
    position="top-start"
    // withPortal={true}
  />
)