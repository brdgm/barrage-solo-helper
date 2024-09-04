<template>
  <ActionBox :actionItem="actionItem" :navigationState="navigationState">
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
    <template #criteria v-if="!isBuilding">
      <div class="criteria">
        <template v-if="isDamElevation">
          <template v-for="criteria of criteriaCard.placingCriteriaDamElevation" :key="criteria">
            <AppIcon type="placing-criteria-dam-elevation" :name="criteria" class="icon" :class="criteria"/>
            <hr/>
          </template>
          <div class="location">{{criteriaCard.locationDamElevation}}</div>
        </template>
        <template v-else-if="isConduit">
          <template v-for="criteria of criteriaCard.placingCriteriaConduit" :key="criteria">
            <AppIcon type="placing-criteria-conduit" :name="criteria" class="icon" :class="criteria"/>
            <hr/>
          </template>
          <div class="location">{{criteriaCard.locationConduit}}</div>
        </template>
        <template v-else-if="isPowerhouse">
          <template v-for="criteria of criteriaCard.placingCriteriaPowerhouse" :key="criteria" >
            <AppIcon type="placing-criteria-powerhouse" :name="criteria" class="icon" :class="criteria"/>
            <hr/>
          </template>
          <div class="location">{{criteriaCard.locationPowerhouse}}</div>
        </template>
      </div>
    </template>
    <template #criteriaRules>
      <p v-html="t('rules.structurePlacement.intro')"></p>
      <ol class="criteriaRules">
        <li>
          <span v-html="t('rules.structurePlacement.thirdStructure')"></span>
          <hr/>
        </li>
        <template v-if="isDamElevation">
          <li v-for="criteria of criteriaCard.placingCriteriaDamElevation" :key="criteria">
            <AppIcon type="placing-criteria-dam-elevation" :name="criteria" class="icon float-start" :class="criteria"/>
            <span v-html="t(`rules.structurePlacement.damElevation.${criteria}`)"></span>
            <template v-if="isShowHeadstreamOrder(criteria)">
              <span>&nbsp;</span>
              <template v-for="(column,index) of criteriaCard.waterManagementBasinColumns" :key="column">
                <span v-if="index > 0"> - </span>
                <span>{{column}}</span>
              </template>
            </template>
            <hr/>
          </li>
          <li>
            <span v-html="t('rules.structurePlacement.location', {location:criteriaCard.locationDamElevation})"></span><br/>
            <span class="small fst-italic" v-html="t('rules.structurePlacement.locationDescription')"></span>
          </li>
        </template>
        <template v-else-if="isConduit">
          <li v-for="criteria of criteriaCard.placingCriteriaConduit" :key="criteria">
            <AppIcon type="placing-criteria-conduit" :name="criteria" class="icon float-start" :class="criteria"/>
            <span v-html="t(`rules.structurePlacement.conduit.${criteria}`)"></span>
          </li>
          <li>
            <span v-html="t('rules.structurePlacement.location', {location:criteriaCard.locationConduit})"></span><br/>
            <span class="small fst-italic" v-html="t('rules.structurePlacement.locationDescription')"></span>
          </li>
        </template>
        <template v-else-if="isPowerhouse">
          <li v-for="criteria of criteriaCard.placingCriteriaPowerhouse" :key="criteria" >
            <AppIcon type="placing-criteria-powerhouse" :name="criteria" class="icon float-start" :class="criteria"/>
            <span v-html="t(`rules.structurePlacement.powerhouse.${criteria}`)"></span>
          </li>
          <li>
            <span v-html="t('rules.structurePlacement.location', {location:criteriaCard.locationPowerhouse})"></span><br/>
            <span class="small fst-italic" v-html="t('rules.structurePlacement.locationDescription')"></span>
          </li>
        </template>
      </ol>
      <div class="text-center">
        <img src="@/assets/map-with-overlay.webp" alt="" class="map"/>
      </div>
      <p class="mt-3" v-html="t('rules.structurePlacement.locationRestriction')"></p>
    </template>
    <template #warnings v-if="isEasyDifficulty || isVeryHardDifficultyWilhelmAdlerDam || isVeryHardDifficultyGracianoDelMonte || isVeryHardDifficultyJillMcDowellConduit">
      <div v-if="isEasyDifficulty" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.easy.noIncome')"></div>
      <div v-if="isVeryHardDifficultyWilhelmAdlerDam" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.wilhelm-adler')"></div>
      <div v-if="isVeryHardDifficultyGracianoDelMonte" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.graziano-del-monte')"></div>
      <div v-if="isVeryHardDifficultyJillMcDowellConduit" class="alert alert-warning fst-italic" v-html="t('rules.difficultyLevel.veryHard.executiveOfficer.jill-mcdowell.constructConduit')"></div>
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
import PlacingCriteriaDamElevation from '@/services/enum/PlacingCriteriaDamElevation'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { useStateStore } from '@/store/state'
import isDifficultyLevel from '@/util/isDifficultyLevel'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'

export default defineComponent({
  name: 'ActionConstruction',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  components: {
    ActionBox,
    AppIcon
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
    }
  },
  methods: {
    isShowHeadstreamOrder(criteria: PlacingCriteriaDamElevation) {
      return criteria == PlacingCriteriaDamElevation.MOST_WATER_DROPS
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
.criteria {
  display: flex;
  flex-direction: column;
  .icon {
    display: block;
    width: auto;
    height: auto;
    max-width: 7rem;
    max-height: 2.5rem;
    align-self: center;
  }
  .location {
    font-weight: bold;
    font-size: 20px;
  }
  hr {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
}
.criteriaRules {
  .icon {
    width: auto;
    height: auto;
    max-width: 7rem;
    max-height: 2.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  hr {
    clear: both;
  }
}
.map {
  width: 100%;
  max-width: 500px;
}
</style>
