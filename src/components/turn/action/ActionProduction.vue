<template>
  <ActionBox :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState"
      @workerPlaced="(workerUsed,nextAction) => $emit('workerPlaced',workerUsed,nextAction)">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="production" class="icon action"/>
        <span v-if="actionItem.energyBoost" class="energyBoost">+{{actionItem.energyBoost}}</span>
        <AppIcon name="energy-track" class="icon energy ms-3"/>
        <AppIcon v-if="actionItem.contractRequirement"
            type="contract-requirement" :name="actionItem.contractRequirement"
            class="icon contract ms-3"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.production.intro')"></p>
      <ul>
        <li><AppIcon name="production-system-ready" class="icon action production-system float-end"/><span v-html="t('rules.actionItem.production.productionSystemReady')"></span></li>
        <li><AppIcon name="energy-track" class="icon energy float-end"/><span v-html="t('rules.actionItem.production.energyTrack')"></span></li>
        <li><AppIcon v-if="actionItem.contractRequirement"
            type="contract-requirement" :name="actionItem.contractRequirement"
            class="icon contract float-end m-1"/><span v-html="t('rules.actionItem.production.contractRequirement')"></span></li>
      </ul>
      <p v-html="t('rules.actionItem.production.produceEnergy')"></p>
      <p v-html="t('rules.actionItem.production.fulfillContract')"></p>
      <p v-html="t('rules.actionItem.production.multipleOptions')"></p>
    </template>
    <template #warnings v-if="isEasyDifficulty || isHardDifficultyGermany || isHardDifficultyFrance || isHardDifficultyNetherlands || isVeryHardDifficultyViktorViesler
        || isVeryHardDifficultySimoneLuciani || isVeryHardDifficultyDrOctavius || isVeryHardDifficultyWuFang || isVeryHardDifficultyFranzDeLasse">
      <div v-if="isEasyDifficulty" class="alert alert-success fst-italic" v-html="t('rules.difficultyLevel.easy.noProductionBonus')"></div>
      <div v-if="isHardDifficultyGermany" class="alert alert-info fst-italic" v-html="t('rules.difficultyLevel.hard.corporation.germany')"></div>
      <div v-if="isHardDifficultyFrance" class="alert alert-info fst-italic" v-html="t('rules.difficultyLevel.hard.corporation.france')"></div>
      <div v-if="isHardDifficultyNetherlands" class="alert alert-info fst-italic" v-html="t('rules.difficultyLevel.hard.corporation.netherlands')"></div>
      <div v-if="isVeryHardDifficultyViktorViesler" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.viktor-fiesler')"></div>
      <div v-if="isVeryHardDifficultySimoneLuciani" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.simone-luciani')"></div>
      <div v-if="isVeryHardDifficultyDrOctavius" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.dr-octavius')"></div>
      <div v-if="isVeryHardDifficultyWuFang" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.wu-fang.production')"></div>
      <div v-if="isVeryHardDifficultyFranzDeLasse" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.franz-de-lasse')"></div>
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
import isDifficultyLevel from '@/util/isDifficultyLevel'
import isDifficultyLevelCorporation from '@/util/isDifficultyLevelCorporation'
import Corporation from '@/services/enum/Corporation'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'

export default defineComponent({
  name: 'ActionProduction',
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
    isEasyDifficulty() : boolean {
      return isDifficultyLevel(this.navigationState.bot, DifficultyLevel.EASY, this.state)
    },
    isHardDifficultyGermany() : boolean {
      return isDifficultyLevelCorporation(this.navigationState.bot, DifficultyLevel.HARD, Corporation.GERMANY, this.state)
    },
    isHardDifficultyFrance() : boolean {
      return isDifficultyLevelCorporation(this.navigationState.bot, DifficultyLevel.HARD, Corporation.FRANCE, this.state)
    },
    isHardDifficultyNetherlands() : boolean {
      return isDifficultyLevelCorporation(this.navigationState.bot, DifficultyLevel.HARD, Corporation.NETHERLANDS, this.state)
    },
    isVeryHardDifficultyViktorViesler() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.VIKTOR_FIESLER, this.state)
    },
    isVeryHardDifficultySimoneLuciani() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.SIMONE_LUCIANI, this.state)
    },
    isVeryHardDifficultyDrOctavius() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.DR_OCTAVIUS, this.state)
    },
    isVeryHardDifficultyWuFang() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.WU_FANG, this.state)
    },
    isVeryHardDifficultyFranzDeLasse() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.FRANZ_DE_LASSE, this.state)
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
}
.icon {
  width: 4rem;
  &.energy, &.production-system {
    width: 3rem;
  }
}
.energyBoost {
  color: #b5489a;
  font-weight: bold;
  font-size: 30px;
  margin-left: 0.5rem;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000,
      0 0 10px #fff, 0 0 8px #fff, 0 0 12px #b5489a, 0 0 16px #b5489a, 0 0 20px #b5489a, 0 0 24px #b5489a, 0 0 28px #b5489a;
}
ul > li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
