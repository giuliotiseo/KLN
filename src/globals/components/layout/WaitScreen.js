import InlineSpinner from "../spinners/InlineSpinner"
import { SmallTitle, TinyTitle } from "../typography/titles"

export default ({
  title = "Elaborazione dati in corso",
  subtitle = "Attendere",
  warning = "Non uscire da questa finestra",
  children,
  show = false,
}) => {
  if(!show) return null;
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-base-100 flex items-center justify-center bg-opacity-95">
      <div className="text-dark-50 dark:text-light-100 text-center">
        <SmallTitle>{title}</SmallTitle>
        <TinyTitle styles="uppercase text-center opacity-50">{subtitle}</TinyTitle>
        <TinyTitle styles="text-center opacity-50">{warning}</TinyTitle>
        <InlineSpinner styles="mt-4" />
        { children }
      </div>
    </div>
  )
}