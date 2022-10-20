<template>
  <div class="tab-control">
    <div class="tab-title">
      <div
        v-for="(item, index) in tabList"
        :key="item"
        :class="['tab-title-item', { active: activeIndex === index }]"
        @click="handleTabClick(index)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabList: {
    type: Array,
    default: () => []
  },
  activeIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['handleTabClick'])

const handleTabClick = (index) => {
  if (props.activeIndex === index) return
  emit('handleTabClick', index)
}
</script>
