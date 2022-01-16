import { memo } from 'react'
import Scroll from "../base/scroll"
import { useEffect, useRef, CSSProperties } from "react"
import { observer } from "mobx-react-lite"
import { usePlayerState } from "../../store"

interface ScrollProps {
  children: any,
  wrapperStyle?: CSSProperties
  onScroll?: Function
  toTarget?: HTMLElement | Element
  click?: boolean
  probeType?: number,
  className?: string
}

interface ScrollProps {
  refresh?: boolean
}

const WrapScroll = (props: ScrollProps) => {
  const scrollRef = useRef<any>()
  const playlist = usePlayerState().playlist
  useEffect(() => {
    scrollRef.current.current.refresh()
  }, [playlist])
  useEffect(() => {
    if (props.refresh)
      scrollRef.current.current.refresh()
  }, [props.refresh])

  return (
    <Scroll{...props} ref={scrollRef}/>
  )
}
export default memo(observer(WrapScroll))
