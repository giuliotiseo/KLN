import { useCallback, useEffect, useState } from 'react';
import { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Button from '../buttons_v2/Button';
import { FiEdit, FiList } from 'react-icons/fi';
// Helpers
import { isJSON } from '../../libs/helpers';
// Css
import 'draft-js/dist/Draft.css';

// Sub component for external uses
export const EditorReader = ({ content, styles }) => {
  if(!content) return null;

  if(isJSON(content)) {
    return <div className={styles}>
      <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(content)))} readOnly={true} />
    </div>
  } else {
    return <div className={styles}>
      <p>{content}</p>
    </div>
  }
}

// Sub component for internal uses
const ExtEditorButtons = ({ editMode, save, change }) => {
  return (
    <>
      {(save && editMode) && (
        <Button
          className="btn-primary"
          text="Salva"
          onClick={save}
        />
      )}

      { !editMode && (
        <Button 
          text="Modifica"
          className="btn-ghost"
          onClick={change} 
          icon={<FiEdit className="w-4 h-auto" />} 
        /> 
      )}
    </>
  )
}

const IntEditorButtons = ({ editMode, save, change}) => {
  return (
    <>
      {(save && editMode)  && (
      <Button
        text="Conferma nota"
        className="btn-secondary-outline mt-4 ml-auto text-sm" 
        onClick={save}
      /> 
      )}
      {!editMode && (
        <Button 
          onClick={change} 
          icon={<FiEdit className="w-4 h-auto" />} 
          text="Modifica"
          className="btn-secondary-outline mt-4 ml-auto text-sm"
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
  titleClassName = "title-3",
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
      <div className='flex flex-col'>
        { title && <h3 className={titleClassName}>{title}</h3>}
        { label && <p className="block w-full text-gray-500 dakr:text-gray-400 text-sm">{label}</p>}
      </div>
      
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