

declare module "create-keyframe-animation"

interface Singer {
  id: number
  mid: string
  name: string
  pic: string
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
  lyric?: any
}

interface Pos {
  x: number,
  y: number
}

interface TopListItem {
  id: number
  name: string
  period: string
  pic: string
  songList: SongListItem[]
}

interface Album {
  id: string
  pic: string
  title: string
  username: string
}


interface W {
  hasPlay?: boolean
}

type Keys = '_singer_' | '_album_' | '_top_'
