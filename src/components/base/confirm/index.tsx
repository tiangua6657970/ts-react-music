import { useState, forwardRef, useImperativeHandle, memo, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from "react-transition-group"
import { Wrapper, InnerWrapper, ConfirmContent } from './styled'


interface Props {
  text?: string
  confirmBtnText?: string
  cancelBtnText?: string
  confirmFu?: Function
  cancelFu?: Function
}

const Confirm = (props: Props, refMe: any) => {
  const {
    confirmBtnText = '确定', cancelBtnText = '取消', text = '',
    confirmFu, cancelFu
  } = props
  const [visible, setVisible] = useState(false)
  useImperativeHandle(refMe, () => ({show}))

  function show() {
    setVisible(true)
  }

  function hide() {
    setVisible(false)
  }

  function confirm(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    hide()
    confirmFu && confirmFu()
  }

  function cancel(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    hide()
    cancelFu && cancelFu()
  }

  // CSSTransition的timeout设置得比动画时间短解决out之后闪动的问题
  return createPortal((
    <CSSTransition
      timeout={250}
      in={visible}
      mountOnEnter
      classNames="confirm-fade"
    >
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <InnerWrapper>
          <ConfirmContent className="confirm-content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate-btn left" onClick={confirm}>{confirmBtnText}</div>
              <div className="operate-btn" onClick={cancel}>{cancelBtnText}</div>
            </div>
          </ConfirmContent>
        </InnerWrapper>
      </Wrapper>
    </CSSTransition>
  ), document.body)
}

export default memo(forwardRef(Confirm))
