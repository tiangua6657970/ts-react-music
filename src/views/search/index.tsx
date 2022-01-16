import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import storage from "good-storage";
import { observer } from 'mobx-react-lite'
import { usePlayerState } from '../../store'
import { getHotKeys } from '../../service/search'
import { SINGER_KEY } from "../../assets/js/constant";
import {
  Wrapper, SearchInputWrapper, SearchContent, HotKeys, SearchHistory,
  SearchResult
} from './styled'
import SearchInput from '../../components/search/search-input'
import Confirm from '../../components/base/confirm'
import SearchList from '../../components/base/search-list'
import Suggest from '../../components/search/suggest'
import useSearchHistory from '../../components/search/use-search-history'

interface HotKey {
  key: string
  id: number
}

const Search = () => {
  const [hotKeys, setHotKeys] = useState<HotKey[]>([])
  const [query, setQuery] = useState('')
  const confirmRef = useRef<any>()
  const playerState = usePlayerState()
  const searchHistory = playerState.searchHistory
  const playlist = playerState.playlist
  const [selectedSinger, setSelectedSinger] = useState<Singer>()
  const {clearSearch, deleteSearch, saveSearch} = useSearchHistory()
  const navigate = useNavigate()
  useEffect(() => {
    getHotKeys().then(result => {
      setHotKeys(result.hotKeys)
    })
  }, [])

  const addQuery = useCallback((s: string) => {
    setQuery(s)
  }, [])

  const selectSinger = useCallback((singer: Singer) => {
    saveSearch(query)
    setSelectedSinger(singer)
    cacheSinger(singer)
    navigate(`/search/${singer.mid}`)
  }, [query])

  const selectSong = useCallback((song: Song) => {
    saveSearch(query)
    playerState.addSong(song)
  }, [query])


  function handleInputChange(query: string) {
    console.log(query, query.length, 'query')
    setQuery(query)
  }

  function showConfirm() {
    confirmRef.current.show()
  }

  function cacheSinger(singer: Singer) {
    storage.session.set(SINGER_KEY, singer)
  }

  const _searchHistory = useMemo(() => searchHistory, [searchHistory])
  const confirmText = useMemo(() => '是否清空所有搜索历史', [])
  const confirmBtnText = useMemo(() => '清空', [])
  return (
    <Wrapper hasPlay={!!playlist.length}>
      <SearchInputWrapper>
        <SearchInput inputValue={query} updateInputValue={handleInputChange}/>
      </SearchInputWrapper>
      <SearchContent show={!query} refresh={!query}>
        <div>
          <HotKeys>
            <h1 className="title">热门搜索</h1>
            <ul>
              {
                hotKeys.map(hotKey => (
                  <li
                    className="item"
                    key={hotKey.id}
                    onClick={() => addQuery(hotKey.key)}
                  ><span>{hotKey.key}
                    </span>
                  </li>
                ))
              }
            </ul>
          </HotKeys>
          <SearchHistory show={!!_searchHistory.length}>
            <h1 className="title">
              <span className="text">搜索历史</span>
              <span className="clear" onClick={showConfirm}>
                <i className="icon-clear"/>
              </span>
            </h1>
            <Confirm
              ref={confirmRef}
              text={confirmText}
              confirmBtnText={confirmBtnText}
              confirmFu={clearSearch}
            />
            <SearchList
              searches={_searchHistory}
              onDelete={deleteSearch}
              onSelect={addQuery}
            />
          </SearchHistory>
        </div>
      </SearchContent>
      <SearchResult show={!!query}>
        <Suggest
          query={query}
          onSelectSinger={selectSinger}
          onSelectSong={selectSong}
        />
      </SearchResult>
      <Outlet context={selectedSinger}/>
    </Wrapper>
  )
}

export function useSelectedSearchSinger() {
  return useOutletContext<Singer>()
}

export default observer(Search)
