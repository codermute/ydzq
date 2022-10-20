<template>
  <div class="no-data-box">
    <img src="@/assets/images/no-data.png" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '暂未开始'
  }
})
</script>
