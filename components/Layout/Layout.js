import { Wrapper } from './style'
import Header from '../Header/Header'
import { useTranslation } from 'next-i18next'

export default function Layout (props) {
  const { t } = useTranslation('common')

  return (
    <>
      <Header title={t('headerTitle')} />
      <Wrapper>{props.children}</Wrapper>
    </>
  )
}
