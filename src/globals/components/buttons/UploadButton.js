import { v4 } from 'uuid';

const UploadButton = ({ text, icon, onUpload, styles }) => {
  const id = v4();
  return (
    <>
      <label  
        htmlFor={`file-uploader-${id}`}
        id={`file-uploader-${id}-label`} 
        className={`py-2 px-3 rounded-md outline-none disabled:opacity-50 ${styles}`}
      >
        { icon && <span>{ icon() }</span> }
        <span className="ml-1">{ text }</span>
      </label>

      <input 
        className="hidden"
        type="file" 
        id={`file-uploader-${id}`} 
        onChange={(e) => onUpload(e.target.files[0])}
        value={''}
        accept=".xlsm,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />
    </>
  )
}

export default UploadButton;