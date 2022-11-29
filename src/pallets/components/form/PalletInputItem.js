
import { useState } from "react";
import CompanyFinder from "../../../globals/components/dataEntry/CompanyFinder";
import FormBoundNumber from "../../../globals/components/dataEntry/FormBoundNumber";
import TextEditor from "../../../globals/components/dataEntry/TextEditor";
import { LargeParagraph } from "../../../globals/components/typography/paragraphs";
import { globalStatusColorsBorder, globalStatusColorsText } from "../../../globals/libs/helpers";
import {
  ImArrowDown2,
  ImArrowUp2,
} from "react-icons/im";
import { FaEquals } from "react-icons/fa";

const PalletBadge = ({ value }) => {
  if(value > 0) {
    return <p className={`inline-flex items-center px-1 py-0.5 ml-2 text-sm border-2 mr-1 rounded-md ${globalStatusColorsText.DEBT} ${globalStatusColorsBorder.DEBT}`}>
      <span className="font-bold mr-1"> -{Math.abs(value)}</span>
      <span><ImArrowDown2 /></span>
    </p>
  }

  if(value < 0) {
    return  <p className={`inline-flex items-center px-1 py-0.5 ml-2 text-sm border-2 mr-1 rounded-md ${globalStatusColorsText.CREDIT} ${globalStatusColorsBorder.CREDIT}`}>
      <span className="font-bold mr-1"> +{Math.abs(value)}</span>
      <span><ImArrowUp2 /></span>
    </p>
  }

  if(value === 0) {
    return  <p className={`inline-flex items-center px-1 py-0.5 ml-2 text-sm border-2 mr-1 rounded-md ${globalStatusColorsText.PARI} ${globalStatusColorsBorder.PARI}`}>
      <span className="font-bold mr-1"> +{Math.abs(value)}</span>
      <span><FaEquals /></span>
    </p>
  }

  return null;
}

export default function PalletInputItem ({
  type = "COMPLIANT",
  showText = "Mostra dettagli",
  hideText = "Nascondi dettagli",
  title,
  value,
  features,
  note,
  company,
  onChangeCompany,
  onChangeValue,
  onChangeNote,
  showBadge = false,
  balance = 0
}) {
  const [ details, showDetails ] = useState(false);

  return (
    <div>
      <div className={`flex px-4 py-2 bg-base-100 rounded-md mt-4 mb-1 justify-between items-center border-l-4 border-r-4 ${globalStatusColorsBorder[type]}`}>
        <div className="flex items-start">
          <div>
            { title && <LargeParagraph>{title}</LargeParagraph> }
            <button
              onClick={() => showDetails(prev => !prev)}
              className="inline-block mt-1 text-gray-500 dark:text-gray-800 hover:text-primary-200 dark:hover:text-primary-100"
            >
              { details ? hideText : showText }
            </button>
          </div>
          { showBadge && <PalletBadge value={balance} />}
        </div>

        <FormBoundNumber
          error={null}
          min={type === "REVERSAL" ? -1000 : 0}
          max={10000}
          onChange={val => onChangeValue(val)}
          inputValue={value}
          showZero={true}
          inputStyle="text-3xl bg-transparent font-bold text-primary-200 dark:text-primary-300 w-auto border-none text-right"
        />
      </div>

      { details && (
        <div className="bg-base-100 p-4 mx-4 rounded-b-md">
          { features && Object.keys(features)?.length > 0 && (
            <div className="text-sm">
              <p className="opacity-50 inline-block">Rilevati dagli ordini:</p>
              <ul className="flex flex-wrap mt-1">
                { features.map((ft, index) => (
                  <li className="inline-flex px-2 first:pl-0 border-r border-light-50 dark:border-dark-100" key={index}>
                    <b className="mr-2">{ft.value} {ft.type}</b> {ft.size}
                  </li>
                ))}
              </ul>
            </div>
          )}

          { type === "REVERSAL" && onChangeCompany && (
              <CompanyFinder
                company={company}
                setCompany={value => onChangeCompany(value)}
                label="Cerca l'azienda a cui applicare lo storno dei pallet non restituiti o in avanzo (default: azienda mittente)"
                id="search-charger"
                reset={() => onChangeCompany(null)}
            />
          )}

          <TextEditor
            content={note}
            controlled={true}
            onSaveTextEditor={(content) => onChangeNote(content)} 
            label="Inserisci una nota per questa operazione"
            actionButtonPosition="INTERNAL"
            showList={false}
            className="mt-4"
          />
        </div>
      )}
    </div>
  )
} 