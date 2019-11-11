import request from '@/utils/request'

export function fetchAll() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}
