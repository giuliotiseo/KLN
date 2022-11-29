import { useEffect } from "react";
import { useRef } from "react";

export function useScrollFull() {
  const scrollableRef = useRef();

  useEffect(() => {
    if(scrollableRef?.current?.contentEl) {
      scrollableRef.current.contentEl.className = "simplebar-content h-full";
    }
  }, [scrollableRef]);


  return scrollableRef;
}