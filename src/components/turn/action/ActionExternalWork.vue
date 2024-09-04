<template>
  <ActionBox :actionItem="actionItem" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="external-work" class="icon"/>
      </div>
      <div class="tiles">
        <template v-for="(tile,index) of actionItem.externalWorkTiles" :key="tile">
          <span v-if="index > 0">-</span>
          <span>{{tile}}</span>
        </template>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.external-work.intro')"></p>
      <p v-html="t('rules.actionItem.external-work.enoughMachineries')"></p>
      <p v-html="t('rules.actionItem.external-work.engineerPlacement')"></p>
      <p v-html="t('rules.actionItem.external-work.particularEffect')"></p>
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
  name: 'ActionExternalWork',
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
.icon {
  width: 4rem;
}
.tiles {
  span { 
    margin: 0.1rem;
  }
}
</style>
