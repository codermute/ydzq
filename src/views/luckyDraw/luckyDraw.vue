<template>
  <div class="lucky-draw">
    <div class="lottery-bg">
      <div class="main-box">
        <div class="lottery-box">
          <div class="lottery-yd">
            我的翼豆：<span>{{ beanCount }}</span>
          </div>
          <div class="zhuanpan">
            <img
              src="@/assets/images/zhuanpan.png"
              id="rotate"
              style="transform: rotate(300deg)"
            />
            <div class="zhizhen" @click="handlePointer" id="pointer">
              <img src="@/assets/images/zhizhen.png" />
            </div>
          </div>
          <img src="@/assets/images/lottery-bg.jpg" />
        </div>
        <div class="lottery-text-row">已有<span>10572</span>人参与</div>
        <div class="lottery-num">
          您今天还有 <span>{{ smokeCount }}次</span> 免费抽奖机会
        </div>
        <div class="lottery-gz">
          <div class="lottery-text-row">活动说明</div>
          <p>
            活动时间:<br />
            2022/7/1～2022/12/31<br /><br />

            主办单位:<br />
            湖南电信公众号<br /><br />

            活动规则:<br />
            1.点击“开始抽奖”后，转盘开始转动，最终指针停留的区域为您所中的奖品<br />
            2.每人每日有一次免费抽奖机会，或支付50翼豆继续参与抽奖
          </p>
        </div>
      </div>

      <!--中奖弹窗-->
      <prize-popup
        :isShow="isShow"
        :content="content"
        @changeHidePrize="isShow = false"
      />

      <template v-if="prizeCount !== 1">
        <prize-popup :isShow="isPrizeShow">
          <template v-if="prizeCount !== 9">
            <div class="content-prize">
              需要花费<span class="bean-count">50</span>翼豆
            </div>
            <div class="content-prize mar-prize">兑换一次抽奖机会</div>

            <a class="popup-btn" @click="handleCostDraw">好的</a>
            <!-- <a class="close-btn2" @clcik="isPrizeShow = false"
              ><img src="@/assets/images/close.png" />
            </a> -->
          </template>
          <template v-else>
            <div class="content-prize">今日抽奖次数已用完</div>
            <div class="content-prize mar-prize">明天可再来哟~</div>

            <a class="popup-btn" @click="isPrizeShow = false">好的</a>
          </template>
        </prize-popup>
      </template>

      <!--未中奖-->
      <div class="popup" v-show="isNoShow" id="noLottery">
        <div class="popup-bg"></div>
        <div class="popup-info">
          <div class="no-lottery-box">
            <img src="@/assets/images/no-lottery-img.png" />
            <p class="padding-sm">50翼豆，再来一次</p>
            <a class="popup-btn" @click="isNoShow = false">再来一次</a>
          </div>
          <a class="close-btn2" @click="isNoShow = false"
            ><img src="@/assets/images/close.png" />
          </a>
        </div>
      </div>
    </div>

    <Toast :show="show" :message="message" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store/index.js'

import Toast from '@/components/toast/toast'
import prizePopup from '@/components/prizePopup/prizePopup'

import { getSmokeCount, getQualification, getReward } from '@/service/index.js'
import { DecryptData } from '@/utils/aesDataModel.js'
import { toast, debounce } from '@/utils/index'

import $ from '@/utils/jquery.min'
import '@/utils/awardRotate.js'

const store = useStore()

const { beanCount } = storeToRefs(store)

let rotateFn = null
let isActive = false
let losingLottery = false
const isShow = ref(false)
const isNoShow = ref(false)
const content = ref('')
const reward = ref(0)
const smokeCount = ref(0)

// 判断是否是免费抽奖
const prizeCount = ref(0)
const isPrizeShow = ref(false)

// 弹窗提示
const show = ref(false)
const message = ref('')

const _toast = toast(show, message)

getSmoke()
store.getBeanCount()

const handleCostDraw = () => {
  isPrizeShow.value = false
  prize()
  store.getBeanCount()
}
// 点击立即抽奖
const handlePointer = debounce(async () => {
  const res = await getQualification()
  if (res.code === 501) return _toast(res.msg)
  if (res.code !== 0) {
    prizeCount.value = 9
    isPrizeShow.value = true
    return
  }
  console.log(DecryptData(res.data))
  prizeCount.value = DecryptData(res.data)
  if (prizeCount.value !== 1) {
    isPrizeShow.value = true
    return
  }
  prize()
}, 120)

rotateFn = (awards, angles) => {
  $('#rotate').stopRotate()
  $('#rotate').rotate({
    angle: 0,
    animateTo: angles + 1800,
    duration: 2000,
    // 抽奖成功回调
    callback: () => {
      if (losingLottery) {
        isNoShow.value = true
        losingLottery = false
      } else {
        isShow.value = true
      }
      isActive = false
      getReward(reward.value).then((res) => {
        store.getBeanCount()
        getSmoke()
        if (res.code !== 0) return _toast(res.msg)
      })
    }
  })
}

function prize() {
  if (isActive) return
  const item = rnd(0, 5)
  switch (item) {
    case 0:
      rotateFn(0, 360)
      setPrizePopup('+100翼豆')
      reward.value = 100
      break
    case 1:
      rotateFn(1, 300)
      setPrizePopup('+1000翼豆')
      reward.value = 1000
      break
    case 2:
      rotateFn(2, 240)
      losingLottery = true
      isActive = true
      reward.value = -1
      break
    case 3:
      rotateFn(3, 180)
      setPrizePopup('+10翼豆')
      reward.value = 10
      break
    case 4:
      rotateFn(4, 120)
      setPrizePopup('+1000翼豆')
      reward.value = 1000
      break
    case 5:
      rotateFn(5, 60)
      setPrizePopup('+100000翼豆')
      reward.value = 100000
      break
  }
}
function setPrizePopup(text) {
  isActive = true
  content.value = text
}
function rnd(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}
function getSmoke() {
  getSmokeCount().then((res) => {
    if (res.code) return
    // _toast(res.msg)
    smokeCount.value = res.data
  })
}
</script>

<style lang="less" scoped>
.lucky-draw {
  overflow: hidden;
}
.content-prize {
  font-size: 0.3rem;
  .bean-count {
    color: #ec7a03;
    font-size: 0.4rem;
  }
}
.mar-prize {
  margin: 0.1rem 0;
}
.close-btn2 {
  position: absolute;
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  left: 50%;
  margin-left: -0.3rem;
  bottom: -0.9rem;
  img {
    vertical-align: middle;
    border: none;
    width: 100%;
  }
}
.lottery-gz {
  margin: 0.3rem 0.3rem 0;
}
</style>
