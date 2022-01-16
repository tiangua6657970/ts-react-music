import { PLAY_KEY } from "../../assets/js/constant";
import { usePlayerState } from "../../store";
import { save } from "../../assets/js/array-store";

export default function usePlayHistory() {
  const playerState = usePlayerState()
  const maxLen = 200

  function savePlay(song: Song) {
    const songs = save(song, PLAY_KEY, item => {
      return (item as Song).id === song.id
    }, maxLen)
    playerState.setPlayHistory(songs as Song[])
  }

  return {
    savePlay
  }
}
