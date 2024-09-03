<template>
  <div class="sidebar">
    {{t('sideBar.round', {round:navigationState.round})}}<br/>
    {{t('sideBar.turn', {turn:navigationState.turn})}}<br/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AbstractNavigationState from '@/util/AbstractNavigationState'

export default defineComponent({
  name: 'SideBar',
  components: {
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: Object as PropType<AbstractNavigationState>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 5px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
</style>
