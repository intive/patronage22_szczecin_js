import { BoardsContextProvider } from '../store/boards-context'
import BoardTilesList from '../components/BoardTilesList/BoardTilesList'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { getBoards } from '../services/internal-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import Button from '../components/Button/Button'
import Toast from '../components/Toast/Toast'

export default function Home ({ tilesList }) {
  const [isOpenSuccessToast, setIsOpenSuccessToast] = useState(false)
  const [isOpenErrorToast, setIsOpenErrorToast] = useState(false)

  const onShowFirstToastHandler = () => {
    setIsOpenSuccessToast(!isOpenSuccessToast)
  }

  const onShowSecondToastHandler = () => {
    setIsOpenErrorToast(!isOpenErrorToast)
  }

  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
      </Head>
      <Layout>
        <BoardsContextProvider boards={tilesList}>
          <BoardTilesList />
          <br />
          <Button onClick={onShowFirstToastHandler}>Show Success Toast</Button>
          <br />
          <Button onClick={onShowSecondToastHandler}>Show Error Toast</Button>
          {isOpenSuccessToast && <Toast isOpen type='success'>Board added successfully</Toast>}
          {isOpenErrorToast && <Toast isOpen>Failed to add board</Toast>}
        </BoardsContextProvider>
      </Layout>
    </div>
  )
}

export async function getServerSideProps (ctx) {
  const resData = await getBoards()

  return {
    props: {
      tilesList: resData.data,
      ...(await serverSideTranslations(ctx.locale, ['common', 'modals']))
    }
  }
}
