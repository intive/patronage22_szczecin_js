import styled from 'styled-components'

export const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`

export const StyledContextMenu = styled.div`
  position: relative;
  text-align: right;
`

export const Button = styled.button`
  border: none;
  cursor: pointer;
  padding: 0;
  color: #7e7e7e;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  line-height: 0.5;
  background: none;

  &:hover, &[aria-expanded="true"] {
    background: #f7f7f7;
  }
`

export const Nav = styled.nav`
  display: none;
  position: absolute;
  padding: 0.5rem 0rem;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(98, 98, 98, 0.24);
  border-radius: 4px;
  right: 0px;

  &.active {
    display: block;
  }
`
