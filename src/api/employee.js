import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/employee',
    method: 'get'
  })
}

export function create(isEdit, data, id) {
  return request({
    url: isEdit ? '/employee/' + id : '/employee',
    method: isEdit ? 'post' : 'post',
    config: { headers: { 'Content-Type': 'multipart/form-data' }},
    timeout: 10 * 60 * 1000,
    data: data
  })
}

export function fetchEmployee(id) {
  return request({
    url: '/employee/' + id,
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/employee/delete/' + id,
    method: 'delete'
  })
}

export function fetchAll() {
  return request({
    url: '/employee/all',
    method: 'get'
  })
}

export function getEmployee(query) {
  return request({
    url: '/employee/get-by-phone-and-name',
    method: 'get',
    params: query
  })
}
