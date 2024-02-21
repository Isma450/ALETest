import { getToken } from './auth.service'
export async function getCatalogItems({ page, limit, sortBy, sortOrder, searchText, timeFilter }) {
  try {
    const token = getToken()
    // check search text and remove if it's undifined or falsy value
    const paramsObject = {
      page,
      limit,
      sortBy,
      sortOrder,
      searchText,
      timeFilterName: timeFilter
    }
    if (!paramsObject.searchText) {
      delete paramsObject.searchText
    }

    if (!paramsObject.timeFilterName) {
      delete paramsObject.timeFilterName
    }

    const params = new URLSearchParams(paramsObject)

    const response = await fetch(
      'http://localhost:3000/api/v1/users/catalog-items?' + params.toString(),
      {
        method: 'GET',
        headers: {
          authorization: 'token ' + token
        }
      }
    )
    const { products, count } = await response.json()
    //console.log('data catalog:', { products, count })
    return { products, count }
  } catch (error) {
    console.error('Error fetching items:', error)
    throw error
  }
}
