import { PlayerState } from "../../store";
import { save, remove } from "../../assets/js/array-store";
import { FAVORITE_KEY } from "../../assets/js/constant";

export default function useFavorite(playerState: PlayerState) {
  const favoriteList = playerState.favoriteList
  const maxLen = 100

  function getFavoriteIcon(song: Song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  function toggleFavorite(song: Song) {
    let list: Array<Song>
    if (isFavorite(song)) {
      list = remove<Song>(FAVORITE_KEY, compare)
    } else {
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    playerState.setFavoriteList(list)

    function compare(item: Song) {
      return item.id === song.id
    }
  }

  function isFavorite(song: Song) {
    return favoriteList.findIndex(item => {
      return item.id === song.id
    }) > -1
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
