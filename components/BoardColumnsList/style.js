import styled from 'styled-components'

import { breakpoint } from '../../config/breakpoints'

export const ColumnsWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem 2rem;
  @media only screen and ${breakpoint.lg} {
    flex-direction: row;
    width: auto;
  }
`

export const ColumnsContainer = styled.div`
  @media only screen and ${breakpoint.lg} {
    position: absolute;
    top: 12rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: auto;
  }
`
