import { useState, useRef, useEffect, RefObject } from 'react'
import BScroll from '@better-scroll/core'
import PullUp from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(PullUp)
BScroll.use(ObserveDOM)
export default function usePullUpLoad(requestData: () => void, preventPullUpLoad: RefObject<boolean>) {
  const scrollRef = useRef<BScroll>()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isPullUpLoad, setIsPullUpLoad] = useState(false)
  useEffect(() => {
    const scrollVal = scrollRef.current = new BScroll(rootRef.current!, {
      pullUpLoad: true, observeDOM: true, click: true
    })
    scrollVal.on('pullingUp', PullingUpHandler)
    return () => {
      scrollVal.destroy()
    }
  }, [])

  async function PullingUpHandler() {
    console.log(preventPullUpLoad.current, 'preventPullUpLoad.current')
    if (preventPullUpLoad.current) {
      scrollRef.current?.finishPullUp()
      return
    }
    setIsPullUpLoad(true)
    await requestData()
    scrollRef.current?.finishPullUp()
    scrollRef.current?.refresh()
    setIsPullUpLoad(false)
  }

  return {
    rootRef,
    scrollRef,
    isPullUpLoad
  }
}
