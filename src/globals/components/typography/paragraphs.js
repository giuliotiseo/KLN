import InlineSpinner from "../spinners/InlineSpinner"

// Paragraphs ----------------------------------------------------------------------------------------------------
export const HugeParagraph = ({ children, styles="" }) => (
  <p className={`text-2xl md:text-3xl lg:text-6-xl ${styles}`}>
    { children }
  </p>
)

export const LargeParagraph = ({ children, styles="" }) => (
  <p className={`text-lg md:text-xl lg:text-5-xl ${styles}`}>
    { children }
  </p>
)

export const Paragraph = ({ children, styles="" }) => (
  <p className={`${styles}`}>
    { children }
  </p>
)

export const SmallParagraph = ({ children, styles="" }) => (
  <p className={`text-sm ${styles}`}>
    { children }
  </p>
)

export const TinyParagraph = ({ children, styles="" }) => (
  <p className={`text-xs ${styles}`}>
    { children }
  </p>
)

// Icon text----------------------------------------------------------------------------------------------------
export const HugeIconText = ({ icon, text, loading }) => (
  <HugeParagraph styles="flex items-center">
    { loading && <span className="mt-1"><InlineSpinner color="#DDD" loading={loading} /></span>}
    { !loading && icon && <span>{ icon() }</span> }
    { text && (
      <span className="ml-1">
      { text }
      </span>
    )}
  </HugeParagraph>
)

export const LargeIconText = ({ icon, text, loading }) => (
  <LargeParagraph styles="flex items-center">
    { loading && <span className="mt-1"><InlineSpinner color="#DDD" loading={loading} /></span>}
    { !loading && icon && <span>{ icon() }</span> }
    { text && (
      <span className="ml-1">
      { text }
      </span>
    )}
  </LargeParagraph>
)

export const IconText = ({ icon, text, styles, loading }) => (
  <Paragraph styles={`flex items-center ${styles}`}>
    { loading && <span className="mt-1"><InlineSpinner color="#DDD" loading={loading} /></span>}
    { !loading && icon && <span>{ icon() }</span> }
    { text && (
      <span className="ml-1">
      { text }
      </span>
    )}
  </Paragraph>
)

export const SmallIconText = ({ icon, text, loading }) => (
  <SmallParagraph styles="flex items-center">
    { loading && <span className="mt-1"><InlineSpinner color="#DDD" loading={loading} /></span>}
    { !loading && icon && <span>{ icon() }</span> }
    { text && (
      <span className="ml-1">
      { text }
      </span>
    )}
  </SmallParagraph>
)

export const TinyIconText = ({ icon, text, loading }) => (
  <TinyParagraph styles="flex items-center">
    { loading && <span className="mt-1"><InlineSpinner color="#DDD" loading={loading} /></span>}
    { !loading && icon && <span>{ icon() }</span> }
    { text && (
      <span className="ml-1">
      { text }
      </span>
    )}
  </TinyParagraph>
)