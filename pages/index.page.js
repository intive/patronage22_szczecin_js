import Head from 'next/head'
import Layout from '../components/layout/layout'

export default function Home () {
  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <h1>
          PATRONAGE22 SZCZECIN JS
        </h1>
      </Layout>
    </div>
  )
}
