const SafeContent = ({ children, styles }) => {
  return (
    <div className={`relative ${styles}`}>
      { children }
    </div>
  )
}

export default SafeContent;