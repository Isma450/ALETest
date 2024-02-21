<script setup>
// Import Vue's composition API functions for defining props and emitting events.
import { defineProps, defineEmits } from 'vue';

// Define props for current page, total pages, and number of items found.
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  itemsFound: Number
});

// Define emit function for notifying parent components of page changes.
const emit = defineEmits(['page-changed']);

// Method for changing pages, ensuring the new page number is within valid range.
function changePage(page) {
  if (page > 0 && page <= props.totalPages) {
    emit('page-changed', page);
  }
}
</script>


<template>
  <!-- Navigation for pagination, including previous and next buttons -->
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <!-- Previous Page Button -->
      <li class="page-item" :class="{ 'disabled': props.currentPage <= 1 }">
        <button class="page-link" @click="changePage(props.currentPage - 1)" :disabled="props.currentPage <= 1"
          aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <!-- Current Page Indicator -->
      <li class="page-item disabled">
        <span class="page-link">Page {{ props.currentPage }} of {{ props.totalPages }}</span>
      </li>

      <!-- Next Page Button -->
      <li class="page-item" :class="{ 'disabled': props.currentPage >= props.totalPages }">
        <button class="page-link" @click="changePage(props.currentPage + 1)"
          :disabled="props.currentPage >= props.totalPages" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
  <!-- Display of total items found -->
  <div class="text-center">
    ({{ props.itemsFound }} items found)
  </div>
</template>
