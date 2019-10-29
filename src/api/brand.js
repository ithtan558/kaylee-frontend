import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/brand',
    method: 'get'
  })
}

export function create(isEdit, data, id) {
  return request({
    url: isEdit ? '/brand/' + id : '/brand',
    method: isEdit ? 'post' : 'post',
    config: { headers: { 'Content-Type': 'multipart/form-data' }},
    timeout: 10 * 60 * 1000,
    data: data
  })
}

export function fetchBrand(id) {
  return request({
    url: '/brand/' + id,
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/brand/delete/' + id,
    method: 'delete'
  })
}

export function fetchAll() {
  return request({
    url: '/brand/all',
    method: 'get'
  })
}
