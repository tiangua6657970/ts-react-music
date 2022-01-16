import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelectedSinger } from '../singer'
import { useSelectedSearchSinger } from '../search'
import { useSelectedTop } from '../top-list'
import { useSelectedAlbum } from '../recommend'
import { getSingerDetail } from '../../service/singer'
import { getAlbum } from '../../service/recommend'
import { getTopDetail } from '../../service/top-list'
import { observer } from 'mobx-react-lite'
import { usePlayerState } from '../../store'
import { color_background } from '../../assets/js/style-const'
import storage from 'good-storage'
import { SINGER_KEY, ALBUM_KEY, TOP_KEY } from '../../assets/js/constant'
import { processSongs } from '../../service/song'
import MusicList from '../../components/music-list'
import { CSSTransition } from 'react-transition-group'

function useCurrentKeyAndFetchAndCurrentContext(path: string) {
  const isSinger = /\/singer/
  const isRecommend = /\/recommend/
  const isTopList = /\/top-list/
  const isSearch = /\/search/
  let key: Keys
  let fetch: (param: any) => Promise<any>
  let currentContext: typeof useSelectedAlbum | typeof useSelectedSinger | typeof useSelectedTop
  key = isSinger.test(path)
    ? SINGER_KEY
    : isSearch.test(path)
      ? SINGER_KEY
      : isRecommend.test(path)
        ? ALBUM_KEY
        : TOP_KEY
  fetch = isSinger.test(path) || isSearch.test(path)
    ? getSingerDetail
    : isRecommend.test(path)
      ? getAlbum
      : getTopDetail
  currentContext = isSinger.test(path)
    ? useSelectedSinger
    : isSearch.test(path)
      ? useSelectedSearchSinger
      :
      isRecommend.test(path)
        ? useSelectedAlbum
        : useSelectedTop
  return {key, fetch, currentContext}
}

interface Song {
  album: string
  duration: number
  id: number
  mid: string
  name: string
  pic: string
  singer: string
  url: string
}

const CommonDetail = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [showLoading, setShowLoading] = useState(true)
  const [startIn, setStartIn] = useState(false)
  const location = useLocation()
  const playlist = usePlayerState().playlist
  const {key, fetch, currentContext} = useCurrentKeyAndFetchAndCurrentContext(location.pathname)
  const data = currentContext()
  const paramsId = useParams().id
  const computedData = (() => {
    let ret: any
    if (data) {
      ret = data
    } else {
      const cached = storage.session.get(key)
      if (cached && (cached.mid || cached.id + '') === paramsId) {
        ret = cached
      }
    }
    return ret
  })()
  const pic = (() => {
    return computedData && computedData.pic
  })()
  const title = (() => {
    return computedData && (computedData.name || computedData.title)
  })()
  useEffect(() => {
    if (!computedData) {
      // 这里可以返回到某个路由
      alert('xxxxxx')
      return
    }
    setStartIn(true)
    fetch(computedData).then(res => {
      processSongs(res.songs).then(res => {
        setShowLoading(false)
        setSongs(res)
      })
    })
    return () => {
    }
  }, [])

  function startOut() {
    setStartIn(false)
  }

  return (
    <CSSTransition unmountOnExit classNames='rightInRightOut' timeout={300} in={startIn}>
      <div style={
        {
          position: 'fixed',
          zIndex: 10,
          top: 0,
          left: 0,
          bottom: playlist.length ? '60px' : '0',
          right: 0,
          background: color_background
        }
      }>
        <MusicList
          title={title}
          pic={pic}
          rank={key === '_top_'}
          songs={songs}
          showLoading={showLoading}
          onGoBack={startOut}
        />
      </div>
    </CSSTransition>
  )
}

export default observer(CommonDetail)
