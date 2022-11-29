import { Link } from 'react-router-dom';

const MailToButton = ({ mailto, text, icon, styles }) => {
  return (
    <Link
      to='#'
      className={`flex items-center ${styles}`}
      onClick={(e) => {
        e.preventDefault();
        window.location = `mailto:${mailto}`;
      }}
    >
      { icon && <span>{ icon() }</span> }
      {text && <span>{text}</span>}
    </Link>
  );
};

export default MailToButton;
