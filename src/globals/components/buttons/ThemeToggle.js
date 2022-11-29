import React from 'react';
// Hooks
import { useDarkModeTailwind } from '../../libs/hooks';
// Styles
import { MoonIcon, SunIcon } from '../../assets/icons';
import { motion } from "framer-motion";

const variants = {
  light: { x: '-20%', rotate: 0 },
  dark: { x: '50%', rotate: 180 },
}

const spanClass = 'flex items-center justify-center h-full text-dark-300 dark:text-light-100';

export default function ThemeToggle() {
  const [ colorTheme, setTheme ] = useDarkModeTailwind();
  return (
    <button onClick={() => setTheme(colorTheme)} className="mx-4 relative text-dark-300 dark:text-light-100">
      <div id="toggle-bg" className="relative bg-zinc-100 dark:bg-dark-300 border-2 border-opacity-25 border-zinc-400 w-10 h-6 rounded-full">
        <motion.div 
        id="toggle-circle" 
        animate={colorTheme}
        variants={variants}
        className="absolute bg-light-100 dark:bg-dark-300 border-2 border-zinc-400 border-opacity-50 w-7 h-7 rounded-full -top-1 -translate-y-1/2">
          {
            colorTheme === 'light'
            ? <span className={spanClass}><MoonIcon className="w-4 h-4" /></span>
            : <span className={spanClass}><SunIcon className="w-4 h-4" /></span>
          }

        </motion.div>
      </div>
    </button>
  )
}