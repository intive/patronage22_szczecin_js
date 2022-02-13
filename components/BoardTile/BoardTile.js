import Icon from '../Icon/Icon'
import { Date, Header, IconWrapper, Text, Tile, TileFooter } from './style'
import { useTranslation } from 'next-i18next'
import ContextMenu from '../ContextMenu/ContextMenu'
import ContextMenuItem from '../ContextMenuItem/ContextMenuItem'

export default function BoardTile ({ id, name, date, cardCount, hasPassword }) {
  const { t } = useTranslation('common')
  return (
    <Tile>
      {hasPassword ? <IconWrapper><Icon name='lock_outlined' /></IconWrapper> : null}
      <Header>{name}</Header>
      <Date>{date}</Date>
      <TileFooter>
        <Text>{t('cardCount', { count: cardCount })}</Text>
        <ContextMenu id={id}>
          {hasPassword ? <ContextMenuItem name={t('contextMenu.removePassword')} icon='lock_outlined' /> : <ContextMenuItem name={t('contextMenu.setPassword')} icon='lock_outlined' />}
          <ContextMenuItem name={t('contextMenu.deleteBoard')} icon='delete_outlined' />
        </ContextMenu>
      </TileFooter>
    </Tile>
  )
}
