<template>
  <ActionBox :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState"
      @workerPlaced="(workerUsed,nextAction) => $emit('workerPlaced',workerUsed,nextAction)">
    <template #action>
      <div class="action" v-if="actionItem.constructionType">
        <AppIcon v-if="isBuilding" type="construction-type" :name="`building-${actionItem.buildingSearchDirection}`" class="icon building"/>
        <AppIcon v-else type="construction-type" :name="actionItem.constructionType" class="icon" :class="{[actionItem.constructionType]:true}"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.construction.intro')"></p>
      <ul>
        <li v-html="t('rules.actionItem.construction.structureAvailable')"></li>
        <li v-html="t('rules.actionItem.construction.technologyTileAvailable')"></li>
        <li v-html="t('rules.actionItem.construction.machineriesAvailable')"></li>
        <li v-html="t('rules.actionItem.construction.buildingSpaceAvailable')"></li>
      </ul>
      <p v-html="t('rules.actionItem.construction.buildStructure')"></p>
      <p v-html="t('rules.actionItem.construction.oneSpace')"></p>
      <p v-html="t('rules.actionItem.construction.multipleSpaces')"></p>
      <p v-html="t('rules.actionItem.construction.income')"></p>
      <p v-if="isBuilding" v-html="t(`rules.actionItem.construction.building.${actionItem.buildingSearchDirection}`)"></p>
    </template>
    <template #warnings v-if="isEasyDifficulty || isVeryHardDifficultyWilhelmAdlerDam || isVeryHardDifficultyGracianoDelMonte || isVeryHardDifficultyJillMcDowellConduit
        || isVeryHardDifficultySolomonPJordan || isVeryHardDifficultyAntonKrylov || isVeryHardDifficultyLeslieSpencer || isVeryHardDifficultyMargotFouche || isVeryHardDifficultyElonAudia">
      <div v-if="isEasyDifficulty" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.easy.noIncome')"></div>
      <div v-if="isVeryHardDifficultyWilhelmAdlerDam" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.wilhelm-adler')"></div>
      <div v-if="isVeryHardDifficultyGracianoDelMonte" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.graziano-del-monte')"></div>
      <div v-if="isVeryHardDifficultyJillMcDowellConduit" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.jill-mcdowell.constructConduit')"></div>
      <div v-if="isVeryHardDifficultySolomonPJordan" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.solomon-p-jordan')"></div>
      <div v-if="isVeryHardDifficultyAntonKrylov" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.anton-krylov')"></div>
      <div v-if="isVeryHardDifficultyLeslieSpencer" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.leslie-spencer')"></div>
      <div v-if="isVeryHardDifficultyMargotFouche" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.margot-fouche')"></div>
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
import ConstructionType from '@/services/enum/ConstructionType'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { useStateStore } from '@/store/state'
import isDifficultyLevel from '@/util/isDifficultyLevel'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'

export default defineComponent({
  name: 'ActionConstruction',
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
    isBuilding() : boolean {
      return this.actionItem.constructionType == ConstructionType.BUILDING
    },
    isDamElevation() : boolean {
      return this.actionItem.constructionType == ConstructionType.DAM
          || this.actionItem.constructionType == ConstructionType.ELEVATION
    },
    isConduit() : boolean {
      return this.actionItem.constructionType == ConstructionType.CONDUIT
    },
    isPowerhouse() : boolean {
      return this.actionItem.constructionType == ConstructionType.POWERHOUSE
    },
    isEasyDifficulty() : boolean {
      return isDifficultyLevel(this.navigationState.bot, DifficultyLevel.EASY, this.state)
    },
    isVeryHardDifficultyWilhelmAdlerDam() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.WILHELM_ADLER, this.state)
          && this.actionItem.constructionType == ConstructionType.DAM
    },
    isVeryHardDifficultyGracianoDelMonte() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.GRAZIANO_DEL_MONTE, this.state)
    },
    isVeryHardDifficultyJillMcDowellConduit() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.JILL_MCDOWELL, this.state)
          && this.actionItem.constructionType == ConstructionType.CONDUIT
    },
    isVeryHardDifficultySolomonPJordan() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.SOLOMON_P_JORDAN, this.state)
    },
    isVeryHardDifficultyAntonKrylov() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.ANTON_KRYLOV, this.state)
    },
    isVeryHardDifficultyLeslieSpencer() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.LESLIE_SPENCER, this.state)
    },
    isVeryHardDifficultyMargotFouche() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.MARGOT_FOUCHE, this.state)
    },
    isVeryHardDifficultyElonAudia() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.ELON_AUDIA, this.state)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
  &.conduit {
    height: 4rem;
  }
}
ul > li, ol > li {
  margin-bottom: 0.5rem;
  clear: both;
}
</style>
