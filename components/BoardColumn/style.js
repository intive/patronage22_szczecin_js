import styled from 'styled-components'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

export const Column = styled.div`
  width: 328px;
`

export const ColumnCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  padding: ${props => props.card ? '1rem' : '1.25rem 1rem 0.75rem 1rem'};
  border-radius: 8px;
  background-color: #ffffff;
`

export const ColumnCardTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  margin-bottom: 1.25rem;
  color: #7E7E7E;
`

export const StyledButton = styled(Button)`
  padding: 0.5rem;
  width: ${props => props.outline ? '100%' : 'auto'};
`

export const ColumnCardText = styled.div`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #E1E1E1;
  border-radius: 8px;
  background: #FFFFFF;
  overflow-wrap: break-word;
`

export const ColumnAddCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.right ? 'flex-end' : 'space-between'};
  align-items: center;
  gap: 12px;
  margin-top: ${props => props.right ? '0' : '1rem'}
`

export const ColumnCardName = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: #7E7E7E;
`

export const StyledIcon = styled(Icon)`
  line-height: 1rem;
  color: #7E7E7E;
  cursor: pointer;
  &:hover{
    color: #515151;
  }
`
