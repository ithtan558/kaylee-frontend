import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/customer',
    method: 'get',
    params: query
  })
}

export function create(isEdit, data, id) {
  return request({
    url: isEdit ? '/customer/' + id : '/customer',
    method: isEdit ? 'post' : 'post',
    data: data
  })
}

export function fetchCustomer(id) {
  return request({
    url: '/customer/' + id,
    method: 'get'
  })
}

export function deleteItem(id) {
  return request({
    url: '/customer/delete/' + id,
    method: 'delete'
  })
}

export function getCustomer(query) {
  return request({
    url: '/customer/get-by-phone-and-name',
    method: 'get',
    params: query
  })
}
