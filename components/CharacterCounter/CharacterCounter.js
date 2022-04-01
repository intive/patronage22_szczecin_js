import { CounterContainer } from './style'

export default function CharacterCounter ({ inputValue, maxCharacters, className }) {
  return <CounterContainer className={className} data-testid='character-counter'>{(inputValue || '').length}/{maxCharacters}</CounterContainer>
}
