<template>
  <div class="screen-popup">
    <template v-if="isScreenShow">
      <div class="popup">
        <div class="popup-bg"></div>
        <div class="popup-info">
          <div class="popup-content">
            <div class="popup-md-box">
              <h2 class="popup-h2">欢迎首次来到翼豆专区</h2>
              <img src="@/assets/images/icon-ydh.jpg" />
              <div class="popup-text">
                <p>恭喜您获得：<span class="color-blue">+200翼豆</span></p>
                <p>(100翼豆可兑换1元话费券或1元微信红包哦～)</p>
              </div>
              <a class="popup-btn" @click="closeBtn">我知道了</a>
            </div>
            <a class="close-btn2" @click="closeBtn"
              ><img src="@/assets/images/close.png" />
            </a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  isScreenShow: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeBtn'])

const closeBtn = () => {
  emit('closeBtn')
}
</script>
