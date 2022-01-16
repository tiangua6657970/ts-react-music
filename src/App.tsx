import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { load, saveAll } from './assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from './assets/js/constant'
import Routers from './router'
import Header from './components/header/Header'
import Tab from './components/tab'
import PlayerContext, { playerState } from './store'
import Player from './components/player/normal-player'
import { processSongs } from './service/song'

const favoriteSongs = load<Song>(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then(songs => {
    playerState.setFavoriteList(songs)
    saveAll(songs, FAVORITE_KEY)
  })
}
const historySongs = load<Song>(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then(songs => {
    playerState.setPlayHistory(songs)
    saveAll(songs, PLAY_KEY)
  })

}

const View = () => {
  return (
    <Router>
      <Header/>
      <Tab/>
      <Routers/>
      <Player/>
    </Router>
  )
}

function App() {
  return (
    <PlayerContext.Provider value={playerState}>
      <View></View>
    </PlayerContext.Provider>
  )
}

export default App
