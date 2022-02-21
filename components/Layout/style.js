import styled from 'styled-components'

import { breakpoint } from '../../config/breakpoints'

export const Wrapper = styled.main`
  padding: 0 5%;

  @media only screen and ${breakpoint.xl} {
    padding: 0 2.5rem;
  }
`
