import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/service-category',
    method: 'get'
  })
}

export function create(isEdit, data, id) {
  return request({
    url: isEdit ? '/service-category/' + id : '/service-category',
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

export function deleteItem(id) {
  return request({
    url: '/service-category/delete/' + id,
    method: 'delete'
  })
}

export function fetchServiceCategory(id) {
  return request({
    url: '/service-category/' + id,
    method: 'get'
  })
}
