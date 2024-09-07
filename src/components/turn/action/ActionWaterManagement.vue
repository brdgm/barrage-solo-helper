<template>
  <ActionBox :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState"
      @workerPlaced="(workerUsed,nextAction) => $emit('workerPlaced',workerUsed,nextAction)">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="isOneDropImmediately ? 'water-management-immediately' : 'water-management'" class="icon"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.water-management.intro')"></p>
      <p v-html="t('rules.actionItem.water-management.damReachable')"></p>
      <p v-html="t('rules.actionItem.water-management.damCapacity')"></p>
      <p v-html="t('rules.actionItem.water-management.engineerPlacement')"></p>
      <p v-html="t('rules.actionItem.water-management.tiebreaker')"></p>
      <div class="headwaterCriteria text-center mb-3">
        <HeadwaterCriteria :criteriaCard="criteriaCard"/>
      </div>
      <img src="@/assets/map-basin.webp" alt="" class="img-fluid"/>
    </template>
    <template #warnings v-if="isHardDifficultyUSA || isVeryHardDifficultyAmirZahir">
      <div class="alert alert-info fst-italic" v-html="t('rules.difficultyLevel.hard.corporation.usa')"></div>
      <div v-if="isVeryHardDifficultyAmirZahir" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.amir-zahir')"></div>
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
import WaterManagementType from '@/services/enum/WaterManagementType'
import { useStateStore } from '@/store/state'
import isDifficultyLevelCorporation from '@/util/isDifficultyLevelCorporation'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Corporation from '@/services/enum/Corporation'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import HeadwaterCriteria from '@/components/rules/HeadwaterCriteria.vue'

export default defineComponent({
  name: 'ActionWaterManagement',
  emits: {
    workerPlaced: (_workerUsed: number, _nextAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon,
    HeadwaterCriteria
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
    isOneDropImmediately() : boolean {
      return this.actionItem.waterManagementType == WaterManagementType.ONE_DROP_IMMEDIATELY
    },
    isHardDifficultyUSA() : boolean {
      return isDifficultyLevelCorporation(this.navigationState.bot, DifficultyLevel.HARD, Corporation.USA, this.state)
    },
    isVeryHardDifficultyAmirZahir() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.AMIR_ZAHIR, this.state)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 2.8rem;
}
.map {
  width: 100%;
  max-width: 500px;
}
.headwaterCriteria {
  font-size: 20px;
  font-weight: bold;
}
</style>
