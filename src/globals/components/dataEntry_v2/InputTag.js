import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InputTag = ({
  id,
  tags = [],
  callback = () => console.log("Default callback for <InputTag />"),
  suggestions = [{ id: "test", text: "prova" }],
  label = "",
  className = "",
  labelClassName = "",
  inputFieldPosition = "bottom",
  inputClassName = "bg-light-100 dark:bg-dark-100"
}) => {
  const handleDelete = i => {
    callback(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    callback([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    callback(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div className={`flex items-center ${className}`}>
      { label && <label htmlFor={id} className={`label ${labelClassName}`}>{label}</label> }
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition={inputFieldPosition}
        autocomplete
        autofocus={false}
        placeholder="Premi invio per aggiungere"
        autofocus={false}
        classNames={{
          tags: 'w-full',
          tagInput: `w-full`,
          tagInputField: `w-full outline-none border border-light-50 dark:border-dark-100 focus:border-cyan-500 dark:focus:border-cyan-500 text-dark-300 dark:text-light-100 p-2 rounded-md disabled:bg-light-300 dark:disabled:bg-dark-300 disabled:cursor-not-allowed disabled:opacity-50 ${inputClassName}`,
          suggestions: 'text-sm my-1 p-1 bg-light-100 rounded-sm',
          tag: 'chip-light mx-0 mb-2 mr-1 inline-block',
          remove: 'ml-1 hover:text-red-500',
          // activeSuggestion: 'activeSuggestionClass',
          // editTagInput: 'editTagInputClass',
          // editTagInputField: 'editTagInputField',
          // clearAll: 'clearAllClass',
        }}
      />
    </div>
  );
};

export default InputTag;