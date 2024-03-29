import styled from 'styled-components'

import { breakpoint } from '../../config/breakpoints'

export const HeaderContainer = styled.header`
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 4.5rem;
  background: #FFFFFF;
  z-index: 11;
  `

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 5%;

  @media only screen and ${breakpoint.xl} {
    padding: 0 2.5rem;
  }
`

export const HeaderTitle = styled.a`
  display: flex;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-decoration: none;
  color: inherit;
  `

export const HeaderTitleText = styled.p`
  margin-left: 0.5rem;
  color: #222222;
`
