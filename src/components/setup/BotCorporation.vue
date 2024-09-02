<template>
  <h3 class="mt-4 mb-3">{{t('setupBot.corporation.title')}}</h3>

  <div class="row mt-3" v-for="bot in botCount" :key="bot">
    <div class="col-5 col-lg-3">
      <label :for="`botCorporation${bot}`" class="form-label">{{t('bot', {bot}, botCount)}}</label>
    </div>
    <div class="col-5 col-lg-3">
      <select class="form-select" :id="`botCorporation${bot}`" v-model="state.setup.botCorporations[bot-1]">
        <option v-for="corporation in corporations" :key="corporation" :value="corporation">{{t(`corporation.${corporation}`)}}</option>
      </select>
    </div>
  </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import Corporation from '@/services/enum/Corporation'
import isCorporationAvailable from '@/util/isCorporationAvailable'

export default defineComponent({
  name: 'BotCorporation',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const expansions = state.setup.expansions
    const botCount = state.setup.playerSetup.botCount

    return { t, state, expansions, botCount }
  },
  computed: {
    corporations() : Corporation[] {
      return getAllEnumValues(Corporation).filter(corporation => isCorporationAvailable(corporation, this.expansions))
    }
  }
})
</script>
