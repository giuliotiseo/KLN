import SectionTop from './SectionTop';

export default function Card({ title, titleStyle, headerLink, headerStyle, headerAction, headerRefresh, customHeaderRight, filters, children, styles, footer }) {
  return (
    <div className={`bg-base-100 inline-flex flex-col rounded-md ${styles}`}>
      <SectionTop 
        title={title}
        titleStyle={titleStyle}
        link={headerLink}
        action={headerAction}
        refresh={headerRefresh}
        customHeaderRight={customHeaderRight}
        filters={filters}
        style={`${headerStyle}`}
      />
      
      <section>
        { children }
      </section>

      { footer && (
        <footer>
          { footer() }
        </footer>
      )}
    </div>
  )
}