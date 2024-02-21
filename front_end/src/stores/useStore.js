// Importing dependencies and utility functions for item management.
import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { getCatalogItems } from '@/services/catalog.service'

/**
 * Defines a 'items' store for managing item-related state: retrieval, filtering, sorting, and pagination.
 */
export const useStore = defineStore('items', () => {
  // State: items, search query, pagination details, sorting options, and item count.
  const state = reactive({
    catalogItems: [],
    searchText: '',
    timeFilter: 'ALL',
    currentPage: 1,
    itemsPerPage: 10,
    sortBy: 'date',
    sortOrder: 'desc',
    count: 0
  })

  /**
   * Fetches catalog items with pagination and updates the state.
   * @param {Object} options Pagination options: page and limit.
   */
  async function fetchCatalogItems({ page, limit, sortBy, sortOrder, searchText, timeFilter }) {
    const data = await getCatalogItems({ page, limit, sortBy, sortOrder, searchText, timeFilter })
    state.catalogItems = data.products
    state.count = data.count
  }

  /**
   * Updates sorting key and order, then applies sorting to items.
   * @param {string} key Sorting key (e.g., 'date', 'name').
   */
  function updatedSortItems(key) {
    console.log('updatedSortItems', { key })
    // Update sortBy and toggle sortOrder for the same key or set to 'asc' for a different key
    if (state.sortBy === key) {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      state.sortBy = key
      state.sortOrder = 'asc'
    }
  }

  // Computed properties for pagination: total pages and items for the current page.
  const totalPages = computed(() => Math.ceil(state.count / state.itemsPerPage))
  const paginatedItems = computed(() => state.catalogItems)

  // Exposes state, fetch functions, computed properties, and actions for components.
  return {
    state,
    fetchCatalogItems,
    totalPages,
    paginatedItems,
    updatedSortItems
  }
})
