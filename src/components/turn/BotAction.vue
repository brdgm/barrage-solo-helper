<template>
  <component :is="`action-${actionItem.action}`"
    :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState"/>
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
  setup() {
    const { t } = useI18n()
    return { t }
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
  }
})
</script>
