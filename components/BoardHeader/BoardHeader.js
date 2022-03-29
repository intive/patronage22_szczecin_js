import Link from 'next/link'
import Button from '../Button/Button'
import { Container, TitleWrapper, Title, StyledLink } from './style'

const BoardHeader = (props) => {
  return (
    <Container data-testid='board-header'>
      <Link href='/' passHref><StyledLink>{props.returnLinkText}</StyledLink></Link>
      <TitleWrapper>
        <Title>{props.title}</Title>
        <Button onClick={props.handleAddColumn}>{props.buttonText}</Button>
      </TitleWrapper>
    </Container>
  )
}

export default BoardHeader
