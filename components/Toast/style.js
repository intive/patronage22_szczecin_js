import styled, { css } from 'styled-components'
import Icon from '../Icon/Icon'
import { breakpoint } from '../../config/breakpoints'

export const NotificationToast = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 2rem;
  right: 2rem;
  animation: fadein 0.5s, fadeout 0.5s 3.5s;
  display: flex;
  align-items: center;
  justify-content: left;
  box-shadow: 0px 1px 3px rgba(98, 98, 98, 0.24);
  border-radius: 4px;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  min-width: 11.25rem;
  max-width: 20rem;
  height: 2.5rem;
  background: #DC3545;
  font-size: 0.875rem;
  color: #FFFFFF;

  @keyframes fadein {
    from {bottom: 0rem; position: fixed; opacity: 0;}
    to {bottom: 2rem; position: fixed; opacity: 1;}
  }

  @keyframes fadeout {
    from {bottom: 2rem; position: fixed; opacity: 1;}
    to {bottom: 0rem; position: fixed; opacity: 0;}
  }

  @media only screen and ${breakpoint.md} {
    max-width: 100%;
  }

  ${props => props.type === 'success' && css`
    background: #28A745;
  `}

`

export const NotificationIcon = styled(Icon)`
  margin-right: 0.2rem;
`
