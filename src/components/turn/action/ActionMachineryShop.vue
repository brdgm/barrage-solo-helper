<template>
  <ActionBox :actionItem="actionItem" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <HydroCost v-if="actionItem.hydroCost" :hydroCost="actionItem.hydroCost" class="me-2"/>
        <AppIcon v-for="(machineryType,index) of actionItem.machineryTypes" :key="index"
            type="machinery-type" :name="machineryType" class="icon"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.machinery-shop.intro')"></p>
      <p v-html="t('rules.actionItem.machinery-shop.engineerPlacement')"></p>
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
import HydroCost from '@/components/structure/HydroCost.vue'

export default defineComponent({
  name: 'ActionMachineryShop',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    ActionBox,
    AppIcon,
    HydroCost
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
  height: 3rem;
}
</style>
