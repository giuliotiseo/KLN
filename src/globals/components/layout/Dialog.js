import { FiX } from "react-icons/fi";
import Button from "../buttons_v2/Button";
import FloatingButton from "../buttons_v2/FloatingButton";

export const DialogContent = ({
  title,
  children,
  className = "",
  topMessage,
  topMessageClassName,
  bottomMessage,
  bottomMessageClassName,
}) => {
  return (
    <section className={className}>
      { title && <h3 className="title-4">{title}</h3> }
      { topMessage && <div className={`mt-2 text-lg ${topMessageClassName}`}>{topMessage}</div> }
      { children }
      { bottomMessage && <div className={`mt-2 text-lg ${bottomMessageClassName}`}>{bottomMessage}</div> }
    </section>
  )
}


/*
  Example buttons: 
  const buttons = [{
    text:"Conferma",
    disabled: loading,
    onClick: verifyAndMutate
  }]
*/

export const DialogActions = ({
  buttons // [{}]
}) => {
  return (
    <section>
      { buttons.map((button, index) => (
        <Button
          key={index}
          className={button?.className || "btn-primary mx-auto mt-4"}
          onClick={button?.onClick || console.log("Default onClick button")}
          text={button?.text || "Default text BTN"}
          icon={button?.icon || null}
          loading={button?.loading}
          disabled={button?.disabled}
        />
      ))}
    </section>
  )
}

export default function Dialog({
  open = false,
  close = () => console.log("Default callback to closing dialog"),
  children,
  className = "",
  loading = false
}) {

  // if(!open) return null;

  return (
    <div className={`
      fixed w-screen h-screen top-0 left-0 bg-base-300 z-50 flex flex-col items-center justify-center text-center transition-all
      ${className}
      ${ open ? 'opacity-100 bg-opacity-95 pointer-events-all' : 'opacity-0 pointer-events-none'}
      `
    }>
      <div className={`
        relative max-w-[720px] w-5/6 p-4 rounded-md bg-base-100 shadow-lg transition-all delay-200
        ${open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}>
        
        {/* Close dialog */}
        { !loading && <FloatingButton
          icon={<FiX className="text-xl" />}
          onClick={close}
        /> }

        {/* DialogContent & Dialog Actions */}
        { children }
      </div>
    </div>
  )
}