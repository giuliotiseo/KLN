import InlineSpinner from "../spinners/InlineSpinner";

export default function DefaultButton({
  onClick,
  loading,
  disabled = false,
  icon,
  children,
  className = ""
}) {
  return (
    <button onClick={onClick} className={`btn ${className}`} disabled={loading || disabled}>
      { loading && <InlineSpinner loading={loading} /> }
      { !loading && icon && <span>{icon}</span>}
      <span>{ children }</span>
    </button>
  )
}