import { observer } from 'mobx-react-lite'
import { usePlayerState } from '../../../store'
import {
  Wrapper, NormalPlayer, Background,
  Top, Middle, MiddleL, MiddleR,
  Bottom,
} from './styled'
import ProgressBar from '../progress-bar'
import Miniplayer from '../mini-player'
import { CSSTransition } from 'react-transition-group'
import { formationTime } from '../../../assets/js/util'
import useMode from '../use-mode'
import useFavorite from '../use-favorite'
import useAnimation from '../use-animation'
import useAudio from '../use-audio'
import useCd from '../use-cd'
import useMiddleInteractive from '../use-middle-interactive'

const Player = () => {
  const playerState = usePlayerState()
  const currentSong = playerState.currentSong
  const fullScreen = playerState.fullScreen
  const playing = playerState.playing
  const playMode = playerState.playMode
  const playlist = playerState.playlist
  const currentIndex = playerState.currentIndex
  const {modeIcon, changeMode} = useMode(playMode, playerState)
  const {getFavoriteIcon, toggleFavorite} = useFavorite(playerState)
  const {cdWrapperRef, enter, entered, exit, exited} = useAnimation()
  const {
    audioRef, playIcon, disableCls, progress, togglePlay, pause, error,
    ready, updateTime, currentTimeRef, end, prev, next, progressChanging,
    progressChanged, currentLyricRef, currentLineNum,
    pureMusicLyric, playingLyric, lyricScrollRef, lyricListRef,
  } = useAudio()
  const {cdCls, cdRef, cdImageRef} = useCd(playing)
  const {
    currentShow, middleLStyle, middleRStyle, middleTouchEnd,
    middleTouchMove, middleTouchStart
  } = useMiddleInteractive()

  function goBack() {
    playerState.setFullScreen(false)
  }

  function showMe() {
    playerState.setFullScreen(true)
  }

  function changeCurrentIndex(index: number) {
    playerState.setCurrentIndex(index)
  }

  return (
    <Wrapper show={playerState.playlist.length > 0}>
      <CSSTransition
        timeout={600}
        in={fullScreen}
        onEnter={enter}
        onEntered={entered}
        onExit={exit}
        onExited={exited}
        classNames="normal"
        mountOnEnter
      >
        <NormalPlayer>
          <Background>
            <img src={currentSong.pic} alt=""/>
          </Background>
          <Top className="top">
            <div className="back" onClick={goBack}>
              <i className="icon-back"/>
            </div>
            <h1 className="title">{currentSong.name}</h1>
            <h2 className="subtitle">{currentSong.singer}</h2>
          </Top>
          <Middle
            onTouchStart={middleTouchStart}
            onTouchMove={middleTouchMove}
            onTouchEnd={middleTouchEnd}
          >
            <MiddleL style={middleLStyle}>
              <div
                className="cd-wrapper"
                ref={cdWrapperRef}
              >
                <div className="cd" ref={cdRef}>
                  <img
                    className={`image ${cdCls}`}
                    src={currentSong.pic}
                    ref={cdImageRef}
                    alt=""
                  />
                </div>
              </div>
              <div className="playing-lyric-wrapper">
                <div className="playing-lyric">{playingLyric}</div>
              </div>
            </MiddleL>
            <MiddleR wrapperStyle={middleRStyle} ref={lyricScrollRef}>
              <div className="lyric-wrapper">
                {currentLyricRef.current && <div ref={lyricListRef}>
                  {
                    currentLyricRef.current?.lines.map((line, index) => (
                      <p
                        className={`text ${currentLineNum === index ? 'current' : ''}`}
                        key={line.time}
                      >{line.txt}</p>
                    ))
                  }
                </div>
                }
                {pureMusicLyric && <div className="pre-music">
                  <p>{pureMusicLyric}</p>
                </div>
                }
              </div>
            </MiddleR>
          </Middle>
          <Bottom className="bottom">
            <div className="dot-wrapper">
              <span className={`dot ${currentShow === 'cd' ? 'active' : ''}`}/>
              <span className={`dot ${currentShow === 'lyric' ? 'active' : ''}`}/>
            </div>
            <div className="progress-wrapper">
              <span className="time time-l">{formationTime(currentTimeRef.current)}</span>
              <div className="progress-bar-wrapper">
                <ProgressBar
                  progress={progress}
                  progressChanging={progressChanging}
                  progressChanged={progressChanged}
                />
              </div>
              <span className="time time-r">{formationTime(currentSong.duration)}</span>
            </div>
            <div className="operators">
              <div className="icon i-left">
                <i onClick={changeMode} className={modeIcon}/>
              </div>
              <div className={`icon i-left ${disableCls}`}>
                <i className="icon-prev" onClick={prev}/>
              </div>
              <div className={`icon i-center ${disableCls}`}>
                <i className={playIcon} onClick={togglePlay}/>
              </div>
              <div className={`icon i-right ${disableCls}`}>
                <i className="icon-next" onClick={next}/>
              </div>
              <div className="icon i-right">
                <i
                  className={getFavoriteIcon(currentSong)}
                  onClick={() => toggleFavorite(currentSong)}
                />
              </div>
            </div>
          </Bottom>
        </NormalPlayer>
      </CSSTransition>
      <Miniplayer
        progress={progress}
        currentSongPic={currentSong.pic}
        togglePlay={togglePlay}
        playlist={playlist}
        playing={playing}
        fullScreen={fullScreen}
        showNormalPlayer={showMe}
        currentIndex={currentIndex}
        changeCurrentIndex={changeCurrentIndex}
      />
      <audio
        ref={audioRef}
        onPause={pause}
        onError={error}
        onCanPlay={ready}
        onTimeUpdate={updateTime}
        onEnded={end}
      />
    </Wrapper>
  )
}

export default observer(Player)
