import { useRef } from 'react'
import styled from "styled-components"
import { bgImg } from "../../../assets/js/style-mixins"
import noResult2x from './no-result@2x.png'
import noResult3x from './no-result@3x.png'
import { color_text_d, font_size_medium } from "../../../assets/js/style-const"
import { useLoading } from "./index"

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  .no-result-content{
    text-align: center;
    .icon{
      width: 86px;
      height: 90px;
      margin: 0 auto;
      background-image: url(${bgImg(noResult2x, noResult3x)});
      background-size: 86px 90px;
    }
    .text{
      margin-top: 30px;
      font-size: ${font_size_medium};
      color: ${color_text_d};
    }
  }
`

interface Props {
  title?: string
  show: boolean
}

const NoResult = (props: Props) => {
  const {title = '抱歉，没有结果', show} = props
  const wrapperRef = useRef<HTMLDivElement>(null)
  useLoading(wrapperRef)
  if (!show) return null
  return (
    <Wrapper ref={wrapperRef}>
      <div className="no-result-content">
        <div className="icon"/>
        <p className="text">{title}</p>
      </div>
    </Wrapper>
  )
}

export default NoResult
