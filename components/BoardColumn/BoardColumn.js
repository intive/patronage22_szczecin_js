import { StyledButton, Column, ColumnCardTitle, ColumnAddCardWrapper, ColumnCard, ColumnCardText, ColumnCardName, StyledIcon } from './style'
import { useState, useReducer, useRef, useEffect } from 'react'
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
    <Column data-testid='board-column'>
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
                  <StyledIcon name='favorite_border' />
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
