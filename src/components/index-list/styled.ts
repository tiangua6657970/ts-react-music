import styled from "styled-components";
import WrapScroll from "../wrap-scroll";
import {
  color_background,
  color_background_d,
  color_highlight_background,
  color_text_l, color_theme, font_size_medium,
  font_size_small
} from "../../assets/js/style-const";

export const ScrollWrapper = styled(WrapScroll)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${color_background};
`

export const GroupWrapper = styled.ul`
  .group{
    padding-bottom: 30px;
    .title{
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: ${font_size_small};
      color: ${color_text_l};
      background: ${color_highlight_background};
    }
    .item{
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name{
        margin-left: 20px;
        color: ${color_text_l};
        font-size: ${font_size_medium};
      }
    }
  }
`

interface FixedProps {
  show: boolean
}

export const Fixed = styled.div<FixedProps>`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .fixed-title{
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: ${font_size_small};
    color: ${color_text_l};
    background: ${color_highlight_background};
  }
`
export const Shortcut = styled.div`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: ${color_background_d};
  font-family: Helvetica;
  .item{
    padding: 3px;
    line-height: 1;
    color: ${color_text_l};
    font-size: ${font_size_small};
    &.current{
      color: ${color_theme}; 
    }
  }
`
