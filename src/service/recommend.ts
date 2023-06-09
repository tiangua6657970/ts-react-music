import { get } from "./base";

export function getRecommend() {
  return get('/api/getRecommend')
}

export function getAlbum(album: Album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}
