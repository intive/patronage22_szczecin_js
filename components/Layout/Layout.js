import { Wrapper } from './Layout.style'
import Header from './Header'

export default function Layout (props) {
  return (
    <>
      <Header />
      <Wrapper>{props.children}</Wrapper>
    </>
  )
}
