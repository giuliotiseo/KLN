const SectionWrap = ({ children, className = ""}) => {
  return (
    <div className={`relative flex flex-col flex-1 mx-4 rounded-t-md bg-base-100 overflow-hidden ${className}`}>      
      { children }
    </div>
  )
}

export default SectionWrap;