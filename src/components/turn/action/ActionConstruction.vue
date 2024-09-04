<template>
  <ActionBox :actionItem="actionItem" :navigationState="navigationState">
    <template #action>
      <div class="action" v-if="actionItem.constructionType">
        <AppIcon v-if="isBuilding" type="construction-type" :name="`building-${actionItem.buildingSearchDirection}`" class="icon building"/>
        <AppIcon v-else type="construction-type" :name="actionItem.constructionType" class="icon" :class="{[actionItem.constructionType]:true}"/>
      </div>
    </template>
    <template #rules>
      <p class="fw-bold fst-italic" v-html="t('rules.actionItem.construction.intro')"></p>
      <ul>
        <li v-html="t('rules.actionItem.construction.structureAvailable')"></li>
        <li v-html="t('rules.actionItem.construction.technologyTileAvailable')"></li>
        <li v-html="t('rules.actionItem.construction.machineriesAvailable')"></li>
        <li v-html="t('rules.actionItem.construction.buildingSpaceAvailable')"></li>
      </ul>
      <p v-html="t('rules.actionItem.construction.buildStructure')"></p>
      <p v-html="t('rules.actionItem.construction.oneSpace')"></p>
      <p v-html="t('rules.actionItem.construction.multipleSpaces')"></p>
      <p v-html="t('rules.actionItem.construction.income')"></p>
      <p v-if="isBuilding" v-html="t(`rules.actionItem.construction.building.${actionItem.buildingSearchDirection}`)"></p>
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
import ConstructionType from '@/services/enum/ConstructionType'

export default defineComponent({
  name: 'ActionConstruction',
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
    isBuilding() : boolean {
      return this.actionItem.constructionType == ConstructionType.BUILDING
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
  &.conduit {
    height: 4rem;
  }
}
ul > li {
  margin-bottom: 0.5rem;
}
</style>
