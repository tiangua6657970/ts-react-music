import { useState, useRef, forwardRef, memo, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { color_dialog_background } from '../../../assets/js/style-const'
import { CSSTransition } from 'react-transition-group'


const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 400;
  background: ${color_dialog_background};
  &.slide-down-enter,&.slider-down-exit-done{
    transform: translate3d(0,-100%,0);
  }
  &.slide-down-enter-active,&.slide-down-exit-active{
    transform: translate3d(0,0,0);
    transition: all 0.3s;
  }
`

interface Props {
  delay?: number
  children?: any
}

const Message = (props: Props, ref: any) => {
  const {delay = 2000, children = '♥♥♥♥♥♥'} = props
  const [visible, setVisible] = useState(false)
  const timer = useRef<any>()
  useImperativeHandle(ref, () => ({show}))

  function show() {
    setVisible(true)
    timer.current = setTimeout(() => {
      hideMe()
    }, delay)
  }

  function hideMe() {
    clearTimeout(timer.current)
    setVisible(false)
  }

  return createPortal((
    <CSSTransition unmountOnExit in={visible} timeout={300} classNames="slide-down">
      <Wrapper>
        {children}
      </Wrapper>
    </CSSTransition>
  ), document.body)
}

export default memo(forwardRef(Message))
