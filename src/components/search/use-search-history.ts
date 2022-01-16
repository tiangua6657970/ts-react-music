import { useCallback } from 'react'
import { save, remove, clear } from "../../assets/js/array-store";
import { SEARCH_KEY } from "../../assets/js/constant";
import { usePlayerState } from "../../store";

export default function useSearchHistory() {
  const maxLen = 200
  const playerState = usePlayerState()

  const saveSearch = useCallback(
    (query: string) => {
      const searches = save(query, SEARCH_KEY, (item) => item === query, maxLen)
      playerState.setSearchHistory(searches)
    },
    []
  )

  const deleteSearch = useCallback(
    (query: string) => {
      const searches = remove<string>(SEARCH_KEY, item => item === query)
      playerState.setSearchHistory(searches)
    },
    []
  )

  const clearSearch = useCallback(
    () => {
      const searches = clear<string>(SEARCH_KEY)
      playerState.setSearchHistory(searches)
    },
    []
  )
  return {
    saveSearch,
    deleteSearch,
    clearSearch
  }
}
