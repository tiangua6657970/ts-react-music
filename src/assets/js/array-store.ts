import storage from "good-storage"

interface Compare<T> {
  (item: T): boolean
}

function inertArray<T>(arr: Array<T>, song: T, compare: Compare<T>, maxLen: number) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(song)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray<T>(arr: Array<T>, compare: Compare<T>) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function save<T>(song: T, key: string, compare: Compare<T>, maxLen: number): Array<T> {
  const songs = storage.get(key, [])
  inertArray(songs, song, compare, maxLen)
  storage.set(key, songs)
  return songs
}

export function remove<T>(key: string, compare: Compare<T>): Array<T> {
  const songs = storage.get(key, [])
  deleteFromArray(songs, compare)
  storage.set(key, songs)
  return songs
}

export function load<T>(key: string): Array<T> {
  return storage.get(key, [])
}

export function clear<T>(key: string): T[] {
  storage.remove(key)
  return []
}

export function saveAll<T>(songs: Array<T>, key: string) {
  storage.set(key, songs)
}
