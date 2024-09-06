<template>
  <div class="sidebar">
    {{t('sideBar.round', {round:navigationState.round})}}<br/>
    {{t('sideBar.turn', {turn:navigationState.turn})}}<br/>
    <div v-for="botInfo of botInfos" :key="botInfo.bot" class="mt-3">
      <b>
        <PlayerColorIcon :playerColor="botInfo.playerColor" class="playerIcon"/>
        {{t('turnBot.title', {bot:botInfo.bot}, botCount)}}
      </b>
      <p v-if="botInfo.workerCount > 0" v-html="t('sideBar.workers', {count:botInfo.workerCount})"></p>
      <p v-else v-html="t('sideBar.pass')"></p>
    </div>
    <a class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#automaRulesModal">{{t('rules.general.title')}}</a>
  </div>
  <AutomaRulesModal/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AbstractNavigationState from '@/util/AbstractNavigationState'
import PlayerColorIcon from '../structure/PlayerColorIcon.vue'
import AutomaRulesModal from '../rules/AutomaRulesModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    PlayerColorIcon,
    AutomaRulesModal
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
  },
  computed: {
    botCount() {
      return this.navigationState.botCount
    },
    botInfos() {
      return this.navigationState.botInfos
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
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.8rem;
    width: 120px;
  }
}
.playerIcon {
  height: 1.1rem;
  width: 1.1rem;
  margin-top: -0.1rem;
  @media (max-width: 600px) {
    height: 0.8rem;
    width: 0.8rem;
  }
}
</style>
