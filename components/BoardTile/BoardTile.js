import { useContext, useState } from 'react'
import { updateBoard, deleteBoard } from '../../services/internal-api'
import Icon from '../Icon/Icon'
import { Date, Header, IconWrapper, Text, Tile, TileFooter } from './style'
import BoardsContext from '../../store/boards-context'
import { useTranslation } from 'next-i18next'
import ContextMenu from '../ContextMenu/ContextMenu'
import ContextMenuItem from '../ContextMenuItem/ContextMenuItem'
import Link from 'next/link'
import Toast from '../Toast/Toast'

export default function BoardTile ({ id, name, date, cardCount, hasPassword }) {
  const { t } = useTranslation('common')
  const boardsCtx = useContext(BoardsContext)
  const [toastStatus, setToastStatus] = useState({ isOpen: false, type: '', message: '' })
  const handlers = {
    deleteBoard: () => requestHandler(() => deleteBoard(id), t('apiActions.deleteBoard.success', { name }), t('apiActions.deleteBoard.error', { name })),
    removeBoardPassword: () => requestHandler(() => updateBoard(id, { password: null }), t('apiActions.removeBoardPassword.success', { name }), t('apiActions.removeBoardPassword.error', { name }))
  }

  const requestHandler = async (callback, successMessage, errorMessage) => {
    try {
      await callback()
      boardsCtx.reload()

      setToastStatus({
        isOpen: true,
        type: 'success',
        message: successMessage || 'Success'
      })
    } catch (error) {
      setToastStatus({
        isOpen: true,
        type: 'error',
        message: errorMessage || 'Error Ocurred. Try again later.'
      })
    }
  }

  return (
    <Link href={`/boards/${id}`} passHref>
      <Tile data-testid='board-tile'>
        {hasPassword ? <IconWrapper><Icon name='lock_outlined' /></IconWrapper> : null}
        <Header>{name}</Header>
        <Date>{date}</Date>
        <TileFooter>
          <Text>{t('cardCount', { count: cardCount })}</Text>
          <ContextMenu id={id}>
            {hasPassword ? <ContextMenuItem name={t('contextMenu.removePassword')} onClick={() => handlers.removeBoardPassword()} icon='lock_outlined' /> : <ContextMenuItem name={t('contextMenu.setPassword')} icon='lock_outlined' />}
            <ContextMenuItem name={t('contextMenu.deleteBoard')} onClick={() => handlers.deleteBoard()} icon='delete_outlined' />
          </ContextMenu>
        </TileFooter>
        {toastStatus.isOpen && <Toast isOpen={toastStatus.isOpen} type={toastStatus.type}>{toastStatus.message}</Toast>}
      </Tile>
    </Link>
  )
}
