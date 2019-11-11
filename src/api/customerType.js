import request from '@/utils/request'

export function fetchAll() {
  return request({
    url: '/customer-type/all',
    method: 'get'
  })
}
