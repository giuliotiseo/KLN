import SimpleBar from 'simplebar-react';

export default function FloatingBox({ isOpen = null, children }) {
  return (
    <div className={`fixed right-6 bottom-8 ${isOpen ? "pointer-events-all" : "pointer-events-none"}`}>
      <div
        className={`
          mb-2 bg-base-100 w-[400px] h-[350px] shadow-xl rounded-md border border-zinc-300 dark:border-2 dark:border-dark-100
          ${isOpen ? "pointer-events-all opacity-100 -translate-y-4" : "pointer-events-none opacity-0 translate-y-0"}
          transition-all
        `}
      >
        <SimpleBar className="FloatingBox h-full">          
          <div className="p-4">
            { children }
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}