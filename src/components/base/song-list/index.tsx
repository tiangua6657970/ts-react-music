import { memo } from 'react'
import { List, Item, Content, Rank } from './styled'

interface Props {
  songs: Song[]
  rank?: boolean
  onSelect?: (song: Song, index: number) => void
}

const SongList = (props: Props) => {
  const {songs, rank, onSelect} = props

  function getDesc(song: Song) {
    return `${song.singer}.${song.album}`
  }

  function getRankCls(index: number) {
    if (index <= 2)
      return `icon icon${index}`
    else
      return 'text'
  }

  function getRankText(index: number) {
    if (index > 2) return index + 1
  }

  function selectItem(song: Song, index: number) {
    onSelect && onSelect(song, index)
  }

  return (
    <List>
      {
        songs.map((song, index) => (
          <Item key={song.id} onClick={() => selectItem(song, index)}>
            {
              rank && <Rank>
                <span className={getRankCls(index)}>{getRankText(index)}</span>
              </Rank>
            }
            <Content>
              <h2 className="name">{song.name}</h2>
              <p className="desc">{getDesc(song)}</p>
            </Content>
          </Item>
        ))
      }
    </List>
  )
}

export default memo(SongList)
