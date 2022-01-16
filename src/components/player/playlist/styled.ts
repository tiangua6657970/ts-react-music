import styled from "styled-components"
import Scroll from "../../base/scroll"

import {
  color_background,
  color_background_d,
  color_highlight_background, color_sub_theme,
  color_text_d,
  color_text_l, color_theme,
  color_theme_d,
  font_size_medium, font_size_medium_x, font_size_small
} from "../../../assets/js/style-const"
import { extendClick, noWrap } from "../../../assets/js/style-mixins";

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background: ${color_background_d};
  &.list-fade-exit-done{
    display: none;
  }
  &.list-fade-enter,
  &.list-fade-exit-done{
    opacity: 0;
    .list-wrapper{
      transform: translate3d(0,100%,0);
    }
  }
  &.list-fade-enter-active{
    opacity: 1;
    transition: opacity .3s;
    .list-wrapper{
      transform: translate3d(0,0,0);
      transition: all .3s;
    }
  }
  &.list-fade-exit{
    opacity: 1;
     .list-wrapper{
       transform: translate3d(0,0,0);
     }
  }
  &.list-fade-exit-active{
    opacity: 0;
    transition: opacity .3s;
    .list-wrapper{
      transform: translate3d(0,100%,0);
      transition: all .3s;
    }
  }
`
export const ListWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 210;
  width: 100%;
  background: ${color_highlight_background};
`
export const ListHeader = styled.div`
  position: relative;
  padding: 20px 30px 10px 20px;
  .title{
    display: flex;
    align-items: center;
    .icon{
      margin-right: 10px;
      font-size: 24px;
      color: ${color_theme_d};
    }
    .text{
      flex: 1;
      font-size: ${font_size_medium};
      color: ${color_text_l};
    }
    .clear{
      ${extendClick()};
      .icon-clear{
        font-size: ${font_size_medium};
        color: ${color_text_d};
    }
  }
  }
`
export const ListContent = styled(Scroll)`
  max-height: 240px;
  overflow: hidden;
`
export const ListItem = styled.li`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 30px 0 20px;
  .current{
    flex: 0 0 20px;
    width: 20px;
    font-size: ${font_size_small};
    color: ${color_theme_d};
  }
  .text{
    flex: 1;
    ${noWrap()};
    font-size: ${font_size_medium};
    color: ${color_text_d};
  }
  .favorite{
    ${extendClick()};
    margin-right: 15px;
    font-size: ${font_size_small};
    color: ${color_theme};
    .icon-favorite{
      color: ${color_sub_theme};
    }
  }
  .delete{
    ${extendClick()};
    font-size: ${font_size_small};
    color: ${color_theme};
    &.disable{
      color: ${color_theme_d};
    }
  }
`
export const ListAdd = styled.div`
  width: 140px;
  margin: 20px auto 30px auto;
  .add{
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid ${color_text_l};
    border-radius: 100px;
    color: ${color_text_l};
    .icon-add{
      margin-right: 5px;
      font-size: ${font_size_small};
    }
    .text{
      font-size: ${font_size_small};
    }
  }
`
export const ListFooter = styled.div`
  text-align: center;
  line-height: 50px;
  background: ${color_background};
  font-size: ${font_size_medium_x};
  color: ${color_text_l};
`
