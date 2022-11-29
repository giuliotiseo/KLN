import React, { useState, useEffect } from 'react';
import DownloadButton  from '../buttons/DownloadButton';
import { FiPaperclip, FiX } from 'react-icons/fi';

export default function MultipleFilePicker({ id, label, selectorButtonText, onChange, onRemove, files, readyFiles }) {
  const [loadedFiles, setLoadedFiles] = useState(files || []);

  useEffect(() => {
    setLoadedFiles(files || [])
  });

  const handleChange = (file) => {
    if(!file) return null;
    const filename = file.name;
    const fileType = file.name.split(".").pop();
    const newFile = {
      fileUrl: URL.createObjectURL(file),
      file,
      filename,
      fileType,
      messageType: file.type.substr(0, file.type.indexOf('/')).toUpperCase()
    }
    const newFileList = loadedFiles.concat(newFile);
    setLoadedFiles(newFileList);
    onChange(newFile);
  }

  const removeFromList = (index) => {
    const newList = [...loadedFiles.slice(0, index), ...loadedFiles.slice(index + 1)];
    setLoadedFiles(newList);
    onRemove(newList);
  }

  return (
    <section id={`${id}-multiple-filepicker`}>
      <div>
        <p className="label">{ label }</p>
        <label  
          htmlFor={`file-picker-${id}`}
          id={`file-picker-${id}-label`} 
          className="mt-2 btn btn-primary inline-block"
          style={{ display: 'inline-flex' }}
        >
          <span className="mr-1 text-lg"><FiPaperclip /></span>
          <span>{selectorButtonText}</span>
        </label>

        <input 
          className="hidden"
          type="file" 
          id={`file-picker-${id}`} 
          onChange={(e) => handleChange(e.target.files[0])} 
        />
      </div>

      <div className="mt-2 px-2 border-l border-light-100 dark:border-dark-300">        
        <div className="col-span-2 md:col-span-1">
          { loadedFiles?.length !== 0 && ( 
              <div className="mb-2">
                {/* <p className="mb-2">Stai caricando:</p>  */}
                { loadedFiles && loadedFiles.map((item, index) => {
                  return (
                    <div className="flex items-center mb-2" key={item?.object?.key || item.fileUrl}>
                      <button className="hover:text-secondary-200 dark:hover:text-secondary-300" onClick={() => removeFromList(index)}><FiX /></button>
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