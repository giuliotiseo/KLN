import { toast } from "react-toastify";
import { Paragraph } from "../typography/paragraphs";

export default function ClickableToastNotification({ message, cta }) {

  const clickNotification = () => {
    //remove all notifications
    toast.dismiss();
    cta.onClick();
  }

  return (
    <div>
      <Paragraph>{ message }</Paragraph>
      { cta.type === 'button' && (
        <button 
          className={`${cta.styles} flex items-center`} 
          onClick={clickNotification}>
            <span className="mr-1">{ cta.icon && cta.icon()}</span>
            <span>{cta.text}</span>
        </button>
      )}
    </div>
  );
}