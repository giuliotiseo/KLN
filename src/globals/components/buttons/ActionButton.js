import ButtonSpinner from "../spinners/ButtonSpinner";

export default function ActionButton({ onClick, loading, disabled = false, text, icon, styles = "" }) {
  return (
    <button onClick={onClick} className={`btn ${styles} ${ disabled && ' hover:text-dark-300 dark:hover:text-light-300'} `} disabled={loading || disabled}>
      { loading && <ButtonSpinner /> }
      { icon && !loading && <span className="text-lg">{ icon() }</span> }
      { (text && text !== '') && <span className="ml-1">{ text }</span> }
    </button>
  )
}