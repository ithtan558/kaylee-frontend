import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/order',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/order',
    method: 'post',
    timeout: 10 * 60 * 1000,
    data: data
  })
}
