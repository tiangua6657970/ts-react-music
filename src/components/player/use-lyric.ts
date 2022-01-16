import { useState, useRef, useEffect, RefObject } from 'react'
import Lyric from 'lyric-parser'
import { usePlayerState } from "../../store";
import { getLyric } from "../../service/song";

export default function useLyric(songReady: RefObject<boolean>, currentTimeRef: RefObject<number>) {
  const [currentLineNum, setCurrentLineNum] = useState(0)
  const [pureMusicLyric, setPureMusicLyric] = useState('')
  const [playingLyric, setPlayingLyric] = useState('')
  const lyricScrollRef = useRef<any>(null)
  const lyricListRef = useRef<HTMLDivElement>(null)
  const currentLyricRef = useRef<Lyric>()
  const playerState = usePlayerState()
  const currentSong = playerState.currentSong
  useEffect(() => {
    const {url, id} = currentSong
    if (!url || !id) return
    stopLyric()
    currentLyricRef.current = undefined
    setCurrentLineNum(0)
    setPureMusicLyric('')
    setPlayingLyric('')
    let lyric: string
    getLyric(currentSong).then(res => {
      lyric = res
      playerState.addSongLyric(currentSong, lyric)
      currentLyricRef.current = new Lyric(lyric, handleLyric)
      const hasLyric = currentLyricRef.current.lines.length
      if (hasLyric) {
        if (songReady.current) {
          playLyric()
        }
      } else {
        const noLyric = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
        setPlayingLyric(noLyric)
        setPureMusicLyric(noLyric)
      }
    })
    return () => {

    }
  }, [currentSong.name])

  function playLyric() {
    if (currentLyricRef.current)
      currentLyricRef.current.seek(currentTimeRef.current! * 1000)

  }

  function stopLyric() {
    if (currentLyricRef.current)
      currentLyricRef.current.stop()
  }

  function handleLyric({lineNum, txt}: { lineNum: number; txt: string }) {
    setCurrentLineNum(lineNum)
    setPlayingLyric(txt)
    const scrollComp = lyricScrollRef.current?.current
    const listEL = lyricListRef.current
    if (scrollComp && listEL) {
      if (lineNum > 5) {
        const lineEl = listEL.children[lineNum - 5]
        scrollComp.scrollToElement(lineEl, 1000)
      } else
        scrollComp.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyricRef,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  }
}
