export default function ErrorPage ({
  title = "Ooops",
  children = <p>La pagina richiesta non è disponibile</p>
}) {
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <p className="text-3xl text-center mb-3 text-primary-200 dark:text-primary-300">{ title }</p>
      <div className="text-center">{children}</div>
    </div>
  )
}