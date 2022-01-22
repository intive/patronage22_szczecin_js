import { ContextMenuButton, StyledIcon, StyledLi } from './style'

export default function ContextMenuItem (props) {
  return (
    <StyledLi>
      <ContextMenuButton onClick={props.onClick}>
        <StyledIcon name={props.icon} />
        {props.name}
      </ContextMenuButton>
    </StyledLi>
  )
}
