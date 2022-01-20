import styled from 'styled-components'
import Header from './header'

export default function Layout (props) {
  return (
    <div className='container'>
      <Header />
      <Wrapper>{props.children}</Wrapper>
    </div>
  )
}

const Wrapper = styled.main`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
`
