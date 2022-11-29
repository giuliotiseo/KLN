const RouterWrapper = ({ children, styles = '' }) => (
  <div className={`px-4 h-full ${styles}`}>
    { children }
  </div>
)

export default RouterWrapper;