import { useState, useEffect } from 'react'
import { useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import WrapScroll from '../../components/wrap-scroll'
import LazyLoadImg from '../../components/base/lazy-load/lazy-load-img'
import { Wrapper, Item, Icon, SongList, Song } from './styled'
import { CSSProperties } from 'react'
import { getTopList } from '../../service/top-list'
import Loading from '../../components/base/loading'
import { usePlayerState } from '../../store'
import storage from 'good-storage'
import { TOP_KEY } from '../../assets/js/constant'

const scrollWrapperStyle: CSSProperties = {
  height: '100%',
  overflow: "hidden"
}

interface TopListItem {
  id: number
  name: string
  period: string
  pic: string
  songList: SongListItem[]
}

interface SongListItem {
  id: number
  singerName: string
  songName: string
}

const TopList = () => {
  const [topList, setTopList] = useState<TopListItem[]>([])
  const [selectedTop, setSelectedTop] = useState<TopListItem>()
  const [showLoading, setShowLoading] = useState(true)
  const navigate = useNavigate()
  const playlist = usePlayerState().playlist
  useEffect(() => {
    getTopList().then(res => {
      setShowLoading(false)
      setTopList(res.topList)
    })
  }, [])

  function selectItem(top: TopListItem) {
    setSelectedTop(top)
    storage.session.set(TOP_KEY, top)
    navigate(`/top-list/${top.id}`)
  }

  return (
    <Wrapper hasPlay={!!playlist.length}>
      <WrapScroll wrapperStyle={scrollWrapperStyle}>
        <ul>
          {
            topList.map(item => (
              <Item key={item.id} onClick={() => selectItem(item)}>
                <Icon>
                  <LazyLoadImg width={100} height={100} scr={item.pic}/>
                </Icon>
                <SongList>
                  {
                    item.songList.map((song, index) => (
                      <Song key={song.songName}>
                        <span>{index + 1}</span>
                        <span>{song.songName}</span>
                      </Song>
                    ))
                  }
                </SongList>
              </Item>
            ))
          }
        </ul>
      </WrapScroll>
      <Outlet context={selectedTop}/>
      <Loading show={showLoading}/>
    </Wrapper>
  )
}

export function useSelectedTop() {
  return useOutletContext<TopListItem>()
}

export default observer(TopList)
