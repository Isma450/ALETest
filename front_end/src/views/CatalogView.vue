<script setup>
// Imports Vue composition API functions, the store, and child components.
import { onMounted, watch } from 'vue'
import { useStore } from '@/stores/useStore'
import SearchBar from '@/components/common/SearchBar.vue'
import TimeFilter from '@/components/common/TimeFilter.vue'
import CatalogItems from '@/components/catalog/CatalogItems.vue'
import Pagination from '@/components/catalog/Pagination.vue'

// Initialization of the store and definition of component methods for updating the store's state.
const store = useStore()

// Methods for updating the store's state. These methods are called by child components to update the store's state.
const refetchCatalogItems = () => {
  store.fetchCatalogItems({
    page: store.state.currentPage,
    limit: store.state.itemsPerPage,
    sortOrder: store.state.sortOrder,
    sortBy: store.state.sortBy,
    searchText: store.state.searchText,
    timeFilter: store.state.timeFilter
  })
}

const changePage = (page) => {
  store.state.currentPage = page
}
const updateQuery = (query) => {
  store.state.searchText = query
}
const handleTimeFilterUpdate = (newTimeFilter) => {
  store.state.timeFilter = newTimeFilter
  // store.applyFilters()
}

// Fetch items from the API when the component mounts.
onMounted(() => {
  // Lifecycle
  // store.fetchItems() // TODO delete
  refetchCatalogItems()
})

// Watch for changes in searchText and timeFilter to reapply filters.
watch(
  () => [store.state.timeFilter],
  () => {
    refetchCatalogItems()
  }
)

watch(
  () => store.state.currentPage,
  () => {
    refetchCatalogItems()
  },
  { immediate: true }
)

watch(
  () => store.state.sortOrder,
  () => {
    refetchCatalogItems()
  }
)

watch(
  () => store.state.searchText,
  () => {
    refetchCatalogItems()
  }
)
</script>

<template>
  <!-- Main container for the application interface, including search, filtering, and pagination -->
  <div class="container">
    <!-- Search bar and time filter components -->
    <div class="container my-3">
      <div class="row mb-4 gx-6">
        <SearchBar @update-query="updateQuery" />
        <div class="col">
          <TimeFilter @time-filter-update="handleTimeFilterUpdate" />
        </div>
      </div>
    </div>

    <!-- Catalog items display and pagination controls -->
    <div class="row">
      <div class="col-12">
        <CatalogItems :items="store.paginatedItems" />
      </div>
    </div>

    <!-- Pagination controls and display -->
    <div class="row">
      <div class="col-12">
        <Pagination
          :currentPage="store.state.currentPage"
          :totalPages="store.totalPages"
          :itemsFound="store.state.count"
          @page-changed="changePage"
        />
      </div>
    </div>
  </div>
</template>
