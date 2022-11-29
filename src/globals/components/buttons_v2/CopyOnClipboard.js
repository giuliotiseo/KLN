import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { FiCopy } from "react-icons/fi";

export default function CopyOnClipboard({
  inputData,
  tipMessage = "Copia negli appunti",
  tipSuccess = "Copiato negli appunti",
  className = "",
  hideInternalDataTip = false
}) {
  const [ dataTipMessage, setDataTipMessage ] = useState(tipMessage);
  return (
    <div className={`inline-block items-center ${className}`}>
      <button
        data-for="copyClipboard"
        data-tip=""
        data-type={dataTipMessage === tipSuccess ? 'success' : 'dark'}
        onMouseEnter={() => setDataTipMessage('Copia negli appunti')}
        onClick={() => {
          navigator.clipboard.writeText(inputData);
          setDataTipMessage(tipSuccess);
        }}
      >
        <span className="flex items-center">
          <FiCopy />
          <span className="font-bold ml-2">{inputData}</span>
        </span>
      </button>

      { !hideInternalDataTip && <ReactTooltip
        id="copyClipboard"
        getContent={() => dataTipMessage}
      /> }
    </div>
  )
} 
