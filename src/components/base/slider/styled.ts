import styled from "styled-components";
import { color_text_l, color_text_ll } from "../../../assets/js/style-const";

export const Wrapper = styled.div`
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
`
export const SliderGroup = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
`
export const SliderPage = styled.div`
  display: inline-block;
  transform: translate3d(0,0,0);
  backface-visibility: hidden;
  a{
    display: block;
    width: 100%;
  }
  img{
    display: block;
    width: 100%;
  }
`
export const DotsWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 12px;
  line-height: 12px;
  transform: translateX(-50%);
`
export const Dot = styled.div`
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  transform: translateZ(1px);
  border-radius: 50%;
  background: ${color_text_l};
  &.active{
    width: 20px;
    border-radius: 5px;
    background: ${color_text_ll};
  }
`
