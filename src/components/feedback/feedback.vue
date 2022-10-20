<template>
  <div class="feedback">
    <div class="popup-fk-box" v-if="isActive">
      <img
        class="close-fk"
        @click="isActive = false"
        src="@/assets/images/close-img2.png"
      />
      <a @click="navigateTo" class="feedback-img"
        ><img src="@/assets/images/icon-feedback.png" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(true)

const emit = defineEmits(['navigateTo'])

const navigateTo = () => {
  emit('navigateTo', 'feedback')
}
</script>
