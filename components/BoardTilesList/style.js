import styled from 'styled-components'

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
  & > * {
    margin-bottom: 2.5rem;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 36rem;
    margin: 2.5rem auto;
    & > * {
      margin: 0 1rem 2.5rem;
    }
  }

  @media (min-width: 992px) {
    width: 54rem;
    margin-top: 5rem;
  }

  @media (min-width: 1440px) {
    width: 72rem;
    margin-top: 6rem;
  }
`
