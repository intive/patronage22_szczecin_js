import BoardHeader from '../../../components/BoardHeader/BoardHeader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getBoards } from '../../../services/internal-api'
import Layout from '../../../components/Layout/Layout'

const BoardDetails = (props) => {
  const { t } = useTranslation('common')
  const { tileDetails } = props
  return (
    <Layout>
      <BoardHeader returnLinkText={t('boardHeader.returnLinkText')} buttonText={t('boardHeader.buttonText')} title={tileDetails.name} />
    </Layout>
  )
}

export default BoardDetails

export async function getServerSideProps (ctx) {
  const { params } = ctx
  const boardId = params.id
  const resData = await getBoards()
  const board = resData.data.find(board => board.id === boardId)

  return {
    props: {
      tileDetails: board,
      ...(await serverSideTranslations(ctx.locale, ['common']))
    }
  }
}
