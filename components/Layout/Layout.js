import { useTranslation } from 'next-i18next'
import Header from '../Header/Header'

export default function Layout (props) {
  const { t } = useTranslation('common')

  return (
    <>
      <Header title={t('headerTitle')} />
      {props.children}
    </>
  )
}
