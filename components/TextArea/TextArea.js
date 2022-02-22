import { forwardRef } from 'react'
import { StyledTextareaAutosize } from './style'
import CharacterCounter from '../CharacterCounter/CharacterCounter'

// eslint-disable-next-line react/display-name
const TextArea = forwardRef((props, ref) => {
  return (
    <>
      <StyledTextareaAutosize ref={ref} onChange={props.onChange} maxLength={props.maxLength} />
      {props.maxLength ? <CharacterCounter inputValue={props.value} maxCharacters={props.maxLength} /> : null}
    </>
  )
})

export default TextArea
