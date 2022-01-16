import { RefObject, useEffect, useState, useRef, useCallback, useMemo } from 'react'
import LazyLoadImg from '../base/lazy-load/lazy-load-img'
import { ScrollWrapper, GroupWrapper, Fixed, Shortcut } from './styled'


interface Singers {
  title: string,
  list: [Singer]
}

interface Props {
  data: Singers[]
  onSelect: (singer: Singer) => void
}


function useFixed(props: Props) {
  const TITLE_HEIGHT = 30
  const [listHeights, setListHeights] = useState<number[]>([])
  const [distance, setDistance] = useState(0)
  const groupRef = useRef<HTMLUListElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const fixedTitle = (() => {
    if (scrollY < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex]
    return currentGroup ? currentGroup.title : ''
  })()
  const fixedStyle = (() => {
    const diff = (distance > 0 && distance < TITLE_HEIGHT) ? distance - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  })()
  useEffect(() => {
    calculate()
  }, [props.data])

  useEffect(() => {
    for (let i = 0; i < listHeights.length - 1; i++) {
      const heightTop = listHeights[i]
      const heightBottom = listHeights[i + 1]
      if (scrollY >= heightTop && scrollY <= heightBottom) {
        setCurrentIndex(i)
        setDistance(heightBottom - scrollY)
      }
    }

  }, [scrollY])

  function calculate() {
    const list = groupRef.current!.children
    const listHeightsVal = listHeights.slice()
    let height = 0
    listHeightsVal.length = 0
    listHeightsVal.push(height)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
    setListHeights(listHeightsVal)
  }

  function onScroll({y}: Pos) {
    setScrollY(-y)
  }

  return {groupRef, onScroll, currentIndex, fixedTitle, fixedStyle}
}

const touch: any = {}
const ANCHOR_HEIGHT = 18

function useShortcut(props: Props, groupRef: RefObject<HTMLUListElement>) {
  const [shortcutList, setShortcutList] = useState<string[]>([])
  const [toTarget, setToTarget] = useState<HTMLElement>()
  useEffect(() => {
    setShortcutList(props.data.map(group => group.title))
  }, [props.data])

  function onShortcutTouchStart(e: any) {
    e.stopPropagation()
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTO(anchorIndex)
  }

  function onShortcutTouchMove(e: any) {
    e.stopPropagation()
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTO(anchorIndex)
  }

  function onShortcutTouchEnd(e: any) {
    e.stopPropagation()
  }

  function scrollTO(index: number) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.length - 1, index))
    const targetEl = groupRef.current!.children[index]
    setToTarget(targetEl as HTMLElement)
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
    onShortcutTouchEnd, toTarget
  }
}

const IndexList = (props: Props) => {
  const {data, onSelect} = props
  const {
    onScroll, groupRef, currentIndex, fixedTitle, fixedStyle
  } = useFixed(props)
  const {
    shortcutList, onShortcutTouchStart,
    onShortcutTouchMove, onShortcutTouchEnd, toTarget
  } = useShortcut(props, groupRef)
  return (
    <ScrollWrapper
      onScroll={onScroll}
      toTarget={toTarget}
      probeType={3}
    >
      <GroupWrapper ref={groupRef}>
        {
          data.map(group => (
            <li className="group" key={group.title}>
              <h2 className="title">{group.title}</h2>
              <ul>
                {
                  group.list.map(item => (
                    <li className="item" key={item.id} onClick={() => onSelect(item)}>
                      <LazyLoadImg className="avatar" scr={item.pic} effect={'blur'}/>
                      <span className="name">{item.name}</span>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </GroupWrapper>
      <Fixed show={fixedTitle.length > 0} style={fixedStyle}>
        <div className="fixed-title">{fixedTitle}</div>
      </Fixed>
      <Shortcut
        onTouchStart={onShortcutTouchStart}
        onTouchMove={onShortcutTouchMove}
        onTouchEnd={onShortcutTouchEnd}
      >
        <ul>
          {
            shortcutList.map((key, index) => (
              <li
                className={`item ${currentIndex === index ? 'current' : ''}`}
                key={key}
                data-index={index}
              >
                {key}
              </li>
            ))
          }
        </ul>
      </Shortcut>
    </ScrollWrapper>
  )
}

export default IndexList
