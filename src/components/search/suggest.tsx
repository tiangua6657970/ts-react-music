import { useState, useEffect, useRef, memo } from 'react'
import styled from 'styled-components'
import { color_text_d, font_size_medium } from '../../assets/js/style-const'
import { noWrap } from '../../assets/js/style-mixins'
import Loading from '../base/loading'
import NoResult from '../base/loading/no-result'
import { search } from '../../service/search'
import { processSongs } from '../../service/song'
import usePullUpLoad from './use-pull-up-load'

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`
const SuggestList = styled.ul`
  padding: 0 30px;
  .suggest-item{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }
`
const SuggestItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  .icon{
    flex: 0 0 30px;
    width: 30px;
    [class^="icon-"]{
      font-size: 14px;
      color: ${color_text_d};
    }
  }
  .name{
    flex: 1;
    font-size: ${font_size_medium};
    color: ${color_text_d};
    overflow: hidden;
    .text{
      ${noWrap()}
    }
  }
`

interface Props {
  query: string
  showSinger?: boolean
  onSelectSinger?: (singer: Singer) => void
  onSelectSong?: (song: Song) => void
}

const Suggest = (props: Props) => {
  const {query, showSinger = true, onSelectSinger, onSelectSong} = props
  const queryRef = useRef(query)
  queryRef.current = query
  const [singer, setSinger] = useState<Singer>()
  const [songs, setSongs] = useState<Song[]>([])
  const [hasMore, setHasMore] = useState(true)
  const page = useRef(1)
  const noResult = useRef(false)
  const preventPullUpLoad = useRef(true)

  useEffect(() => {
    if (!queryRef.current) {
      page.current = 1
      setSinger(undefined)
      setSongs([])
      setHasMore(true)
      return
    }
    search(queryRef.current, page.current, showSinger).then(result => {
      processSongs(result.songs).then(songs => {
        setSongs(songs)
        setSinger(result.singer)
        setHasMore(result.hasMore)
      })
    })
  }, [query])

  useEffect(() => {
    makeItScrollable()
  }, [songs])

  async function searchMore() {
    if (!hasMore || !queryRef.current) return
    page.current++
    const result = await search(queryRef.current, page.current, showSinger)
    const resultSongs = await processSongs(result.songs)
    setSongs(songs => songs.concat(resultSongs))
    setHasMore(result.hasMore)
  }

  const {rootRef, scrollRef} = usePullUpLoad(searchMore, preventPullUpLoad)

  function makeItScrollable() {
    if (!scrollRef.current) return
    if (scrollRef.current.maxScrollY >= -1) {
      searchMore()
    } else if (hasMore) {
      preventPullUpLoad.current = false
    }
  }

  function selectSong(song: Song) {
    onSelectSong && onSelectSong(song)
  }

  function selectSinger(singer: Singer) {
    onSelectSinger && onSelectSinger(singer)
  }

  const loading = !singer && !songs.length
  noResult.current = !singer && !songs.length && !hasMore
  return (
    <Wrapper ref={rootRef}>
      <SuggestList>
        {
          singer && <SuggestItem onClick={() => selectSinger(singer)}>
            <div className="icon">
              <i className="icon-mine"/>
            </div>
            <div className="name">
              <p className="text">{singer.name}</p>
            </div>
          </SuggestItem>
        }
        {
          songs.map(song => (
            <SuggestItem key={song.id} onClick={() => selectSong(song)}>
              <div className="icon">
                <i className="icon-music"/>
              </div>
              <div className="name">
                <p className="text">{song.singer}-{song.name}</p>
              </div>
            </SuggestItem>
          ))
        }
        {songs.length > 16 && <div className="suggest-item">
          <Loading show={true} title={''}/>
        </div>}
      </SuggestList>
      <Loading show={loading} title={''}/>
      <NoResult show={noResult.current} title={'抱歉，暂无搜索结果'}/>
    </Wrapper>
  )
}

export default memo(Suggest)
