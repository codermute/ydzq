<template>
  <div class="noActivity">
    <!--未开始弹窗-->
    <div class="popup" v-if="isShow" id="noStartBox">
      <div class="popup-bg"></div>
      <div class="popup-info" style="width: 50%">
        <div class="popup-content">
          <div class="noStart-box">
            <img src="@/assets/images/icon-nodata.png" />
            <div class="noStart-title">活动暂未开始</div>
            <div class="noStart-text">敬请期待</div>
          </div>
          <a class="close-btn2" @click="closeBtn"
            ><img src="@/assets/images/close.png" />
          </a>
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
    default: false
  }
})

const emit = defineEmits(['closeBtn'])

const isShow = ref(props.isActive)

watch(
  () => props.isActive,
  (newValue) => {
    isShow.value = newValue
  }
)

const closeBtn = () => {
  emit('closeBtn')
}
</script>
