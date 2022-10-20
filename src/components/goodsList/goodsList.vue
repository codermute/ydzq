<template>
  <div class="group-item">
    <img class="group-img" :src="item.img" />
    <div class="group-info">
      <div class="group-name">{{ item.rewardsName }}</div>
      <div class="group-amount">
        <span class="color-red">{{ item.consumenum }}</span
        >翼豆
        <div class="group-line">
          <span>{{
            item.shengyu > 0 ? `仅剩${item.shengyu}件` : '商品已兑换完'
          }}</span>
          <label
            :style="{
              width: (item.shengyu / item.conuntRewards) * 100 + '%'
            }"
          ></label>
        </div>
      </div>
    </div>
    <a @click="navigateTo('exchange')" class="group-btn">去兑换</a>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['navigateTo'])

const navigateTo = (type) => {
  emit('navigateTo', { type, item: props.item })
}
</script>
