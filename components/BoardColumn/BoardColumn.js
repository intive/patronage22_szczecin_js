import { StyledButton, Column, ColumnCardTitle, ColumnAddCardWrapper, ColumnCard, ColumnCardText, ColumnCardName, StyledIcon } from './style'
import { useState, useReducer, useRef, useEffect } from 'react'
import { deleteCard } from '../../services/internal-api'
import { useTranslation } from 'next-i18next'
import { ulid } from 'ulid'
import TextArea from '../TextArea/TextArea'

const BoardColumn = (props) => {
  const { t } = useTranslation('common')

  function init (initialText) {
    return { cardTextValue: initialText }
  }

  function reducer (state, action) {
    switch (action.type) {
      case 'change':
        return { ...state, cardTextValue: action.payload }
      case 'save':
        return { cardTextValue: '' }
      case 'reset':
        return init(action.payload)
      default:
        throw new Error()
    }
  }

  const [isInCreateCardMode, setIsInCreateCardMode] = useState(false)
  const [cards, setCards] = useState(props.cards || [])

  const [state, dispatch] = useReducer(reducer, init)
  const { cardTextValue } = state

  const textAreaRef = useRef(null)

  useEffect(() => {
    if (isInCreateCardMode) {
      textAreaRef.current.focus()
    }
  }, [isInCreateCardMode])

  const handleOnChange = (event) => {
    dispatch({ type: 'change', payload: event.target.value })
  }

  const handleSaveCard = (event) => {
    event.preventDefault()
    dispatch({ type: 'save' })
    addCard(event)
    setIsInCreateCardMode(false)
  }

  const handleCancelCard = (event) => {
    event.preventDefault()
    dispatch({ type: 'reset' })
    setIsInCreateCardMode(false)
  }

  async function handleDeleteCard (boardId, columnId, cardId) {
    await deleteCard(boardId, columnId, cardId)
  }

  const switchToCreateCardMode = () => {
    setIsInCreateCardMode(true)
  }

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: ulid(),
        text: cardTextValue,
        author: 'Isaak Newton'
      }
    ])
  }

  return (
    <Column>
      <ColumnCard>
        <ColumnCardTitle>{props.name}</ColumnCardTitle>
        {isInCreateCardMode
          ? (
            <>
              <TextArea value={cardTextValue} name='cardTextValue' onChange={handleOnChange} ref={textAreaRef} maxLength='300' />
              <ColumnAddCardWrapper right>
                <StyledButton text onClick={handleCancelCard}>{t('buttons.cancel')}</StyledButton>
                <StyledButton text disabled={!cardTextValue || cardTextValue.trim().length < 5} onClick={handleSaveCard}>{t('buttons.save')}</StyledButton>
              </ColumnAddCardWrapper>
            </>
            )
          : <StyledButton text outline onClick={switchToCreateCardMode}>{t('boardColumn.addCard')}</StyledButton>}
      </ColumnCard>
      {cards
        ? (
          <div>
            {cards.map((card) => (
              <ColumnCard key={card.id} card>
                <ColumnCardText>{card.text}</ColumnCardText>
                <ColumnAddCardWrapper>
                  <ColumnCardName>{card.author}</ColumnCardName>
                  <StyledIcon name='delete_forever' onClick={() => handleDeleteCard(props.boardId, props.columnId, card.id)} />
                </ColumnAddCardWrapper>
              </ColumnCard>
            ))}
          </div>
          )
        : null}
    </Column>
  )
}

export default BoardColumn
