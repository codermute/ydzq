<template>
  <div class="toast" v-show="show">
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.16rem 0.2rem;
  color: #fff;
  z-index: 1002;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
