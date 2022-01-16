import { get } from "./base";

export function getTopList() {
  return get('/api/getTopList')
}

export function getTopDetail(top: TopListItem) {
  return get('/api/getTopDetail', {
    id: top.id,
    period: top.period
  })
}
