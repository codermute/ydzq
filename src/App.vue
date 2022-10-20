<template>
  <router-view />
</template>

<script setup>
import { useStore } from '@/store/index.js'

const store = useStore()

store.login()
</script>

<style scoped>
@import './assets/css/public.css';
@import './assets/css/style.css';
</style>
