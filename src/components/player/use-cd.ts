import { useRef, useEffect, useState } from 'react'

export default function useCd(playing: boolean) {
  const cdRef = useRef<HTMLDivElement>(null)
  const cdImageRef = useRef<HTMLImageElement>(null)
  const [cdCls, setCdCls] = useState('');
  useEffect(() => {
    // 因为缩放动画的原因，未播放状态是没有渲染的，所以要判断
    if (cdRef.current, cdImageRef.current) {
      if (!playing) {
        syncTransform(cdRef.current!, cdImageRef.current!)
        setCdCls('')
      } else {
        setCdCls('playing')
      }
    }
  }, [playing])

  function syncTransform(wrapper: HTMLElement, inner: HTMLElement) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none'
      ? innerTransform : innerTransform.concat('', wrapperTransform)
  }

  return {cdRef, cdImageRef, cdCls}
}
