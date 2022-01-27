import { InputComponent } from './style'

export default function Input (props) {
  return <InputComponent type={props.type} {...props} />
}
