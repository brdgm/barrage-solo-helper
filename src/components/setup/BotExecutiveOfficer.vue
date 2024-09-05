<template>
  <h3 class="mt-4 mb-3">{{t('setupBot.executiveOfficer.title')}}</h3>

  <template v-for="bot in botCount" :key="bot">
    <div class="row mt-3" v-if="isVeryHardDifficulty(bot)">
      <div class="col-5 col-lg-3">
        <label :for="`botExecutiveOfficer${bot}`" class="form-label">{{t('turnBot.title', {bot}, botCount)}}</label>
      </div>
      <div class="col-5 col-lg-3">
        <select class="form-select" :id="`botExecutiveOfficer${bot}`" v-model="state.setup.botExecutiveOfficers[bot-1]">
          <option v-for="executiveOfficer in executiveOfficers" :key="executiveOfficer" :value="executiveOfficer">{{t(`executiveOfficer.${executiveOfficer}`)}}</option>
        </select>
      </div>
    </div>
  </template>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import isExecutiveOfficerAvailable from '@/util/isExecutiveOfficerAvailable'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import isDifficultyLevel from '@/util/isDifficultyLevel'

export default defineComponent({
  name: 'BotExecutiveOfficer',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const expansions = state.setup.expansions
    const botCount = state.setup.playerSetup.botCount

    return { t, state, expansions, botCount }
  },
  computed: {
    executiveOfficers() : ExecutiveOfficer[] {
      return getAllEnumValues(ExecutiveOfficer).filter(officer => isExecutiveOfficerAvailable(officer, this.expansions))
    }
  },
  methods: {
    isVeryHardDifficulty(bot : number) : boolean {
      return isDifficultyLevel(bot, DifficultyLevel.VERY_HARD, this.state)
    }
  }
})
</script>
