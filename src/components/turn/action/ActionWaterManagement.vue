<template>
  <ActionBox :actionItem="actionItem" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="isOneDropImmediately ? 'water-management-immediately' : 'water-management'" class="icon"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.water-management.intro')"></p>
      <p v-html="t('rules.actionItem.water-management.damReachable')"></p>
      <p v-html="t('rules.actionItem.water-management.damCapacity')"></p>
      <p v-html="t('rules.actionItem.water-management.engineerPlacement')"></p>
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
import WaterManagementType from '@/services/enum/WaterManagementType'

export default defineComponent({
  name: 'ActionWaterManagement',
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
  },
  computed: {
    isOneDropImmediately() : boolean {
      return this.actionItem.waterManagementType == WaterManagementType.ONE_DROP_IMMEDIATELY
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 2.8rem;
}
</style>
