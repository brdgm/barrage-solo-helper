<template>
  <ActionBox :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState"
      @workerPlaced="(workerUsed,nextAction) => $emit('workerPlaced',workerUsed,nextAction)">
    <template #action>
      <div class="action">
        <HydroCost v-if="actionItem.hydroCost" :hydroCost="actionItem.hydroCost" class="me-2"/>
        <AppIcon v-for="(machineryType,index) of actionItem.machineryTypes" :key="index"
            type="machinery-type" :name="machineryType" class="icon"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.machinery-shop.intro')"></p>
      <p v-html="t('rules.actionItem.machinery-shop.engineerPlacement')"></p>
    </template>
    <template #warnings v-if="isVeryHardDifficultyJillMcDowellWild">
      <div v-if="isVeryHardDifficultyJillMcDowellWild" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.jill-mcdowell.machineryShop')"></div>
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
import HydroCost from '@/components/structure/HydroCost.vue'
import { useStateStore } from '@/store/state'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import MachineryType from '@/services/enum/MachineryType'

export default defineComponent({
  name: 'ActionMachineryShop',
  emits: {
    workerPlaced: (_workerUsed: number, _nextAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    HydroCost
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
    isVeryHardDifficultyJillMcDowellWild() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.JILL_MCDOWELL, this.state)
          && (this.actionItem.machineryTypes ?? []).includes(MachineryType.WILD)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
}
</style>
