import { PLAY_MODE } from "../../assets/js/constant";
import { PlayerState } from "../../store";

export default function useMode(playMode: number, playerState: PlayerState) {
  const modeIcon = playMode === PLAY_MODE.sequence
    ? 'icon-sequence'
    : playMode === PLAY_MODE.random
      ? 'icon-random'
      : 'icon-loop'
  const modeText = playMode === PLAY_MODE.sequence
    ? '顺序播放'
    : playMode === PLAY_MODE.random
      ? '随机播放'
      : '单曲循环'

  function changeMode() {
    const mode = (playMode + 1) % 3
    playerState.changeMode(mode)
  }

  return {
    modeIcon,
    modeText,
    changeMode
  }
}
