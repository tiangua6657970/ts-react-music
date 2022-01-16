import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { getRecommend } from '../../service/recommend'
import { Wrapper, SliderWrapper, SliderContent, RecommendList } from './styled'
import WrapScroll from '../../components/wrap-scroll'
import Slider from '../../components/base/slider'
import LazyLoadImg from '../../components/base/lazy-load/lazy-load-img'
import Loading from '../../components/base/loading'
import { usePlayerState } from '../../store'
import storage from 'good-storage'
import { ALBUM_KEY } from '../../assets/js/constant'

interface Slider {
  id: string,
  link: string
  pic: string
}

interface Album {
  id: string
  pic: string
  title: string
  username: string
}

const Recommend = () => {
  const [sliders, setSliders] = useState<Array<Slider>>([])
  const [albums, setAlbums] = useState<Array<Album>>([])
  const [selectedAlbum, setSelectedAlbum] = useState<Album>()
  const [showLoading, setShowLoading] = useState(true)
  const playlist = usePlayerState().playlist
  const navigate = useNavigate()
  useEffect(() => {
    getRecommend().then(res => {
      setShowLoading(false)
      setSliders(res.sliders)
      setAlbums(res.albums)
    })
  }, [])

  function selectedItem(album: Album) {
    setSelectedAlbum(album)
    storage.session.set(ALBUM_KEY, album)
    navigate(`/recommend/${album.id}`)
  }


  return (
    <Wrapper hasPlay={!!playlist.length}>
      <WrapScroll wrapperStyle={{height: '100%', overflow: "hidden"}}>
        <div>
          <SliderWrapper>
            <SliderContent>
              {sliders.length > 0 && <Slider sliders={sliders}/>}
            </SliderContent>
          </SliderWrapper>
          <RecommendList>
            <h1
              className="list-title"
              style={{display: (!showLoading) ? 'block' : 'none'}}
            >
              热门歌单推荐
            </h1>
            <ul>
              {
                albums.map(album => (
                  <li
                    className="item"
                    key={album.id}
                    onClick={() => selectedItem(album)}
                  >
                    <div className="icon">
                      <LazyLoadImg width={60} height={60} scr={album.pic}/>
                    </div>
                    <div className="text">
                      <h1 className="name">
                        {album.username}
                      </h1>
                      <p className="title">
                        {album.title}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </RecommendList>
        </div>
      </WrapScroll>
      <Outlet context={selectedAlbum}/>
      <Loading show={showLoading}/>
    </Wrapper>

  )
}

export function useSelectedAlbum() {
  return useOutletContext<Album>()
}

export default observer(Recommend)
