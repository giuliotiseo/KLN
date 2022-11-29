import { MdKeyboardArrowRight } from "react-icons/md";

const HighlightedButtonOnSelect = ({
  text,
  isSelected,
  onClick,
  className,
  showIcon = false
}) => <button
  onClick={onClick}
  className={`flex items-center${className} ${isSelected && 'text-primary-200 font-bold'}`}
>
   <MdKeyboardArrowRight className="relative top-1" /> { text }
</button>

export default HighlightedButtonOnSelect;