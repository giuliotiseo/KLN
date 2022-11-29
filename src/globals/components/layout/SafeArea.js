export default function SafeArea({ children, className = "" }) {
  return (
    <div className={`relative flex-1 h-full ${className }`}>
      { children }
    </div>
  )
}