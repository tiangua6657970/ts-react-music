import styled from "styled-components"
import {
  color_background_d,
  color_highlight_background,
  color_text_l,
  font_size_large
} from "../../../assets/js/style-const";

/*
* .fade-enter {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 500ms, transform 500ms;
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 500ms, transform 500ms;
}
*
* */
export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background: ${color_background_d};
  &.confirm-fade-enter{
    opacity: 0;
  }
  &.confirm-fade-enter-active{
    animation: confirm-fadein .3s;
    .confirm-content{
      animation: confirm-zoom-in .3s;
    }
  }
  &.confirm-fade-exit-active{
    animation: confirm-fadeout .3s;
    .confirm-content{
      animation: confirm-zoom-out .3s;
    }
  }
  &.confirm-fade-exit-done{
    display: none;
  }
  @keyframes confirm-fadein{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes confirm-fadeout{
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  @keyframes confirm-zoom-in{
    0%{
      transform: scale(0);
    }
    50%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }
  @keyframes confirm-zoom-out{
    0%{
      transform: scale(1);
    }
    100%{
      transform: scale(0);
    }
  }
`
export const InnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
`
export const ConfirmContent = styled.div`
  width: 270px;
  border-radius: 13px;
  background: ${color_highlight_background};
  .text{
    padding: 19px 15px;
    line-height: 22px;
    text-align: center;
    font-size: ${font_size_large};
    color: ${color_text_l};
  }
  .operate{
    display: flex;
    align-items: center;
    text-align: center;
    font-size: ${font_size_large};
    .operate-btn{
      flex: 1;
      line-height: 22px;
      padding: 10px 0;
      border-top: 1px solid ${color_background_d};
      color: ${color_text_l};
      &.left{
        border-right: 1px solid ${color_background_d};
      }
    }
  }
`
