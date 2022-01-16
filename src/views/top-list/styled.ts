import styled from "styled-components";
import { color_highlight_background, color_text_d, font_size_small } from "../../assets/js/style-const";
import { noWrap } from "../../assets/js/style-mixins";

export const Wrapper = styled.div<W>`
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: ${props => props.hasPlay ? 60 : 0}px;
`
export const Item = styled.li`
 display: flex;
 margin: 0 20px;
 padding-top: 20px;
 height: 100px;
 &:last-child{
   padding-bottom: 20px;
 }
`
export const Icon = styled.div`
  flex: 0 0 100px;
  width: 100px;
  height: 100px;
`
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  height: 100px;
  overflow: hidden;
  background: ${color_highlight_background};
  color: ${color_text_d};
  font-size: ${font_size_small};
`
export const Song = styled.li`
  ${noWrap()};
  line-height: 26px;
`
