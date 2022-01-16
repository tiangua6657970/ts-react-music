import Scroll from "../../base/scroll";
import styled from "styled-components";
import {
  color_background, color_sub_theme,
  color_text, color_text_l, color_text_ll,
  color_theme, color_theme_d,
  font_size_large,
  font_size_large_x, font_size_medium, font_size_small
} from "../../../assets/js/style-const";
import { noWrap } from "../../../assets/js/style-mixins";

interface Props {
  show: boolean
}

export const Wrapper = styled.div<Props>`
  display: ${props => props.show ? 'block' : ''};
`

// interface NormalPlayer {
//   show: boolean
// }

export const NormalPlayer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: ${color_background};
  &.normal-enter{
    opacity: 0;
    .top{
      transform: translate3d(0,-100px,0);
    }
    .bottom{
      transform: translate3d(0,100px,0);
    }
  }
  &.normal-exit{
    opacity: 1;
    .top,.bottom{
      transform: translate3d(0,0,0);
    }
  }
  &.normal-enter-active{
    transition: all 0.6s;
    opacity: 1;
     .top,.bottom{
      transition: all 0.6s cubic-bezier(0.45,0,0.55,1);
      transform: translate3d(0,0,0);
    }
  }
   &.normal-exit-active{
      transition: all 0.6s;
      opacity: 0;
      .top{
        transform: translate3d(0,-100px,0);
        transition: all .6s cubic-bezier(0.45,0,0.55,1);
      }
      .bottom{
        transform: translate3d(0,100px,0);
        transition: all .6s cubic-bezier(0.45,0,0.55,1);
      }
    }
  }
  &.normal-exit-done{
    display: none;
  }
`
export const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(20px);
  img{
    width: 100%;
    height: 100%;
  }
`
export const Top = styled.div`
  position: relative;
  margin-bottom: 25px;
  .back{
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back{
      display: block;
      padding: 9px;
      font-size: ${font_size_large_x};
      color: ${color_theme};
      transform: rotate(-90deg);
    }
  }
  .title{
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    ${noWrap()};
    font-size: ${font_size_large};
    color: ${color_text};
  }
  .subtitle{
    line-height: 20px;
    text-align: center;
    font-size: ${font_size_medium};
    color: ${color_text};
  }
`

export const Middle = styled.div`
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
`
export const MiddleL = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 80%;
  .cd-wrapper{
    position:absolute;
    left: 10%;
    top: 0;
    width: 80%;
    box-sizing: border-box;
    height: 100%;
    .cd{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid rgba(255,255,255,0.1);
      }
      .playing{
        animation: rotate 20s linear infinite;
      }
    }
  }
  .playing-lyric-wrapper{
    width: 80%;
    margin: 30px auto 0 auto;
    overflow: hidden;
    text-align: center;
    .playing-lyric{
      height: 20px;
      line-height: 20px;
      font-size: ${font_size_medium};
      color: ${color_text_l};
    }
  }
`

export const MiddleR = styled(Scroll)`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .lyric-wrapper{
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    .text{
      line-height: 32px;
      color: ${color_text_l};
      font-size: ${font_size_medium};
      &.current{
        color: ${color_text};
      }
    }
    .pre-music{
      padding-top: 50%;
      line-height: 32px;
      color: ${color_text_l};
      font-size: ${font_size_medium};
    }
  }
`

export const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
  .dot-wrapper{
    text-align: center;
    font-size: 0;
    .dot{
      display: inline-block;
      vertical-align: middle;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${color_text_l};
      &.active{
        width: 20px;
        border-radius: 5px;
        background: ${color_text_ll};
      }
    }
  }
  .progress-wrapper{
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0;
    .time{
      color: ${color_text};
      font-size: ${font_size_small};
      flex: 0 0 40px;
      line-height: 30px;
      width: 40px;
      &.time-l{
        text-align: left;
      }
      &.time-r{
        text-align: right;
      }
    }
    .progress-bar-wrapper{
      flex: 1;
    }
  }
  .operators{
    display: flex;
    align-items: center;
    .icon{
      flex: 1;
      color: ${color_theme};
      &.disable{
        color: ${color_theme_d};
      }
      i{
        font-size: 30px;
      }
    }
    .i-left{
      text-align: right;
    }
    .i-center{
      padding: 0 20px;
      text-align: center;
      i{
        font-size: 40px;
      }
    }
    .i-right{
      text-align: left;
    }
    .icon-favorite{
      color: ${color_sub_theme};
    }
  }
`
