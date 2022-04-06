import { StyledButton, Column, ColumnCardTitle, ColumnAddCardWrapper, ColumnCard, ColumnCardText, ColumnCardName, StyledIcon } from './style'
import { useState, useReducer, useRef, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import TextArea from '../TextArea/TextArea'
import ColumnsContext from '../../store/columns-context'
import { addCard } from '../../services/internal-api'

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

  const columnsCtx = useContext(ColumnsContext)
  const refreshOnSuccess = data => data.status === 204 && columnsCtx.reload()
  const addCardHandler = async (boardId, columnId, text) => {
    try {
      refreshOnSuccess(await addCard(boardId, columnId, text))
    } catch (error) {

    }
  }

  const handleSaveCard = (event) => {
    event.preventDefault()
    dispatch({ type: 'save' })
    addCardHandler(props.boardId, props.id, { text: cardTextValue })
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
      {props.cards
        ? (
          <div>
            {props.cards.map((card) => (
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
