import { useEffect, useRef, useState } from 'react'
import BScroll from '@better-scroll/core'
import Slide from "@better-scroll/slide"

BScroll.use(Slide)
export default function useMiniSlider(
  fullScreen: boolean, playlist: Song[],
  currentIndex: number, changeCurrentIndex: (index: number) => void
) {
  const sliderWrapperRef = useRef<HTMLDivElement>(null)
  const slider = useRef<BScroll>()
  const sliderShow = !fullScreen && !!playlist.length
  useEffect(() => {
    if (sliderShow) {
      if (!slider.current) {
        slider.current = new BScroll(sliderWrapperRef.current!, {
          click: true, scrollX: true, scrollY: false, momentum: false,
          bounce: false, probeType: 2, slide: {autoplay: false, loop: true}
        })
        slider.current.on('slidePageChanged', ({pageX}: { pageX: number }) => {
          changeCurrentIndex(pageX)
        })
      } else {
        slider.current.refresh()
      }
      slider.current.goToPage(currentIndex, 0, 0)
    }
    return () => {
      // slider.current?.destroy()
    }
  }, [fullScreen])

  useEffect(() => {
    if (slider.current && sliderShow) {
      slider.current!.goToPage(currentIndex, 0, 0)
    }
  }, [currentIndex])
  useEffect(() => {
    if (slider.current && sliderShow && playlist.length) {
      slider.current.refresh()
    }
  }, [playlist])


  return {
    slider,
    sliderWrapperRef
  }
}
