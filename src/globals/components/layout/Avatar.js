import ReactAvatar from "react-avatar";

const primaryColor = {
  100: '#11676A',
  200: '#158084',
  300: '#21CED4'
}

const secondaryColor = {
  100: '#0267A2',
  200: '#0277BD',
  300: '#7fc3ea',
}

const Avatar = ({
  name = "Mario Rossi",
  size,
  stepColor = 200,
  src,
  round = true,
}) => {
  return (
    <ReactAvatar
      name={name}
      size={size}
      round={round}
      color={secondaryColor[stepColor]}
      src={src}
    />
  )
}

export default Avatar;