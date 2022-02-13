import { BoardsContextProvider } from '../store/boards-context'
import BoardTilesList from '../components/BoardTilesList/BoardTilesList'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { getBoards } from '../services/internal-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BoardColumn from '../components/BoardColumn/BoardColumn'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Button from '../components/Button/Button'
import Toast from '../components/Toast/Toast'

const SetPasswordModal = dynamic(() => import('../components/SetPasswordModal/SetPasswordModal'))

export default function Home ({ tilesList }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSuccessToast, setIsOpenSuccessToast] = useState(false)
  const [isOpenErrorToast, setIsOpenErrorToast] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

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
          <BoardTilesList tilesList={tilesList} />
          <BoardColumn />
          <br />
          <Button onClick={handleOpen}>Click to Open Modal</Button>
          <SetPasswordModal handleClose={handleClose} isOpen={isOpen} />
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
