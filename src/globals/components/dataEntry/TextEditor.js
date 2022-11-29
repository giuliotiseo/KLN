import { useCallback, useEffect, useState } from 'react';
import { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// Components
import { SmallTitle } from '../typography/titles';
import ActionButton from '../buttons/ActionButton';
// Css
import 'draft-js/dist/Draft.css';
import { EditIcon } from '../../assets/icons';
import { Paragraph, SmallParagraph } from '../typography/paragraphs';
// Helpers
import { isJSON } from '../../libs/helpers';
import { FiList } from 'react-icons/fi';

// Sub component for external uses
export const EditorReader = ({ content, styles }) => {
  if(!content) return null;

  if(isJSON(content)) {
    return <div className={styles}>
      <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(content)))} readOnly={true} />
    </div>
  } else {
    return <div className={styles}>
      <Paragraph>{content}</Paragraph>
    </div>
  }
}

// Sub component for internal uses
const ExtEditorButtons = ({editMode, save, change }) => {
  return (
    <>
      {(save && editMode) && (
        <ActionButton
          styles="btn-primary"
          text="Salva"
          onClick={save}
        />
      )}
      { !editMode && (
        <ActionButton 
          text="Modifica"
          styles="btn-ghost"
          onClick={change} 
          icon={() => <EditIcon className="w-4 h-auto fill-current" />} 
        /> 
      )}
    </>
  )
}

const IntEditorButtons = ({ editMode, save, change}) => {
  return (
    <>
      {(save && editMode)  && (
      <ActionButton
        text="Conferma nota"
        styles="btn-secondary-outline mt-4 ml-auto text-sm" 
        onClick={save}
      /> 
      )}
      {!editMode && (
        <ActionButton 
          onClick={change} 
          icon={() => <EditIcon className="w-4 h-auto fill-current" />} 
          text="Modifica"
          styles="btn-secondary-outline mt-4 ml-auto text-sm"
        /> 
      )}
    </>
  )
}

// Main component
export default function TextEditor({
  content,
  onSaveTextEditor,
  title,
  label,
  showControls = true,
  actionButtonPosition = "EXTERNAL",
  showList = false,
  controlled = false,
  className 
}) {
  const [ editMode, setEditMode ] = useState(content ? false : true);
  const [editorState, setEditorState] = useState(
    content
      ? () => isJSON(content) ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createWithContent(ContentState.createFromText(content))
      : () => EditorState.createEmpty()
  );

  // Controlled trigger function
  const controlledUpdate = useCallback((content) => {
    if(!content || content === "") {
      setEditMode(true);
      setEditorState(() => EditorState.createEmpty())
    } else {
      setEditMode(false);
      setEditorState(() => isJSON(content) ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createWithContent(ContentState.createFromText(content)))
    }
  }, []);

  // Reset in case of controlled input
  useEffect(() => {
    if(controlled) {
      controlledUpdate(content);
    }
  }, [content, controlled])

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  function _onBoldClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  function _onItalicClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  function _onListClick() {
    setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
  }

  function saveText() {
    const jsonContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    onSaveTextEditor(jsonContent);
    setEditMode(false);
  }

  return <>
    <header className={`flex items-center justify-between mb-2 ${className}`}>
      { title && <SmallTitle>{title}</SmallTitle>}
      { label && <SmallParagraph styles="block w-full opacity-70 text-sm">{label}</SmallParagraph>}
      
      { actionButtonPosition === 'EXTERNAL' && (
        <ExtEditorButtons
          editMode={editMode}
          save={saveText}
          change={() => setEditMode(true)}
        />
      )}
    </header>

    { editMode && showControls && (
      <nav className="bg-light-300 dark:bg-dark-200 p-2 flex">
        <button className="inline-block px-2 border-r dark:border-dark-300 hover:text-secondary-200 font-bold" onClick={_onBoldClick}>B</button>
        <button className="inline-block px-2 border-r dark:border-dark-300 hover:text-secondary-200 italic font-serif" onClick={_onItalicClick}>I</button>
        { showList && <button className="flex py-1 px-2 border-r dark:border-dark-300 hover:text-secondary-200" onClick={_onListClick}><FiList /></button> }
      </nav>
    )}

    <div className={`mt-2 ${!editMode ? 'cursor-default border border-light-300 dark:border-dark-200 p-2 rounded-md' : 'input'}`}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        readOnly={!editMode}
        className="bg-red-100"
      />
      
      { actionButtonPosition === 'INTERNAL' && (
        <IntEditorButtons
          editMode={editMode}
          save={saveText}
          change={() => setEditMode(true)}
        />
      )}
    </div>
  </>
}