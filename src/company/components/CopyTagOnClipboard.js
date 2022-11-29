import ReactTooltip from "react-tooltip";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectTenant } from "../slices/companyInfoSlice";

export default function CopyTagOnClipboard({ inputTag, styles }) {
  const [ dataTipMessage, setDataTipMessage ] = useState('Copia negli appunti');
  const tag = useSelector(selectTenant);
  const usedTag = inputTag || tag

  return (
    <div className={`inline-block alert-white items-center ${styles}`}>
      <button
        data-for="copyClipboard"
        data-tip=""
        data-type={dataTipMessage === 'ID Copiato!' ? 'success' : 'dark'}
        onMouseEnter={() => setDataTipMessage('Copia negli appunti')}
        onClick={() => {
          navigator.clipboard.writeText(usedTag);
          setDataTipMessage('ID Copiato!');
        }}
      >
        <span className="px-2 flex items-center">
          <span className="font-bold mr-2">{usedTag}</span>
          <FiCopy />
        </span>
      </button>
      <ReactTooltip
        id="copyClipboard"
        getContent={() => dataTipMessage}
      />
    </div>
  )
} 
