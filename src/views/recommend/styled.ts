import styled from "styled-components";
import { color_text, color_text_d, color_theme, font_size_medium } from "../../assets/js/style-const";

export const Wrapper = styled.div<W>`
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: ${props => props.hasPlay ? 60 : 0}px;
  overflow: scroll;
  .recommend-content{
    height: 00%;
    overflow: hidden;
  }
`
export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 40%;
  overflow: hidden;
`
export const SliderContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`
export const RecommendList = styled.div`
  .list-title{
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: ${font_size_medium};
    color: ${color_theme};
  }
  .item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon{
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: ${font_size_medium};
    }
    .name{
      margin-bottom: 10px;
      color: ${color_text};
    }
    .title{
      color: ${color_text_d};
    }
  }
`
