import styled from 'styled-components'
import Header from './Header'

export default function Layout (props) {
  return (
    <>
      <Header />
      <Wrapper>{props.children}</Wrapper>
    </>
  )
}

const Wrapper = styled.main`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
`
