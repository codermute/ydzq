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

      <Toast :show="show" :message="message" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import empty from '@/components/empty/empty'
import Toast from '@/components/toast/toast'

import { getTaskList, accomplishTask } from '@/service/index.js'
import { DecryptData } from '@/utils/aesDataModel.js'
import { toast } from '@/utils/index'

const taskList = ref([])
const show = ref(false)
const message = ref('')

const _toast = toast(show, message)

getPage()

const handleComplete = async (url, id) => {
  const res = await accomplishTask(id)
  // window.location.href = url
  console.log(res)
  window.open(url, '_blank')
  if (res.code) return _toast(res.msg)
}

function getPage() {
  getTaskList().then((res) => {
    if (res.code) return
    taskList.value = DecryptData(res.data)
  })
}
</script>
