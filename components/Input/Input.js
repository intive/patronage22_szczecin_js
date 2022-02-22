import { InputComponent } from './style'
import CharacterCounter from '../CharacterCounter/CharacterCounter'

export default function Input (props) {
  return (
    <>
      <InputComponent {...props} />
      {props.maxLength ? <CharacterCounter inputValue={props.value} maxCharacters={props.maxLength} /> : null}
    </>
  )
}
