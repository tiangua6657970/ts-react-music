import { useState, useRef, useEffect, TouchEvent, MouseEvent } from 'react'
import { Wrapper } from './styled'

interface Props {
  progress: number
  progressChanging: (progress: number) => void
  progressChanged: (progress: number) => void
}

interface Touch {
  x1: number
  beginWidth: number
}

const PROGRESSBTNWIDTH = 16
const ProgressBar = (props: Props) => {
  const {progress, progressChanged, progressChanging} = props;
  const [offset, setOffset] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const touch = useRef<Touch>({x1: 0, beginWidth: 0})
  useEffect(() => {
    _setOffset(progress)
    return () => {

    }
  }, [progress]);

  function _setOffset(progress: number) {
    const barWidth = wrapperRef.current!.clientWidth - PROGRESSBTNWIDTH
    setOffset(barWidth * progress)
  }

  function TouchStart(e: TouchEvent<HTMLDivElement>) {
    touch.current!.x1 = e.touches[0].pageX
    touch.current!.beginWidth = progressRef.current!.clientWidth
  }

  function TouchMove(e: TouchEvent<HTMLDivElement>) {
    const delta = e.touches[0].pageX - touch.current!.x1
    const tempWidth = touch.current!.beginWidth + delta
    const barWidth = wrapperRef.current!.clientWidth - PROGRESSBTNWIDTH
    const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
    setOffset(barWidth * progress)
    progressChanging(progress)
  }

  function TouchEnd() {
    const barWidth = wrapperRef.current!.clientWidth - PROGRESSBTNWIDTH
    const progress = progressRef.current!.clientWidth / barWidth
    progressChanged(progress)
  }

  function click(e: MouseEvent<HTMLDivElement>) {
    const rect = wrapperRef.current!.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    const barWidth = wrapperRef.current!.clientWidth - PROGRESSBTNWIDTH
    const progress = offsetWidth / barWidth
    progressChanged(progress)
  }

  const progressStyle = {width: `${offset}px`}
  const btnStyle = {transform: `translate3d(${offset}px,0,0)`}
  return (
    <Wrapper ref={wrapperRef} onClick={click}>
      <div className="bar-inner">
        <div className="progress" style={progressStyle} ref={progressRef}/>
        <div
          className="progress-btn-wrapper"
          style={btnStyle}
          onTouchStart={TouchStart}
          onTouchMove={TouchMove}
          onTouchEnd={TouchEnd}
        >
          <div className="progress-btn"/>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProgressBar
