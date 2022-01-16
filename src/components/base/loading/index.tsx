import { useRef, useEffect, RefObject } from 'react'
import styled from 'styled-components'
import { color_text_l, font_size_small } from '../../../assets/js/style-const'
import loading from './loading.gif'
import { addClass, removeClass } from '../../../assets/js/dom'

const relativeCls = 'g-relative'
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  .loading-content{
    text-align: center;
    .desc{
      line-height: 20px;
      font-size: ${font_size_small};
      color: ${color_text_l};
    }
  }
`

interface Props {
  title?: string
  show: boolean
}

export function useLoading(WrapperRef: RefObject<HTMLDivElement>) {
  const wrapperParentRef = useRef<any>(null)
  useEffect(() => {
    if (WrapperRef.current?.parentElement) {
      const wrapperParent = WrapperRef.current.parentElement
      const wrapperParentStyle = getComputedStyle(wrapperParent)
      if (['absolute', 'fixed', 'relative'].indexOf(wrapperParentStyle.position) === -1) {
        addClass(wrapperParent, relativeCls)
      }
      wrapperParentRef.current = wrapperParent
    }
    return () => {
      if (wrapperParentRef.current) {
        removeClass(wrapperParentRef.current, relativeCls)
      }
    }
  }, [])

  return
}

const Loading = (props: Props) => {
  const {title = '正在载入...', show} = props
  const WrapperRef = useRef<HTMLDivElement>(null)
  useLoading(WrapperRef)
  if (!show) return null
  return (
    <Wrapper ref={WrapperRef}>
      <div className="loading-content">
        <img width={24} height={24} src={loading} alt=""/>
        <p className="desc">{title}</p>
      </div>
    </Wrapper>
  )
}

export default Loading
