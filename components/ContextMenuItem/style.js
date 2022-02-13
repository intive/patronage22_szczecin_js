import styled from 'styled-components'
import Icon from '../Icon/Icon'

export const StyledLi = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;

  &:last-child button {
    margin-bottom: 0;
  }
`

export const ContextMenuButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  line-height: 1.5rem;
  color: #626262;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  width: 100%;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background: #bababa9e;
  }
`
export const StyledIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-right: 0.25rem;
  color: #7e7e7e;
`
