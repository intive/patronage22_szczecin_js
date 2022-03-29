import styled from 'styled-components'

import { breakpoint } from '../../config/breakpoints'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 5%;
  background: #E1E1E1;
  gap: 1rem;
  padding: 0 -5%;

  @media only screen and ${breakpoint.xl} {
    padding: 1.5rem 2.5rem;
  }
`
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
`
export const Title = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 2.25rem;
  line-height: 2.5rem;
  color: #515151;
`
export const StyledLink = styled.a`
  text-decoration: none;
  width: fit-content;
  font-style: normal;
  font-weight: normal;
  font-size: .75rem;
  line-height: 1rem;
  color: #626262;
  &:hover {
    text-decoration: underline;
  }
`
