import { useRef, useState, useEffect, RefObject } from 'react'
import { Wrapper, SliderGroup, SliderPage, DotsWrapper, Dot } from './styled'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

interface Sliders {
  id: string,
  link: string
  pic: string
}

interface Props {
  sliders: Sliders[]
}

function useSlider(wrapperRef: RefObject<HTMLElement>) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  let slider: BScroll
  useEffect(() => {
    slider = new BScroll(wrapperRef.current!, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })
    slider.on('slideWillChange', (page: any) => {
      setCurrentPageIndex(page.pageX)
    })
    return () => {
      slider.destroy()
    }
  }, [])
  // @ts-ignore
  return {currentPageIndex, slider}
}

const Slider = ({sliders}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const {currentPageIndex} = useSlider(rootRef)
  return (
    <Wrapper ref={rootRef}>
      <SliderGroup>
        {
          sliders.map(slider => (
            <SliderPage key={slider.id}>
              <a href={slider.link}>
                <img src={slider.pic} alt=""/>
              </a>
            </SliderPage>
          ))
        }
      </SliderGroup>
      <DotsWrapper>
        {
          sliders.map((slider, index) => (
            <Dot className={index === currentPageIndex ? 'active' : ''} key={slider.id}/>
          ))
        }
      </DotsWrapper>
    </Wrapper>
  )
}

export default Slider
