<template>
  <div class="home-bg">
    <div class="main-box" @click.capture="handleLogin">
      <div class="home-top-box">
        <div class="home-top">
          <div class="home-user-row">
            <img class="home-head" :src="userInfo.headimgurl" />
            <div
              class="home-user"
              :class="{ line: !Object.keys(userInfo).length }"
            >
              {{ userInfo.bindMobile ?? '未绑定'
              }}<span>{{ userInfo.nickname }}</span>
            </div>
            <a class="ydsm-btn" @click="navigateTo('explain')"
              >翼豆说明<img src="@/assets/images/icon-wh.png"
            /></a>
          </div>
          <div class="my-yd-row">
            <label>我的翼豆</label>
            <a @click="navigateTo('record')">赢/兑记录</a>
          </div>
          <div class="my-yd-num">{{ beanCount }}</div>
        </div>
        <img src="@/assets/images/home-top-bg.jpg" />
      </div>
      <div class="md-box">
        <div class="md-title">赢翼豆</div>
        <div class="nav-list">
          <a
            v-for="(item, index) in navList"
            :key="index"
            @click="navigateTo(item.type)"
            class="nav-item"
            ><img :src="item.image" />{{ item.title }}</a
          >
        </div>
      </div>
      <div class="md-box">
        <div class="md-title">兑好礼</div>
        <tab-control
          :tabList="tabList"
          :activeIndex="activeIndex"
          @handleTabClick="handleTabClick"
        />

        <!-- 商品列表 -->
        <template v-if="prizeList.length">
          <div class="tab-info" v-for="item in prizeList" :key="item.id">
            <goods-list :item="item" @navigateTo="handleExchange" />
          </div>
        </template>

        <!--无数据-->
        <template v-else>
          <empty />
        </template>
      </div>
    </div>

    <!--客户反馈-->
    <feedback @navigateTo="navigateTo" />

    <!--首次进入弹窗-->
    <screenPopup
      :isScreenShow="isScreenShow"
      @closeBtn="isScreenShow = false"
    />

    <!--登录-->
    <!-- <login :isLogin="store.isShow" /> -->

    <no-activity :isActive="isActivity" @closeBtn="isActivity = false" />

    <Toast :show="show" :message="message" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index.js'

import { DecryptData } from '@/utils/aesDataModel.js'
import { getPrizeList } from '@/service/index.js'
import { navList } from './goods_data'
// import { toast } from '@/utils/index'

import tabControl from '@/components/tabControl/tabControl'
import goodsList from '@/components/goodsList/goodsList'
import screenPopup from '@/components/screenPopup/screenPopup'
import feedback from '@/components/feedback/feedback'
// import login from '@/components/login/login'
import Toast from '@/components/toast/toast'
import empty from '@/components/empty/empty'
import noActivity from '@/components/noActivity/noActivity'

const router = useRouter()
const store = useStore()

const { userInfo, beanCount } = storeToRefs(store)

const tabList = ['话费券', '微信红包', '视频会员', '实物大奖']
const activeIndex = ref(0)
const isScreenShow = ref(false)
// const isLogin = ref(false)
const show = ref(false)
const message = ref('')
const prizeList = ref([])
const isActivity = ref(false)

onMounted(async () => {
  await getPage()
})

const handleLogin = (event) => {
  console.log(11)
  // event.stopPropagation()
  // window.location.href =
  //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf07fe334d165709e&redirect_uri=https://wx.hn.189.cn/sit/hndx_yidou/yidou/login&response_type=code&scope=snsapi_userinfo&state=code'
}
const navigateTo = (option) => {
  if (option === 'invite') {
    isActivity.value = true
    return
  }
  router.push({ path: `/${option}` })
}
const handleExchange = (option) => {
  store.setExchangeData({
    type: activeIndex.value,
    item: option.item
  })
  router.push({ path: `/${option.type}` })
}
const handleTabClick = (index) => {
  activeIndex.value = index
  getPage()
}

function getPage() {
  console.log(1)
  getPrizeList(activeIndex.value + 1).then((res) => {
    if (res.code) return
    prizeList.value = DecryptData(res.data)
  })
}
</script>

<style scoped>
.line {
  color: #000;
  text-decoration: underline;
}
</style>
