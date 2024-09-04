<template>
  <div>
    <div class="actionBox" data-bs-toggle="modal" data-bs-target="#modalActionRules">
      <div class="actionTitle">{{t(`actionItem.${actionItem.action}`)}}</div>
      <div :class="{nextAction:actionItem.nextAction}">
        <div class="workers">
          <AppIcon name="worker" class="workerIcon" v-for="worker of workerCount" :key="worker"/>
        </div>
        <slot name="action"></slot>
      </div>
    </div>
  </div>

  <ModalDialog id="modalActionRules" :title="t(`actionItem.${actionItem.action}`)"
      :size-lg="true" :scrollable="true">
    <template #body>
      <slot name="rules"></slot>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ActionItem } from '@/services/Card'
import AppIcon from '../structure/AppIcon.vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import BotNavigationState from '@/util/BotNavigationState'

export default defineComponent({
  name: 'ActionBox',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    AppIcon,
    ModalDialog
  },
  props: {
    actionItem: {
      type: Object as PropType<ActionItem>,
      required: true
    },
    navigationState: {
      type: BotNavigationState,
      required: true
    }
  },
  computed: {
    workerCount() : number {
      // required workers - limited by available workers
      return Math.min(this.actionItem.workerCount, this.navigationState.workerCount)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  display: inline-block;
  padding: 20px;
  border-radius: 10px;
  background-color: #2c2c2b;
  color: #eee;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #888);
  cursor: pointer;
  background-image: url('@/assets/icons/help-semi-transparent.png');
  background-repeat: no-repeat;
  background-position: right 5px top 5px;
  background-size: 1.5rem;
  min-width: 200px;
  text-align: center;
  .nextAction {
    border: 2px dashed #999;
    padding: 10px;
  }
  .actionTitle {
    font-weight: 500;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .workers {
    margin-bottom: 1rem;
  }
  .workerIcon {
    height: 2.5rem;
  }
}
.descriptionBox {
  display: inline-block;
  margin-left: 1rem;
}
</style>
