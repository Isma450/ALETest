import { getToken } from './auth.service'

// Fetch catalog items with optional filtering, sorting, and pagination.
export async function getCatalogItems({ page, limit, sortBy, sortOrder, searchText, timeFilter }) {
  try {
    const token = getToken()
    const paramsObject = { page, limit, sortBy, sortOrder, searchText, timeFilterName: timeFilter }

    // Clean up parameters by removing undefined or empty filters.
    if (!paramsObject.searchText) delete paramsObject.searchText
    if (!paramsObject.timeFilterName) delete paramsObject.timeFilterName

    const params = new URLSearchParams(paramsObject)

    // Perform the API call to fetch items with the constructed query parameters.
    const response = await fetch(
      `http://localhost:3000/api/v1/users/catalog-items?${params.toString()}`,
      {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` }
      }
    )

    const { products, count } = await response.json()

    return { products, count }
  } catch (error) {
    console.error('Error fetching items:', error)
    throw error
  }
}
