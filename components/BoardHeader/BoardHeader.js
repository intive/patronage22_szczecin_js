import Link from 'next/link'
import Button from '../Button/Button'
import { Container, TitleWrapper, Title, StyledLink } from './style'

const createNewColumn = () => {
  console.log('teraz powstanie nowa kolumna')
}

const BoardHeader = (props) => {
  return (
    <Container>
      <Link href='/' passHref><StyledLink>{props.returnLinkText}</StyledLink></Link>
      <TitleWrapper>
        <Title>{props.title}</Title>
        <Button onClick={createNewColumn}>{props.buttonText}</Button>
      </TitleWrapper>
    </Container>
  )
}

export default BoardHeader
