import BoardTilesList from '../components/BoardTilesList/BoardTilesList'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { getBoards } from '../services/internal-api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BoardColumn from '../components/BoardColumn/BoardColumn'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Button from '../components/Button/Button'
import Link from 'next/link'
import { BoardsWrapper } from '../components/BoardHeader/style'

const SetPasswordModal = dynamic(() => import('../components/SetPasswordModal/SetPasswordModal'))

export default function Home ({ tilesList }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
      </Head>
      <Layout>
        <BoardTilesList tilesList={tilesList} />
        <BoardColumn />
        <br />
        <Button onClick={handleOpen}>Click to Open Modal</Button>
        <SetPasswordModal handleClose={handleClose} isOpen={isOpen} />
        <br />
        <h2>Boards from db</h2>
        {tilesList.map((board) => (
          <Link href={`/boards/${board.id}`} key={board.id}>
            <a>
              <BoardsWrapper>{board.name}</BoardsWrapper>
            </a>
          </Link>
        ))}
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
