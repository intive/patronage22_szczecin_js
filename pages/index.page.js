import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home () {
  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
      </Head>
      <Layout />
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
