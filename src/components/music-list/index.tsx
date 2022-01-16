import { useState, useEffect, useRef, useMemo, useCallback, CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wrapper, Back, Title, BgImage, PlayBtnWrapper,
  PlayBtn, Filter, SongListWrapper
} from './styled'
import SongList from '../base/song-list'
import WrapScroll from '../wrap-scroll'
import Loading from '../base/loading'
import NoResult from '../base/loading/no-result'
import { observer } from 'mobx-react-lite'
import { usePlayerState } from '../../store'

interface Props {
  songs: Song[]
  title: string
  pic: string
  rank: boolean
  showLoading: boolean
  noResultText?: string
  onGoBack: Function
}

const RESERVED_HEIGHT = 40
const MusicList = (props: Props) => {
  const {
    title, pic, rank, songs, showLoading, noResultText = '抱歉，没有找到可播放的歌曲',
    onGoBack
  } = props
  const [imageHeight, setImageHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [maxTranslateY, setMaxTranslateY] = useState(0)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const playerState = usePlayerState()
  useEffect(() => {
    const imageHeightVal = bgImageRef.current!.clientHeight
    setImageHeight(imageHeightVal)
    setMaxTranslateY(imageHeightVal - RESERVED_HEIGHT)
  }, [])

  function goBack() {
    onGoBack()
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }

  function random() {
    playerState.randomPlay(songs)
  }

  const showNoResult = (() => {
    return !showLoading && songs.length === 0
  })()

  const bgImageStyle: CSSProperties = (() => {
    let zIndex = 0
    let paddingTop = '70%'
    let height = '0'
    let translateZ = 0
    if (scrollY > maxTranslateY) {
      zIndex = 10
      paddingTop = '0'
      height = `${RESERVED_HEIGHT}px`
      translateZ = 1
    }
    let scale = 1
    if (scrollY < 0) {
      scale = 1 + Math.abs(scrollY / imageHeight)
    }
    return {
      zIndex,
      paddingTop,
      height,
      backgroundImage: `url(${pic})`,
      transform: `scale(${scale}) translateZ(${translateZ}px)`
    }
  })()

  const filterStyle: CSSProperties = (() => {
    let blur = 0
    if (scrollY >= 0) {
      blur = Math.min(maxTranslateY / imageHeight, scrollY / imageHeight) * 20
    }
    return {
      backdropFilter: `blur(${blur}px)`
    }
  })()

  const playBtnStyle: CSSProperties = (() => {
    let display = ''
    if (scrollY > maxTranslateY) {
      display = 'none'
    }
    return {
      display
    }
  })()

  const scrollStyle: CSSProperties = useMemo(() => ({
      position: "absolute",
      top: `${imageHeight}px`,
      bottom: '0',
      width: '100%',
      zIndex: 0
    }
  ), [imageHeight])

  const onScroll = useCallback(
    (pos: Pos) => {
      setScrollY(-pos.y)
    },
    []
  )
  const probeType = useMemo(() => 3, [])

  /**
   * 这个依赖必须写
   * 使用这些性能优化的hook都是非必要的，会让代码变丑
   */
  const selectItem = useCallback(
    (song: Song, index: number) => {
      playerState.selectPlay(songs, index)
    },
    [songs]
  )
  const scrollContent = useMemo(() => (
    <>
      <SongListWrapper>
        <SongList songs={songs} rank={rank} onSelect={selectItem}/>
      </SongListWrapper>
      <Loading show={showLoading}/>
      <NoResult title={noResultText} show={showNoResult}/>
    </>
  ), [songs, rank])
  return (
    <Wrapper>
      <Back onClick={goBack}>
        <i className="icon-back"/>
      </Back>
      <Title>{title}</Title>
      <BgImage ref={bgImageRef} style={bgImageStyle}>
        <PlayBtnWrapper style={playBtnStyle}>
          <PlayBtn onClick={random}>
            <i className="icon-play"/>
            <span className="text">随机播放全部</span>
          </PlayBtn>
        </PlayBtnWrapper>
        <Filter style={filterStyle}/>
      </BgImage>
      <WrapScroll wrapperStyle={scrollStyle} probeType={probeType} onScroll={onScroll}>
        {
          scrollContent
        }
      </WrapScroll>
    </Wrapper>
  )
}

export default observer(MusicList)
