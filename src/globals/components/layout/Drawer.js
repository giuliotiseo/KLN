export default function Drawer({
  title,
  children,
  isOpen,
  setIsOpen,
  sectionClassName = "bg-white px-4",
  articleClassName = "flex flex-col"
}) {
  return (
    <main
      className={
        " fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 pointer-events-all translate-x-0 "
          : " transition-all delay-200 opacity-0 pointer-events-none ")
      }
    >
      <section
        className={
          `px-4 w-screen max-w-lg right-0 absolute h-full shadow-xl ${sectionClassName} delay-400 duration-500 ease-in-out transition-all transform  ` +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className={`relative w-screen max-w-lg pb-10 space-y-6 ${articleClassName} overflow-y-scroll h-full`}>
          { title && (
            <header className="px-2 py-2 font-bold text-lg z-60 bg-base-100">{ title }</header>
          )}

          <section className="m-0">
            {children}
          </section>
        </article>
      </section>

      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  )
}