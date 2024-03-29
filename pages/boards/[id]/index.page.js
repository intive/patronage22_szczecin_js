import BoardHeader from '../../../components/BoardHeader/BoardHeader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getBoard } from '../../../services/internal-api'
import { ColumnsContextProvider } from '../../../store/columns-context'
import Layout from '../../../components/Layout/Layout'
import BoardColumnsList from '../../../components/BoardColumnsList/BoardColumnsList'

const BoardDetails = ({ tileDetails }) => {
  const { t } = useTranslation('common')

  return (
    <Layout>
      <ColumnsContextProvider>
        <BoardHeader
          returnLinkText={t('boardHeader.returnLinkText')}
          buttonText={t('boardHeader.buttonText')}
          title={tileDetails.name}
        />
        <BoardColumnsList tileDetails={tileDetails} />
      </ColumnsContextProvider>
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
      ...(await serverSideTranslations(ctx.locale, ['common']))
    }
  }
}
