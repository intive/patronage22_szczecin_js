import { Subtitle, TextInput } from './style'
import { useTranslation } from 'next-i18next'

const BoardCreatorWizard = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Subtitle>{t('createNewBoard.createNewBoardSubtitle')}</Subtitle>
      <TextInput autoFocus type='text' />
    </>
  )
}

export default BoardCreatorWizard
