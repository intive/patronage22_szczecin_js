import styled from 'styled-components'

export default function Layout (props) {
  return (
    <>
      <Wrapper>{props.children}</Wrapper>
    </>
  )
}

const Wrapper = styled.main`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
`
