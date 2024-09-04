<template>
  <ModalDialog id="automaRulesModal" :size-lg="true" :scrollable="true"
      :title="t('rules.general.title')">
    <template #body>
      <p v-html="t('rules.general.intro')"></p>
      <ul>
        <li>
          <AppIcon name="credits-victory-points" class="icon float-end"/>
          <span v-html="t('rules.general.noCredits')"></span>
        </li>
        <li>
          <span v-html="t('rules.general.noCompanyAbility')"></span>
          <div v-if="hasHardDifficulty" class="alert alert-warning fst-italic mt-2" v-html="t('rules.difficultyLevel.hard.companyAbilities')"></div>
        </li>
        <li>
          <span v-html="t('rules.general.noExecutiveOfficers')"></span>
          <div v-if="hasVeryHardDifficulty" class="alert alert-warning fst-italic mt-2" v-html="t('rules.difficultyLevel.veryHard.executiveOfficers')"></div>
        </li>
        <li v-html="t('rules.general.doesNotTakeContractTiles')"></li>
        <li>
          <span v-html="t('rules.general.advancedTechnologyTiles')"></span>
          <div v-if="hasHardDifficulty" class="alert alert-warning fst-italic mt-2">
            <span v-html="t('rules.difficultyLevel.hard.advancedTechnologyTiles')"></span>
            <ul>
              <li v-for="tile of hardDifficultyAdvancedTechnologyTiles" :key="tile">
                <AppIcon type="advanced-technology-tile" :name="tile" class="icon advancedTechnology float-end"/>
                <b><span v-html="t(`rules.difficultyLevel.hard.advancedTechnology.${tile}.title`)"></span>:</b><span>&nbsp;</span>
                <span v-html="t(`rules.difficultyLevel.hard.advancedTechnology.${tile}.description`)"></span>
              </li>
            </ul>
          </div>
        </li>
        <li v-html="t('rules.general.objectiveTileScoring')"></li>
        <li v-if="hasLeeghwaterProject" v-html="t('rules.general.building')"></li>
      </ul>
      <h5 v-html="t('rules.general.engineerPlacement.title')"></h5>
      <ul>
        <li v-html="t('rules.general.engineerPlacement.constructionSpaces')"></li>
        <li v-html="t('rules.general.engineerPlacement.managementSpaces')"></li>
      </ul>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import hasDifficultyLevel from '@/util/hasDifficultyLevel'

export default defineComponent({
  name: 'AutomaRulesModal',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    },
    hasHardDifficulty() : boolean {
      return hasDifficultyLevel(DifficultyLevel.HARD, this.state)
    },
    hasVeryHardDifficulty() : boolean {
      return hasDifficultyLevel(DifficultyLevel.VERY_HARD, this.state)
    },
    hasLeeghwaterProject() : boolean {
      return this.state.setup.expansions.includes(Expansion.LEEGHWATER_PROJECT)
    },
    hardDifficultyAdvancedTechnologyTiles() : string[] {
      const tiles = [
        'conduit-level2',
        'powerhouse-level2',
        'building-level1',
        'building-level2',
        'joker-level1',
        'joker-level2'
      ]
      if (this.hasLeeghwaterProject) {
        return tiles
      }
      else {
        return tiles.filter(tile => tile !== 'building-level1' && tile !== 'building-level2')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
  margin: 0.5rem;
  &.advancedTechnology {
    height: 4rem;
    margin: 0.1rem;
  }
}
ul > li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
