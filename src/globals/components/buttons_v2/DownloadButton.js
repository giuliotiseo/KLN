import { FiDownload } from 'react-icons/fi';
import { useGetDownload } from '../../libs/hooks';

const DownloadButton = ({
  data,
  text = "",
  textClassName,
  containerClassName = "",
  buttonClassName = "text-dark-100 dark:text-light-300 hover:text-primary-200 dark:hover:text-primary-300",
}) => {
  
  const { blob } = useGetDownload(data);
  const url =  blob ? URL.createObjectURL(blob) : null;
  if(!url) return null;
  
  return (
    <p className={`block ${containerClassName}`}>     
      <a className={`flex items-center ${buttonClassName}`} target="_blank" rel="noopener noreferrer" download={`Allegato File ${data?.filename || data.key}`} href={url}>
        <FiDownload className='mr-2' />
        { text 
          ? <span className={textClassName}>{text}</span>
          : <span className="italic ml-2">{data?.filename || data.key}</span>
        }
      </a>
    </p>
  )
}


export default DownloadButton;