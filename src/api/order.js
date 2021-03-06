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

export function getCount(query) {
  return request({
    url: '/order/get-count',
    method: 'get',
    params: query
  })
}

export function getTotal(query) {
  return request({
    url: '/report/get-total',
    method: 'get',
    params: query
  })
}


export function getTotalByEmployeeAndDate(query) {
  return request({
    url: '/report/get-total-by-employee-date',
    method: 'get',
    params: query
  })
}

export function getTotalByServiceAndDate(query) {
  return request({
    url: '/report/get-total-by-service-date',
    method: 'get',
    params: query
  })
}

