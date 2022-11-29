import { useState } from "react";
import { SmallParagraph } from "../typography/paragraphs";
import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function WarningMessage({ text, className }) {
  const [ show, setShow ] = useState(true);
  if(!show) return null;

  return (
    <div className={`relative alert-warn px-2 ${className}`}>
      <SmallParagraph styles="flex">
        <FiAlertTriangle className="mr-2 mt-1" />
        { text }
      </SmallParagraph>
      
      <button
        className="absolute right-2 top-2 opacity-50 hover:opacity-100"
        onClick={() => setShow(false)}
      >
        <FiX />
      </button>
    </div>
  )
}