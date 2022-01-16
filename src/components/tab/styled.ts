import styled from "styled-components";
import {
  font_size_medium,
  color_text_l,
  color_theme
} from "../../assets/js/style-const";

export const Tabs = styled.div`
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: ${font_size_medium};
  .tab-item{
    flex: 1;
    text-align: center;
    .tab-link{
      padding-bottom: 5px;
      color: ${color_text_l};
    }
    &.active{
      .tab-link{
        color:${color_theme} ;
        border-bottom: 2px solid ${color_theme};
      }
    }
  }
  
`
