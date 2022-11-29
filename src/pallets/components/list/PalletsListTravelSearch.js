import { useEffect, useState } from "react"
import ActionButton from "../../../globals/components/buttons/ActionButton";
import { FiSearch } from "react-icons/fi";

// Functions ---------------------------------------------------------------------------------------------------
const runSearch = (stamp, callback) => {
  callback(`TRV-${stamp.toUpperCase()}`);
}

// Main component ---------------------------------------------------------------------------------------------------
export default function PalletsListTravelSearch({
  value,
  onChange,
}) {
  const [ stamp, setStamp ] = useState("");
  
  // Reset on unmount
  useEffect(() => {
    return () => {
      setStamp("");
      onChange(null)
    };
  }, []);

  return (
    <div className="flex items-center ml-2">
      <input type="text"
        className="input text-sm"
        value={stamp}
        onChange={({ target: { value }}) => setStamp(value)}
        onBlur={() => runSearch(stamp, onChange)}
        onKeyPress={(e) => e.key === 'Enter' &&  runSearch(stamp, onChange)}
        placeholder="ID viaggio"
      />

      <ActionButton
        styles="btn-primary ml-1 h-[35px] w-[35px] p-0 justify-center"
        icon={() => <FiSearch className="text-lg" />}
        onClick={() => runSearch(stamp, onChange)}
        loading={false}
      />
    </div>
  )
}