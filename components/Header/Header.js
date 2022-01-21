import { HeaderContainer, HeaderWrapper, HeaderTitle, HeaderTitleText } from './style'
import Icon from '../Icon/Icon'
import Link from 'next/link'

export default function Header (props) {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Link href='/'>
          <HeaderTitle>
            <Icon name='crop_original' />
            <HeaderTitleText>{props.title}</HeaderTitleText>
          </HeaderTitle>
        </Link>
      </HeaderWrapper>
    </HeaderContainer>
  )
}
