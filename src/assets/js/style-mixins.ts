import { css } from 'styled-components'

export function bgImg(xx: string, xxx: string) {
  return window.devicePixelRatio === 2 ? xx : xxx
}

export function noWrap() {
  return css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
}

export function extendClick() {
  return css`
  position: relative;
  &:before{
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
`
}
