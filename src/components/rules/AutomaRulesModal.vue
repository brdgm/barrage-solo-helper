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
        <li v-html="t('rules.general.noCompanyAbility')"></li>
        <li v-if="!hasVeryHardDifficulty" v-html="t('rules.general.noExecutiveOfficers')"></li>
        <li v-html="t('rules.general.doesNotTakeContractTiles')"></li>
        <li v-html="t('rules.general.advancedTechnologyTiles')"></li>
        <li v-html="t('rules.general.objectiveTileScoring')"></li>
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
    hasVeryHardDifficulty() : boolean {
      for (let botIndex = 0; botIndex<this.botCount; botIndex++) {
        if (this.state.setup.difficultyLevels[botIndex] == DifficultyLevel.VERY_HARD) {
          return true
        }
      }
      return false
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
  margin: 0.5rem;
}
ul > li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
