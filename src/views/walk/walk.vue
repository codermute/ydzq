<template>
  <div class="walk">
    <div class="main-box">
      <div class="md-top-box">
        <div class="gg-title">做任务 赚翼豆</div>
        <div class="gg-text">
          用户每日查看以下任意页面，可获取3个翼豆，每日最高可获得9个翼豆。
        </div>
      </div>
      <div class="gg-info" v-if="taskList.length">
        <div class="group-item" v-for="item in taskList" :key="item.id">
          <img class="group-img" :src="item.img" />
          <div class="group-info">
            <div class="group-name">{{ item.taskName }}</div>
            <div class="group-amount">
              <span class="color-red">赚3</span>翼豆
            </div>
          </div>
          <a @click="handleComplete(item.url, item.id)" class="group-btn"
            >去完成</a
          >
        </div>
      </div>
      <template v-else>
        <empty />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import empty from '@/components/empty/empty'

import { getTaskList, accomplishTask } from '@/service/index.js'
import { DecryptData } from '@/utils/aesDataModel.js'

const taskList = ref([])

getPage()

const handleComplete = async (url, id) => {
  await accomplishTask(id)
  // window.location.href = url
  window.open(url, '_blank')
}

function getPage() {
  getTaskList().then((res) => {
    if (res.code) return
    taskList.value = DecryptData(res.data)
  })
}
</script>
