import { useState, useEffect, useRef } from "react";
import Dropzone from "react-dropzone";

const LiveEmptyBox = ({
  maxFiles,
  accept,
  className,
  children,
  callback,
  inputHeight = null
}) => {
  const [ height, setHeight ] = useState("auto");
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current ? ref.current.offsetWidth / 2 : 20);
  }, [ref.current]);


  const handleDrop = acceptedFiles => {
    for(let file of acceptedFiles) {
      callback(file);
    }
  }

  return (
    <div
      ref={ref}
      style={{ height: inputHeight || height }}
      className={`flex flex-col items-center justify-center w-full bg-base-300 rounded-md ${className}`}
    >
      <Dropzone
        onDrop={handleDrop}
        maxFiles={maxFiles}
        maxSize={4000000}
        accept={accept}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone flex flex-col h-full w-full items-center justify-center rounded-md border-4 border-dashed" })}>
            <input {...getInputProps()} />
            { children }
          </div>
        )}
      </Dropzone>
    </div>
  )
}

export default LiveEmptyBox;