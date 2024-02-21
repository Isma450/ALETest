<script setup>
// Imports Vue ref and defineEmits functions for component reactivity and event emitting.
import { ref } from 'vue'
import { defineEmits } from 'vue'

// Defines an emit function for the 'time-filter-update' event.
const emit = defineEmits(['time-filter-update'])
// A reactive reference for the local state of the time filter.
const localTimeFilter = ref('all')

// Emits the 'time-filter-update' event with the current value of the time filter.
const updateFilter = () => {
  emit('time-filter-update', localTimeFilter.value)
}
</script>

<template>
  <!-- Dropdown select for choosing a time filter -->
  <select class="form-select" v-model="localTimeFilter" @change="updateFilter">
    <option value="ALL">All</option>
    <option value="LAST_HOUR">Last hour</option>
    <option value="YESTERDAY">Yesterday</option>
    <option value="LAST_WEEK">Last week</option>
  </select>
</template>

<style scoped>
.form-select {
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
