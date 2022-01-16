import { useEffect, useState } from 'react'
import { useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import { getSingerList } from "../../service/singer"
import IndexList from "../../components/index-list"
import Loading from "../../components/base/loading"
import { usePlayerState } from "../../store"
import { observer } from "mobx-react-lite";
import storage from "good-storage"
import { SINGER_KEY } from "../../assets/js/constant"

const Singer = () => {
  const [singers, setSingers] = useState<any>([])
  const [singer, setSinger] = useState<Singer>()
  const [showLoading, setShowLoading] = useState(true)
  const playlist = usePlayerState().playlist
  const navigate = useNavigate()
  useEffect(() => {
    getSingerList().then(res => {
      setShowLoading(false)
      setSingers(res.singers)
    })
  }, [])

  function selectSinger(singer: Singer) {
    setSinger(singer)
    storage.session.set(SINGER_KEY, singer)
    navigate(`/singer/${singer.mid}`)
  }

  return (
    <div
      style={{position: "fixed", width: '100%', top: '88px', bottom: !!playlist.length ? '60px' : '0'}}>
      <IndexList data={singers} onSelect={selectSinger}/>
      <Outlet context={singer}/>
      <Loading show={showLoading}/>
    </div>
  )
}

export function useSelectedSinger() {
  return useOutletContext<Singer>()
}

export default observer(Singer)
