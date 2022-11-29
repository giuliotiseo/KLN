import { Link, useLocation } from "react-router-dom";

export default function LinkButton({
  to = "/",
  disabled = false,
  text,
  icon,
  className = "",
  textClassName = "",
}) {
  const { pathname } = useLocation();
  return (
    <Link to={disabled || !to ? pathname : to} className={`btn ${className} ${disabled ? "button--disabled" : ""}`}>
      { icon && <span className="text-lg">{ icon }</span> }
      {(text && text !== '') && <span className={`ml-1 ${textClassName}`}>{ text }</span> }
    </Link>
  )
}