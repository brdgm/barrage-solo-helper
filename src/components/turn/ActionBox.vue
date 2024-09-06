<template>
  <div>
    <div class="boxContainer">
      <div class="actionBox mt-2 me-3" data-bs-toggle="modal" data-bs-target="#modalActionRules">
        <div class="actionTitle">{{t(`actionItem.${actionItem.action}`)}}</div>
        <div :class="{nextAction:actionItem.nextAction}">
          <div class="workers">
            <AppIcon name="worker" class="workerIcon" v-for="worker of workerCount" :key="worker"/>
          </div>
          <slot name="action"></slot>
        </div>
      </div>

      <div v-if="showCriteriaDamElevation || showCriteriaAll" class="criteriaBox mt-2 me-3" data-bs-toggle="modal" data-bs-target="#modalCriteriaDamElevationRules">
        <div class="criteria">
          <div class="criteriaTitle">{{t('turnBot.structurePlacement.damElevation')}}</div>
          <template v-for="criteria of criteriaCard.placingCriteriaDamElevation" :key="criteria">
            <AppIcon type="placing-criteria-dam-elevation" :name="criteria" class="icon" :class="criteria"/>
            <hr/>
          </template>
          <div class="location">{{criteriaCard.locationDamElevation}}</div>
        </div>
      </div>

      <div v-if="showCriteriaConduit || showCriteriaAll" class="criteriaBox mt-2 me-3" data-bs-toggle="modal" data-bs-target="#modalCriteriaConduitRules">
        <div class="criteria">
          <div class="criteriaTitle">{{t('turnBot.structurePlacement.conduit')}}</div>
          <template v-for="criteria of criteriaCard.placingCriteriaConduit" :key="criteria">
            <AppIcon type="placing-criteria-conduit" :name="criteria" class="icon" :class="criteria"/>
            <hr/>
          </template>
          <div class="location">{{criteriaCard.locationConduit}}{{criteriaCard.locationConduitPosition}}</div>
        </div>
      </div>

      <div v-if="showCriteriaPowerhouse || showCriteriaAll" class="criteriaBox mt-2 me-3" data-bs-toggle="modal" data-bs-target="#modalCriteriaPowerhouseRules">
        <div class="criteria">
          <div class="criteriaTitle">{{t('turnBot.structurePlacement.powerhouse')}}</div>
          <template v-for="criteria of criteriaCard.placingCriteriaPowerhouse" :key="criteria" >
            <AppIcon type="placing-criteria-powerhouse" :name="criteria" class="icon" :class="criteria"/>
            <hr/>
          </template>
          <div class="location">{{criteriaCard.locationPowerhouse}}</div>
        </div>
      </div>
    
      <div v-if="showCriteriaHeadwater || showCriteriaAll" class="criteriaBox mt-2 me-3" data-bs-toggle="modal" data-bs-target="#modalCriteriaHeadwaterRules">
        <div class="criteria">
          <div class="criteriaTitle">{{t('rules.headwater.title')}}</div>
          <div class="headwaterCriteria">
            <HeadwaterCriteria :criteriaCard="criteriaCard"/>
          </div>
        </div>
      </div>
    
    </div>

    <div>
      <button class="btn btn-sm mt-3 me-3" :class="{'btn-secondary':showCriteriaAll, 'btn-outline-secondary':!showCriteriaAll}"
          @click="showCriteriaAll = !showCriteriaAll">
        {{t('turnBot.criteria')}}
      </button>
      <button v-if="hasHardDifficulty" class="btn btn-sm btn-outline-secondary mt-3 me-3" data-bs-toggle="modal" data-bs-target="#modalPlaceEngineers">
        {{t('turnBot.placeEngineers.button', {count:workerUsed})}}
      </button>
    </div>

    <div v-if="$slots.warnings" class="mt-4 container-fluid">
      <div class="row">
        <div class="col">
          <slot name="warnings"></slot>
        </div>
      </div>
    </div>

    <ModalDialog id="modalActionRules" :title="t(`actionItem.${actionItem.action}`)"
        :size-lg="true" :scrollable="true">
      <template #body>
        <slot name="rules"></slot>
      </template>
    </ModalDialog>

    <ModalDialog v-if="showCriteriaDamElevation || showCriteriaAll" id="modalCriteriaDamElevationRules" :title="t('turnBot.structurePlacement.damElevation')"
        :size-lg="true" :scrollable="true">
      <template #body>
        <p v-html="t('rules.structurePlacement.intro')"></p>
        <ol class="criteriaRules">
          <span v-html="t('rules.structurePlacement.thirdStructure')"></span>
          <hr/>
          <li v-for="criteria of criteriaCard.placingCriteriaDamElevation" :key="criteria">
            <AppIcon type="placing-criteria-dam-elevation" :name="criteria" class="icon float-start" :class="criteria"/>
            <span v-html="t(`rules.structurePlacement.damElevation.${criteria}`)"></span><span>&nbsp;</span>
            <HeadwaterCriteria v-if="isShowHeadstreamOrder(criteria)" :criteriaCard="criteriaCard"/>
            <hr/>
          </li>
          <li>
            <span v-html="t('rules.structurePlacement.location', {location:criteriaCard.locationDamElevation})"></span><br/>
            <span class="small fst-italic" v-html="t('rules.structurePlacement.locationDescription')"></span>
          </li>
        </ol>
        <div class="text-center">
          <img src="@/assets/map-with-overlay.webp" alt="" class="map"/>
        </div>
        <p class="mt-3" v-html="t('rules.structurePlacement.locationRestriction')"></p>
      </template>
    </ModalDialog>

    <ModalDialog v-if="showCriteriaConduit || showCriteriaAll" id="modalCriteriaConduitRules" :title="t('turnBot.structurePlacement.conduit')"
        :size-lg="true" :scrollable="true">
      <template #body>
        <p v-html="t('rules.structurePlacement.intro')"></p>
        <ol class="criteriaRules">
          <span v-html="t('rules.structurePlacement.thirdStructure')"></span>
          <hr/>
          <li v-for="criteria of criteriaCard.placingCriteriaConduit" :key="criteria">
            <AppIcon type="placing-criteria-conduit" :name="criteria" class="icon float-start" :class="criteria"/>
            <span v-html="t(`rules.structurePlacement.conduit.${criteria}`)"></span>
            <hr/>
          </li>
          <li>
            <span v-html="t('rules.structurePlacement.location', {location:`${criteriaCard.locationConduit}${criteriaCard.locationConduitPosition}`})"></span><br/>
            <span class="small fst-italic" v-html="t('rules.structurePlacement.locationDescription')"></span>
          </li>
        </ol>
        <div class="text-center">
          <img src="@/assets/map-with-overlay.webp" alt="" class="map"/>
        </div>
        <p class="mt-3" v-html="t('rules.structurePlacement.locationRestriction')"></p>
      </template>
    </ModalDialog>

    <ModalDialog v-if="showCriteriaPowerhouse || showCriteriaAll" id="modalCriteriaPowerhouseRules" :title="t('turnBot.structurePlacement.powerhouse')"
        :size-lg="true" :scrollable="true">
      <template #body>
        <p v-html="t('rules.structurePlacement.intro')"></p>
        <ol class="criteriaRules">
          <li>
            <span v-html="t('rules.structurePlacement.thirdStructure')"></span>
            <hr/>
          </li>
          <li v-for="criteria of criteriaCard.placingCriteriaPowerhouse" :key="criteria" >
            <AppIcon type="placing-criteria-powerhouse" :name="criteria" class="icon float-start" :class="criteria"/>
            <span v-html="t(`rules.structurePlacement.powerhouse.${criteria}`)"></span>
            <hr/>
          </li>
          <li>
            <span v-html="t('rules.structurePlacement.location', {location:criteriaCard.locationPowerhouse})"></span><br/>
            <span class="small fst-italic" v-html="t('rules.structurePlacement.locationDescription')"></span>
          </li>
        </ol>
        <div class="text-center">
          <img src="@/assets/map-with-overlay.webp" alt="" class="map"/>
        </div>
        <p class="mt-3" v-html="t('rules.structurePlacement.locationRestriction')"></p>
      </template>
    </ModalDialog>

    <ModalDialog v-if="showCriteriaHeadwater || showCriteriaAll" id="modalCriteriaHeadwaterRules" :title="t('rules.headwater.title')"
        :size-lg="true" :scrollable="true">
      <template #body>
        <p v-html="t('rules.headwater.criteria')"></p>
        <div class="headwaterCriteria text-center mb-3">
          <HeadwaterCriteria :criteriaCard="criteriaCard"/>
        </div>
        <img src="@/assets/map-basin.webp" alt="" class="img-fluid"/>
      </template>
    </ModalDialog>

    <ModalDialog id="modalPlaceEngineers" :title="t('turnBot.placeEngineers.title')" :scrollable="true">
      <template #body>
        <p v-html="t('turnBot.placeEngineers.intro')"></p>
        <div class="form-check form-check-inline" v-for="count in [2,1,0]" :key="count">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" name="numberEngineers" v-model="workerUsed" :value="count">
            {{t('turnBot.placeEngineers.workerUsed', {count}, count)}}
          </label>
        </div>
        <div class="form-check mt-3" v-if="navigationState.action > 0">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" v-model="nextAction" :value="true">
            {{t('turnBot.placeEngineers.nextAction')}}
          </label>
        </div>
      </template>
    </ModalDialog>

</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Card, { ActionItem } from '@/services/Card'
import AppIcon from '../structure/AppIcon.vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import BotNavigationState from '@/util/BotNavigationState'
import Action from '@/services/enum/Action'
import ConstructionType from '@/services/enum/ConstructionType'
import PlacingCriteriaDamElevation from '@/services/enum/PlacingCriteriaDamElevation'
import { useStateStore } from '@/store/state'
import isDifficultyLevelCorporation from '@/util/isDifficultyLevelCorporation'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Corporation from '@/services/enum/Corporation'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import hasDifficultyLevel from '@/util/hasDifficultyLevel'
import HeadwaterCriteria from '../rules/HeadwaterCriteria.vue'

export default defineComponent({
  name: 'ActionBox',
  emits: {
    workerPlaced: (_workerUsed: number, _nextAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon,
    ModalDialog,
    HeadwaterCriteria
  },
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()

    const workerUsed = ref(props.actionItem.workerCount)
    const nextAction = ref(props.actionItem.nextAction ?? false)

    return { t, state, workerUsed, nextAction }
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
  data() {
    return {
      showCriteriaAll: false
    }
  },
  computed: {
    workerCount() : number {
      // required workers - limited by available workers
      return Math.min(this.actionItem.workerCount, this.navigationState.workerCount)
    },
    showCriteriaDamElevation() : boolean {
      return this.actionItem.action == Action.CONSTRUCTION
          && (this.actionItem.constructionType == ConstructionType.DAM || this.actionItem.constructionType == ConstructionType.ELEVATION)
    },
    showCriteriaConduit() : boolean {
      return this.actionItem.action == Action.CONSTRUCTION && this.actionItem.constructionType == ConstructionType.CONDUIT
    },
    showCriteriaPowerhouse() : boolean {
      return this.actionItem.action == Action.CONSTRUCTION && this.actionItem.constructionType == ConstructionType.POWERHOUSE
    },
    showCriteriaHeadwater() : boolean {
      return this.actionItem.action == Action.WATER_MANAGEMENT
    },
    hasHardDifficulty() : boolean {
      return hasDifficultyLevel(DifficultyLevel.HARD, this.state)
    },
    isHardDifficultyNetherlands() : boolean {
      return isDifficultyLevelCorporation(this.navigationState.bot, DifficultyLevel.HARD, Corporation.NETHERLANDS, this.state)
    },
    isVeryHardDifficultyGracianoDelMonte() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.GRAZIANO_DEL_MONTE, this.state)
    },
    isVeryHardDifficultyAmirZahir() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.AMIR_ZAHIR, this.state)
    },
    isVeryHardDifficultyWuFang() : boolean {
      return isDifficultyLevelExecutiveOfficer(this.navigationState.bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.WU_FANG, this.state)
    }
  },
  methods: {
    isShowHeadstreamOrder(criteria: PlacingCriteriaDamElevation) {
      return criteria == PlacingCriteriaDamElevation.MOST_WATER_DROPS
    }
  },
  watch: {
    workerUsed(value) {
      this.$emit('workerPlaced', value, this.nextAction)
    },
    nextAction(value) {
      this.$emit('workerPlaced', this.workerUsed, value)
    }
  }
})
</script>

<style lang="scss" scoped>
.boxContainer {
  display: flex;
  flex-wrap: wrap;
}
.actionBox, .criteriaBox {
  display: inline-block;
  padding: 20px;
  border-radius: 10px;
  background-color: #2c2c2b;
  color: #eee;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #888);
  cursor: pointer;
  background-image: url('@/assets/icons/help-semi-transparent.png');
  background-repeat: no-repeat;
  background-position: right 5px top 5px;
  background-size: 1.5rem;
  text-align: center;
  min-width: 200px;
  @media (max-width: 600px) {
    min-width: 150px;
  }
  .nextAction {
    border: 2px dashed #999;
    padding: 10px;
  }
  .actionTitle, .criteriaTitle {
    font-weight: 500;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    @media (max-width: 600px) {
      font-size: 0.8rem;
      margin-left: 0.15rem;
      margin-right: 0.15rem;
    }
  }
  .workers {
    margin-bottom: 1rem;
  }
  .workerIcon {
    height: 2.5rem;
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
    @media (max-width: 600px) {
      max-width: 5rem;
      max-height: 1.75rem;
    }
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
.headwaterCriteria {
  font-size: 20px;
  font-weight: bold;
}
</style>
