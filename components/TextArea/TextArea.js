import { forwardRef } from 'react'
import { StyledTextareaAutosize } from './style'

// eslint-disable-next-line react/display-name
const TextArea = forwardRef((props, ref) => {
  return (
    <StyledTextareaAutosize ref={ref} onChange={props.onChange} />
  )
})

export default TextArea
