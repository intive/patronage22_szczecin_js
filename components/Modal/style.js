import styled from 'styled-components'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'

export const ModalOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #515151;
  opacity: 0.32;
  z-index: 20;

  @media (min-width: 768px) {
    display: block;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: -webkit-fill-available;
  padding: 2rem;
  background: #FFFFFF;
  z-index: 20;

  @media (min-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 3.5rem 3rem;
    width: auto;
    height: auto;
    max-height: 60vh;
    box-shadow: 0px 8px 16px rgba(98, 98, 98, 0.24);
    border-radius: 8px;
  }
`
export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledIcon = styled(Icon)`
  display: none;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 112px;
  height: 112px;
  margin-top: -7.5rem;
  border-radius: 50%;
  background: #E1E1E1;
  color: #515151;
  font-size: 4rem;

  @media (min-width: 768px) {
    display: flex;
  }
`
export const ModalTitle = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #515151;
`

export const ModalSubtitle = styled.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #9E9E9E;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  overflow: auto;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  height: 2.5rem;
  width: 100%;


  @media (min-width: 768px) {
    position: static;
    justify-content: flex-end;
  }
`

export const StyledCancelButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 45%;

  @media (min-width: 768px) {
    width: auto;
  }
`

export const StyledContinueButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 45%;

  @media (min-width: 768px) {
    width: auto;
  }
`
