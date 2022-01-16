import styled, { css } from "styled-components";
import { color_theme, font_size_large } from '../../assets/js/style-const'
import { bgImg } from "../../assets/js/style-mixins";
import logo3x from './logo@3x.png'
import logo2x from './logo@2x.png'

export const Wrapper = styled.div`
  height: 44px;
  text-align: center;
  color: ${color_theme};
  font-size: 0;
  .mine{
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine{
      display: block;
      padding: 12px;
      font-size: ${font_size_large};
      color: ${color_theme};
    }
  }
`
export const Icon = styled.span`
  display: inline-block;
  vertical-align: top;
  margin-top: 6px;
  width: 30px;
  height: 32px;
  margin-right: 9px;
  background-image: url(${bgImg(logo2x, logo3x)});
  background-size: 30px 32px;
`
export const Text = styled.div`
  display: inline-block;
  vertical-align: top;
  line-height: 44px;
  font-size: 18px;
`
