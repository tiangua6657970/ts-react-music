import styled from "styled-components";
import {
  color_background,
  color_text,
  color_theme,
  font_size_large,
  font_size_medium
} from "../../assets/js/style-const";
import Scroll from "../base/scroll";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 300;
  background: ${color_background};
`
export const Header = styled.div`
  position: relative;
  height: 44px;
  text-align: center;
  .title{
    line-height: 44px;
    font-size: ${font_size_large};
    color: ${color_text};
  }
  .close{
    position: absolute;
    top: 0;
    right: 8px;
    .icon-close{
      display: block;
      padding: 12px;
      font-size: 20px;
      color: ${color_theme};
    }
  }
`
export const SearchInputWrapper = styled.div`
  margin: 20px;
`

interface M {
  show: boolean
}

export const Main = styled.div<M>`
  display: ${props => props.show ? 'block' : 'none'};
`
export const ListWrapper = styled.div`
  position: absolute;
  top: 165px;
  bottom: 0;
  width: 100%;
`
export const ListScroll = styled(Scroll)`
  height: 100%;
  overflow: hidden;
  .list-inner{
    padding: 20px 30px;
  }
`
export const SearchResult = styled.div<M>`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 124px;
  bottom: 0;
  width: 100%;
`
export const MessageTitle = styled.div`
  text-align: center;
  padding: 18px 0;
  font-size: ${0};
  .icon-ok{
    font-size: ${font_size_medium};
    color: ${color_theme};
    margin-right: 4px;
  }
  .text{
    font-size: ${font_size_medium};
    color: ${color_text};
  }
`

