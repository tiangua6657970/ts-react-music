import { useState, useRef, useEffect, SyntheticEvent } from 'react'
import { usePlayerState } from "../../store"
import { reaction } from "mobx";
import { PLAY_MODE } from "../../assets/js/constant"
import useLyric from "./use-lyric"
import usePlayHistory from "./use-play-history";

let PROGRESSCHANGEING = false
export default function useAudio() {
  const songReadyRef = useRef(false)
  const playerState = usePlayerState()
  const playing = playerState.playing
  const playlist = playerState.playlist
  const currentIndex = playerState.currentIndex
  const currentSong = playerState.currentSong
  const playMode = playerState.playMode
  const audioRef = useRef<HTMLAudioElement>(null)
  const currentTimeRef = useRef(0)
  const {
    currentLyricRef,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  } = useLyric(songReadyRef, currentTimeRef)
  const {savePlay} = usePlayHistory()
  useEffect(() => {
    const audioEl = audioRef.current!
    // mobx的坑,判断引用类型总是true,所以判断了name
    const sha = reaction(() => playerState.currentSong.name, () => {
      const {id, url} = playerState.currentSong
      if (!id || !url) return
      currentTimeRef.current = 0
      songReadyRef.current = false
      audioEl.src = url
      audioEl.play()
      playerState.setPlayingState(true)
    })
    return () => {
      console.log(sha, 'sha')
    };
  }, [])
  useEffect(() => {
    const audioEl = audioRef.current!
    if (!songReadyRef.current) return
    if (playing) {
      audioEl.play()
      playLyric()
    } else {
      audioEl.pause()
      stopLyric()
    }
  }, [playing])


  function pause() {
    playerState.setPlayingState(false)
  }

  function togglePlay() {
    if (!songReadyRef.current) return
    playerState.setPlayingState(!playing)
  }

  function ready() {
    if (songReadyRef.current) return
    songReadyRef.current = true
    playLyric()
    savePlay(currentSong)
  }

  function error() {
    songReadyRef.current = true
  }

  function updateTime(e: SyntheticEvent<HTMLAudioElement>) {
    if (!PROGRESSCHANGEING)
      currentTimeRef.current = (e.target as HTMLAudioElement).currentTime
    else console.log(false)
  }

  function end() {
    currentTimeRef.current = 0
    if (playMode === PLAY_MODE.loop) loop()
    else next()
  }

  function prev() {
    if (!songReadyRef.current || !playlist.length) return
    if (playlist.length === 1) loop()
    else {
      let index = currentIndex - 1
      if (index === -1) index = playlist.length - 1
      playerState.setCurrentIndex(index)
    }
  }

  function next() {
    if (!songReadyRef.current || !playlist.length) return
    if (playlist.length === 1) loop()
    else {
      let index = currentIndex + 1
      if (index === playlist.length) index = 0
      playerState.setCurrentIndex(index)
    }
  }

  function loop() {
    const audioEl = audioRef.current!
    audioEl.currentTime = 0
    audioEl.play()
    playerState.setPlayingState(true)
  }

  function progressChanging(progress: number) {
    PROGRESSCHANGEING = true
    currentTimeRef.current = currentSong.duration * progress
    playLyric()
    stopLyric()
  }

  function progressChanged(progress: number) {
    PROGRESSCHANGEING = false
    currentTimeRef.current = currentSong.duration * progress
    audioRef.current!.currentTime = currentSong.duration * progress
    if (!playing)
      playerState.setPlayingState(true)
    playLyric()
  }

  const playIcon = playing ? 'icon-pause' : 'icon-play'
  const disableCls = songReadyRef.current ? '' : 'disable'
  const progress = currentTimeRef.current / currentSong.duration
  return {
    audioRef,
    playIcon,
    disableCls,
    pause,
    togglePlay,
    ready,
    updateTime,
    error,
    end,
    prev,
    next,
    currentTimeRef,
    progress,
    songReadyRef,
    progressChanging,
    progressChanged,
    // lyric
    currentLyricRef,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
  }
}
