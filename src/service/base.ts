import axios from "axios";

const ERR_OK = 0
const baseURL = '/'
axios.defaults.baseURL = baseURL

export function get(url: string, params?: any) {
  return axios.get(url, {
    params
  }).then(res => {
    const serverDate = res.data
    if (serverDate.code === ERR_OK) {
      return serverDate.result
    }
  }).catch(e => {
    console.log(e, 'request-error')
  })
}
