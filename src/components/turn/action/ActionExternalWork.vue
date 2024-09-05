<template>
  <ActionBox :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState"
      @workerPlaced="(workerUsed,nextAction) => $emit('workerPlaced',workerUsed,nextAction)">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="external-work" class="icon"/>
      </div>
      <div class="tiles">
        <template v-for="(tile,index) of actionItem.externalWorkTiles" :key="tile">
          <span v-if="index > 0">-</span>
          <span>{{tile}}</span>
        </template>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.external-work.intro')"></p>
      <p v-html="t('rules.actionItem.external-work.enoughMachineries')"></p>
      <p v-html="t('rules.actionItem.external-work.engineerPlacement')"></p>
      <p v-html="t('rules.actionItem.external-work.particularEffect')"></p>
    </template>
    <template #warnings v-if="isVeryHardDifficultyElonAudia">
      <div v-if="isVeryHardDifficultyElonAudia" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.elon-audia')"></div>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../structure/AppIcon.vue'
import Card, { ActionItem } from '@/services/Card'
import BotNavigationState from '@/util/BotNavigationState'
import ActionBox from '../ActionBox.vue'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'

export default defineComponent({
  name: 'ActionExternalWork',
  emits: {
    workerPlaced: (_workerUsed: number, _nextAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    actionItem: {
      type: Object as PropType<ActionItem>,
      required: true
    },
    criteriaCard: {
      type: Object as PropType<Card>,
      required: true
    },
    navigationState: {
      type: BotNavigationState,
      required: true
    }
  },
  computed: {
    isVeryHardDifficultyElonAudia() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.ELON_AUDIA, this.state)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 4rem;
}
.tiles {
  span { 
    margin: 0.1rem;
  }
}
</style>
