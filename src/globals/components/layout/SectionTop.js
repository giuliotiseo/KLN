import { Link, useLocation, useNavigate } from 'react-router-dom';
// Icons
import { FiChevronLeft } from 'react-icons/fi';

// Sub Components ------------------------------------------------------------------------------------------------------------------------
const BackButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <FiChevronLeft className="text-2xl text-primary-200 dark:text-primary-300 mr-2 p-0" />
    </button>
  )
}

// Main Component ------------------------------------------------------------------------------------------------------------------------
const SectionTop = ({
  title,
  titleStyle = 'large',
  icon,
  className = "",
  headerClassName = "",
  children,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const canGoBack = pathname.includes("new") || pathname.includes("edit") || pathname.includes("view") || pathname.includes("details") || pathname.includes("create") ;

  if(!title) return null;
  return (
    <div className={`${className}`}>
      <header className={`w-full flex justify-between items-center my-2 ${headerClassName}`}>
        <div className="flex items-center">
          { canGoBack && <BackButton onClick={() => navigate(-1)} />}
          { icon }
          { title && titleStyle === 'large' && <h2 className="title-2">{ title }</h2> }
          { title && titleStyle === 'medium' && <h3 className="title-3">{ title }</h3> }
          { title && titleStyle === 'small' && <h4 className="title-4">{ title }</h4> }
        </div>

        { children }
      </header>
    </div>
  )
}

export default SectionTop;
