import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Scrollbar = forwardRef(({ children, styles = { height: '100%', width: '100%' }}, ref) => {
  const [ scrollbar, setScrollbar ] = useState(true);
  
  useEffect(() => {
    const mql_1 = window.matchMedia("(max-width: 1024px)")
    const listener = () =>  setScrollbar(false);
    mql_1.addEventListener("change", listener)
    return () => {
      mql_1.removeEventListener("change", listener)
    }
  }, []);

  useEffect(() => {
    const mql_2 = window.matchMedia("(min-width: 1024px)")
    const listener_2 = () => setScrollbar(true);
    mql_2.addEventListener("change", listener_2)
    return () => {
      mql_2.removeEventListener("change", listener_2)
    }
  }, []);

  return (
    scrollbar 
      ? <SimpleBar ref={ref} id="scrollableDiv" style={styles}>
          { children }
        </SimpleBar>
      : <section className='h-full'>
        { children }
      </section>
  )
})

export default Scrollbar;