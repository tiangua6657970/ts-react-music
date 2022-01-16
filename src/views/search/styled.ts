import styled from 'styled-components'
import WrapScroll from '../../components/wrap-scroll'
import {
  color_highlight_background, color_text_d, color_text_l, font_size_medium
} from '../../assets/js/style-const'
import { extendClick } from '../../assets/js/style-mixins'

export const Wrapper = styled.div<W>`
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: ${props => props.hasPlay ? 60 : 0}px;
  display: flex;
  flex-direction: column;
`
export const SearchInputWrapper = styled.div`
  margin: 20px;
`

export const SearchContent = styled(WrapScroll)<Show>`
  display: ${props => props.show ? 'block' : 'none'};
  flex: 1;
  overflow: hidden;
`
export const HotKeys = styled.div`
  margin: 0 20px 20px 20px;
  .title{
    margin-bottom: 20px;
    font-size: ${font_size_medium};
    color: ${color_text_l};
  }
  .item{
    display: inline-block;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    background: ${color_highlight_background};
    font-size: ${font_size_medium};
    color: ${color_text_d};
  }
`

interface Show {
  show: boolean
}

export const SearchHistory = styled.div<Show>`
  display: ${props => props.show ? 'block' : 'none'};
  position: relative;
  margin: 0 20px;
  .title{
    display: flex;
    align-items: center;
    height: 40px;
    font-size: ${font_size_medium};
    color: ${color_text_l};
    .text{
      flex: 1;
    }
    .clear{
      ${extendClick()};
      .icon-clear{
        font-size: ${font_size_medium};
        color: ${color_text_d};
      }
    }
  }
`

export const SearchResult = styled.div<Show>`
  display: ${props => props.show ? 'block' : 'none'};
  flex: 1;
  overflow: hidden;
`
