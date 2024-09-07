<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row" v-for="expansion of expansions" :key="expansion">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" :id="`expansion-${expansion}`"
            :checked="hasExpansion(expansion)" @input="toggleExpansion(expansion)" :disabled="!isExpansionEnabled(expansion)">
        <label class="form-check-label" :for="`expansion-${expansion}`">
          {{t(`setup.expansions.${expansion}`)}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'ExpansionsSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    watch(
      () => state.setup.expansions,
      () => {
        if (state.setup.expansions.includes(Expansion.FIVE_PLAYER)
            && !(state.setup.expansions.includes(Expansion.LEEGHWATER_PROJECT) || state.setup.expansions.includes(Expansion.FAR_COMPANIES))) {
          state.setup.expansions = state.setup.expansions.filter(item => item != Expansion.FIVE_PLAYER)
        }
      },
      { deep: true}
    )

    return { t, state }
  },
  computed: {
    expansions() : Expansion[] {
      return Object.values(Expansion)
    }
  },
  methods: {
    hasExpansion(expansion : Expansion) : boolean {
      return (this.state.setup.expansions ?? []).includes(expansion)
    },
    toggleExpansion(expansion : Expansion) : void {
      this.state.setupToggleExpansion(expansion)
    },
    isExpansionEnabled(expansion : Expansion) : boolean {
      if (expansion == Expansion.FIVE_PLAYER) {
        return this.hasExpansion(Expansion.LEEGHWATER_PROJECT) || this.hasExpansion(Expansion.FAR_COMPANIES)
      }
      return true
    }
  }
})
</script>
