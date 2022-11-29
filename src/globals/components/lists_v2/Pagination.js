import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Button from "../buttons_v2/Button";

export default function Pagination({
  page,
  goNext,
  goBack,
  className,
  previousTokens,
  nextToken,
}) {
  return (
    <aside className={`flex items-center ${className}`}>
      <Button
        disabled={previousTokens?.length <= 0}
        styles="hover:text-primary-200 dark:hover:text-primary-300"
        icon={<FiChevronLeft />}
        onClick={goBack}
      />
      
      <span className="font-bold inline-block mx-1">{page}</span>
      
      <Button
        disabled={!nextToken}
        styles="hover:text-primary-200 dark:hover:text-primary-300"
        icon={<FiChevronRight />}
        onClick={goNext}
      />
    </aside>
  )
}