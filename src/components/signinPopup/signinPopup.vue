<template>
  <div class="signin-popup">
    <div class="popup" v-if="isShow">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-content">
          <div class="popup-md-box">
            <img src="@/assets/images/icon-ydh.jpg" />
            <h2 class="popup-h2">签到成功</h2>
            <div class="popup-text">
              <p>今日签到：<span class="color-blue">+10翼豆</span></p>
            </div>
            <a class="popup-btn" @click="handleSignin">确定</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['handleSignin'])

const isShow = ref(props.isActive)

watch(
  () => props.isActive,
  (newValue) => {
    isShow.value = newValue
  }
)

const handleSignin = () => {
  emit('handleSignin', false)
}
</script>
