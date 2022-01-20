import Head from 'next/head'
import Icon from '../components/Icon'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export default function Home () {
  const { t } = useTranslation('common')

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
        <p>
          {t('next-i18next-example-key')}
        </p>
      </main>
    </div>
  )
}
