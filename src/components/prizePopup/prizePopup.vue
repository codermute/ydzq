<template>
  <div class="popup" v-show="isShow" id="lotteryBox">
    <div class="popup-bg"></div>
    <div class="popup-info">
      <div class="popup-content">
        <div class="popup-md-box">
          <img src="@/assets/images/icon-ydh.jpg" />
          <slot>
            <h2 class="popup-h2">已中奖</h2>
            <div class="popup-text">
              <p>
                恭喜您获得：<span class="yidou-text color-blue">{{
                  content
                }}</span>
              </p>
            </div>

            <a class="popup-btn" @click="changeHidePrize">好的</a>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['changeHidePrize'])

const changeHidePrize = () => {
  emit('changeHidePrize')
}
</script>
