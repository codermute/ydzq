<template>
  <div class="md-title">{{ title }}</div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
