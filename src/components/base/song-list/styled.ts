import styled from "styled-components";
import { color_text_d, color_theme, font_size_large, font_size_medium } from "../../../assets/js/style-const";
import { bgImg, noWrap } from "../../../assets/js/style-mixins";
import first2x from './first@2x.png'
import first3x from './first@3x.png'
import second2x from './second@2x.png'
import second3x from './second@3x.png'
import third2x from './third@2x.png'
import third3x from './third@3x.png'

export const List = styled.ul`
  
`
export const Item = styled.li`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 64px;
  font-size: ${font_size_medium};
`
export const Rank = styled.div`
  flex: 0 0 25px;
  width: 25px;
  margin-right: 20px;
  text-align: center;
  .icon{
    display: inline-block;
    width: 25px;
    height: 24px;
    background-size: 25px 24px;
    
    &.icon0{
      background-image: url(${bgImg(first2x, first3x)});
    }
    &.icon1{
      background-image: url(${bgImg(second2x, second3x)});
    }
    &.icon2{
      background-image: url(${bgImg(third2x, third3x)});
    }
  }
  .text{
    color: ${color_theme};
    font-size: ${font_size_large};
  }
`
export const Content = styled.div`
  flex: 1;
  line-height: 20px;
  overflow: hidden;
  .name{
    ${noWrap()};
    color: ${color_text_d};
  }
  .desc{
    ${noWrap()};
    margin-top: 4px;
    color: ${color_text_d};
  }
`
