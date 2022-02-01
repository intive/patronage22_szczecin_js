import Icon from '../Icon/Icon'
import { Date, Header, IconWrapper, Text, Tile } from './style'
import { useTranslation } from 'next-i18next'

export default function BoardTile ({ name, date, cardCount, hasPassword }) {
  const { t } = useTranslation('common')

  return (
    <Tile>
      {hasPassword ? <IconWrapper><Icon name='lock_outlined' /></IconWrapper> : null}
      <Header>{name}</Header>
      <Date>{date}</Date>
      <Text>{t('cardCount', { count: cardCount })}</Text>
    </Tile>
  )
}
