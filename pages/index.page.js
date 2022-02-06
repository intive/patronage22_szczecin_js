import CreateBoardTile from '../components/CreateBoardTile/CreateBoardTile'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import ContextMenu from '../components/ContextMenu/ContextMenu'
import ContextMenuItem from '../components/ContextMenuItem/ContextMenuItem'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BoardTile from '../components/BoardTile/BoardTile'
import Button from '../components/Button/Button'
import { useTranslation } from 'next-i18next'
import BoardColumn from '../components/BoardColumn/BoardColumn'

export default function Home () {
  const { t } = useTranslation('common')

  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
      </Head>

      <Layout>
        <CreateBoardTile />
        <BoardTile name='Board name 1' date='1 Jan 2022' cardCount={0} hasPassword />
        <BoardTile name='Board name 1' date='1 Jan 2022' cardCount={1} hasPassword />
        <BoardTile name='Board name 1' date='1 Jan 2022' cardCount={2} hasPassword />

        <ContextMenu id='5'>
          <ContextMenuItem name={t('setPassword')} icon='lock' />
          <ContextMenuItem name={t('deleteBoard')} icon='delete' />
        </ContextMenu>
        <BoardColumn />
      </Layout>

      <br />
      <Button>Continue</Button>
      <br />
      <Button disabled>Continue</Button>
      <br />
      <Button icon='crop_original'>Continue</Button>
      <br />
      <Button icon='crop_original' disabled>Continue</Button>
      <br />
      <Button text>Continue</Button>
      <br />
      <Button text disabled>Continue</Button>
      <br />
      <Button text icon='crop_original'>Continue</Button>
      <br />
      <Button text icon='crop_original' disabled>Continue</Button>
      <br />
    </div>
  )
}

export async function getServerSideProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}
