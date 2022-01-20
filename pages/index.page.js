import Head from 'next/head'
import Icon from '../components/Icon'

export default function Home () {
  return (
    <div className='container'>
      <Head>
        <title>Retro Board - Szczecin JS</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
      </Head>

      <main>
        <h1>
          PATRONAGE22 SZCZECIN JS
        </h1>
        <p>
          Material Icons <Icon name='tag_faces' styleClass='' />
        </p>
      </main>
    </div>
  )
}
