<template>
  <component :is="`action-${actionItem.action}`"
    :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState" @workerPlaced="workerPlaced"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card, { ActionItem } from '@/services/Card'
import BotNavigationState from '@/util/BotNavigationState'
import ActionProduction from './action/ActionProduction.vue'
import ActionBank from './action/ActionBank.vue'
import ActionContractOffice from './action/ActionContractOffice.vue'
import ActionExternalWork from './action/ActionExternalWork.vue'
import ActionMachineryShop from './action/ActionMachineryShop.vue'
import ActionPatentOffice from './action/ActionPatentOffice.vue'
import ActionConstruction from './action/ActionConstruction.vue'
import ActionWaterManagement from './action/ActionWaterManagement.vue'
import ActionWorkshop from './action/ActionWorkshop.vue'

export default defineComponent({
  name: 'BotAction',
  emits: {
    workerPlaced: (_workerUsed: number, _nextAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBank,
    ActionConstruction,
    ActionContractOffice,
    ActionExternalWork,
    ActionMachineryShop,
    ActionPatentOffice,
    ActionProduction,
    ActionWaterManagement,
    ActionWorkshop
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
  methods: {
    workerPlaced(workerUsed: number, nextAction: boolean) {
      this.$emit('workerPlaced', workerUsed, nextAction)
    }
  }
})
</script>
