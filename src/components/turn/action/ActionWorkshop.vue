<template>
  <ActionBox :actionItem="actionItem" :criteriaCard="criteriaCard" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <HydroCost v-if="actionItem.hydroCost" :hydroCost="actionItem.hydroCost" class="me-2"/>
        <div class="workshop">
          <div class="steps" v-if="actionItem.workshopSteps">{{actionItem.workshopSteps}}</div>
          <AppIcon type="action" name="workshop" class="icon"/>
        </div>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.workshop.intro')"></p>
      <p v-html="t('rules.actionItem.workshop.technologyTiles')"></p>
      <p v-html="t('rules.actionItem.workshop.engineerPlacement')"></p>
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
  name: 'ActionWorkshop',
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
  height: 3.5rem;
}
.workshop {
  display: inline-block;
  position: relative;
  .steps {
    position: absolute;
    left: 30px;
    top: 0px;
    font-size: 30px;
    font-weight: bold;
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  }
}
</style>
