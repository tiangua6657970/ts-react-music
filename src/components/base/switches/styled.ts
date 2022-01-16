import styled from "styled-components";
import {
  color_highlight_background, color_text, color_text_d, font_size_medium
} from "../../../assets/js/style-const";

interface W {
  width?: number
}

export const Wrapper = styled.ul<W>`
  display: flex;
  position: relative;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid ${color_highlight_background};
  border-radius: 5px;
`

interface SI {
  active: boolean
}

export const SwitchItem = styled.li<SI>`
  position: relative;
  z-index: 10;
  flex: 1;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: ${font_size_medium};
  color: ${props => props.active ? color_text : color_text_d};
`

export const ActiveBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 120px;
  height: 30px;
  transition: transform 0.3s;
  border-radius: 5px;
  background: ${color_highlight_background};
`
