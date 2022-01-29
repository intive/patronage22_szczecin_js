import { StyledButton, StyledIcon } from './style'

const Button = (props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {props.icon
        ? (
          <>
            <StyledIcon name={props.icon} />
            {props.children}
          </>
          )
        : props.children}
    </StyledButton>
  )
}

export default Button
