import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/service-category',
    method: 'get'
  })
}

export function create(isEdit, data, uuid) {
  return request({
    url: isEdit ? '/service-category/' + uuid : '/service-category',
    method: isEdit ? 'post' : 'post',
    timeout: 10 * 60 * 1000,
    data: data
  })
}

export function fetchAll() {
  return request({
    url: '/service-category/all',
    method: 'get'
  })
}
