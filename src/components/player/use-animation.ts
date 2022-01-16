import { useRef, useState } from 'react'
import animations from 'create-keyframe-animation'

// 考虑极端情况，手动执行完动画
let entering = false
let exiting = false
export default function useAnimation() {
  const cdWrapperRef = useRef<HTMLDivElement>(null)

  function enter() {
    if (exiting) exited()
    entering = true
    const {scale, x, y} = getPosAndScale()
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      100: {
        transform: `translate3d(0,0,0) scale(1)`
      }
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: `cubic-bezier(0.45,0,0.55,1)`
      }
    })
    animations.runAnimation(cdWrapperRef.current, 'move', entered)
  }

  function entered() {
    entering = false
    animations.unregisterAnimation('move')
  }

  function exit() {
    if (entering) entered()
    exiting = true
    const {scale, x, y} = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.current!
    cdWrapperEl.style.transition = 'all,0.6s cubic-bezier(0.45,0,0.55,1)'
    cdWrapperEl.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
    cdWrapperEl.addEventListener('transitionend', next)

    function next() {
      cdWrapperEl.removeEventListener('transitionend', next)
      exited()
    }
  }

  function exited() {
    exiting = false
    const cdWrapperEl = cdWrapperRef.current!
    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }

  function getPosAndScale() {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    const scale = targetWidth / width
    return {
      x, y, scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    entered,
    exit,
    exited
  }
}
