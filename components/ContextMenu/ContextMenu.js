import { useState, useEffect } from 'react'
import Icon from '../Icon/Icon'
import { StyledContextMenu, Button, Nav, StyledUl } from './style'

export default function ContextMenu (props) {
  const [isActive, setIsActive] = useState(false)
  const changeStateHandler = () => setIsActive(!isActive)

  useEffect(() => {
    if (isActive) {
      window.addEventListener('click', changeStateHandler)
    }

    return () => {
      window.removeEventListener('click', changeStateHandler)
    }
  }, [isActive])

  return (
    <StyledContextMenu>
      <Button onClick={changeStateHandler} aria-haspopup='menu' aria-expanded={isActive} aria-controls={props.id}>
        <Icon name='more_horiz' />
      </Button>

      <Nav id={props.id} className={isActive && 'active'}>
        <StyledUl>{props.children}</StyledUl>
      </Nav>
    </StyledContextMenu>
  )
}
