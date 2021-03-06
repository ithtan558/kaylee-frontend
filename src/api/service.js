import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/service',
    method: 'get',
    params: query
  })
}

export function create(isEdit, data, id) {
  return request({
    url: isEdit ? '/service/' + id : '/service',
    method: isEdit ? 'post' : 'post',
    config: { headers: { 'Content-Type': 'multipart/form-data' }},
    timeout: 10 * 60 * 1000,
    data: data
  })
}

export function fetchService(id) {
  return request({
    url: '/service/' + id,
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/service/delete/' + id,
    method: 'delete'
  })
}

export function fetchAll() {
  return request({
    url: '/service/all',
    method: 'get'
  })
}

