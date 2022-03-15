import styled from 'styled-components'
import CharacterCounter from '../CharacterCounter/CharacterCounter'

export const Subtitle = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
  text-align: center;
  color: #7E7E7E;
`

export const TextInput = styled.input`
  border: none;
  border-bottom: 1px solid #7E7E7E;
  outline: none;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  caret-color: #515151;
  color: #515151;
}
`

export const CharacterCounterStyled = styled(CharacterCounter)`
  width:100%;
`
