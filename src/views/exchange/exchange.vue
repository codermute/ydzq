<template>
  <div class="exchange">
    <div class="main-box">
      <div class="dh-top-box">
        <div class="md-dh-row">
          <img src="@/assets/images/hf-img1.png" />
          <div class="md-dh-info">
            <div class="dh-name">
              <label>{{ store.exchangeData.item?.rewardsName }}</label
              >x1
            </div>
            <div class="dh-num">
              消耗翼豆<span class="color-yellow">{{
                store.exchangeData.item?.consumenum
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="md-box">
        <div class="md-title">兑换条件</div>
        <div class="md-text">
          ①兑换次数：每天限兑1次<br />
          ②兑后须知：虚拟权益兑换后不可退换
        </div>
      </div>
      <div class="md-box">
        <div class="md-title">使用规则</div>
        <div class="md-text">
          ①话费券仅限在湖南电信公众号内充值使用。<br />
          ②兑换成功后，话费券将自动下发绑定手机号码内，前往公众号充值即可使用。
        </div>
      </div>
      <a @click="changeImmediately" class="bottom-btn">立即兑换</a>
      <!--<a href="#" class="bottom-btn gray">翼豆不足</a>-->
    </div>

    <!--话费、红包、视频兑换弹窗-->
    <div class="popup" v-if="isVirtualShow" id="oneup">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-content padding-sm">
          <div class="popup-tit">输入手机号码</div>
          <div class="rw-info">
            <div class="form-group">
              <img class="form-icon" src="@/assets/images/icon2.png" />
              <input
                type="text"
                v-model="phone"
                class="form-control"
                placeholder="请输入手机号码"
              />
            </div>
          </div>
          <div class="popup-text">
            温馨提示:<br />
            收货地址请确认填写正确，地址提交后不可修改实物礼品将于兑换后7个工作日内寄送。
          </div>
          <a class="popup-btn" @click="virtualSubmit">提交</a>
          <a class="close-btn2" @click="isVirtualShow = false"
            ><img src="@/assets/images/close.png" />
          </a>
        </div>
      </div>
    </div>

    <!--实物兑换弹窗-->
    <div class="popup" v-if="isPhysicalShow">
      <div class="popup-bg"></div>
      <div class="popup-info">
        <div class="popup-content padding-sm">
          <div class="popup-tit">输入收货地址</div>
          <div class="rw-info">
            <div class="form-group">
              <img class="form-icon" src="@/assets/images/icon1.png" />
              <input
                type="text"
                v-model.trim="info.name"
                class="form-control"
                placeholder="请输入姓名"
              />
            </div>
            <div class="form-group">
              <img class="form-icon" src="@/assets/images/icon2.png" />
              <input
                type="text"
                v-model="info.phone"
                class="form-control"
                placeholder="请输入手机号码"
              />
            </div>
            <div class="form-group">
              <img class="form-icon" src="@/assets/images/icon3.png" />
              <input
                type="text"
                v-model.trim="info.address"
                class="form-control"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
          <div class="popup-text">
            温馨提示:<br />
            收货地址请确认填写正确，地址提交后不可修改实物礼品将于兑换后7个工作日内寄送。
          </div>
          <a class="popup-btn" @click="physicalSubmit">提交</a>
          <a class="close-btn2" @click="isPhysicalShow = false"
            ><img src="@/assets/images/close.png" />
          </a>
        </div>
      </div>
    </div>

    <Toast :show="show" :message="message" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from '@/store/index.js'

import { cashRewards } from '@/service/index.js'
import { toast } from '@/utils/index'
import { getSm2Encrypt } from '@/utils/aesDataModel.js'

import Toast from '@/components/toast/toast'

const store = useStore()

const phone = ref('')
const isVirtualShow = ref(false)
const isPhysicalShow = ref(false)

const show = ref(false)
const message = ref('')

const info = reactive({
  name: '',
  phone: '',
  address: ''
})
const reg =
  /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/

const _toast = toast(show, message)

const changeImmediately = () => {
  if (store.exchangeData.type == 3) return (isPhysicalShow.value = true)
  isVirtualShow.value = true
}
const virtualSubmit = () => {
  if (!reg.test(phone.value)) return _toast('手机号码格式不正确')
  const option = JSON.stringify({
    id: store.exchangeData.item?.id,
    phone: phone.value
  })
  cashRewards(getSm2Encrypt(option)).then((res) => {
    if (res.code) return _toast(res.msg)
    isVirtualShow.value = false
    _toast(res.msg)
  })
}
const physicalSubmit = () => {
  if (!info.name) return _toast('姓名不能为空')
  if (!reg.test(info.phone)) return _toast('手机号码格式不正确')
  if (!info.address) return _toast('地址不能为空')
  const option = JSON.stringify({
    id: store.exchangeData.item?.id,
    name: info.name,
    phone: info.phone,
    address: info.address
  })
  cashRewards(getSm2Encrypt(option)).then((res) => {
    if (res.code) return _toast(res.msg)
    isPhysicalShow.value = false
    _toast(res.msg)
  })
}
</script>
