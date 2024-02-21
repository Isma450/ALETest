// Importing dependencies and utility functions for item management.
import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { getCatalogItems } from '@/services/catalog.service'

/**
 * Defines a 'items' store for managing item-related state: retrieval, filtering, sorting, and pagination.
 * Utilizes Pinia for state management to facilitate a modular and organized approach.
 */
export const useStore = defineStore('items', () => {
  // State: Structured reactive state to manage catalog items, search criteria, pagination, and sorting.
  // Reactive ensures state is responsive to changes for real-time UI updates.
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
   * Fetches catalog items based on current state parameters (pagination, search, and sorting).
   * @param {Object} options Contains parameters for the API request: page, limit, sortBy, sortOrder, searchText, timeFilter.
   * This function is asynchronous to handle API request latency.
   */
  async function fetchCatalogItems({ page, limit, sortBy, sortOrder, searchText, timeFilter }) {
    const data = await getCatalogItems({ page, limit, sortBy, sortOrder, searchText, timeFilter })
    // Updates the local state with fetched data, facilitating a reactive UI update.
    state.catalogItems = data.products
    state.count = data.count
  }

  /**
   * Updates sorting criteria and order, applying the new sorting to catalog items.
   * Toggles sortOrder if the same sorting key is applied or sets it to 'asc' for a different key.
   * @param {string} key Sorting key (e.g., 'date', 'name').
   */
  function updatedSortItems(key) {
    // Conditional logic to manage sorting behavior dynamically based on user interaction.
    if (state.sortBy === key) {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      state.sortBy = key
      state.sortOrder = 'asc'
    }
  }

  // Computed properties dynamically calculate values based on the reactive state, ensuring efficiency.
  // Calculates total pages for pagination, enabling dynamic UI pagination controls.
  const totalPages = computed(() => Math.ceil(state.count / state.itemsPerPage))
  // Represents the items to be displayed on the current page, can be extended to include slicing for actual pagination.
  const paginatedItems = computed(() => state.catalogItems)

  return {
    state,
    fetchCatalogItems,
    totalPages,
    paginatedItems,
    updatedSortItems
  }
})
