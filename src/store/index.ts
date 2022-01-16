import { createContext, useContext } from 'react'
import { makeAutoObservable } from 'mobx'
import { shuffle } from '../assets/js/util'
import { load } from '../assets/js/array-store'
import { PLAY_MODE, SEARCH_KEY } from '../assets/js/constant'

class PlayerState {
  // 歌曲列表
  sequenceList: Song[] = []
  // 播放列表
  playlist: Song[] = []
  // 播放/停止
  playing: boolean = false
  // 播放模式 0|1|2
  playMode: number = PLAY_MODE.sequence
  // 当前索引
  currentIndex: number = 0
  // 播放收缩/放大
  fullScreen: boolean = false
  // 收藏列表
  favoriteList: Song[] = []
  // 搜索历史
  searchHistory: string[] = load(SEARCH_KEY)
  // 播放历史
  playHistory: Song[] = []

  constructor() {
    makeAutoObservable(this)
  }

  // 当前播放歌曲
  get currentSong() {
    return this.playlist[this.currentIndex] || {}
  }

  // 设置播放/停止
  setPlayingState(playing: boolean) {
    this.playing = playing
  }

  // 设置歌曲列表
  setSequenceList(list: Song[]) {
    this.sequenceList = list
  }

  // 设置播放列表
  setPlaylist(list: Song[]) {
    this.playlist = list
  }

  // 设置播放模式 0|1|2
  setPlayMode(mode: number) {
    this.playMode = mode
  }

  // 设置当前索引
  setCurrentIndex(index: number) {
    this.currentIndex = index
  }

  // 设置收缩/放大
  setFullScreen(fullScreen: boolean) {
    this.fullScreen = fullScreen
  }

  // 设置收藏列表
  setFavoriteList(list: Song[]) {
    this.favoriteList = list
  }

  // 添加歌词
  addSongLyric(song: Song, lyric: any) {
    this.sequenceList.map(item => {
      if (item.mid === song.mid) {
        item.lyric = lyric
      }
      return item
    })
  }

  // 设置搜索历史
  setSearchHistory(searches: string[]) {
    this.searchHistory = searches
  }

  // 设置播放历史
  setPlayHistory(songs: Song[]) {
    this.playHistory = songs
  }

  //  hook  顺序播放
  selectPlay(list: Song[], index: number) {
    this.playMode = PLAY_MODE.sequence
    this.setSequenceList(list)
    this.setPlayingState(true)
    this.setFullScreen(true)
    this.setPlaylist(list)
    this.setCurrentIndex(index)
  }

  // 随机播放
  randomPlay(list: Song[]) {
    this.playMode = PLAY_MODE.random
    this.setSequenceList(list)
    this.setPlayingState(true)
    this.setFullScreen(true)
    this.setPlaylist(shuffle(list))
    this.setCurrentIndex(0)
  }

  // 改变播放模式 0|1|2
  changeMode(mode: number) {
    const currentId = this.currentSong.id
    if (mode === PLAY_MODE.random) {
      this.setPlaylist(shuffle(this.sequenceList))
    } else {
      this.setPlaylist(this.sequenceList)
    }
    const index = this.playlist.findIndex(song => {
      return song.id === currentId
    })
    this.setCurrentIndex(index)
    this.setPlayMode(mode)
  }

  // 删除一首歌
  removeSong(song: Song) {
    const sequenceList = this.sequenceList.slice()
    const playlist = this.playlist.slice()
    const sequenceIndex = findIndex(sequenceList, song)
    const playIndex = findIndex(playlist, song)
    if (sequenceIndex < 0 || playIndex < 0) return
    sequenceList.splice(sequenceIndex, 1)
    playlist.splice(playIndex, 1)
    let currentIndex = this.currentIndex
    if (playIndex < currentIndex || currentIndex === playlist.length)
      currentIndex--
    this.setSequenceList(sequenceList)
    this.setPlaylist(playlist)
    this.setCurrentIndex(currentIndex)
    if (!playlist.length) this.setPlayingState(false)
  }

  // 清楚歌曲列表
  clearSongList() {
    this.setSequenceList([])
    this.setPlaylist([])
    this.setCurrentIndex(0)
    this.setPlayingState(false)
  }
  // 添加一首歌
  addSong(song: Song) {
    const playlist = this.playlist.slice()
    const sequenceList = this.sequenceList.slice()
    let currentIndex = this.currentIndex
    const playIndex = findIndex(playlist, song)
    if (playIndex > -1) {
      currentIndex = playIndex
    } else {
      playlist.push(song)
      currentIndex = playlist.length - 1
    }
    const sequenceIndex = findIndex(sequenceList, song)
    if (sequenceIndex === -1) {
      sequenceList.push(song)
    }
    this.setSequenceList(sequenceList)
    this.setPlaylist(playlist)
    this.setCurrentIndex(currentIndex)
    this.setPlayingState(true)
    this.setFullScreen(true)
  }
}

const PlayerContext = createContext<PlayerState>(new PlayerState())
export const playerState = new PlayerState()

export function usePlayerState() {
  return useContext(PlayerContext)
}

export { PlayerState }
export default PlayerContext

function findIndex(list: Song[], song: Song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}
