import { MouseEvent, useRef } from 'react'
import ProgressCircle from "../progress-circle";
import { CSSTransition } from "react-transition-group"
import Playlist from "../playlist"
import {
  Wrapper, CdWrapper, SliderWrapper,
  SliderGroup, SliderPage, Control
} from './styled'
import useCd from "../use-cd"
import useMiniSlider from "../use-mini-sider"

interface Props {
  progress: number
  togglePlay: Function
  currentSongPic: string
  playlist: Song[]
  playing: boolean
  fullScreen: boolean
  showNormalPlayer: Function
  currentIndex: number
  changeCurrentIndex: (index: number) => void
}

const Miniplayer = (props: Props) => {
  const {
    currentSongPic, progress, togglePlay, playlist, playing,
    fullScreen, showNormalPlayer, currentIndex, changeCurrentIndex
  } = props
  const playlistRef = useRef<any>()
  const {cdCls, cdImageRef, cdRef} = useCd(playing)
  const {sliderWrapperRef} = useMiniSlider(fullScreen, playlist, currentIndex, changeCurrentIndex)

  function hideMe(e: MouseEvent<HTMLDivElement>) {
    e.nativeEvent.stopImmediatePropagation()
    showNormalPlayer()
  }

  function _togglePlay(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()
    togglePlay()
  }

  function showPlaylist(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()
    playlistRef.current.show()
  }

  const miniPlayIcon = playing ? 'icon-pause-mini' : 'icon-play-mini'
  return (
    <CSSTransition
      timeout={600}
      classNames="mini"
      in={!fullScreen && playlist.length > 0}
      mountOnEnter
    >
      <Wrapper
        onClick={hideMe}
      >
        <CdWrapper>
          <div className="cd" ref={cdRef}>
            <img
              className={cdCls}
              src={currentSongPic}
              ref={cdImageRef}
              width={40}
              height={40}
              alt=""
            />
          </div>
        </CdWrapper>
        <SliderWrapper ref={sliderWrapperRef}>
          <SliderGroup>
            {
              playlist.map(song => (
                <SliderPage key={song.id}>
                  <h1 className="name">{song.name}</h1>
                  <p className="desc">{song.singer}</p>
                </SliderPage>
              ))
            }
          </SliderGroup>
        </SliderWrapper>
        <Control>
          <ProgressCircle radius={32} progress={progress}>
            <i className={`icon-mini ${miniPlayIcon}`} onClick={_togglePlay}/>
          </ProgressCircle>
        </Control>
        <Control><i className="icon-playlist" onClick={showPlaylist}/></Control>
        <Playlist ref={playlistRef}/>
      </Wrapper>
    </CSSTransition>
  )
}

export default Miniplayer
