<template>
  <div class="explain">
    <div class="main-box">
      <div class="jf-top-box">
        <div class="jf-title"><div class="md-title">翼豆等级</div></div>
        <img src="@/assets/images/jf-top-img.jpg" />
      </div>
      <div class="md-box">
        <div class="md-title">翼豆规则</div>
        <div class="md-text">
          ①翼豆有效期为一年，从获取日起核算；（例如2022年7月1日获得的翼豆，在2023年6月30日24：00过期）<br />
          ②等级有效期为一年，若用户升级，新等级有效期从升级当天开始重新计算；<br />
          ③翼豆兑换和消费不影响当年度等级。
        </div>
      </div>
      <div class="md-box">
        <div class="md-title">注意事项</div>
        <div class="md-text">
          ①不同账户内的翼豆不能进行合并；<br />
          ②翼豆作为用户奖励，不能转让及交易；<br />
          ③如用户注销账号，则账号内翼豆全部清零，再次开通时无法找回。
        </div>
      </div>
      <a class="bottom-btn" @click="back">我知道了</a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
  router.go(-1)
}
</script>

<style scoped>
.explain {
  padding-bottom: 0.2rem;
}
</style>
