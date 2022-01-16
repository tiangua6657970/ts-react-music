import styled from 'styled-components'
import WrapScroll from '../../components/wrap-scroll'
import {
  color_background,
  color_text_l,
  color_theme,
  font_size_large_x,
  font_size_medium_x,
  font_size_small
} from '../../assets/js/style-const'


export const Wrapper = styled.div<W>`
  position: fixed;
  top: 0;
  bottom: ${props => props.hasPlay ? 60 : 0}px;
  z-index: 100;
  width: 100%;
  background: ${color_background};
`
export const Back = styled.div`
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 50;
  .icon-back{
    display: block;
    padding: 10px;
    font-size: ${font_size_large_x};
    color: ${color_theme};
  }
`
export const SwitchesWrapper = styled.div`
  margin: 10px 0 30px 0;
`
export const PlayBtn = styled.div`
  box-sizing: border-box;
  width: 135px;
  padding: 7px 0;
  margin: 0 auto;
  text-align: center;
  border: 1px solid ${color_text_l};
  border-radius: 100px;
  font-size: 0;
  .icon-play{
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    font-size: ${font_size_medium_x};
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: ${font_size_small};
  }
`
export const ListWrapper = styled.div`
  position: absolute;
  top: 110px;
  bottom: 0;
  width: 100%;
`
export const ListScroll = styled(WrapScroll)`
  height: 100%;
  overflow: hidden;
  .list-inner{
    padding: 20px 30px;
  }
`
