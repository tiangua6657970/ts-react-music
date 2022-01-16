import styled from "styled-components"
import {
  color_highlight_background,
  color_text, color_text_d, color_theme_d,
  font_size_medium,
  font_size_small
} from "../../../assets/js/style-const"
import { noWrap } from "../../../assets/js/style-mixins";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: ${color_highlight_background};
  &.mini-enter-active,&.mini-exit-active{
    transition: all 0.6s cubic-bezier(0.45,0,0.55,1);
  }
  &.mini-enter,&.mini-exit-done{
    opacity: 0;
    transform: translate3d(0,100%,0);
  }
   &.mini-enter-active{
    opacity: 1;
    transform: translate3d(0,0,0);
    transition: all 0.6s cubic-bezier(0.45,0,0.55,1);
   }
   &.mini-exit{
     opacity: 1;
     transform: translate3d(0,0,0);
   }
   &.mini-exit-active{
      opacity: 0;
      transform: translate3d(0,100%,0);
      transition: all 0.6s cubic-bezier(0.45,0,0.55,1);
   }
`
export const CdWrapper = styled.div`
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: 0 10px 0 20px;
  .cd{
    height: 100%;
    width: 100%;
    img{
      border-radius: 50%;
      &.playing{
        animation: rotate 10s linear infinite;
      }
      &.pause{
        animation-play-state: paused;
      }
    }
  }
`
export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
`
export const SliderGroup = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
`
export const SliderPage = styled.div`
  display: inline-block;
  width: 100%;
  transform: translate3d(0,0,0);
  backface-visibility: hidden;
  .name{
    margin-bottom: 2px;
    ${noWrap()};
    font-size: ${font_size_medium};
    color: ${color_text};
  }
  .desc{
    ${noWrap()};
    font-size: ${font_size_small};
    color: ${color_text_d};
  }
`
export const Control = styled.div`
  flex: 0 0 30px;
  width: 30px;
  padding: 0 10px;
  .icon-playlist{
    position: relative;
    top: -2px;
    font-size: 28px;
    color: ${color_theme_d};
  }
  .icon-mini{
    position: absolute;
    left: 0;
    top: 0;
    color: ${color_theme_d};
    font-size: 32px;
  }
`
