import { LargeParagraph, Paragraph } from "../../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { globalStatusColorsText } from "../../../globals/libs/helpers";
import { FiCheck, FiMoreHorizontal, FiAlertCircle } from "react-icons/fi";
import ValidatorProfile from "./ValidatorProfile";
import ValidatorMessage from "./ValidatorMessage";

// Constants ------------------------------------------------------------------------------------------
const validation_response = {
  VERIFIED: {
    text: "Movimentazione verificata",
    icon: <FiCheck className="mt-2 mx-auto text-2xl text-inherit" />
  },
  NOT_DECLARED: {
    text: "Validazione non effettuata",
    icon: <FiMoreHorizontal className="mt-2 mx-auto text-2xl text-inherit" />
  },
  ERROR: {
    text: "Riscontrato un errore nella validazione",
    icon: <FiAlertCircle className="mt-2 mx-auto text-2xl text-inherit" />
  }
}

// Main component ------------------------------------------------------------------------------------------
const PalletValidationViewer = ({
  title,
  companyName = "",
  validation = "NOT_DECLARED",
  validator = {},
  message = ""
}) => {
  if(!validation) return null;

  return (
    <section className="bg-base-100 p-2 rounded-md">
      <header className="my-2 border-b border-light-100 dark:border-dark-200">
        <TinyTitle>{title}</TinyTitle>
        <Paragraph styles="mb-4">{companyName}</Paragraph>
      </header>

      <div className={`${globalStatusColorsText[validation]} border-b border-light-100 dark:border-dark-200 pb-4 pt-2`}>
        <LargeParagraph>
          { validation_response[validation].text }
        </LargeParagraph>
        { validation_response[validation].icon }
      </div>

      <div className="text-left p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <TinyTitle>Account validatore</TinyTitle>
            { validator?.email 
              ? <ValidatorProfile
                email={validator?.email}
                name={validator?.name}
                job={validator?.job}
                task={validator?.task}
                phone={validator?.phone}
              />
              : <p className="italic">Nessun validatore presente</p>  
            }
          </div>
          <div className="flex-1">
            <ValidatorMessage
              message={message}
            />
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default PalletValidationViewer;