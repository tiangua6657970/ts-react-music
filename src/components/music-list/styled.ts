import styled from "styled-components";
import {
  color_background,
  color_text,
  color_theme,
  font_size_large,
  font_size_large_x,
  font_size_medium_x, font_size_small
} from "../../assets/js/style-const";
import { noWrap } from '../../assets/js/style-mixins'

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
`
export const Back = styled.div`
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 20;
  transform: translateZ(2px);
  .icon-back{
    display: block;
    padding: 10px;
    font-size: ${font_size_large_x};
    color: ${color_theme};
  }
`
export const Title = styled.h1`
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  z-index: 20;
  transform: translateZ(2px);
  ${noWrap()};
  text-align: center;
  line-height: 40px;
  font-size: ${font_size_large};
  color: ${color_text};
`
export const BgImage = styled.div`
  position: relative;
  width: 100%;
  transform-origin: top;
  background-size: cover;
`
export const PlayBtnWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  z-index: 10;
  width: 100%;
`
export const PlayBtn = styled.div`
  box-sizing: border-box;
  width: 135px;
  padding: 7px 0;
  margin: 0 auto;
  text-align: center;
  border: 1px solid ${color_theme};
  color: ${color_theme};
  border-radius: 100px;
  font-size: 0;
  .icon-play{
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: ${font_size_medium_x};
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: ${font_size_small};
  }
`
export const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7,17,27,0.4);
`
export const SongListWrapper = styled.div`
  padding: 20px 30px;
  background: ${color_background};
`
