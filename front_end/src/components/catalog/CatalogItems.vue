<script setup>
// Imports Vue's computed function and the store for reactive state management.
import { computed } from 'vue'
import { useStore } from '@/stores/useStore'

const store = useStore()

// Computed property to always reflect the current state of paginated items from the store.
const items = computed(() => store.paginatedItems)

// Utility function for formatting date strings.
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// Method to delegate item sorting to the store.
function sortItems(key) {
  store.updatedSortItems(key)
}
</script>

<template>
  <!-- Table display for catalog items with sortable columns -->
  <div class="table-responsive">
    <table class="table table-striped table-hover table-sm border border-dark rounded-3">
      <thead>
        <tr class="text-center border border-dark">
          <th scope="col">Type</th>
          <th scope="col">
            Name
            <button @click="sortItems('name')" class="btn btn-light btn-sm">
              <i class="bi bi-arrow-down-up"></i>
            </button>
          </th>
          <th scope="col">MAC</th>
          <th scope="col">IPV4</th>
          <th scope="col">Online</th>
          <th scope="col">Description</th>
          <th scope="col">
            Date
            <button @click="sortItems('creationDate')" class="btn btn-light btn-sm">
              <i class="bi bi-arrow-down-up"></i>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="item in items" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.mac }}</td>
          <td>{{ item.ipv4 }}</td>
          <td>
            <span :class="['badge', item.online ? 'bg-success' : 'bg-secondary']">
              {{ item.online ? 'Yes' : 'No' }}
            </span>
          </td>
          <td>{{ item.description }}</td>
          <td>{{ formatDate(item.creationDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
