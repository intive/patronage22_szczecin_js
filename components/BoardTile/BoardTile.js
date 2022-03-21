import { useContext } from 'react'
import { updateBoard, deleteBoard } from '../../services/internal-api'
import Icon from '../Icon/Icon'
import { Date, Header, IconWrapper, Text, Tile, TileFooter } from './style'
import BoardsContext from '../../store/boards-context'
import { useTranslation } from 'next-i18next'
import ContextMenu from '../ContextMenu/ContextMenu'
import ContextMenuItem from '../ContextMenuItem/ContextMenuItem'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import useModal from '../../hooks/useModal'

const SetPasswordModal = dynamic(() => import('../SetPasswordModal/SetPasswordModal'))

export default function BoardTile ({ id, name, date, cardCount, hasPassword }) {
  const { t } = useTranslation('common')

  const { isOpen, toggle } = useModal()

  const boardsCtx = useContext(BoardsContext)
  const refreshOnSuccess = data => data.status === 204 && boardsCtx.reload()
  const deleteBoardHandler = async id => refreshOnSuccess(await deleteBoard(id))
  const updateBoardHandler = async (id, options) => refreshOnSuccess(await updateBoard(id, options))

  return (
    <>
      <Link href={`/boards/${id}`} passHref>
        <Tile data-testid='board-tile'>
          {hasPassword ? <IconWrapper><Icon name='lock_outlined' /></IconWrapper> : null}
          <Header>{name}</Header>
          <Date>{date}</Date>
          <TileFooter>
            <Text>{t('cardCount', { count: cardCount })}</Text>
            <ContextMenu id={id}>
              {hasPassword
                ? <ContextMenuItem name={t('contextMenu.removePassword')} icon='lock_outlined' onClick={() => updateBoardHandler(id, { password: null })} />
                : <ContextMenuItem name={t('contextMenu.setPassword')} icon='lock_outlined' onClick={toggle} />}
              <ContextMenuItem name={t('contextMenu.deleteBoard')} onClick={() => deleteBoardHandler(id)} icon='delete_outlined' />
            </ContextMenu>
          </TileFooter>
        </Tile>
      </Link>
      <SetPasswordModal boardId={id} handleClose={toggle} isModalOpen={isOpen} />
    </>
  )
}
