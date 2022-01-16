import {
  useState, useRef, useImperativeHandle, MouseEvent, forwardRef,
  useEffect
} from 'react'
import { createPortal } from "react-dom";
import {
  Wrapper, ListWrapper, ListHeader, ListContent, ListItem,
  ListAdd, ListFooter
} from './styled'
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Confirm from "../../base/confirm"
import AddSong from "../../add-song"
import { usePlayerState } from "../../../store"
import useMode from "../use-mode"
import useFavorite from "../use-favorite"

interface Props {

}

const Playlist = (props: Props, refMe: any) => {
  const [visible, setVisible] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const scrollRef = useRef<any>()
  const removingRef = useRef(false)
  const confirmRef = useRef<any>()
  const addSongRef = useRef<any>()
  const playerState = usePlayerState()
  const playMode = playerState.playMode
  const sequenceList = playerState.sequenceList
  const playlist = playerState.playlist
  const currentSong = playerState.currentSong
  const {changeMode, modeIcon, modeText} = useMode(playMode, playerState)
  const {getFavoriteIcon, toggleFavorite} = useFavorite(playerState)
  useImperativeHandle(refMe, () => ({show}))
  useEffect(() => {
    if (!visible || !currentSong.id || !scrollRef.current)
      return
    scrollToCurrent()
  }, [currentSong])

  function getCurrentIcon(song: Song) {
    if (song.id === currentSong.id)
      return 'icon-play'
  }

  function _toggleFavorite(e: MouseEvent<HTMLSpanElement>, song: Song) {
    e.stopPropagation()
    toggleFavorite(song)
  }

  function hideMe(e?: MouseEvent<HTMLDivElement>) {
    e?.stopPropagation()
    setVisible(false)
  }

  function show() {
    setVisible(true)
  }

  function refreshScroll() {
    scrollRef.current?.current.refresh()
  }

  function scrollToCurrent() {
    refreshScroll()
    const index = sequenceList.findIndex(song => {
      return currentSong.id === song.id
    })
    if (index === -1) return
    const target = listRef.current!.children[index]
    scrollRef.current.current.scrollToElement(target, 600)
  }

  function selectItem(e: MouseEvent<HTMLLIElement>, song: Song) {
    e.stopPropagation()
    const index = playlist.findIndex(item => {
      return song.id === item.id
    })
    playerState.setCurrentIndex(index)
    playerState.setPlayingState(true)
  }

  function removeSong(e: MouseEvent<HTMLSpanElement>, song: Song) {
    e.stopPropagation()
    if (removingRef.current) return
    removingRef.current = true
    playerState.removeSong(song)
    if (!playlist.length) hideMe()
    setTimeout(() => {
      removingRef.current = false
    }, 300)
  }

  function showConfirm() {
    confirmRef.current.show()
  }

  function confirmClear() {
    playerState.clearSongList()
    hideMe()
  }

  function showAddSong() {
    addSongRef.current.show()
  }

  return createPortal((
    <CSSTransition
      timeout={300}
      in={visible}
      classNames="list-fade"
      mountOnEnter
      onEntered={scrollToCurrent}
    >
      <Wrapper onClick={hideMe}>
        <ListWrapper className="list-wrapper" onClick={(e) => e.stopPropagation()}>
          <ListHeader onClick={(e) => e.stopPropagation()}>
            <h1 className="title">
              <i className={`icon ${modeIcon}`} onClick={changeMode}/>
              <span className="text">{modeText}</span>
              <span className="clear" onClick={showConfirm}>
                <i className="icon-clear"/>
              </span>
            </h1>
          </ListHeader>
          <ListContent ref={scrollRef}>
            {/* 这里如果让TransitionGroup渲染ul标签，使用ref无法获得dom*/}
            <ul ref={listRef}>
              <TransitionGroup component={null}>
                {
                  sequenceList.map(song => (
                    <CSSTransition timeout={300} key={song.id} classNames="list">
                      <ListItem
                        onClick={(e) => selectItem(e, song)}>
                        <i className={`current ${getCurrentIcon(song)}`}/>
                        <span className="text">{song.name}</span>
                        <span
                          className="favorite"
                          onClick={(e) => _toggleFavorite(e, song)}>
                          <i className={getFavoriteIcon(song)}/>
                        </span>
                        <span
                          className="delete"
                          onClick={(e) => removeSong(e, song)}>
                          <i className="icon-delete"/>
                        </span>
                      </ListItem>
                    </CSSTransition>
                  ))
                }
              </TransitionGroup>
            </ul>
          </ListContent>
          <ListAdd>
            <div className="add" onClick={showAddSong}>
              <i className="icon-add"/>
              <span className="text">添加歌曲到队列</span>
            </div>
          </ListAdd>
          <ListFooter onClick={hideMe}>
            <span>关闭</span>
          </ListFooter>
        </ListWrapper>
        <Confirm
          text={'是否清空播放列表'}
          confirmBtnText={'清空'}
          ref={confirmRef}
          confirmFu={confirmClear}
        />
        <AddSong ref={addSongRef}/>
      </Wrapper>
    </CSSTransition>
  ), document.body)
}

export default forwardRef(Playlist)
