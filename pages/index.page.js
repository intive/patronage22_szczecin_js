import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BoardTile from '../components/BoardTile/BoardTile'
import Button from '../components/Button/Button'

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export default function Home () {
  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Layout>
        <BoardTile name='Board name 1' date='1 Jan 2022' cardCount={0} hasPassword />
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
