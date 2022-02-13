import { useState, useRef } from 'react'
import Icon from '../Icon/Icon'
import { StyledContextMenu, Button, Nav, StyledUl } from './style'
import useClickOutside from '../../hooks/useClickOutside'

export default function ContextMenu (props) {
  const [isActive, setIsActive] = useState(false)
  const ref = useRef()

  useClickOutside(ref, () => setIsActive(false))

  const changeStateHandler = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <StyledContextMenu ref={ref}>
      <Button onClick={changeStateHandler} aria-haspopup='menu' aria-expanded={isActive} aria-controls={props.id}>
        <Icon name='more_horiz' />
      </Button>

      <Nav onClick={changeStateHandler} id={props.id} className={isActive && 'active'}>
        <StyledUl>{props.children}</StyledUl>
      </Nav>
    </StyledContextMenu>
  )
}
