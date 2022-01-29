import styled from 'styled-components'
import Button from '../Button/Button'
import { breakpoint } from '../../config/breakpoints'

export const Modal = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  overflow: hidden;
`

export const CloseButton = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 0rem;
  box-shadow: none;
  cursor: pointer;
  background: transparent;
  color: #000000;

  &:hover {
    background: transparent;
    color: #7E7E7E;
  }

  @media only screen and ${breakpoint.md} {
    top: 1.5rem;
    right: 2.5rem;
  }
`

export const BoardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0rem 1rem;
  background: #FFFFFF;

  @media only screen and ${breakpoint.md} {
    width: 34rem;
    height: 20.25rem;
    padding: 0rem;
  }
`

export const Title = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  color: #515151;
`

export const StyledButton = styled(Button)`
  position: fixed;
  bottom: 0;
  width: 90%;
  margin: 1rem;

  @media only screen and ${breakpoint.md} {
    position: absolute;
    bottom: 0;
    right: 0;
    width: auto;
    margin: 0rem;
  }
`
