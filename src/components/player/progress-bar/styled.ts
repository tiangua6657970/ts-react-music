import styled from "styled-components";
import { color_text, color_theme } from "../../../assets/js/style-const";

export const Wrapper = styled.div`
  height: 30px;
  .bar-inner{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0,0,0,0.3);
    .progress{
      position: absolute;
      height: 100%;
      background: ${color_theme};
    }
    .progress-btn-wrapper{
       position: absolute;
       left: -8px;
       top: -13px;
       width: 30px;
       height: 30px;
       .progress-btn{
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${color_text};
        border-radius: 50%;
        background: ${color_theme};
       }
    }
  }
`
