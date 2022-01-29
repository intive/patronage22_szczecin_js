import styled from 'styled-components'

export const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 16rem;
  height: 12.5rem;
  padding: 1rem;
  background-color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(98, 98, 98, 0.21);
  border-radius: 8px;
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  top: -0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #E1E1E1;
  color: #515151;
  padding: 0.5rem;
`

export const Header = styled.h4`
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #515151;
`

export const Text = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  color: #7E7E7E;
`

export const Date = styled(Text)`
  flex-grow: 1;
`