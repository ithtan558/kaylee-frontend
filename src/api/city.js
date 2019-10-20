import request from '@/utils/request'

export function fetchListCity() {
  return request({
    url: '/city/all',
    method: 'get'
  })
}
