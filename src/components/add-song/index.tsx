import { useState, useRef, forwardRef, useImperativeHandle, useMemo } from 'react'
import { createPortal } from "react-dom";
import {
  Wrapper, Header, SearchInputWrapper, Main, ListWrapper, ListScroll,
  SearchResult, MessageTitle
} from './styled'
import { CSSTransition } from "react-transition-group";
import SearchInput from "../search/search-input";
import SongList from "../base/song-list";
import SearchList from "../base/search-list";
import Suggest from "../search/suggest";
import Switches from "../base/switches";
import Message from "../base/message";
import { usePlayerState } from "../../store";
import useSearchHistory from "../search/use-search-history";

interface Props {

}

const AddSong = (props: Props, ref: any) => {
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const messageRef = useRef<any>()
  const playerState = usePlayerState()
  const searchHistory = playerState.searchHistory
  const playHistory = playerState.playHistory
  const {saveSearch} = useSearchHistory()
  useImperativeHandle(ref, () => ({show}))

  function updateIndex(index: number) {
    setCurrentIndex(index)
  }

  function handleInput(s: string) {
    setQuery(s)
  }

  function addQuery(s: string) {
    setQuery(s)
  }

  function selectSongBySongList(song: Song) {
    addSong(song)
  }

  function selectSongBySuggest(song: Song) {
    addSong(song)
    saveSearch(query)
  }

  function addSong(song: Song) {
    playerState.addSong(song)
    showMessage()
  }

  function showMessage() {
    messageRef.current.show()
  }

  function show() {
    setVisible(true)
  }

  function hideMe() {
    setVisible(false)
    !!query && setQuery('')
  }

  /**
   * 这个优化非必要
   */
  const messageTitle = useMemo(() => (
    <MessageTitle>
      <i className="icon-ok"/>
      <span className="text">1首歌曲已经添加到播放列表</span>
    </MessageTitle>
  ), [])
  return createPortal((
    <CSSTransition unmountOnExit classNames="rightInRightOut" timeout={300} in={visible}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Header>
          <h1 className="title">添加歌曲到列表</h1>
          <div className="close" onClick={hideMe}>
            <i className="icon-close"/>
          </div>
        </Header>
        <SearchInputWrapper>
          <SearchInput inputValue={query} updateInputValue={handleInput} placeholder={'搜索歌曲'}/>
        </SearchInputWrapper>
        <Main show={!query}>
          <Switches
            items={['最近播放', '搜索历史']} currentIndex={currentIndex} onUpdateIndex={updateIndex}
          />
          <ListWrapper>
            {currentIndex === 0 ? (<ListScroll>
                <div className="list-inner">
                  <SongList songs={playHistory} onSelect={selectSongBySongList}/>
                </div>
              </ListScroll>) :
              (<ListScroll>
                <div className="list-inner">
                  <SearchList searches={searchHistory} showDelete={false} onSelect={addQuery}/>
                </div>
              </ListScroll>)
            }
          </ListWrapper>
        </Main>
        <SearchResult show={!!query}>
          <Suggest query={query} showSinger={false} onSelectSong={selectSongBySuggest}/>
        </SearchResult>
        <Message ref={messageRef}>
          {messageTitle}
        </Message>
      </Wrapper>
    </CSSTransition>
  ), document.body)
}

export default forwardRef(AddSong)
