<template>
  <div class="login">
    <div class="popup" v-if="isLogin">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-content padding-sm">
          <div class="popup-tit">请先登录哦</div>
          <div class="rw-info">
            <div class="form-group">
              <img class="form-icon" src="@/assets/images/icon2.png" />
              <input
                v-model.number="loginInfo.phone"
                type="text"
                class="form-control"
                placeholder="请输入手机号码"
              />
            </div>
            <div class="form-group">
              <img class="form-icon" src="@/assets/images/icon4.png" />
              <input
                v-model="loginInfo.verification"
                type="text"
                class="form-control"
                placeholder="请输入短信验证码"
              />
              <input
                type="button"
                value="获取验证码"
                class="btn-yz"
                @click="handleObtainVerification"
              />
            </div>
          </div>
          <div class="popup-text">
            温馨提示:<br />
            收货地址请确认填写正确，地址提交后不可修改实物礼品将于兑换后7个工作日内寄送。
          </div>
          <a class="popup-btn" @click="handleLoginSubmit">提交</a>
          <a class="close-btn2" @click="isActive = false"
            ><img src="@/assets/images/close.png" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps({
  isLogin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['handleLoginSubmit', 'handleObtainVerification'])

const loginInfo = reactive({
  phone: '',
  verification: ''
})

const isActive = ref(false)

const handleObtainVerification = () => {
  emit('handleObtainVerification', loginInfo)
}
const handleLoginSubmit = () => {
  emit('handleLoginSubmit', loginInfo)
}
</script>
