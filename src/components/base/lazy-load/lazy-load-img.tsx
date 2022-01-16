import { memo, ReactElement } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import defaultImg from '../../../assets/images/default.png'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'

interface Props {
  width?: number
  height?: number
  scr: string
  placeholder?: ReactElement
  placeholderSrc?: string
  className?: string
  effect?: 'blur' | 'black-and-white' | 'opacity'
}

const LazyLoadImg = (props: Props) => {
  const {width, height, scr, placeholder, placeholderSrc, className, effect} = props
  return (
    <LazyLoadImage
      width={width}
      height={height}
      src={scr}
      placeholderSrc={placeholderSrc || defaultImg}
      placeholder={placeholder && placeholder}
      className={className}
      effect={effect}
    />
  )
}

export default memo(LazyLoadImg)
