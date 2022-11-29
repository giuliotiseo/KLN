export const HugeTitle = ({ children, bold = true, styles }) => (
  <h1 className={`text-2xl md:text-3xl lg:text-4xl ${bold && 'font-bold'} ${styles}`}>
    { children }
  </h1>
)

export const LargeTitle = ({ children, bold = true, styles = "" }) => (
  <h2 className={`text-xl md:text-2xl lg:text-3xl ${bold && 'font-bold'} ${styles}`}>
    { children }
  </h2>
)

export const MediumTitle = ({ children, bold = true, styles }) => (
  <h3 className={`text-base md:text-lg lg:text-xl ${bold && 'font-bold'} ${styles}`}>
    { children }
  </h3>
)

export const SmallTitle = ({ children, bold = true, styles }) => (
  <h4 className={`text-base md:text-lg ${bold && 'font-bold'} ${styles}`}>
    { children }
  </h4>
)

export const TinyTitle = ({ children, bold = true, styles }) => (
  <h4 className={`text-sm md:text-base ${bold && 'font-bold'} ${styles}`}>
    { children }
  </h4>
)