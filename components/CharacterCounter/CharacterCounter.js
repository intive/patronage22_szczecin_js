import { CounterContainer } from './style'

export default function CharacterCounter ({ inputValue, maxCharacters, className }) {
  return <CounterContainer className={className}>{(inputValue || '').length}/{maxCharacters}</CounterContainer>
}
