import Icon from '../Icon/Icon'
import { Date, Header, IconWrapper, Text, Tile } from './style'

export default function BoardTile ({ name, date, cardCount, hasPassword }) {
  return (
    <Tile>
      {hasPassword ? <IconWrapper><Icon name='lock_outlined' /></IconWrapper> : null}
      <Header>{name}</Header>
      <Date>{date}</Date>
      <Text>{cardCount} cards</Text>
    </Tile>
  )
}
