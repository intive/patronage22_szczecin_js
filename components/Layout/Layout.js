import { Wrapper } from './style'
import { useTranslation } from 'next-i18next'
import Header from '../Header/Header'
import BoardHeader from '../BoardHeader/BoardHeader'

export default function Layout (props) {
  const { t } = useTranslation('common')

  return (
    <>
      <Header title={t('headerTitle')} />
      <BoardHeader returnLinkText={t('boardHeader.returnLinkText')} buttonText={t('boardHeader.buttonText')} title='Board name 1' />
      <Wrapper>{props.children}</Wrapper>
    </>
  )
}
