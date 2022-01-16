import {
  useRef, useEffect, memo, CSSProperties,
  forwardRef, useImperativeHandle, RefObject
} from 'react'
import BScroll from '@better-scroll/core'
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(ObserveDOM)

interface ScrollProps {
  children: any,
  wrapperStyle?: CSSProperties
  onScroll?: Function
  toTarget?: HTMLElement | Element
  click?: boolean
  probeType?: number,
  className?: string
}


function useScroll(options: ScrollProps, wrapperRef: RefObject<HTMLElement>) {
  const {probeType = 0, click = true, toTarget, onScroll} = options
  const scroll = useRef<BScroll>()
  useEffect(() => {
    const scrollVal = scroll.current = new BScroll(wrapperRef.current!, {
      observeDOM: true,
      probeType,
      click
    })
    if (probeType && probeType > 0) {
      scrollVal.on('scroll', (pos: Pos) => {
        onScroll && onScroll(pos)
      })
    }
    toTarget && scrollVal.scrollToElement((toTarget as HTMLElement), 0, false, false)
    return () => {
      scrollVal.destroy()
    }
  }, [toTarget])

  return {scroll}
}

const Scroll = (props: ScrollProps, scrollRef: any) => {
  const {
    children, wrapperStyle, className
  } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const {scroll} = useScroll(props, rootRef)
  useImperativeHandle(scrollRef, () => scroll)
  return (
    <div className={className} style={wrapperStyle} ref={rootRef}>
      {
        children
      }
    </div>
  )
}

export default memo(forwardRef(Scroll))
