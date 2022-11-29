import DownloadButton  from '../buttons/DownloadButton';
import { FiPaperclip, FiX } from 'react-icons/fi';

// Process data function ------------------------------------------------------------------------------------------------------------------
const addToList = (file, files, callback) => {
  if(!file) return null;
  const filename = file.name;
  const fileType = file.name.split(".").pop();
  const newFile = {
    fileUrl: URL.createObjectURL(file),
    file: JSON.stringify(file),
    filename,
    fileType,
    messageType: file.type.substr(0, file.type.indexOf('/')).toUpperCase()
  }
  const newFileList = files.concat(newFile);
  callback(newFileList);
}

const removeFromList = (files, index, callback) => {
  const newList = [...files.slice(0, index), ...files.slice(index + 1)];
  callback(newList);
}

// Main component ------------------------------------------------------------------------------------------------------------------
export default function InputFilesPicker({ id, label, files, readyFiles, selectorButtonText, callback, className }) {
  return (
    <section id={`${id}-multiple-filepicker`} className={className}>
      <div>
        <p className="label">{ label }</p>
        <label  
          htmlFor={`file-picker-${id}`}
          className="btn-primary-transparent"
        >
          <span className="mr-1 text-lg"><FiPaperclip /></span>
          <span>{selectorButtonText}</span>
        </label>

        <input 
          className="hidden"
          type="file" 
          id={`file-picker-${id}`} 
          onChange={(e) => addToList(e.target.files[0], files, callback)} 
        />
      </div>

      <div className="mt-2 px-2 border-l border-light-100 dark:border-dark-300">        
        <div className="col-span-2 md:col-span-1">
          { files?.length !== 0 && ( 
              <div className="mb-2">
                {/* <p className="mb-2">Stai caricando:</p>  */}
                { files && files.map((item, index) => {
                  return (
                    <div className="flex items-center mb-2" key={item?.object?.key || item.fileUrl}>
                      <button
                        className="hover:text-secondary-200 dark:hover:text-secondary-300"
                        onClick={() => removeFromList(files, index, callback)}
                      >
                        <FiX />
                      </button>
                      <p className="italic ml-2 text-secondary-200 dark:text-secondary-300">
                        { item.filename }
                      </p>
                    </div>
                  )}
                )}
              </div>
            )
          }

          { readyFiles && readyFiles?.length !== 0 && (
            <div>
              <p className="mb-2 font-light">Documenti caricati:</p> 
              { readyFiles.map(item => {
                return (
                  <div className="flex items-center mb-2" key={item?.object?.key || item.fileUrl}>
                    <DownloadButton data={item} />
                  </div>
                )}
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}