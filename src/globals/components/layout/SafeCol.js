import { forwardRef } from "react";
import { v4 } from "uuid";
import Scrollbar from "./Scrollbar";

/* In the functional component, a second argument 
is passed called ref, which will have access to 
the refs being forwarded from the parent */
const SafeCol = forwardRef((props, ref) => {
  const { id, children, className = "" } = props;
  /* assigning the ref attribute in input and spreading 
  the other props which will contain type, name, onkeydown etc */
  return (
    <div id={id || v4()} className={`relative lg:absolute h-full w-full max-w-full max-h-full ${className}`}>
      <Scrollbar ref={ref}>
        { children }
      </Scrollbar>
    </div>
  );
});

// Exporting the wrapped component
export default SafeCol;
