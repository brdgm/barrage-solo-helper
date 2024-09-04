<template>
  <ActionBox :actionItem="actionItem" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="production" class="icon action"/>
        <span v-if="actionItem.energyBoost" class="energyBoost">+{{actionItem.energyBoost}}</span>
        <AppIcon name="energy-track" class="icon energy ms-3"/>
        <AppIcon v-if="actionItem.contractRequirement"
            type="contract-requirement" :name="actionItem.contractRequirement"
            class="icon contract ms-3"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.production.intro')"></p>
      <ul>
        <li><AppIcon name="production-system-ready" class="icon action production-system float-end"/><span v-html="t('rules.actionItem.production.productionSystemReady')"></span></li>
        <li><AppIcon name="energy-track" class="icon energy float-end"/><span v-html="t('rules.actionItem.production.energyTrack')"></span></li>
        <li><AppIcon v-if="actionItem.contractRequirement"
            type="contract-requirement" :name="actionItem.contractRequirement"
            class="icon contract float-end m-1"/><span v-html="t('rules.actionItem.production.contractRequirement')"></span></li>
      </ul>
      <p v-html="t('rules.actionItem.production.produceEnergy')"></p>
      <p v-html="t('rules.actionItem.production.fulfillContract')"></p>
      <p v-html="t('rules.actionItem.production.multipleOptions')"></p>
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
  name: 'ActionProduction',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    ActionBox,
    AppIcon
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
.action {
  display: flex;
  align-items: center;
}
.icon {
  width: 4rem;
  &.energy, &.production-system {
    width: 3rem;
  }
}
.energyBoost {
  color: #b5489a;
  font-weight: bold;
  font-size: 30px;
  margin-left: 0.5rem;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000,
      0 0 10px #fff, 0 0 8px #fff, 0 0 12px #b5489a, 0 0 16px #b5489a, 0 0 20px #b5489a, 0 0 24px #b5489a, 0 0 28px #b5489a;
}
ul > li {
  clear: both;
  margin-bottom: 0.5rem;
}
</style>
