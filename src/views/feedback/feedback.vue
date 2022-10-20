<template>
  <div class="feedback">
    <div class="main-box noMargin">
      <div class="dh-top-box">
        <div class="md-dh-row">
          <img
            style="width: 0.7rem; height: 0.7rem"
            src="@/assets/images/icon-fk.png"
          />
          <div class="md-dh-info">
            <div class="dh-name color-black"><b>意见反馈</b></div>
          </div>
        </div>
      </div>
      <div class="md-box">
        <div class="md-title">情况说明</div>
        <textarea
          style="height: 5rem"
          v-model.trim="textareaValue"
          class="md-text fk-textarea"
          placeholder="您的反馈对我们很重要（最多100字）"
        ></textarea>
      </div>
      <div class="md-box">
        <div class="md-title">联系方式</div>
        <input
          type="text"
          v-model.trim="value"
          class="md-text fk-input"
          placeholder="留下您的QQ或E-mail，方便我们联系您"
        />
      </div>
      <a class="bottom-btn" @click="submit">提交</a>
      <!--<a href="#" class="bottom-btn gray">翼豆不足</a>-->

      <Toast :show="show" :message="message" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { submitOpinions } from '@/service/index.js'
import { getSm2Encrypt } from '@/utils/aesDataModel.js'
import { toast } from '@/utils/index'

import Toast from '@/components/toast/toast'

const textareaValue = ref('')
const value = ref('')
const show = ref(false)
const message = ref('')

const _toast = toast(show, message)

const submit = () => {
  if (!textareaValue.value) return _toast('请输入情况说明')
  if (!value.value) return _toast('联系方式不能为空')
  const option = { remark: textareaValue.value, contact: value.value }
  submitOpinions(getSm2Encrypt(option)).then((res) => {
    console.log(res)
  })
  console.log(textareaValue.value, value.value)
}
</script>
