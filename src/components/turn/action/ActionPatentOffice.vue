<template>
  <ActionBox :actionItem="actionItem" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <HydroCost v-if="actionItem.hydroCost" :hydroCost="actionItem.hydroCost" class="hydroCost"/>
        <AppIcon v-if="actionItem.constructionType" type="construction-type" :name="actionItem.constructionType" class="icon" :class="{[actionItem.constructionType]:true}"/>
        <AppIcon type="action" name="patent-office" class="tile"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.patent-office.intro')"></p>
      <p v-html="t('rules.actionItem.patent-office.engineerPlacement')"></p>
      <p v-html="t('rules.actionItem.patent-office.multipleTiles')"></p>
      <p v-html="t('rules.actionItem.patent-office.noneAvailable')"></p>
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
  name: 'ActionPatentOffice',
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
.action {
  position: relative;
}
.icon {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 2.5rem;
  z-index: 10;
  &.conduit {
    top: 12px;
    height: 3rem;
  }
}
.hydroCost {
  position: absolute;
  z-index: 20;
  left: 0;
  bottom: 0;
}
.tile {
  width: 12rem;
  filter: drop-shadow(0.1rem 0.1rem 0.4rem #e4ae54);
}
</style>
