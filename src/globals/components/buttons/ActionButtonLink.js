import { Link } from 'react-router-dom'; 

export default function ActionButtonLink({ to, text, icon, styles }) {
  return (
    <Link to={to} className={`btn flex items-center text-center p-2 rounded-md ${styles}`}>
      { icon && <span>{ icon() }</span> }
      { text !== '' && <span className="ml-1 text-left">{ text }</span> }
    </Link>
  )
}