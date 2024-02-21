<script setup>
import { ref } from 'vue'

// Initializes a reactive reference for the search query and the store for state management.
// const store = useStore();
const searchText = ref('')

// Defines an emit function for the 'update-query' event, allowing parent components to react to search updates.
const emit = defineEmits(['update-query'])

// Updates the search query in the store and emits an 'update-query' event with the current search query value.
const updateQuery = () => {
  emit('update-query', searchText.value)
}
</script>

<template>
  <!-- Search input and button wrapped -->
  <div class="col">
    <div class="input-group">
      <input
        v-model="searchText"
        @input="updateQuery"
        type="text"
        class="form-control"
        placeholder="Search..."
        aria-label="Search bar"
        aria-describedby="button-addon2"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        @click="updateQuery"
      >
        Search
      </button>
    </div>
  </div>
</template>
