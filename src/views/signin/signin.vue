<template>
  <div class="signin">
    <div class="main-box noMargin">
      <div class="sign-top-box">
        <div class="sign-top-info">
          <div class="sign-date">
            本月您已累计签到
            <span>{{ signinDateList.length }}</span> 天，继续加油！
          </div>
          <div class="sign-row">
            <div class="sign-text">
              <img src="@/assets/images/icon-gold.png" />签到立即获得<span
                >10翼豆</span
              >
            </div>
            <a @click="handleSignin(true)" class="sign-btn">{{
              signinTitle
            }}</a>
          </div>
        </div>
        <img src="@/assets/images/home-top-bg.jpg" />
      </div>

      <div class="sign-box">
        <div class="calendar-wrapper">
          <div id="calendar" ref="calendar"></div>
        </div>
        <div class="sign-status">
          <span>已签到</span>
          <span>未签到</span>
          <span>今日</span>
        </div>
      </div>

      <a @click="redeemGifts" class="sign-bottom-btn">去兑换礼品</a>
    </div>

    <!--  立即签到弹窗 -->
    <signin-popup :isActive="isActive" @handleSignin="isActive = false" />

    <Toast :show="show" :message="message" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

import { DecryptData, getSm2Encrypt } from '@/utils/aesDataModel.js'
import { getSigninList, setSignin } from '@/service/index.js'
import { toast } from '@/utils/index'

import signinPopup from '@/components/signinPopup/signinPopup'
import Toast from '@/components/toast/toast'

import $ from '@/utils/jquery.min'
import '@/utils/FlexoCalendar.js'

const router = useRouter()

const calendar = ref(null)
const isActive = ref(false)
const currentDate = ref(dayjs().format('YYYY-MM'))
const signinDateList = ref([])
const show = ref(false)
const message = ref('')
const today = dayjs().format('YYYY-MM-DD')

const _toast = toast(show, message)

const signinTitle = computed(() => {
  const index = signinDateList.value.indexOf(today)
  return index === -1 ? '立即签到' : '已签到'
})

onMounted(async () => {
  getCalendar()
  getPage()
})

const handleSignin = async (option) => {
  const res = await setSignin()
  if (res.code) return _toast(res.msg)
  isActive.value = option
  getPage()
}
const redeemGifts = () => {
  router.replace({ path: `/home` })
}

// 获取相应月份的签到日期
async function getPage() {
  const res = await getSigninList(getSm2Encrypt(currentDate.value))
  if (res.code) return
  signinDateList.value = DecryptData(res.data)
  signinDateList.value = signinDateList.value.map((item) => {
    return dayjs(item).format('YYYY-MM-DD')
  })
  setSign()
}
// 创建日历
function getCalendar() {
  if (calendar.value.innerHTML) return
  $('#calendar').flexoCalendar({
    ongoprev: function (date) {
      currentDate.value = date
      getPage()
    },
    ongonext: function (date) {
      currentDate.value = date
      getPage()
    }
  })
}
// 给签到日期添加背景
function setSign() {
  const tbodyEl = calendar.value.children[0].children[1].children
  for (let i = 0; i < tbodyEl.length; i++) {
    const trEl = tbodyEl[i].children
    for (let j = 0; j < trEl.length; j++) {
      signinDateList.value.forEach((item) => {
        if (item == trEl[j].dataset.time) {
          trEl[j].classList.add('selected')
          if (trEl[j].classList.contains('next-month')) {
            trEl[j].classList.add('opacity')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/FlexoCalendar.css';
</style>
