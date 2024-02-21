<script setup>
import Header from './components/common/Header.vue'; // Import the Header component for use in the main app layout.
// The setup script is minimal, as this component mainly serves as a layout wrapper around the <router-view>.
</script>

<template>
  <!-- Main application template with a header and a router view for page content -->
  <div>
    <Header /> <!-- Includes the header component at the top of every page -->
    <router-view /> <!-- Dynamic component that changes based on the current route -->
  </div>
</template>

