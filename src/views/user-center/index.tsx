import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { CSSTransition } from 'react-transition-group'
import Switches from '../../components/base/switches'
import SongList from '../../components/base/song-list'
import NoResult from '../../components/base/loading/no-result'
import { Wrapper, Back, SwitchesWrapper, PlayBtn, ListWrapper, ListScroll } from './styled'
import { usePlayerState } from '../../store'

const UserCenter = () => {
  const [startIn, setStartIn] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const playerState = usePlayerState()
  const navigate = useNavigate()
  const currentList = useRef<Song[]>()
  const favoriteList = playerState.favoriteList
  const playHistory = playerState.playHistory
  const playlist = playerState.playlist
  currentList.current = currentIndex === 0 ? favoriteList : playHistory
  useEffect(() => {
    setStartIn(true)
  }, [])

  function switchCurrentIndex(index: number) {
    setCurrentIndex(index)
  }

  function back() {
    setStartIn(false)
    setTimeout(() => {
      navigate(-1)
    }, 200)
  }

  function randomPlay() {
    playerState.randomPlay(currentList.current!)
  }

  const CurrentView = currentIndex === 0 ?
    (<ListScroll>
      <div className="list-inner"><SongList songs={favoriteList}/></div>
    </ListScroll>)
    : (<ListScroll>
      <div className="list-inner"><SongList songs={playHistory}/></div>
    </ListScroll>)
  const noResult = currentIndex === 0 ? !favoriteList.length : !playHistory.length
  const noResultText = currentIndex === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
  return (
    <CSSTransition mountOnEnter timeout={300} classNames="rightInRightOut" in={startIn}>
      <Wrapper hasPlay={!!playlist.length}>
        <Back onClick={back}>
          <i className="icon-back"/>
        </Back>
        <SwitchesWrapper>
          <Switches
            items={['我喜欢的', '最近播放']}
            currentIndex={currentIndex} onUpdateIndex={switchCurrentIndex}
          />
        </SwitchesWrapper>
        {!!currentList.current.length && <PlayBtn onClick={randomPlay}>
          <i className="icon-play"/>
          <span className='text'>随机播放全部</span>
        </PlayBtn>
        }
        <ListWrapper>
          {CurrentView}
        </ListWrapper>
        <NoResult show={noResult} title={noResultText}/>
      </Wrapper>
    </CSSTransition>
  )
}

export default observer(UserCenter)
