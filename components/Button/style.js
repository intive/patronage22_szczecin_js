import styled, { css } from 'styled-components'
import Icon from '../Icon/Icon'

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(81, 81, 81, 0.16);
  border: none;
  border-radius: 8px;
  height: 2.5rem;
  padding: 0.5rem 1.5rem;
  background: #515151;
  cursor: pointer;
  color: #FFFFFF;

  &:hover {
    background: #4a4949;
  }

  &:active {
    background: #3a3939;
  }

  &:disabled {
    opacity: 0.3;
    background: #515151;
    cursor: default;
    color: #FFFFFF;
  }

  ${props => props.text && css`
    background: transparent;
    color: #515151;
    box-shadow: none;

    &:hover {
      background: transparent;
      color: #000000;
    }

    &:active {
      background: transparent;
      color: #3a3939;
    }

    &:disabled {
      opacity: 0.3;
      background: #bababa9e;
      cursor: default;
      color: #515151;
    }
  `}

  ${props => props.outline && css`
    border: 1px solid #515151;
    &:hover {
      border: 1px solid #000000;
    }
  `}
`

export const StyledIcon = styled(Icon)`
  margin-right: 0.25rem;
`
