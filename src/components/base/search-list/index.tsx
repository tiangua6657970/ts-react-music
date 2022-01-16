import { memo, MouseEvent } from 'react'
import { CSSTransition, TransitionGroup } from "react-transition-group"
import styled from "styled-components"
import { color_text_d, color_text_l, font_size_small } from "../../../assets/js/style-const"
import { extendClick } from "../../../assets/js/style-mixins"

const Wrapper = styled.div`
  .search-item{
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    .text{
      flex: 1;
      color: ${color_text_l};
    }
    .icon{
      ${extendClick()}
      .icon-delete{
        font-size: ${font_size_small};
        color: ${color_text_d};
      }
    }
  }
`

interface Props {
  searches: string[]
  showDelete?: boolean
  onSelect?: (item: string) => void
  onDelete?: (item: string) => void
}

const SearchList = (props: Props) => {
  const {searches, showDelete = true, onSelect, onDelete} = props

  function selectItem(item: string) {
    onSelect && onSelect(item)
  }

  function deleteItem(e: MouseEvent<HTMLSpanElement>, item: string) {
    e.stopPropagation()
    onDelete && onDelete(item)
  }

  return (
    <Wrapper>
      <ul>
        <TransitionGroup component={null}>
          {
            searches.map(item => (
              <CSSTransition timeout={300} key={item} classNames="list">
                <li className="search-item" key={item} onClick={() => selectItem(item)}>
                  <span className="text">{item}</span>
                  {
                    showDelete && <span className="icon"
                                        onClick={(e) => deleteItem(e, item)}
                    >
                  <i className="icon-delete"/>
                </span>
                  }
                </li>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </ul>
    </Wrapper>
  )
}

export default memo(SearchList)
