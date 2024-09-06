<template>
  <ActionBox :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState"
      @workerPlaced="(workerUsed,nextAction) => $emit('workerPlaced',workerUsed,nextAction)">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="`contract-office-${actionItem.contractDiscard}`" class="icon"/>
        <AppIcon name="energy-increase-2" class="icon"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.contract-office.intro')"></p>
      <p v-html="t('rules.actionItem.contract-office.engineerPlacement')"></p>
      <p v-html="t('rules.actionItem.contract-office.newContractTiles')"></p>
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

export default defineComponent({
  name: 'ActionContractOffice',
  emits: {
    workerPlaced: (_workerUsed: number, _nextAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    AppIcon
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
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 4rem;
}
</style>
