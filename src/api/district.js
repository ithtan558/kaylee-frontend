import request from '@/utils/request'

export function fetchListDistrict() {
  return request({
    url: '/district/all',
    method: 'get'
  })
}

export function fetchListDistrictByCityId(city_id) {
  return request({
    url: '/district/list-by-city/' + city_id,
    method: 'get'
  })
}
