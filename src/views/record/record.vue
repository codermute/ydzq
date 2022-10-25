<template>
  <div class="record">
    <div class="main-box">
      <div class="md-top-box">
        <div class="record-top-row">
          <label>当前翼豆</label>
          <span>{{ store.beanCount }}</span>
        </div>
      </div>
      <tab-control
        :tabList="tabList"
        :activeIndex="activeIndex"
        @handleTabClick="handleTabClick"
      />
      <div class="month-row">
        <div class="month-text">本月</div>
        <div class="reward-text">
          获得：<span class="color-blue">{{ consumptionData.add || 0 }}</span>
        </div>
        <div class="consume-text">
          消耗：<span class="color-yellow">{{ consumptionData.use || 0 }}</span>
        </div>
      </div>
      <div class="record-list" v-if="recordList.length">
        <div class="record-item" v-for="item in recordList" :key="item.id">
          <img class="record-img" :src="item.img" />
          <div class="record-info">
            <div class="record-name">{{ item.name }}</div>
            <div class="record-time">
              {{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}
            </div>
          </div>
          <span
            :class="[
              'record-right',
              item.num > 0 ? 'color-blue' : 'color-yellow'
            ]"
            >{{ item.num > 0 ? `+${item.num}` : item.num }}</span
          >
        </div>
      </div>
      <template v-else>
        <empty message="暂无数据" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/index.js'

import { getConsumption, getConsumptionNum } from '@/service/index.js'

import dayjs from 'dayjs'

import tabControl from '@/components/tabControl/tabControl'
import empty from '@/components/empty/empty'

const store = useStore()

const tabList = ['全部明细', '翼豆获取', '翼豆消耗']
const activeIndex = ref(0)
const recordList = ref([])
const consumptionData = ref({})

getPage()
store.getBeanCount()

getConsumptionNum().then((res) => {
  if (res.code) return
  consumptionData.value = JSON.parse(res.data)
})

const handleTabClick = (index) => {
  activeIndex.value = index
  getPage()
}

async function getPage() {
  let option = activeIndex.value ? activeIndex.value : -1
  getConsumption(option).then((res) => {
    if (res.code) return
    recordList.value = JSON.parse(res.data)
  })
}
</script>
