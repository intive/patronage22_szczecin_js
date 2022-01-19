import styled from 'styled-components'

export default function Header () {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14.14 11.86L11.14 15.73L9 13.14L6 17H18L14.14 11.86Z' fill='black' />
        </svg>
        <HeaderTitleText>My Retro Board</HeaderTitleText>
      </HeaderTitle>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 72px;
  padding: 12px 40px;
  background: #FFFFFF;
`
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  `

const HeaderTitleText = styled.p`
  margin: 0 0 0 11px;
  color: #222222;
`
