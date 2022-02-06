import BoardTilesList from '../components/BoardTilesList/BoardTilesList'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { getBoards } from '../services/internal-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BoardColumn from '../components/BoardColumn/BoardColumn'

export default function Home ({ tilesList }) {
  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
      </Head>

      <Layout>
        <BoardTilesList tilesList={tilesList} />
        <BoardColumn />
      </Layout>
    </div>
  )
}

export async function getServerSideProps (ctx) {
  const resData = await getBoards()

  return {
    props: {
      tilesList: resData.data,
      ...(await serverSideTranslations(ctx.locale, ['common']))
    }
  }
}
