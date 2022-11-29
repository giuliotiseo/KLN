import { Link } from "react-router-dom";
import { LargeTitle } from "../../globals/components/typography/titles";

export default function HeadingEditContact({ fromPath }) {
  return (
    <div className="flex flex-col items-center w-full justify-center mb-8">
      <div className="text-center">
        <LargeTitle>Modifica contatto</LargeTitle>
        <Link to={`/${fromPath || 'contacts'}`} className="text-primary-200 dark:text-primary-300">
          « Torna alla lista
        </Link>
      </div>
    </div>
  )
}