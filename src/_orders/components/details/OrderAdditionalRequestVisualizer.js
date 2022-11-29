import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { EditorReader } from "../../../globals/components/dataEntry/TextEditor";
// Icons
import { FiCheckSquare, FiGitPullRequest, FiSquare } from "react-icons/fi";
import { priceFormatter } from "../../../globals/libs/helpers";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default ({ collectChecks, checksAmount, note }) => {
  return (
    <div>
      <SmallTitle styles="mb-2 flex items-center">
        <FiGitPullRequest className="mr-1" />
        <span>Richieste aggiuntive</span>
      </SmallTitle>

      <div className="my-4">
        { collectChecks 
          ? <Paragraph styles="flex items-center"><FiCheckSquare className="mr-2 text-primary-200 dark:text-primary-300" />Richiesto ritiro dell'assegno</Paragraph>
          : <Paragraph styles="flex items-center"><FiSquare className="mr-2 text-zinc-500" />Ritiro dell'assegno non richiesto</Paragraph>
        }
        
        { checksAmount && ( <Paragraph>Importo assegno/i: <b>{priceFormatter(checksAmount)}</b></Paragraph> )}
      </div>

      { note && (
        <div className="mt-4">
          <SmallParagraph>Note aggiuntive: </SmallParagraph>
          <EditorReader content={note} styles="text-left border-l-4 border-secondary-200 p-2 mt-2 bg-neutral-200 dark:bg-neutral-100" />
        </div>
      )}
    </div>
  )
}