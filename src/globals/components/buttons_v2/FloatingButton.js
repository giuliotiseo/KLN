import Button from "./Button";

const FloatingButton = ({
  icon,
  className = "bg-primary-200 -bottom-4 -right-4 text-white",
  onClick = () => console.log("Default onClick on <FloatingButton />")
}) => {
  return (
    <Button
      icon={icon || null}
      className={`flex justify-center opacity-80 absolute w-[50px] h-[50px] m-0 text-center rounded-full shadow-lg hover:opacity-100 hover:shadow-sm transition-all ${className}`}
      onClick={onClick}
    />
  )
}

export default FloatingButton;