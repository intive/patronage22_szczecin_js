import BoardHeader from '../../../components/BoardHeader/BoardHeader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getBoard } from '../../../services/internal-api'
import { ColumnsContextProvider } from '../../../store/columns-context'
import { ToastsContextProvider } from '../../../store/toasts-context'
import Layout from '../../../components/Layout/Layout'
import dynamic from 'next/dynamic'
import useModal from '../../../hooks/useModal'
import BoardColumnsList from '../../../components/BoardColumnsList/BoardColumnsList'

const AddColumnModal = dynamic(() => import('../../../components/AddColumModal/AddColumnModal'))

const BoardDetails = ({ tileDetails }) => {
  const { t } = useTranslation(['common', 'modals'])
  const { isModalOpen, toggleModalOpening } = useModal()

  return (
    <Layout>
      <ToastsContextProvider>
        <ColumnsContextProvider columns={tileDetails.columns}>
          <BoardHeader returnLinkText={t('boardHeader.returnLinkText')} buttonText={t('boardHeader.buttonText')} title={tileDetails.name} handleAddColumn={toggleModalOpening} />
          <AddColumnModal handleClose={toggleModalOpening} isModalOpen={isModalOpen} boardId={tileDetails.id} />
          <BoardColumnsList />
        </ColumnsContextProvider>
      </ToastsContextProvider>
    </Layout>
  )
}

export default BoardDetails

export async function getServerSideProps (ctx) {
  const { params } = ctx
  const boardId = params.id
  const resData = await getBoard(boardId)
  const board = resData.data

  return {
    props: {
      tileDetails: board,
      ...(await serverSideTranslations(ctx.locale, ['common', 'modals']))
    }
  }
}
