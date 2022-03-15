import { Subtitle, TextInput, CharacterCounterStyled } from './style'
import { useTranslation } from 'next-i18next'

const BoardCreatorWizard = ({ onChange, maxLength, value }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <Subtitle>{t('createNewBoard.createNewBoardSubtitle')}</Subtitle>
      <TextInput autoFocus type='text' onChange={onChange} maxLength={maxLength} />
      {maxLength ? <CharacterCounterStyled inputValue={value} maxCharacters={maxLength} /> : null}
    </>
  )
}

export default BoardCreatorWizard
