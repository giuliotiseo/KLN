import { EditorReader } from "../../../globals/components/dataEntry/TextEditor"
import { TinyTitle } from "../../../globals/components/typography/titles"

export default ({ message }) => {
  return (
    <div>
      <TinyTitle>Note di validazione</TinyTitle>
      { !message
        ? <p className="italic">Non sono presenti note di validazione</p>
        : <EditorReader
            content={message} 
            styles="text-left border-l-4 border-secondary-200 p-2 mt-2 bg-neutral-200 dark:bg-neutral-100"
          />
      }
    </div>
  )
}