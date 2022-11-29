import { ReloadIcon } from '../../assets/icons';

const ReloadButton = ({ onClick = () => console.log('Fn refresh'), styles }) => {
  return (
    <button 
      onClick={onClick} 
      className={`p-2 bg-light-100 dark:bg-dark-200 rounded-md opacity-70 hover:opacity-100 ${styles}`}
    >
      <ReloadIcon className="w-4 h-auto fill-current" />
    </button> 
  )
}

export default ReloadButton;